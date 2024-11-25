"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./productCard.module.css";

const ProductDetails = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState("");

  const router = useRouter();
  const id = params.id;

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  const fetchProductDetails = async (productId) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token no encontrado en localStorage.");
      setError("Token no encontrado.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://backend-j959.onrender.com/api/Product/GetProductDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productId),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error de respuesta del servidor:", errorData);
        throw new Error("No se pudo cargar el producto.");
      }

      const data = await response.json();
      setProduct(data.product);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      setError("No se pudo cargar el producto.");
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = () => {
    setShowApprovalModal(true);
  };

  const handleFinish = () => {
    setShowApprovalModal(false);
    setShowRatingModal(true);
  };

  const handleReceipt = () => {
    setShowRatingModal(false);
    router.push("/home");
  };

  
 // Función para redirigir a la página home
 const goToHome = () => {
  router.push('/home');
};

  const handleStarClick = (index) => {
    setCalificacion(index);
  };

  if (loading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>No se encontró el producto.</p>;
  }
   



  const totalPrice = product.price * quantity;


  return (
    <div className={styles.productCardContainer}>
      {/* Imagen del producto */}
      <div className={styles.imageContainer}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.productImage}
        />
           <button className={styles.closeButton}onClick={goToHome}>&times;</button>

      </div>

      {/* Información del producto */}
      <div className={styles.productDetails}>
        <div className={styles.header}>
          <h2 className={styles.productTitle}>{product.name}</h2>
          <p className={styles.productPrice}>${product.price}</p>
        </div>
        <span className={styles.badge}>Mejor vendido</span>
        <p className={styles.productDescription}>{product.description}</p>

        <p className={styles.location}>
          <span>📍</span> Ubicación del restaurante: {product.location}
        </p>



        <p className={styles.productStock}>
          Stock disponible: {product.stock} {product.measure}
        </p>
        <p className={styles.productStatus}>
          Estado: {product.status === "FREE" ? "Disponible" : "No disponible"}
        </p>

        {/* Total y botón de compra */}


        <div className={styles.purchaseSection}>

        <p className={styles.totalPrice}>Total: ${totalPrice}</p>
          <button
            className={`${styles.buyButton} ${
              product.status !== "FREE" ? styles.disabledButton : ""
            }`}
            onClick={handlePurchase}
            disabled={product.status !== "FREE"}
          >
            {product.status === "FREE" ? "Solicitar producto" : "No disponible"}
          </button>
        </div>
      </div>

      {/* Modal de solicitud aprobada */}
      {showApprovalModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h1>Solicitud Aprobada</h1>
            <p>Tu solicitud de compra ha sido enviada y aprobada por el vendedor. ¡Gracias por elegir Cheapeat!</p>
            <button className={styles.button} onClick={handleFinish}>
              Recibí el producto
            </button>
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
                  className={`${styles.star} ${
                    index < calificacion ? styles.active : ""
                  }`}
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
            <button onClick={handleReceipt} className={styles.button}>
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
