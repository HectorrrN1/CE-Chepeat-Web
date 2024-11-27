
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProductsBySeller } from './aggProd/apiUtils'; // Ajusta la ruta según tu estructura
import './pageVen.css';
import Sidebar from './SidebarVen';

export default function VendedorPage() {
  const [products, setProducts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [pendingSales, setPendingSales] = useState([]); // Estado para las ventas pendientes
  const [selectedSale, setSelectedSale] = useState(null); // Estado para la venta seleccionada
  const [wasDelivered, setWasDelivered] = useState(false);
  const [wasPaid, setWasPaid] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [loadingPendingSales, setLoadingPendingSales] = useState(true); // Estado de carga para ventas pendientes
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorRequests, setErrorRequests] = useState(null);
  const [errorPendingSales, setErrorPendingSales] = useState(null); // Error para ventas pendientes
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedIdSeller = localStorage.getItem('idSeller');

    if (!storedToken || !storedIdSeller) {
      setErrorProducts('Credenciales no encontradas. Por favor, inicia sesión nuevamente.');
      setErrorRequests('Credenciales no encontradas. Por favor, inicia sesión nuevamente.');
      setErrorPendingSales('Credenciales no encontradas. Por favor, inicia sesión nuevamente.');
      setLoadingProducts(false);
      setLoadingRequests(false);
      setLoadingPendingSales(false);
      return;
    }

    // Cargar productos
    fetchProductsBySeller(storedToken, storedIdSeller).then((result) => {
      if (result.success) {
        setProducts(result.data);
      } else {
        setErrorProducts(result.error || 'Error al cargar los productos.');
      }
      setLoadingProducts(false);
    });

    // Cargar solicitudes de compra
    fetchRequestsBySeller(storedIdSeller, storedToken).then((result) => {
      if (result.success) {
        setRequests(result.data);
      } else {
        setErrorRequests(result.error || 'Error al cargar las solicitudes.');
      }
      setLoadingRequests(false);
    });

   // Cargar ventas pendientes
   fetchPendingSales(storedIdSeller, storedToken).then((result) => {
    if (result.success) {
      setPendingSales(result.data);
    } else {
      setErrorPendingSales(result.error || 'Error al cargar las ventas pendientes.');
    }
    setLoadingPendingSales(false);
  });
}, []);



 // Función para obtener ventas pendientes
 const fetchPendingSales = async (idSeller, token) => {
  try {
    const response = await fetch('https://backend-j959.onrender.com/api/Transaction/ViewBySeller', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(idSeller ),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const error = await response.json();
      return { success: false, error: error.message };
    }
  } catch (err) {
    return { success: false, error: 'Error al cargar las ventas pendientes.' };
  }
};

  // Función para obtener solicitudes del vendedor
  const fetchRequestsBySeller = async (idSeller, token) => {
    try {
      const response = await fetch('https://backend-j959.onrender.com/api/PurchaseRequest/GetRequestsBySeller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(idSeller),
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        const error = await response.json();
        return { success: false, error: error.message };
      }
    } catch (err) {
      return { success: false, error: 'Error al cargar las solicitudes.' };
    }
  };

 // Manejar Aceptar y Cancelar solicitud
