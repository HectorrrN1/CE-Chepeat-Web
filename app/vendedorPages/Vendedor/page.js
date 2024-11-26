'use client';
import React, { useEffect, useState } from 'react';
import styles from './vendedor.css';

const EditSellerPage = () => {
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Función para obtener los datos del vendedor
  useEffect(() => {
    const fetchSellerData = async () => {
      const userId = localStorage.getItem('userId'); // Obtienes el userId desde localStorage
      const token = localStorage.getItem('token'); // Obtienes el token desde localStorage

      if (!userId || !token) {
        setError('No tienes autorización. Por favor, inicia sesión.');
        setLoading(false);
        return;
      }

      try {
        // Llamada a la API para obtener los datos del vendedor utilizando el token en los headers
        const response = await fetch('https://backend-j959.onrender.com/api/Seller/GetSellerById', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Autorización con el token
          },
        });

        if (!response.ok) {
          throw new Error('No se pudieron obtener los datos del vendedor.');
        }

        const data = await response.json();
        console.log('Datos obtenidos del vendedor:', data);

        // Verificar si la respuesta contiene datos válidos
        if (data && data.result) {
          setFormData({
            storeName: data.result.storeName || '',
            description: data.result.description || '',
            street: data.result.street || '',
            extNumber: data.result.extNumber || '',
            intNumber: data.result.intNumber || '',
            neighborhood: data.result.neighborhood || '',
            city: data.result.city || '',
            state: data.result.state || '',
            cp: data.result.cp || '',
            addressNotes: data.result.addressNotes || '',
          });
        } else {
          setError('No se encontraron datos para este vendedor.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No tienes autorización. Por favor, inicia sesión.');
        return;
      }

      const response = await fetch('https://backend-j959.onrender.com/api/Seller/UpdateSeller', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Ocurrió un error al actualizar los datos.');
      }

      alert('Datos actualizados con éxito.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.cardContainer}>
      <h1 className={styles.cardTitle}>Editar Datos del Vendedor</h1>
      {loading ? (
        <p>Cargando datos...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nombre de la tienda</label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              placeholder="Nombre de la tienda"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción breve"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Calle</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Calle"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Número Exterior</label>
            <input
              type="text"
              name="extNumber"
              value={formData.extNumber}
              onChange={handleChange}
              placeholder="Número Exterior"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Número Interior (opcional)</label>
            <input
              type="text"
              name="intNumber"
              value={formData.intNumber}
              onChange={handleChange}
              placeholder="Número Interior"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Colonia</label>
            <input
              type="text"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              placeholder="Colonia"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Código Postal</label>
            <input
              type="text"
              name="cp"
              value={formData.cp}
              onChange={handleChange}
              placeholder="Código Postal"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Ciudad</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ciudad"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Estado</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Estado"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Notas sobre la dirección (opcional)</label>
            <textarea
              name="addressNotes"
              value={formData.addressNotes}
              onChange={handleChange}
              placeholder="Notas adicionales"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Guardar Cambios
          </button>
        </form>
      )}
    </div>
  );
};

export default EditSellerPage;
