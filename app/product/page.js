"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa el hook de navegación
import styles from './productCard.module.css'; // Suponiendo que tienes un archivo CSS module

const ProductCard = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 50.00;
  const totalPrice = price * quantity;
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState('');
  
  const router = useRouter(); // Obtén el enrutador para manejar la navegación

  const handlePurchase = () => {
    setShowApprovalModal(true); // Muestra el modal de solicitud aprobada después de solicitar el producto
  };

  const handleFinish = () => {
    setShowApprovalModal(false); // Cierra el modal de solicitud aprobada
    setShowRatingModal(true); // Muestra el modal de calificación de experiencia
  };

  const handleReceipt = () => {
    setShowRatingModal(false); // Cierra el modal de calificación y redirige al home
    router.push('/home');
  };

  const handleStarClick = (index) => {
    setCalificacion(index); // Asigna la calificación cuando se hace clic en las estrellas
  };

  return (
    <div className={styles.productCardContainer}>
      {/* Imagen del producto */}
      <div className={styles.imageContainer}>
        <img src="/imagenes/Vegetable-Sandwich.jpg" alt="Vegetarian Delight Sandwich" className={styles.productImage} />
        <button className={styles.closeButton}>&times;</button>
      </div>

      {/* Información del producto */}
      <div className={styles.productDetails}>
        <div className={styles.header}>
          <h2 className={styles.productTitle}>Vegetarian Delight Sandwich</h2>
          <p className={styles.productPrice}>$50.00</p>
        </div>

        <span className={styles.badge}>Mejor vendido</span>

        <p className={styles.productDescription}>
          Verduras frescas, queso vegano y sabrosos champiñones. Perfecto para vegetarianos.
        </p>

        <p className={styles.location}>
          <span>📍</span> Ubicación del restaurante: Verde Carmen, Tula
        </p>

        <textarea 
          className={styles.textarea}
          placeholder="Añadir comentario..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

        {/* Total y botón de compra */}
        <div className={styles.purchaseSection}>
          <p className={styles.totalPrice}>Total: ${totalPrice}</p>
          <button className={styles.buyButton} onClick={handlePurchase}>Solicitar producto</button>
        </div>
      </div>

      {/* Modal de solicitud aprobada */}
      {showApprovalModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h1>Solicitud Aprobada</h1>
            <p>Tu solicitud de compra ha sido enviada y aprobada por el vendedor. ¡Gracias por elegir Cheapeat!</p>
            <button className={styles.button} onClick={handleFinish}>Recibí el producto</button>
          </div>
        </div>
      )}

      {/* Modal de calificación de compra */}
      {showRatingModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h1>Califique su experiencia de compra</h1>
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
            <button onClick={handleReceipt} className={styles.button}>Finalizar Compra</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
