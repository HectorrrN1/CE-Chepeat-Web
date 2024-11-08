'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './aggProd.css';

export default function AggProd() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  // Obtener productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://backend-j959.onrender.com/api/Product/GetProducts');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
        {products.map((product) => (
          <div key={product.id} className="productItem">
            <img src={product.image || '/default-image.jpg'} alt={product.name} className="productImage" />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
