'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importar useRouter para redirigir
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
  const [products, setProducts] = useState([]);
  const router = useRouter(); // Instanciar el router

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
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!idSeller) {
      console.error('idSeller no disponible');
      alert('No se puede agregar el producto. Por favor, verifica tu sesión.');
      return;
    }

    const productData = {
      name,
      price,
      stock,
      measure,
      description,
      idSeller,
    };

    try {
      console.log('Datos del producto a enviar:', productData);

      const response = await fetch('https://backend-j959.onrender.com/api/Product/AddProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        console.log('Producto agregado exitosamente');
        alert('Producto agregado exitosamente.');
        setProducts((prevProducts) => [...prevProducts, productData]);
        setName('');
        setPrice('');
        setStock('');
        setMeasure('');
        setDescription('');
        setImage(null);
      } else {
        console.error('Error al agregar el producto');
        alert('Hubo un error al agregar el producto. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Ocurrió un error al agregar el producto.');
    }
  };

  // Función para redirigir a la página "Mis productos"
  const goToMyProducts = () => {
    router.push('/vendedorPages');
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

      {/* Botón para redirigir a "Mis productos" */}
      <button className="myProductsButton" onClick={goToMyProducts}>
        Mis productos
      </button>
    </div>
  );
}
