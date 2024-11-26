'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import './hisPro.css'; // Importa el CSS específico para el historial de compras

export default function HistorialCompras() {
  return (
    <div className="hisProContainer">
      <div className="profileIcon">
        {/* Imagen o ícono para representar el perfil */}
        <img src="/imagenes/icon.png" alt="Ícono de perfil" />
        {/* Nombre del usuario debajo de la imagen */}
        <p className="userName">Michael Brown</p>
      </div>
      <div className="historyItem">
        <p>Compró verduras</p>
        <span className="timestamp">Hace 1 día</span>
        <div className="checkboxContainer">
          <label>
            <input 
              type="checkbox" 
              // No hay estado asociado ya que no se necesita lógica por ahora
            />
            Entregué el producto
          </label>
          <label>
            <input 
              type="checkbox" 
              // No hay estado asociado ya que no se necesita lógica por ahora
            />
            Acepto que el usuario pagó el monto acordado
          </label>
        </div>
        <button className="closeSaleButton" onClick={() => { /* No hace nada por ahora */ }}>
          Cerrar Venta
        </button>
      </div>
    </div>
  );
}