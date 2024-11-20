'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './pageVenUbi.css';

const RegisterSellerPage = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const isSeller = localStorage.getItem('isSeller');
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
    latitude: 0,
    longitude: 0,
  });

  const router = useRouter();

  useEffect(() => {
    if (isSeller === 'true') {
      router.push('/vendedorPages');
    }
  }, [isSeller, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!formData.storeName || !formData.description || !formData.street || !formData.extNumber || !formData.neighborhood || !formData.cp) {
      alert('Por favor, completa todos los campos obligatorios.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (!token) {
        alert('No tienes autorización para realizar esta acción. Por favor, inicia sesión.');
        router.push('/login');
        return;
      }

      console.log('Datos enviados al backend:', {
        ...formData,
        idUser: userId,
      });

      const response = await fetch('https://backend-j959.onrender.com/api/Seller/AddUSeller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          idUser: userId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error HTTP:', response.status, errorText);
        if (response.status === 401) {
          alert('No estás autorizado para realizar esta acción. Verifica tu sesión.');
          router.push('/login');
        } else {
          alert('Ocurrió un error al registrar al vendedor. Inténtalo de nuevo.');
        }
        return;
      }

      const data = await response.json();
      console.log('Respuesta completa del servidor:', data);

      if (data.seller && data.seller.id) {
        console.log('ID del vendedor registrado:', data.seller.id);
        localStorage.setItem('idSeller', data.seller.id);
        alert('Registro exitoso');
        localStorage.setItem('isSeller', 'true');
        router.push('/vendedorPages');
      } else {
        console.error('El servidor no devolvió el ID del vendedor.');
        alert('Registro exitoso, pero no se recibió el ID del vendedor.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error al enviar los datos.');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Registro de Vendedor</h2>
      <form onSubmit={handleSubmit} className="loginForm">
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
          onChange={handleChange}
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
