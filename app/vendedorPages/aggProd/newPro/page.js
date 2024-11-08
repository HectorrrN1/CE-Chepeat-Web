'use client';
import React, { useState } from 'react';
import './newPro.css';

export default function NewPro() {
  const [image, setImage] = useState(null); // Estado para la imagen
  const [price, setPrice] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file)); // Crea una URL para la vista previa
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log({ image, price, deliveryTime, description });
  };

  return (
    <div className="newProductContainer">
      <h1>Agregar producto</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo para subir imagen */}
        <label htmlFor="image">Imagen del producto</label>
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

        {/* Campo para precio */}
        <label htmlFor="price">Precio (MXN)</label>
        <input 
          type="number" 
          id="price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
          min="0" // Para aceptar solo números positivos
        />

        {/* Campo para tiempo de entrega */}
        <label htmlFor="deliveryTime">Tiempo de entrega (minutos)</label>
        <input 
          type="number" 
          id="deliveryTime" 
          value={deliveryTime} 
          onChange={(e) => setDeliveryTime(e.target.value)} 
          required 
          min="1" // Para aceptar solo números positivos
        />

        {/* Campo para descripción */}
        <label htmlFor="description">Descripción</label>
        <textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />

        {/* Botón para enviar */}
        <button type="submit">Agregar producto</button>
      </form>
    </div>
  );
}