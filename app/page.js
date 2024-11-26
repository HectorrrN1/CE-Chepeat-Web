'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from './Footer';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/home'); // Redirigir si ya ha iniciado sesión
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = { email: '', password: '' };

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor, introduce un correo electrónico válido';
      formIsValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId'); // Aseguramos que no quede un ID obsoleto

      try {
        const response = await fetch('https://backend-j959.onrender.com/api/Auth/IniciarSesion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        console.log('Respuesta completa del backend:', data);

        if (response.ok && data.numError === 0 && data.token) {
          console.log('Inicio de sesión exitoso:', data);

          // Guardar token
          localStorage.setItem('token', data.token);

          // Guardar userId si está disponible
          if (data.user && data.user.id) {
            localStorage.setItem('userId', data.user.id);
            console.log('User ID guardado:', data.user.id);
          } else {
            console.warn('El backend no envió un campo id dentro de user.');
            alert('Error: No se pudo obtener el ID de usuario.');
            return;
          }

          // Guardar nombre completo (opcional)
          const fullname = data.user.fullname || 'Usuario';
          localStorage.setItem('username', fullname);

          // Guardar si el usuario es vendedor
          const isSeller = data.user.isSeller || false;  // Verificamos si es vendedor
          localStorage.setItem('isSeller', isSeller);   // Guardamos en el localStorage

          // Redirigir a la página principal
          router.push('/home');
        } else {
          alert(data.result || 'Error al iniciar sesión.');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Ocurrió un error al intentar iniciar sesión.');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
    router.push('/pageRegClie');
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/imagenes/logo.png" alt="Cheapeat Logo" />
      </div>
      <h1>Bienvenido a Chepeat</h1><br />
      <p>Por favor, inicia sesión para continuar.</p>
      <br />

      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          required
          className={styles.inputField}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          className={styles.inputField}
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}

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
