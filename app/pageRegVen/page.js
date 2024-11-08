'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Importamos useRouter
import './pageVenUbi.css'; // Asegúrate de que la ruta al archivo CSS sea correcta

const RegisterSellerPage = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        storeName: '',
        description: '',
        street: '',
        extNumber: '',
        intNumber: '',
        neighborhood: '',
        city: '',
        state: '',
        cp: '',
        addressNotes: '',
        latitude: 0,  // Establecemos valores por defecto para latitud y longitud
        longitude: 0, // Establecemos valores por defecto para latitud y longitud
    });

    const router = useRouter(); // Usamos useRouter para redirigir

    // Función para actualizar el estado
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const sellerData = { ...formData, idUser: userId };

        try {
            const response = await axios.post('https://backend-j959.onrender.com/api/Seller/AddUSeller', sellerData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Vendedor registrado exitosamente:', response.data);

            // Redirigir a la vista de vendedorPages después del registro exitoso
            router.push('/vendedorPages'); // Cambia la URL de destino a la ruta de la vista de vendedor
        } catch (error) {
            console.error('Error al registrar el vendedor:', error);
        }
    };

    return (
        <div className="container">
            <h2 className="title">Registro de Vendedor</h2>
            <form onSubmit={handleSubmit} className="loginForm">
                {/* Campos del formulario */}
                <input
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    placeholder="Nombre de la tienda"
                    required
                    className="inputField"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descripción"
                    required
                    className="textareaField"
                />
                <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Calle"
                    required
                    className="inputField"
                />
                <input
                    type="text"
                    name="extNumber"
                    value={formData.extNumber}
                    onChange={handleChange}
                    placeholder="Número Exterior"
                    required
                    className="inputField"
                />
                <input
                    type="text"
                    name="intNumber"
                    value={formData.intNumber}
                    onChange={handleChange}
                    placeholder="Número Interior"
                    className="inputField"
                />
                <input
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    placeholder="Colonia"
                    required
                    className="inputField"
                />
                <input
                    type="text"
                    name="cp"
                    value={formData.cp}
                    onChange={handleChange} // Ya no ejecuta la lógica del código postal
                    placeholder="Código Postal"
                    required
                    className="inputField"
                />
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Ciudad"
                    className="inputField"
                />
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Estado"
                    className="inputField"
                />
                <textarea
                    name="addressNotes"
                    value={formData.addressNotes}
                    onChange={handleChange}
                    placeholder="Notas sobre la dirección (opcional)"
                    className="textareaField"
                />
                <button type="submit" className="loginButton">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterSellerPage;
