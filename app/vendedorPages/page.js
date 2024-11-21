'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProductsBySeller } from './aggProd/apiUtils'; // Ajusta la ruta según tu estructura
import './pageVen.css';
import Sidebar from './SidebarVen';

export default function VendedorPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedIdSeller = localStorage.getItem('idSeller');

    if (storedToken && storedIdSeller) {
      fetchProductsBySeller(storedToken, storedIdSeller).then((result) => {
        if (result.success) {
          setProducts(result.data);
        } else {
          setError(result.error);
        }
        setLoading(false);
      });
    } else {
      setError('No se encontraron las credenciales necesarias. Por favor, inicia sesión nuevamente.');
      setLoading(false);
    }
  }, []);

  const handleProductClick = (productId) => {
    router.push(`/vendedorPages/detallePro/${productId}`); // Navega a la página de detalles del producto
  };

  return (
    <div className="pageContainer">
      <Sidebar /> {/* Barra lateral */}

      <div className="contentArea">
        <h1 className="title">Mis productos</h1>

        {loading && <p>Cargando productos...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && products.length === 0 && <p>No tienes productos registrados.</p>}

        {!loading && !error && products.length > 0 && (
          <div className="productList">
            {products.map((product) => (
              <div
                key={product.id}
                className="productItem"
                onClick={() => handleProductClick(product.id)} // Al hacer clic, redirige al detalle del producto
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
          <div className="requestItem">
            <p>"Juan Pablo quiere comprar un pan"</p>
            <span className="timestamp">Hace 2 horas</span>
          </div>
        </div>

        {/* Sección de historial de compras */}
        <div className="historySection">
          <h2 className="sectionTitle">Historial de compras</h2>
          <div className="historyItem">
            <p>"Michael Brown compró verduras"</p>
            <span className="timestamp">Hace 1 día</span>
          </div>
        </div>
      </div>
    </div>
  );
}
