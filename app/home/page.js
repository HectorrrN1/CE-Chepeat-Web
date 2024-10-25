'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import styles from '../page.module.css';
import '../globals.css';
import Sidebar from '../Sidebar'; 
import { useRouter } from 'next/navigation';
import RealTimeMap from '../RealTimeMap';

const Page = () => {
  const [showModal, setShowModal] = useState(true);
  const [username, setUsername] = useState('');
  const router = useRouter();

  // Leer el nombre de usuario de localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Ubicación obtenida:", position);
          setShowModal(false);
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
          setShowModal(false);
        }
      );
    } else {
      console.error("La geolocalización no está soportada en este navegador.");
      setShowModal(false);
    }
  };

  const handleSeeMore = () => {
    router.push(`/product`);
  };

  return (
    <div className={styles.pageContainer}>
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
        {/* Pasar el nombre del usuario al Sidebar */}
        <Sidebar username={username} />

        <div className={styles.content}>
          <div className={styles.mapSection}>
            <h2>Mapa en tiempo real</h2>
            <RealTimeMap />
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
              <button onClick={handleSeeMore} className={styles.button}>Ver más</button>
            </div>
            <div className={styles.productCard}>
              <img src="/imagenes/hamburguesa.jpg" alt="Hamburguesa Clásica" />
              <h3>Hamburguesa Clásica</h3>
              <p>$9.99</p>
              <button onClick={handleSeeMore} className={styles.button}>Ver más</button>
            </div>
            <div className={styles.productCard}>
              <img src="/imagenes/Vegetable-Sandwich.jpg" alt="Vegetarian Delight Sandwich" />
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
