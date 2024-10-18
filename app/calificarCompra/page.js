"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa el hook de navegación
import styles from './calificar.module.css'; // Importa los estilos

export default function CalificarCompra() {
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState('');
  const router = useRouter(); // Obtén el enrutador para manejar la navegación

  const handleStarClick = (index) => {
    setCalificacion(index);
  };

  const handleReceipt = () => {
    router.push('/home'); // Redirige a la página principal
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Califique su experiencia de compra</h1>
        <div className={styles.stars}>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              onClick={() => handleStarClick(index + 1)}
              className={`${styles.star} ${index < calificacion ? styles.active : ''}`}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          className={styles.textarea}
          placeholder="Escriba sus comentarios aquí..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
        <button className={styles.button} onClick={handleReceipt}>Recibí el producto</button>
      </div>
    </div>
  );
}
