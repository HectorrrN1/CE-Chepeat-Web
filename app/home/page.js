"use client";

import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import styles from '../page.module.css';
import '../globals.css';
import Sidebar from '../Sidebar'; 
import { useRouter } from 'next/navigation';  // Importa useRouter
import RealTimeMap from '../RealTimeMap'; // Asegúrate de ajustar la ruta correctamente

const Page = () => {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter(); // Inicializa useRouter

  const handleLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Ubicación obtenida:", position);
          setShowModal(false); // Cierra el modal después de obtener la ubicación
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
          setShowModal(false); // Cierra el modal si el usuario rechaza la solicitud
        }
      );
    } else {
      console.error("La geolocalización no está soportada en este navegador.");
      setShowModal(false);
    }
  };

  // Función para manejar el click del botón "Ver más"
  const handleSeeMore = () => {
    // Redirige a la página de detalles del producto
    router.push(`/product`);  // Navega a /product donde tienes tu vista detallada
  };

  return (
    <div className={styles.pageContainer}>
      {/* Modal de solicitud de ubicación */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>¿Ves resultados más cerca de ti?</h2>
            <p>Para obtener los resultados más cercanos, permita que la aplicación use la ubicación precisa de su dispositivo.</p>
            <div className={styles.modalButtons}>
              <button onClick={handleLocationPermission} className={styles.locationButton}>
                Utilice una ubicación precisa
              </button>
              <button onClick={() => setShowModal(false)} className={styles.cancelButton}>
                Ahora no
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar />
      
      <div className={styles.mainLayout}>
        <Sidebar username="Juan Pérez" />

        <div className={styles.content}>
          {/* Aquí agregamos el mapa en tiempo real */}
          <div className={styles.mapSection}>
            <h2>Mapa en tiempo real</h2>
            <RealTimeMap />  {/* Aquí se inserta el mapa en tiempo real */}
          </div>

          <div className={styles.discountSection}>
            <div className={styles.discountBanner}>
              <h2>A 50% de descuento</h2>
              <p>(Todos los productos de panadería después de las 9 PM todos los días)</p>
            </div>
          </div>

          <div className={styles.productGrid}>
            <div className={styles.productCard}>
              <img src="/imagenes/pasta.jpg" alt="Pasta Italiana" />
              <h3>Pasta Italiana</h3>
              <p>$12.99</p>
              {/* Aquí redirige a la página de detalles */}
              <button onClick={handleSeeMore} className={styles.button}>Ver más</button>
            </div>
            <div className={styles.productCard}>
              <img src="/imagenes/hamburguesa.jpg" alt="Hamburguesa Clásica" />
              <h3>Hamburguesa Clásica</h3>
              <p>$9.99</p>
              <button onClick={handleSeeMore} className={styles.button}>Ver más</button>
            </div>
            <div className={styles.productCard}>
              <img src="/imagenes/Vegetable-Sandwich.jpg" alt="Sushi Variado" />
              <h3>Vegetarian Delight Sandwich</h3>
              <p>$50.00</p>
              <button onClick={handleSeeMore} className={styles.button}>Ver más</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;