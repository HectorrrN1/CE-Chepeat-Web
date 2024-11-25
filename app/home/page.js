"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import styles from "../page.module.css";
import "../globals.css";
import Sidebar from "../Sidebar";
import { useRouter } from "next/navigation";
import RealTimeMap from "../RealTimeMap";

const Page = () => {
  const [showModal, setShowModal] = useState(true);
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const router = useRouter();
  

  // Función para obtener productos
  const fetchProducts = async (latitude, longitude, radiusKm = 1) => {
    setLoading(true);
    setError(null);

    // Recuperar el token del localStorage
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://backend-j959.onrender.com/api/Product/GetProductsByRadius", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el token de autorización
        },
        body: JSON.stringify({
          latitude,
          longitude,
          radiusKm,
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Detalles del error:", errorDetails);
        throw new Error("Error al obtener productos.");
      }

      const data = await response.json();
      setProducts(data); // Actualiza los productos en el estado
    } catch (error) {
      console.error("Error:", error);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  // Manejar permiso de ubicación
  const handleLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Ubicación obtenida:", latitude, longitude);
          fetchProducts(latitude, longitude, 1); // Busca productos en un radio de 1 km
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

  // Manejar redirección al ver más
  const handleSeeMore = (productId) => {
    router.push(`/product/${productId}`); // Redirige a los detalles del producto
  };

  return (
    <div className={styles.pageContainer}>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>¿Ves resultados más cerca de ti?</h2>
            <p>
              Para obtener los resultados más cercanos, permita que la aplicación use la ubicación precisa de su
              dispositivo.
            </p>
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

      <div className={styles.mainLayout}>
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.mapSection}>
            <RealTimeMap /> {/* Componente del mapa en tiempo real */}
          </div>

          <div className={styles.discountSection}>
            <div className={styles.discountBanner}>
              <h2>A 50% de descuento</h2>
              <p>(Todos los productos de panadería después de las 9 PM todos los días)</p>
            </div>
          </div>

          <div className={styles.productGrid}>
            {loading ? (
              <p>Cargando productos...</p>
            ) : error ? (
              <p>{error}</p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <button onClick={() => handleSeeMore(product.id)} className={styles.button}>
                    Ver más
                  </button>
                </div>
              ))
            ) : (
              <p>No hay productos disponibles en tu área.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
