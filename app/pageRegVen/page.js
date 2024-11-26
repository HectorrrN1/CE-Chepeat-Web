'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import './pageVenUbi.css';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 19.4326, // Coordenadas iniciales (ejemplo: Ciudad de México)
  lng: -99.1332,
};

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
    latitude: center.lat, // Valores iniciales
    longitude: center.lng,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBRV9kd8IO4wAQIiABi45NIzczmweWEaOI', // Reemplaza con tu clave
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

  const handleMapClick = (event) => {
    setFormData({
      ...formData,
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng(),
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
      if (data.seller && data.seller.id) {
        localStorage.setItem('idSeller', data.seller.id);
        alert('Registro exitoso');
        localStorage.setItem('isSeller', 'true');
        router.push('/vendedorPages');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error al enviar los datos.');
    }
  };

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <div className="container">
      <h2 className="title">Registro de Vendedor</h2>
      <div className="formContainer">
        {/* Mapa */}
        <div className="mapContainer">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={{ lat: formData.latitude, lng: formData.longitude }}
            onClick={handleMapClick}
          >
            <Marker position={{ lat: formData.latitude, lng: formData.longitude }} />
          </GoogleMap>
        </div>
        <div>
          <p>Latitud: {formData.latitude}</p>
          <p>Longitud: {formData.longitude}</p>
        </div>
        {/* Formulario */}
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


          {/* Campos restantes */}
          <button type="submit" className="loginButton">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterSellerPage;