const handleRequestAction = async (requestId, action) => {
  const token = localStorage.getItem('token');
  const endpoint =
    action === 'accept'
      ? 'https://backend-j959.onrender.com/api/Transaction/AddTransaction'
      : 'https://backend-j959.onrender.com/api/PurchaseRequest/Reject';

  try {
    const body = JSON.stringify(
      action === 'accept'
        ? { idPurchaseRequest: requestId } // Estructura del endpoint para aceptar
        : { id: requestId } // Estructura genérica para cancelar
    );

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    if (response.ok) {
      if (action === 'accept') {
        alert('Solicitud aceptada y transacción registrada con éxito.');
      } else {
        alert('Solicitud rechazada con éxito.');
      }

      // Filtrar la solicitud procesada de la lista
      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
    } else {
      const error = await response.json();
      alert(`Error al ${action === 'accept' ? 'aceptar' : 'rechazar'} la solicitud: ${error.message}`);
    }
  } catch (err) {
    alert(`Error al ${action === 'accept' ? 'aceptar' : 'rechazar'} la solicitud.`);
  }
};

  
const handleFinalizeSale = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('https://backend-j959.onrender.com/api/Transaction/CompleteTransaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: selectedSale.id,
        wasDelivered,
        wasPaid,
      }),
    });

    if (response.ok) {
      alert('Venta completada con éxito.');
      setPendingSales((prevSales) => prevSales.filter((sale) => sale.id !== selectedSale.id));
      setSelectedSale(null);
      router.push('/vendedorPages');
    } else {
      const error = await response.json();
      alert(`Error al completar la venta: ${error.message}`);
    }
  } catch (err) {
    alert('Error al completar la venta.');
  }
};
  return (
    <div className="pageContainer">
      <Sidebar />

      <div className="contentArea">
        {/* Sección de productos */}
        <h1 className="title">Mis productos</h1>

        {loadingProducts && <p>Cargando productos...</p>}
        {errorProducts && <p className="error">{errorProducts}</p>}
        {!loadingProducts && !errorProducts && products.length === 0 && <p>No tienes productos registrados.</p>}
        {!loadingProducts && !errorProducts && products.length > 0 && (
          <div className="productList">
            {products.map((product) => (
              <div
                key={product.id}
                className="productItem"
                onClick={() => router.push(`/vendedorPages/detallePro/${product.id}`)}
              >
                <img src={product.imagenUrl} alt={product.name} className="productImage" />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><strong>Precio:</strong> ${product.price}</p>
                <p><strong>Stock:</strong> {product.stock} {product.measure}</p>
              </div>
            ))}
          </div>
        )}

        <button className="addButton" onClick={() => router.push('/vendedorPages/aggProd/newPro')}>
          Agregar productos
        </button>

{/* Sección de ventas pendientes */}
<div className="pendingSalesSection">
  <h2 className="sectionTitle">Ventas pendientes</h2>

  {loadingPendingSales && <p>Cargando ventas pendientes...</p>}
  {errorPendingSales && <p className="error">{errorPendingSales}</p>}
  {!loadingPendingSales && !errorPendingSales && pendingSales.length === 0 && (
    <p>No tienes ventas pendientes.</p>
  )}
  {!loadingPendingSales && !errorPendingSales && pendingSales.length > 0 && (
    <div className="pendingSalesList">
      {pendingSales.map((sale) => (
        <div key={sale.id} className="saleItem"onClick={() => setSelectedSale(sale)}>
          <div className="saleDetails">
            <p>
              <strong>Comprador:</strong> {sale.buyerName}
            </p>
            <p>
              <strong>Producto:</strong> {sale.productName}
            </p>
        
            <p>
              <strong>Fecha:</strong> {new Date(sale.transactionDate).toLocaleDateString()} - {new Date(sale.transactionDate).toLocaleTimeString()}
            </p>
            <p className={`status ${sale.status.toLowerCase()}`}>
              <strong>Estado:</strong> {sale.status}
            </p>
          </div>
        </div>
      ))}

      
{selectedSale && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Detalle de la venta</h3>
      <p>Comprador: {selectedSale.buyerName}</p>
      <p>Producto: {selectedSale.productName}</p>
      <div>
        <label>
          <input
            type="checkbox"
            checked={wasDelivered}
            onChange={(e) => setWasDelivered(e.target.checked)}
          />
          Entregué el producto
        </label>
        <label>
          <input
            type="checkbox"
            checked={wasPaid}
            onChange={(e) => setWasPaid(e.target.checked)}
          />
          Acepto que el usuario pagó el monto acordado
        </label>
      </div>
      <button onClick={handleFinalizeSale}>Finalizar venta</button>
      <button onClick={() => setSelectedSale(null)}>Cancelar</button>
    </div>
  </div>
)}

      </div>
 


    
  )}
</div>



        {/* Sección de solicitudes de productos */}
        <div className="requestSection">
          <h2 className="sectionTitle">Solicitudes de productos</h2>

          {loadingRequests && <p>Cargando solicitudes...</p>}
          {errorRequests && <p className="error">{errorRequests}</p>}
          {!loadingRequests && !errorRequests && requests.length === 0 && <p>No tienes solicitudes de productos.</p>}
          {!loadingRequests && !errorRequests && requests.length > 0 && (
            <div className="requestList">
              {requests.map((request) => (
                <div key={request.id} className="requestItem">
                  <p>{request.buyerName} quiere comprar {request.productName}</p>
                  <span className="timestamp">{request.timestamp}</span>
                  <div className="actionButtons">
                    <button
                      className="acceptButton"
                      onClick={() => handleRequestAction(request.id, 'accept')}
                    >
                      Aceptar
                    </button>
                    <button 
                      className="cancelButton"
                      onClick={() => handleRequestAction(request.id, 'reject')}
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
