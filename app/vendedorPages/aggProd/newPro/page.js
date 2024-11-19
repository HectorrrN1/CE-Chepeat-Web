'use client';
import React, { useState, useEffect } from 'react';
import './newPro.css';

export default function NewPro() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [measure, setMeasure] = useState('');
  const [description, setDescription] = useState('');
  const [idSeller, setIdSeller] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Obtener el token y el userId desde localStorage
    const storedToken = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (storedToken && userId) {
      setToken(storedToken);
      console.log('Token y userId obtenidos:', storedToken, userId);

      // Hacer la solicitud al backend para obtener el idSeller
      fetchSellerByIdUser(userId);
    } else {
      console.log('No se encontró el token o userId en localStorage');
    }
  }, []);

  // Función para obtener el idSeller a partir del userId
  const fetchSellerByIdUser = async (userId) => {
    try {
      const response = await fetch(`https://backend-j959.onrender.com/api/Seller/SelectSellerByIdUser?idUser=${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.idSeller) {
          setIdSeller(data.idSeller);
          console.log('idSeller obtenido:', data.idSeller);
        } else {
          console.log('No se encontró idSeller para este userId');
        }
      } else {
        console.error('Error al obtener el idSeller');
      }
    } catch (error) {
      console.error('Error al hacer la petición al backend:', error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Asegurarse de que el idSeller esté disponible antes de enviar la solicitud
    if (!idSeller) {
      console.error('idSeller no disponible');
      return;
    }

    const productData = {
      name,
      price,
      stock,
      measure,
      description,
      idSeller, // Incluye el idSeller en los datos del producto
    };

    try {
      console.log('Datos del producto a enviar:', productData);

      const response = await fetch('https://backend-j959.onrender.com/api/Product/AddProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Incluye el token de autorización
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        console.log('Producto agregado exitosamente');
        // Aquí puedes redirigir o limpiar el formulario después de agregar el producto
      } else {
        console.error('Error al agregar el producto');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="newProductContainer">
      <h1>Agregar producto</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image" className="imageButton">
          Seleccionar imagen del producto
        </label>
        <input 
          type="file" 
          id="image" 
          accept="image/*" 
          onChange={handleImageChange} 
          required 
        />

        {image && (
          <div className="imagePreview">
            <img src={image} alt="Vista previa" />
          </div>
        )}

        <label htmlFor="name">Nombre del producto</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />

        <label htmlFor="price">Precio (MXN)</label>
        <input 
          type="number" 
          id="price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
          min="0" 
        />

        <label htmlFor="stock">Stock</label>
        <input 
          type="number" 
          id="stock" 
          value={stock} 
          onChange={(e) => setStock(e.target.value)} 
          required 
          min="0" 
        />

        <label htmlFor="measure">Unidad de medida</label>
        <input 
          type="text" 
          id="measure" 
          value={measure} 
          onChange={(e) => setMeasure(e.target.value)} 
          required 
        />

        <label htmlFor="description">Descripción</label>
        <textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />

        <button type="submit">Agregar producto</button>
      </form>
    </div>
  );
}
