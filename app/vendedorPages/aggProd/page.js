'use client';
import React from 'react';
import { useRouter } from 'next/navigation'; // Importar el enrutador para manejar la navegación
import './aggProd.css'; // Importa el CSS específico para esta página

export default function AggProd() {
  const router = useRouter(); // Hook de enrutamiento para manejar la navegación

  // Suponiendo que tienes una lista de productos en el estado
  const products = [
    { id: 1, name: 'Hamburguesa', price: '$100', description: 'Descripción del producto 1', image: '/imagenes/pro1.jpg' },
    { id: 2, name: 'Tacos', price: '$50', description: 'Descripción del producto 2', image: '/imagenes/pro2.jpg' },
    { id: 3, name: 'Pizza', price: '$120', description: 'Descripción del producto 3', image: '/imagenes/pro3.jpg' },
    // Agrega más productos según sea necesario
  ];

  // Función que se ejecuta cuando el usuario hace clic en "Añadir Nuevo"
  const handleAddProductClick = () => {
    router.push('/vendedorPages/aggProd/newPro'); // Navega a la vista de agregar productos
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="navbarTitle">Vendedor Chepeat</h1>
      </nav>

      {/* Título de tus productos con botón */}
      <div className="productHeader">
        <h2 className="title">Tus productos</h2>
        <button className="addNewButton" onClick={handleAddProductClick}>
          Añadir Nuevo
        </button>
      </div>
      
      {/* Lista de productos */}
      <div className="productList">
        {products.map((product) => (
          <div key={product.id} className="productItem">
            <img src={product.image} alt={product.name} className="productImage" />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}