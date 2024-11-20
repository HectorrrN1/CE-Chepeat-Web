'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './aggProd.css';

export default function AggProd() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const idSeller = localStorage.getItem('idSeller'); // Obtener el idSeller desde localStorage

  // Obtener productos del vendedor con el idSeller almacenado
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!idSeller) {
          console.error('El idSeller no está en localStorage');
          return;
        }

        const response = await fetch(
          `https://backend-j959.onrender.com/api/Product/GetProductsByIdSeller`
        );

        if (!response.ok) {
          console.error('Error al obtener los productos:', response.status, response.statusText);
          return;
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [idSeller]); // Ejecutar efecto solo cuando el idSeller cambia

  const handleAddProductClick = () => {
    router.push('/vendedorPages/aggProd/newPro');
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h1 className="navbarTitle">Vendedor Chepeat</h1>
      </nav>
      <div className="productHeader">
        <h2 className="title">Tus productos</h2>
        <button className="addNewButton" onClick={handleAddProductClick}>
          Añadir Nuevo
        </button>
      </div>
      <div className="productList">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="productItem">
              <img
                src={product.image || '/default-image.jpg'}
                alt={product.name}
                className="productImage"
              />
              <h3>{product.name}</h3>
              <p>Precio: ${product.price}</p>
              <p>{product.description}</p>
            </div>
          ))
        ) : (
          <p>No tienes productos agregados.</p>
        )}
      </div>
    </div>
  );
}
