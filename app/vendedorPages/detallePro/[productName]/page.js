
'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import './detallePro.css';
import { useRouter } from 'next/navigation';

export default function DetalleProPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const router = useRouter();

  const pathname = usePathname();
  const productId = decodeURIComponent(pathname.split('/').pop()); // Obtiene el ID del producto desde la URL

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    if (!productId) {
      setError('ID de producto no encontrado.');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado. Por favor, inicia sesión.');
      }

      const response = await fetch('https://backend-j959.onrender.com/api/Product/GetProductById', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productId),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.title || 'Error al obtener los detalles del producto');
      }

      const data = await response.json();
      setProduct(data);
      setFormData(data); // Inicializar los datos del formulario con los detalles del producto
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://backend-j959.onrender.com/api/Product/UpdateProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.title || 'Error al actualizar el producto.');
      }

      const data = await response.json();
      setMessage(data.result || "Producto actualizado exitosamente.");
      fetchProductDetails(); // Recargar detalles del producto
    } catch (err) {
      setMessage(err.message || "Error al actualizar el producto.");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://backend-j959.onrender.com/api/Product/DeleteProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productId),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.title || 'Error al eliminar el producto.');
      }

      const data = await response.json();
      setMessage(data.result || "Producto eliminado exitosamente.");
      setProduct(null); // Limpia los detalles del producto después de eliminarlo
      router.push('/vendedorPages'); // Redirigir al listado de productos
    } catch (err) {
      setMessage(err.message || "Error al eliminar el producto.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="detailContainer">
      <div className="detailsContainer">
        {product?.imagenUrl ? (
          <img src={product.imagenUrl} alt={product.name} className="productImage" />
        ) : (
          <div className="placeholderImage">Imagen no disponible</div>
        )}
<h1 className="productName">{product?.name || 'Nombre no disponible'}</h1>
<p className="productPrice">Precio: ${product?.price || 'No disponible'}</p>
<p className="productDescription">{product?.description || 'Descripción no disponible'}</p>
<p className="productStock">Stock disponible: {product?.stock || 0}</p>
<p className="productMeasure">Medida: {product?.measure || 'No especificada'}</p>
<p className="deliveryTime">Estado: {product?.status || 'No especificado'}</p>


<h2>Información adicional</h2>
<p>
  Creado el: {product?.createdAt 
    ? new Date(product.createdAt).toLocaleString() 
    : 'Fecha no disponible'}
</p>
<p>
  Última actualización: {product?.updatedAt 
    ? new Date(product.updatedAt).toLocaleString() 
    : 'Fecha no disponible'}
</p>


        {/* Formulario para actualizar el producto */}
        <h3>Actualizar Producto</h3>
        <form>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Descripción:
            <input
              type="text"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Precio:
            <input
              type="number"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Stock:
            <input
              type="number"
              name="stock"
              value={formData.stock || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Medida:
            <input
              type="text"
              name="measure"
              value={formData.measure || ""}
              onChange={handleChange}
            />
          </label>
          <button type="button" onClick={handleUpdateProduct}>
            Actualizar Producto
          </button>
        </form>

        {/* Botón para eliminar el producto */}
        <h3>Eliminar Producto</h3>
        <button onClick={handleDeleteProduct}>Eliminar Producto</button>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
} 