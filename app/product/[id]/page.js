"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./productCard.module.css";

const ProductDetails = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
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
          body: JSON.stringify(productId), // Solo el ID como string
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error de respuesta del servidor:", errorData);
        throw new Error("No se pudo cargar el producto.");
      }

      const data = await response.json();
      setProduct(data.product);

      // Obtener detalles del vendedor
      if (data.product.idSeller) {
        fetchSellerDetails(data.product.idSeller);
      } else {
        console.warn("No se encontró idSeller en los detalles del producto.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      setError("No se pudo cargar el producto.");
      setLoading(false);
    }
  };

  const fetchSellerDetails = async (idSeller) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://backend-j959.onrender.com/api/Seller/GetSellerDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(idSeller), // Solo el idSeller como string
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al obtener detalles del vendedor:", errorData);
        return;
      }

      const data = await response.json();
      setSeller(data.seller);
    } catch (error) {
      console.error("Error al obtener los detalles del vendedor:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseRequest = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      console.error("Token o ID de usuario no encontrado.");
      return;
    }

    const body = {
      idProduct: product.id, // ID del producto
      idBuyer: userId,       // ID del comprador (usuario)
    };

    try {
      const response = await fetch(
        "https://backend-j959.onrender.com/api/PurchaseRequest/Create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al crear solicitud de compra:", errorData);
        throw new Error("No se pudo realizar la solicitud de compra.");
      }

      const data = await response.json();
      console.log("Solicitud de compra realizada con éxito:", data);
      setShowApprovalModal(true);
    } catch (error) {
      console.error("Error al realizar la solicitud de compra:", error);
    }
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
          src={product.imagenUrl}
          alt={product.name}
          className={styles.productImage}
        />
        <button className={styles.closeButton} onClick={goToHome}>&times;</button>
        <p></p>
      </div>

      {/* Información del producto */}
      <div className={styles.productDetails}>
        <span className={styles.badge}>Mejor vendido</span>
        <p></p>
        <div className={styles.header}>
          <h2 className={styles.productTitle}>{product.name}:</h2>
          <p className={styles.productPrice}>${product.price}</p>
        </div>
     
        <p className={styles.productDescription}>{product.description}</p>

        {/* Información del vendedor */}
        {seller && (
          <div className={styles.sellerDetails}>
            <h3 className={styles.sellerDetailsT}>Detalles del Vendedor</h3>
            <p className={styles.sellerName}>
              <strong>Nombre de la tienda:</strong> {seller.storeName}
            </p>
            <p className={styles.location}> 
              <span>📍</span> Ubicación del producto: {product.location}
              <strong>Dirección:</strong> {seller.street} {seller.extNumber}
              {seller.intNumber ? `, ${seller.intNumber}` : ""}, {seller.neighborhood}, {seller.city}, {seller.state}
            </p>
            <p className={styles.referencia}>
              <strong>Referencias de la  dirección:</strong> {seller.addressNotes}
            </p>
            <p className={styles.calificacion}>
              <strong>Calificación del vendedor:</strong> {seller.rating} ⭐
            </p>
          </div>
        )}

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
            className={`${styles.buyButton} ${product.status !== "FREE" ? styles.disabledButton : ""}`}
            onClick={handlePurchaseRequest} // Llamada a la nueva función
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
            <h1>Solicitud enviada</h1>
            <p>Tu solicitud de compra ha sido enviada a el vendedor. ¡Gracias por elegir Cheapeat!</p>
            <button onClick={handleReceipt} className={styles.button}>
              Regresar al menú principal
            </button>
          </div>
        </div>
      )}

   
    </div>
  );
};

export default ProductDetails;
