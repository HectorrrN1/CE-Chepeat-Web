'use client'
import React from 'react';
import './pageVen.css'; // Importa el CSS correctamente

export default function VendedorPage() {
  return (
    <div className="container">
      <h1 className="title">Mis productos</h1>

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

      <button className="addButton">Agregar productos</button>
    </div>
  );
}