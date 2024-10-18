
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa el hook de navegación
import styles from './productCard.module.css'; // Suponiendo que tienes un archivo CSS module

const ProductCard = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 50.00;
  const totalPrice = price * quantity;
  
  const router = useRouter(); // Obtén el enrutador para manejar la navegación

  const handlePurchase = () => {
    router.push('/Compra'); // Redirige a la página de compra
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

        <textarea className={styles.commentsBox} placeholder="Añadir comentario..."></textarea>

        {/* Total y botón de compra */}
        <div className={styles.purchaseSection}>
          <p className={styles.totalPrice}>Total: ${totalPrice}</p>
          <button className={styles.buyButton} onClick={handlePurchase}>Solicitar producto</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
