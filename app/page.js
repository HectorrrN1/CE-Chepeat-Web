'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from './Footer';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const backendUrl = 'https://backend-j959.onrender.com/api/Auth/IniciarSesion';

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
      try {
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        const data = await response.json();
        console.log('Respuesta del backend:', data);

        if (data.numError === 1) {
          // Guardar el token y el nombre del usuario
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username); // Guarda el nombre de usuario
          
          // Redirigir a home
          router.push('/home');
        } else {
          alert('Error en el login: ' + data.result);
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
      {/* Aquí va el formulario y otros elementos */}
    </div>
  );
}
