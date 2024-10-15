'use client';
import React from 'react';
import Footer from '../Footer';
import './pageCli.css'; // Importación de CSS

export default function LoginPage() {
  return (
    <div className="container"> {/* Cambié 'className={styles.container}' a 'className="container"' */}
      <div className="logo">
        <img src="/imagenes/logo.png" alt="Cheapeat Logo" />
      </div>

      {/* Título y descripción */}
      <h1 className="title">Bienvenido a Cheapeat</h1>
      <p className="description">Por favor, regístrate como cliente para continuar.</p>

      {/* Formulario de registro */}
      <form className="loginForm">
        <input
          type="text"
          placeholder="Nombre"
          required
          className="inputField"
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          required
          className="inputField"
        />
        <input
          type="text"
          placeholder="Dirección"
          required
          className="inputField"
        />
        <input
          type="password"
          placeholder="Contraseña"
          required
          className="inputField"
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          required
          className="inputField"
        />
        <div className="checkboxContainer">
          <input type="checkbox" required />
          <label>Aceptar términos y condiciones</label>
        </div>

        <button type="submit" className="loginButton">Registrarse</button>
      </form>

      {/* Pie de página */}
      <footer className="footer">
        <div className="footerLinks">
          <a href="/terminos" className="link">Términos de Servicio</a>
          {' • '}
          <a href="/privacidad" className="link">Política de Privacidad</a>
          {' • '}
          <a href="/ayuda" className="link">Centro de Ayuda</a>
        </div>
      </footer>
    </div>
  );
}