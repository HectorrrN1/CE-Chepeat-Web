'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Footer from '../Footer';
import './pageVenUbi.css';

export default function RegisterSellerPage() {
  const router = useRouter();

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
  });

  const [errors, setErrors] = useState({
    storeName: '',
    cp: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (field) => {
    const newErrors = { ...errors };
    if (field === 'storeName' && formData.storeName.trim() === '') {
      newErrors.storeName = 'El nombre de la tienda es obligatorio';
    } else {
      newErrors.storeName = '';
    }

    if (field === 'cp' && formData.cp.trim() === '') {
      newErrors.cp = 'El código postal es obligatorio';
    } else {
      newErrors.cp = '';
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const noErrors = Object.values(errors).every((error) => error === '');
  
    if (noErrors) {
      try {
        // Si se necesita un token de autorización, obténlo antes
        const token = ''; // Reemplaza con el método para obtener tu token si es necesario
  
        const response = await axios.post('https://backend-j959.onrender.com/api/Seller/AddUSeller', formData, {
          headers: {
            'Authorization': `Bearer ${token}` // Incluye esto si es necesario
          }
        });
  
        if (response.status === 200) {
          router.push('/vendedorPages'); // Cambia la ruta de redirección si es necesario
        }
      } catch (error) {
        console.error('Error al registrar el vendedor:', error);
        // Manejo de errores adicional si es necesario
      }
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="/imagenes/logo.png" alt="Cheapeat Logo" />
      </div>
      <h1 className="title">Registro de Vendedor</h1>
      <form className="registerForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="storeName"
          placeholder="Nombre de la tienda"
          className="inputField"
          value={formData.storeName}
          onChange={handleChange}
          onBlur={() => handleBlur('storeName')}
        />
        {errors.storeName && <p className="errorText">{errors.storeName}</p>}

        <input
          type="text"
          name="description"
          placeholder="Descripción de la tienda"
          className="inputField"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="street"
          placeholder="Calle"
          className="inputField"
          value={formData.street}
          onChange={handleChange}
        />

        <input
          type="text"
          name="extNumber"
          placeholder="Número exterior"
          className="inputField"
          value={formData.extNumber}
          onChange={handleChange}
        />

        <input
          type="text"
          name="intNumber"
          placeholder="Número interior (opcional)"
          className="inputField"
          value={formData.intNumber}
          onChange={handleChange}
        />

        <input
          type="text"
          name="neighborhood"
          placeholder="Colonia"
          className="inputField"
          value={formData.neighborhood}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          className="inputField"
          value={formData.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="state"
          placeholder="Estado"
          className="inputField"
          value={formData.state}
          onChange={handleChange}
        />

        <input
          type="text"
          name="cp"
          placeholder="Código postal"
          className="inputField"
          value={formData.cp}
          onChange={handleChange}
          onBlur={() => handleBlur('cp')}
        />
        {errors.cp && <p className="errorText">{errors.cp}</p>}

        <textarea
          name="addressNotes"
          placeholder="Notas adicionales de dirección"
          className="inputField"
          value={formData.addressNotes}
          onChange={handleChange}
        />

        <button type="submit" className="registerButton">Registrar tienda</button>
      </form>
      
      <div className="termsAndConditions">
        Al registrarte, aceptas nuestros <a href="/terms">Términos de Servicio</a> y la <a href="/policy">Política de Privacidad</a>.
      </div>
      

    </div>
  );
}