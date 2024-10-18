"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // Importa el hook de navegación
import styles from './compraFinal.module.css'; // Importa los estilos

export default function SolicitudAprobada() {
  const router = useRouter(); // Obtén el enrutador para manejar la navegación

  const handleFinish = () => {
    router.push('/calificarCompra'); // Redirige a la página de calificación
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Solicitud Aprobada</h1>
        <p className={styles.text}>
          Tu solicitud de compra ha sido enviada y aprobada por el vendedor. ¡Gracias por elegir Cheapeat!
        </p>
        <button className={styles.button} onClick={handleFinish}>Finalizar Compra</button>
      </div>
    </div>
  );
}
