
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
  const [products, setProducts] = useState([]); // Estado para los productos
  const [requests, setRequests] = useState([]); // Estado para las solicitudes
  const [requestHistory, setRequestHistory] = useState([]); // Estado para el historial de solicitudes
  const [loading, setLoading] = useState(false); // Estado de carga para productos
  const [loadingRequests, setLoadingRequests] = useState(false); // Estado de carga para solicitudes
  const [loadingHistory, setLoadingHistory] = useState(false); // Estado de carga para el historial
  const [error, setError] = useState(null); // Estado de error para productos
  const [errorRequests, setErrorRequests] = useState(null); // Estado de error para solicitudes
  const [errorHistory, setErrorHistory] = useState(null); // Estado de error para el historial
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState("");
  const router = useRouter();

  // Función para obtener productos
  const fetchProducts = async (latitude, longitude, radiusKm = 1) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://backend-j959.onrender.com/api/Product/GetProductsByRadius", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ latitude, longitude, radiusKm }),
      });

      if (!response.ok) throw new Error("Error al obtener productos.");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener solicitudes
  const fetchRequests = async () => {
    setLoadingRequests(true);
    setErrorRequests(null);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch("https://backend-j959.onrender.com/api/PurchaseRequest/GetRequestsByBuyer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userId),
      });

      if (!response.ok) throw new Error("Error al obtener solicitudes.");
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      setErrorRequests("No se pudieron cargar las solicitudes.");
    } finally {
      setLoadingRequests(false);
    }
  };

   // Función para obtener historial de solicitudes
   const fetchRequestHistory = async () => {
    setLoadingHistory(true);
    setErrorHistory(null);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch("https://backend-j959.onrender.com/api/Transaction/ViewByBuyer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userId),
      });

      if (!response.ok) throw new Error("Error al obtener historial.");
      const data = await response.json();
      setRequestHistory(data);
    } catch (error) {
      setErrorHistory("No se pudo cargar el historial.");
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchRequestHistory(); // Obtener historial al cargar la página
  }, []);

// Abrir modal con la transacción seleccionada
const handleCommentClick = (transactionId) => {
  setSelectedTransaction(transactionId);
  setShowRatingModal(true);
};

// Enviar comentario y calificación
const handleSendComment = async () => {
  const token = localStorage.getItem("token");

  const payload = {
    idTransaction: selectedTransaction,
    message: comentario,
    rating: calificacion,
  };

  try {
    const response = await fetch("https://backend-j959.onrender.com/api/Comment/AddComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Error al enviar el comentario.");

    alert("¡Comentario enviado con éxito!");
    setShowRatingModal(false);
    setCalificacion(0);
    setComentario("");
  } catch (error) {
    alert("No se pudo enviar el comentario.");
  }
};



  // Manejar permiso de ubicación
  const handleLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchProducts(latitude, longitude, 1);
          setShowModal(false);
        },
        () => setShowModal(false)
      );
    } else {
      setShowModal(false);
    }
  };

  useEffect(() => {
    fetchRequests(); // Obtener las solicitudes al cargar la página
  }, []);

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
            <RealTimeMap />
          </div>

          <div className={styles.discountSection}>
            <div className={styles.discountBanner}>
              <h2>A 50% de descuento</h2>
              <p>(Todos los productos de panadería después de las 9 PM todos los días, ¡Compra ya!)</p>
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
                  <img src={product.imagenUrl} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <button onClick={() => router.push(`/product/${product.id}`)} className={styles.button}>
                    Ver más
                  </button>
                </div>
              ))
            ) : (
              <p>No hay productos disponibles en tu área.</p>
            )}
          </div>

          <div className={styles.requestsSection}>
  <h2>Mis solicitudes</h2>
  {loadingRequests ? (
    <p>Cargando solicitudes...</p>
  ) : errorRequests ? (
    <p>{errorRequests}</p>
  ) : requests.length > 0 ? (
    <div className={styles.requestsGrid}>
      {requests.map((request) => (
        <div key={request.id} className={styles.requestCard}>
          <h3>{request.productName}</h3>
          <p>Fecha: {new Date(request.requestDate).toLocaleDateString()}</p>
  
          <span className={styles[request.status.toLowerCase()]}>
            {request.status === "APPROVED" && "Aprobada"}
            {request.status === "PENDING" && "Pendiente"}
            {request.status === "REJECTED" && "Rechazada"}
          </span>
        </div>
      ))}
    </div>
  ) : (
    <p>No has realizado ninguna solicitud.</p>
  )}
</div>

<div className={styles.historySection}>
<h2>Historial de solicitudes</h2>
            {loadingHistory ? (
              <p>Cargando historial...</p>
            ) : errorHistory ? (
              <p>{errorHistory}</p>
            ) : requestHistory.length > 0 ? (
              <div className={styles.historyGrid}>
                {requestHistory.map((history) => (
                  <div key={history.id} className={styles.historyCard}>
                    <h3>{history.productName}</h3>
                    <p>Fecha: {new Date(history.transactionDate).toLocaleDateString()}</p>
                    <p>Total: ${history.totalAmount}</p>
                    <button
                      className={styles.button}
                      onClick={() => handleCommentClick(history.id)}
                    >
                      Deja un comentario
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No tienes historial de solicitudes.</p>
            )}
          </div>

          {/* Modal de calificación */}
          {showRatingModal && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h1>Califique su experiencia de compra</h1>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      onClick={() => setCalificacion(index + 1)}
                      className={`${styles.star} ${index < calificacion ? styles.active : ""}`}
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
                <button onClick={handleSendComment} className={styles.button}>
                  Enviar comentario
                </button>
                <button onClick={() => setShowRatingModal(false)} className={styles.cancelButton}>
                  Cancelar
                </button>
              </div>
            </div>
            )}
          </div>



        </div>
      </div>
    
  );
};

export default Page;