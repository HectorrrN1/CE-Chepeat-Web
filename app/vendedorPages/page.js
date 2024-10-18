'use client';
import React from 'react';
import { useRouter } from 'next/navigation'; // Importar el enrutador para manejar la navegación
import './pageVen.css'; // Importa el CSS específico para la página de vendedor

export default function VendedorPage() {
  const router = useRouter(); // Hook de enrutamiento para manejar la navegación

  // Función que se ejecuta cuando el usuario hace clic en "Agregar productos"
  const handleAddProductClick = () => {
    router.push('/vendedorPages/aggProd'); // Navega a la vista de agregar productos
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="navbarTitle">Chepeat</h1>
        <button className="menuButton">Menú</button>
      </nav>

      <h1 className="title">Mis productos</h1>

      {/* Lista de productos */}
      <div className="productList">
        <div className="productItem">
          <img src="imagenes/pro1.jpg" alt="Producto 1" className="productImage" />
          <p>Producto 1</p>
        </div>
        <div className="productItem">
          <img src="imagenes/pro2.jpg" alt="Producto 2" className="productImage" />
          <p>Producto 2</p>
        </div>
        <div className="productItem">
          <img src="imagenes/pro3.jpg" alt="Producto 3" className="productImage" />
          <p>Producto 3</p>
        </div>
      </div>

      {/* Botón para agregar productos */}
      <button className="addButton" onClick={handleAddProductClick}>
        Agregar productos
      </button>

      {/* Sección de solicitudes de compras */}
      <div className="requestSection">
        <h2 className="sectionTitle">Solicitudes de productos</h2>
        <div className="requestItem">
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
        <div className="historyItem">
          <p>"Michael Brown compró verduras"</p>
          <span className="timestamp">Hace 1 día</span>
        </div>
        <div className="historyItem">
          <p>"Laura Pérez compró jugo de naranja"</p>
          <span className="timestamp">Hace 3 días</span>
        </div>
      </div>
    </div>
  );
}