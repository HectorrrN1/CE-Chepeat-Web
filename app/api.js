'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Footer from './Footer';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  // URL del backend
  const backendUrl = 'https://backend-j959.onrender.com/auth/login';

  // Validación del correo electrónico
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = { email: '', password: '' };

    // Validar correo
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor, introduce un correo electrónico válido';
      formIsValid = false;
    }

    // Validar contraseña
    if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      try {
        // Realizar la solicitud al backend
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Login exitoso:', data);

          // Guardar token (si lo recibes) y redirigir al home
          // localStorage.setItem('token', data.token);
          router.push('/home');
        } else {
          const errorData = await response.json();
          console.error('Error de autenticación:', errorData.message);
          alert('Error en el login: ' + errorData.message);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Ocurrió un error al intentar iniciar sesión.');
      }
    }
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validar al salir del campo (blur)
    const { name, value } = e.target;
    let errorMessage = '';

    if (name === 'email' && !validateEmail(value)) {
      errorMessage = 'Por favor, introduce un correo electrónico válido';
    }

    if (name === 'password' && value.length < 6) {
      errorMessage = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleCreateAccount = () => {
    router.push('/pageRegClie'); // Redirige a la vista de registro
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/imagenes/logo.png" alt="Cheapeat Logo" />
      </div>
      <h1>Bienvenido a Cheapeat</h1><br />
      <p>Por favor, inicia sesión para continuar.</p>
      <br />

      <form className={styles.loginForm} onSubmit={handleSubmit}>
        {/* Campo de correo electrónico */}
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          required
          className={styles.inputField}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}

        {/* Campo de contraseña */}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          className={styles.inputField}
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}

        <a href="#" className={styles.forgotPassword}>¿Olvidaste tu contraseña?</a>
        <button type="submit" className={styles.loginButton}>Ingresar</button>
      </form>
      <br />
      <p>o</p>
      <br />
      <button 
        className={styles.createAccountButton}
        onClick={handleCreateAccount}
      >
        Crear Cuenta Nueva
      </button>
      <br /><br /><br /><br /><br />

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="/terminos" className={styles.link}>Términos de Servicio</a>
          {' • '}
          <a href="/privacidad" className={styles.link}>Política de Privacidad</a>
          {' • '}
          <a href="/ayuda" className={styles.link}>Centro de Ayuda</a>
        </div>
      </footer>
    </div>
  );
}
