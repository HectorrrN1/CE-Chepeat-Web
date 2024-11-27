'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Para redirigir
import axios from 'axios';
import './newPro.css';

export default function NewPro() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Archivo real de la imagen
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [measure, setMeasure] = useState('');
  const [description, setDescription] = useState('');
  const [idSeller, setIdSeller] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter(); // Para redirigir

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedIdSeller = localStorage.getItem('idSeller');

    if (storedToken && storedIdSeller) {
      setToken(storedToken);
      setIdSeller(storedIdSeller);
      console.log('Token e idSeller obtenidos:', storedToken, storedIdSeller);
    } else {
      console.error('Token o idSeller no disponibles en localStorage.');
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file)); // Vista previa
    setImageFile(file); // Guardar archivo real para envío
  };

  const handleUploadAndSave = async (event) => {
    event.preventDefault();

    if (!idSeller) {
      alert('No se puede agregar el producto. Por favor, verifica tu sesión.');
      return;
    }

    if (!imageFile) {
      alert('Por favor selecciona una imagen.');
      return;
    }

    try {
      // Crear formData para subir la imagen
      const formData = new FormData();
      formData.append('Image', imageFile);
      formData.append('ImageId', `product_${Date.now()}`); // ID único para la imagen

      const uploadResponse = await axios.post(
        'https://images-o944.onrender.com/api/Image/UploadImage',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (uploadResponse.status !== 200) {
        throw new Error('Error al subir la imagen.');
      }

      const imagenUrl = uploadResponse.data.path;
      console.log('URL de la imagen:', imagenUrl);

      // Validar campos del producto
      if (!name || !price || !stock || !measure || !description) {
        alert('Por favor completa todos los campos.');
        return;
      }

      // Crear objeto del producto
      const productData = {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        measure,
        idSeller,
        imagenUrl, // Usar la URL de la imagen
      };

      const productResponse = await axios.post(
        'https://backend-j959.onrender.com/api/Product/AddProduct',
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (productResponse.status === 200) {
        alert('Producto agregado con éxito.');
        router.push('/vendedorPages'); // Redirigir a otra página
      } else {
        throw new Error('Error al guardar el producto.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema al subir la imagen o guardar el producto.');
    }
  };

  return (
    <div className="newProductContainer">
      <h1>Agregar producto</h1>
      <form onSubmit={handleUploadAndSave}>
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
