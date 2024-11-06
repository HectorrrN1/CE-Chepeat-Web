'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation'; // Importar el enrutador para manejar la navegación
import './pageVen.css'; // Importa el CSS específico para la página de vendedor

export default function VendedorPage() {
  const router = useRouter(); // Hook de enrutamiento para manejar la navegación

  const handleProductClick = (productName) => {
    router.push(`/vendedorPages/detallePro/${productName}`);
  };

  const handleFirstRequestClick = () => {
    router.push('/vendedorPages/solPro');
  };

  const handleFirstHistoryClick = () => {
    router.push('/vendedorPages/hisPro');
  };

  return (
    <div className="pageContainer">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/imagenes/logo.png" alt="Logo Chepeat" />
        </div>
        <h1 className="navbarTitle">Chepeat</h1>
      </nav>

      <div className="content">
        <h1 className="title">Mis productos</h1>

        {/* Lista de productos */}
        <div className="productGrid">
          <div className="productCard" onClick={() => handleProductClick('Producto 1')}>
            <img src="imagenes/pro1.jpg" alt="Producto 1" className="productImage" />
            <p>Producto 1</p>
          </div>
          <div className="productCard" onClick={() => handleProductClick('Producto 2')}>
            <img src="imagenes/pro2.jpg" alt="Producto 2" className="productImage" />
            <p>Producto 2</p>
          </div>
          <div className="productCard" onClick={() => handleProductClick('Producto 3')}>
            <img src="imagenes/pro3.jpg" alt="Producto 3" className="productImage" />
            <p>Producto 3</p>
          </div>
        </div>

        {/* Botón para agregar productos centrado */}
        <div className="addButtonContainer">
          <button className="addButton" onClick={() => router.push('/vendedorPages/aggProd')}>
            Agregar productos
          </button>
        </div>

        {/* Sección de solicitudes de productos */}
        <div className="requestSection">
          <h2 className="sectionTitle">Solicitudes de productos</h2>
          <div className="requestItem" onClick={handleFirstRequestClick}>
            <p>"Juan Pablo quiere comprar un pan"</p>
            <span className="timestamp">Hace 2 horas</span>
          </div>
          <div className="requestItem">
            <p>"Ana María está interesada en comprar café"</p>
            <span className="timestamp">Hace 3 horas</span>
          </div>
        </div>

        {/* Sección de historial de compras */}
        <div className="historySection">
          <h2 className="sectionTitle">Historial de compras</h2>
          <div className="historyItem" onClick={handleFirstHistoryClick}>
            <p>"Michael Brown compró verduras"</p>
            <span className="timestamp">Hace 1 día</span>
          </div>
          <div className="historyItem">
            <p>"Laura Pérez compró jugo de naranja"</p>
            <span className="timestamp">Hace 3 días</span>
          </div>
        </div>
      </div>
    </div>
  );
}