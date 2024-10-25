'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import './solPro.css'; // Importa el estilo específico para esta vista

export default function SolicitudProducto() {
  return (
    <div className="solProContainer">
      <div className="profileIcon">
        {/* Imagen o ícono para representar el perfil */}
        <img src="/imagenes/icon.png" alt="Ícono de perfil" />
        {/* Nombre del usuario debajo de la imagen */}
        <p className="userName">Juan Pablo</p>
      </div>
      <div className="description">
        <p>Usa con frecuencia la aplicación</p>
        <p>Se encuentra cerca de la Universidad</p>
        <p>Se unió en enero de 2022</p>
      </div>
      <button className="acceptButton">Aceptar solicitud</button>
    </div>
  );
}