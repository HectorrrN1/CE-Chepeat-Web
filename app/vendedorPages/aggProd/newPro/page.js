'use client';
import React, { useState } from 'react';
import './newPro.css';

export default function NewPro() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [measure, setMeasure] = useState('');
  const [description, setDescription] = useState('');
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const productData = {
      name,
      price,
      stock,
      measure,
      description,
      // Asume que tienes un proceso para manejar la imagen en el backend
    };

    try {
      const response = await fetch('https://backend-j959.onrender.com/api/Product/AddProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
