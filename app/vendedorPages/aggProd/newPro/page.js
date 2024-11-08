'use client';
import React, { useState } from 'react';
import './newPro.css';

export default function NewPro() {
  const [image, setImage] = useState(null); // Estado para la imagen
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [measure, setMeasure] = useState(''); // Estado para la medida
  const [showMeasureModal, setShowMeasureModal] = useState(false); // Controla el modal

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file)); // Crea una URL para la vista previa
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const productData = {
      image, name, price, description, stock, measure
    };
  
    // Supongamos que el token de autorización está almacenado en localStorage
    const token = localStorage.getItem('authToken'); 
  
    try {
      const response = await fetch('https://backend-j959.onrender.com/api/Product/AddProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Añadir token de autorización
        },
        body: JSON.stringify(productData),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('Producto agregado exitosamente');
        // Limpiar los campos después de la respuesta exitosa
        setImage(null);
        setName('');
        setPrice('');
        setDescription('');
        setStock('');
        setMeasure('');
      } else {
        alert('Error al agregar producto');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Hubo un error en la conexión con la API');
    }
  };

  const handleMeasureClick = () => {
    setShowMeasureModal(true);
  };

  const handleMeasureSelect = (selectedMeasure) => {
    setMeasure(selectedMeasure);
    setShowMeasureModal(false);
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

        {/* Campo para nombre del producto */}
        <label htmlFor="name">Nombre del Producto</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />

        {/* Campo para precio */}
        <label htmlFor="price">Precio (MXN)</label>
        <input 
          type="number" 
          id="price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
          min="0.00"
          step="0.01"
          placeholder="0.00"
        />

        {/* Campo para descripción */}
        <label htmlFor="description">Descripción</label>
        <textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />

        {/* Campo para stock */}
        <label htmlFor="stock">Cantidad en stock</label>
        <input 
          type="number" 
          id="stock" 
          value={stock} 
          onChange={(e) => setStock(e.target.value)} 
          required 
          min="1"
        />

        {/* Campo para seleccionar medida */}
        <label htmlFor="measure">Medida</label>
        <button 
          type="button" 
          onClick={handleMeasureClick} 
          className="measureButton"
        >
          {measure || "Selecciona una medida"}
        </button>

        {/* Modal de medidas */}
        {showMeasureModal && (
          <div className="modalOverlay">
            <div className="modal">
              <h2>Selecciona una medida</h2>
              <button onClick={() => handleMeasureSelect("Litros")}>Litros</button>
              <button onClick={() => handleMeasureSelect("Kilos")}>Kilos</button>
              <button onClick={() => handleMeasureSelect("Piezas")}>Piezas</button>
              <button onClick={() => handleMeasureSelect("Paquetes")}>Paquetes</button>
              <button onClick={() => handleMeasureSelect("Unidades")}>Unidades</button>
              <button onClick={() => setShowMeasureModal(false)} className="closeButton">Cerrar</button>
            </div>
          </div>
        )}

        {/* Botón para enviar */}
        <button type="submit">Agregar producto</button>
      </form>
    </div>
  );
}
