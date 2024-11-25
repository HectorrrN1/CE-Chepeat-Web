'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProductsBySeller } from './aggProd/apiUtils'; // Ajusta la ruta según tu estructura
import './pageVen.css';
import Sidebar from './SidebarVen';

export default function VendedorPage() {
  const [products, setProducts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorRequests, setErrorRequests] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedIdSeller = localStorage.getItem('idSeller');

    if (!storedToken || !storedIdSeller) {
      setErrorProducts('Credenciales no encontradas. Por favor, inicia sesión nuevamente.');
      setErrorRequests('Credenciales no encontradas. Por favor, inicia sesión nuevamente.');
      setLoadingProducts(false);
      setLoadingRequests(false);
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
  }, []);

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
    const endpoint =
      action === 'accept'
        ? 'https://backend-j959.onrender.com/api/PurchaseRequest/AcceptRequest'
        : 'https://backend-j959.onrender.com/api/PurchaseRequest/CancelRequest';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(requestId),
      });

      if (response.ok) {
        setRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
        alert(`Solicitud ${action === 'accept' ? 'aceptada' : 'cancelada'} con éxito.`);
      } else {
        const error = await response.json();
        alert(`Error al ${action === 'accept' ? 'aceptar' : 'cancelar'} la solicitud: ${error.message}`);
      }
    } catch {
      alert(`Error al ${action === 'accept' ? 'aceptar' : 'cancelar'} la solicitud.`);
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
                      onClick={() => handleRequestAction(request.id, 'cancel')}
                    >
                      Cancelar
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
