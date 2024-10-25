'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './detallePro.css'; // Importa el CSS específico para la página de detalles

export default function DetalleProPage() {
  const router = useRouter();
  const pathname = usePathname();
  const productName = decodeURIComponent(pathname.split('/').pop()); // Extrae el nombre del producto de la URL

  // Información de productos para mostrar según el clic
  const productDetails = {
    'Producto 1': {
      price: '$50.00',
      description: 'Hamburguesa perfecta para satisfacer el hambre',
      deliveryTime: '30 min - 1 hora',
      image: '/imagenes/pro1.jpg', // Añade la imagen
    },
    'Producto 2': {
      price: '$40.00',
      description: 'Tacos deliciosos ',
      deliveryTime: '15 min - 30 min',
      image: '/imagenes/pro2.jpg', // Añade la imagen
    },
    'Producto 3': {
      price: '$50.00',
      description: 'Pizza a buen precio para evitar el hambre',
      deliveryTime: '45 min - 1 hora',
      image: '/imagenes/pro3.jpg', // Añade la imagen
    },
  };

  const product = productDetails[productName];

  return (
    <div className="detailContainer">
      <div className="detailsContainer"> {/* Usar el contenedor de detalles */}
        {/* Imagen del producto */}
        <img src={product?.image} alt={productName} className="productImage" />
        
        <h1 className="productName">{productName}</h1>
        <p className="productPrice">{product?.price}</p>
        <p className="productDescription">{product?.description}</p>
        <p className="deliveryTime">Tiempo estimado de entrega: {product?.deliveryTime}</p>

        <div className="qualityCheckbox">
          <input type="checkbox" id="quality" />
          <label htmlFor="quality">Cumple con los Estándares de Calidad</label>
        </div>

        {/* Sección de solicitudes del producto */}
        <h2>Solicitudes del Producto</h2>
        <div className="requestItem">
          <p>Solicitud de Alexis Santana el 18 de Octubre de 2024</p>
          <button onClick={() => router.push(`/detalleSolicitud/Alexis`)}>
            Ver más
          </button>
        </div>
        <div className="requestItem">
          <p>Solicitud de Diego Armando el 17 de Octubre de 2024</p>
          <button onClick={() => router.push(`/detalleSolicitud/Diego`)}>
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
}