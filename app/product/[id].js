"use client";

import { useRouter } from 'next/router';  // Para obtener el ID de la URL
import styles from './productCard.module.css';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;  // Obtiene el ID del producto desde la URL

  // Puedes tener una función para obtener los detalles del producto en base al ID.
  const productDetails = {
    1: { name: "Pasta Italiana", price: "$12.99", description: "Deliciosa pasta italiana con salsa casera." },
    2: { name: "Hamburguesa Clásica", price: "$9.99", description: "Una hamburguesa jugosa con ingredientes frescos." },
    3: { name: "Sushi Variado", price: "$14.99", description: "Sushi con una variedad de ingredientes frescos." },
  };

  const product = productDetails[id];

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className={styles.productCardContainer}>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetail;
