'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './aggProd.css';





export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const [idSeller, setIdSeller] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Obtener token e idSeller desde localStorage
    const storedToken = localStorage.getItem('token');
    const storedIdSeller = localStorage.getItem('idSeller');

    if (storedToken && storedIdSeller) {
      setToken(storedToken);
      setIdSeller(storedIdSeller);
      fetchProducts(storedToken, storedIdSeller);
    } else {
      setError('No se encontraron las credenciales necesarias. Por favor, inicia sesión nuevamente.');
      setLoading(false);
    }
  }, []);

  const fetchProducts = async (token, idSeller) => {
    try {
      console.log('Enviando solicitud al backend con idSeller:', idSeller);

      const response = await axios.post(
        'https://backend-j959.onrender.com/api/Product/GetProductsByIdSeller',
        idSeller, // Enviamos solo la cadena como en Postman
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('Productos obtenidos:', response.data);
        setProducts(response.data);
      } else {
        console.error('Error en la respuesta del servidor:', response.status);
        setError('Error al obtener los productos.');
      }
    } catch (err) {
      console.error('Error al realizar la solicitud:', err);
      setError('Ocurrió un error al obtener los productos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="myProductsContainer">
      <h1>Mis Productos</h1>

      {loading && <p>Cargando productos...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && products.length === 0 && <p>No tienes productos registrados.</p>}

      {!loading && !error && products.length > 0 && (
        <div className="product-grid"> {/* Cambio de className a "product-grid" */}
          {products.map((product) => (
            <div key={product.id} className="product-card"> {/* Cambio de className a "product-card" */}
              <img src={product.imagenUrl} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>Precio:</strong> ${product.price}</p>
              <p><strong>Stock:</strong> {product.stock} {product.measure}</p>
            </div>
          ))}
        </div>
      )}





        {/* Botón para agregar productos */}
        <button className="addButton" onClick={() => router.push('/vendedorPages/aggProd/newPro')}>
          Agregar productos
        </button>


        {/* Botón para volver  a la pagina de vendedores  */}
        <button className="addButton" onClick={() => router.push('/vendedorPages')}>
          Inicio vendedor
        </button>




    </div>
  );
}
