'use client';
import React, { useState } from 'react';
import Footer from '../Footer';
import './pageCli.css'; // Importación de CSS

export default function LoginPage() {
  // Estados para manejar los valores de los campos y errores
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    direccion: '',
    password: '',
    confirmPassword: '',
  });

  // Función para validar el correo
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Función que maneja los cambios en los campos y hace las validaciones instantáneas
  const handleBlur = (field) => {
    const newErrors = { ...errors };

    // Validar cada campo
    if (field === 'nombre' && formData.nombre.trim() === '') {
      newErrors.nombre = 'El nombre es obligatorio';
    } else {
      newErrors.nombre = '';
    }

    if (field === 'email' && !validateEmail(formData.email)) {
      newErrors.email = 'Correo electrónico no válido';
    } else {
      newErrors.email = '';
    }

    if (field === 'direccion' && formData.direccion.trim() === '') {
      newErrors.direccion = 'La dirección es obligatoria';
    } else {
      newErrors.direccion = '';
    }

    if (field === 'password' && formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    } else {
      newErrors.password = '';
    }

    if (field === 'confirmPassword' && formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    } else {
      newErrors.confirmPassword = '';
    }

    setErrors(newErrors);
  };

  // Función para manejar cambios en los campos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Puedes realizar validaciones adicionales antes de enviar el formulario si es necesario
    // En este caso, el formulario se valida campo por campo.
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="/imagenes/logo.png" alt="Cheapeat Logo" />
      </div>

      <h1 className="title">Bienvenido a Cheapeat</h1>
      <p className="description">Por favor, regístrate como cliente para continuar.</p>

      <form className="loginForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className="inputField"
          value={formData.nombre}
          onChange={handleChange}
          onBlur={() => handleBlur('nombre')}
        />
        {errors.nombre && <p className="errorText">{errors.nombre}</p>}

        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          className="inputField"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => handleBlur('email')}
        />
        {errors.email && <p className="errorText">{errors.email}</p>}

        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          className="inputField"
          value={formData.direccion}
          onChange={handleChange}
          onBlur={() => handleBlur('direccion')}
        />
        {errors.direccion && <p className="errorText">{errors.direccion}</p>}

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="inputField"
          value={formData.password}
          onChange={handleChange}
          onBlur={() => handleBlur('password')}
        />
        {errors.password && <p className="errorText">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar Contraseña"
          className="inputField"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={() => handleBlur('confirmPassword')}
        />
        {errors.confirmPassword && <p className="errorText">{errors.confirmPassword}</p>}

        <div className="checkboxContainer">
          <input type="checkbox" required />
          <label>Aceptar términos y condiciones</label>
        </div>

        <button type="submit" className="loginButton">Registrarse</button>
      </form>

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