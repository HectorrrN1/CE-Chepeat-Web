'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Usamos useRouter para redirigir
import './pageVenUbi.css'; // Asegúrate de que la ruta al archivo CSS sea correcta

const RegisterSellerPage = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId'); // Asegúrate de tener el ID de usuario en el localStorage
  const isSeller = localStorage.getItem('isSeller'); // Verifica si el usuario es vendedor
  const [formData, setFormData] = useState({
    storeName: '',
    description: '',
    street: '',
    extNumber: '',
    intNumber: '',
    neighborhood: '',
    city: '',
    state: '',
    cp: '',
    addressNotes: '',
    latitude: 0, // Establecemos valores por defecto para latitud y longitud
    longitude: 0, // Establecemos valores por defecto para latitud y longitud
  });

  const router = useRouter(); // Usamos useRouter para redirigir

  // Función para actualizar el estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validar formulario antes de enviarlo
  const validateForm = () => {
    if (!formData.storeName || !formData.description || !formData.street || !formData.extNumber || !formData.neighborhood || !formData.cp) {
      alert('Por favor, completa todos los campos obligatorios.');
      return false;
    }
    return true;
  };

  // Redirigir si el usuario ya es vendedor
  useEffect(() => {
    if (isSeller === 'true') {
      router.push('/vendedorPages'); // Redirigir a vendedorPages si ya es vendedor
    }
  }, [isSeller, router]);

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario antes de enviarlo
    if (!validateForm()) {
      return;
    }

    try {
      if (!token) {
        alert('No tienes autorización para realizar esta acción. Por favor, inicia sesión.');
        router.push('/login');
        return;
      }

      const response = await fetch('https://backend-j959.onrender.com/api/Seller/AddUSeller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Incluir el token en los encabezados
        },
        body: JSON.stringify({
          ...formData,
          idUser: userId, // Enviar el ID del usuario
        }),
      });

      if (!response.ok) {
        // Manejar errores HTTP
        const errorText = await response.text(); // Leer el texto de error si existe
        console.error('Error HTTP:', response.status, errorText);
        if (response.status === 401) {
          alert('No estás autorizado para realizar esta acción. Verifica tu sesión.');
          router.push('/login');
        } else {
          alert('Ocurrió un error al registrar al vendedor. Inténtalo de nuevo.');
        }
        return;
      }

      const data = await response.json(); // Solo intentar parsear si la respuesta es exitosa
      console.log('Respuesta del servidor:', data);

      alert('Registro exitoso');
      localStorage.setItem('isSeller', 'true'); // Actualizar el estado de isSeller en el localStorage
      router.push('/vendedorPages'); // Redirige a vendedorPages después de un registro exitoso
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error al enviar los datos.');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Registro de Vendedor</h2>
      <form onSubmit={handleSubmit} className="loginForm">
        {/* Campos del formulario */}
        <input
          type="text"
          name="storeName"
          value={formData.storeName}
          onChange={handleChange}
          placeholder="Nombre de la tienda"
          required
          className="inputField"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
          required
          className="textareaField"
        />
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Calle"
          required
          className="inputField"
        />
        <input
          type="text"
          name="extNumber"
          value={formData.extNumber}
          onChange={handleChange}
          placeholder="Número Exterior"
          required
          className="inputField"
        />
        <input
          type="text"
          name="intNumber"
          value={formData.intNumber}
          onChange={handleChange}
          placeholder="Número Interior"
          className="inputField"
        />
        <input
          type="text"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={handleChange}
          placeholder="Colonia"
          required
          className="inputField"
        />
        <input
          type="text"
          name="cp"
          value={formData.cp}
          onChange={handleChange} // Ya no ejecuta la lógica del código postal
          placeholder="Código Postal"
          required
          className="inputField"
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Ciudad"
          className="inputField"
        />
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="Estado"
          className="inputField"
        />
        <textarea
          name="addressNotes"
          value={formData.addressNotes}
          onChange={handleChange}
          placeholder="Notas sobre la dirección (opcional)"
          className="textareaField"
        />
        <button type="submit" className="loginButton">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterSellerPage;
