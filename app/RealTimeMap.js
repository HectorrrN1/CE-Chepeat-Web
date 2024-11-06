import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'; // Para carga dinámica solo en el cliente
import 'leaflet/dist/leaflet.css';
import styles from './RealTimeMap.module.css';

// Carga el componente MapContainer dinámicamente solo en el lado del cliente
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false } // Desactiva SSR
);

const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then(mod => mod.Popup),
  { ssr: false }
);

const RealTimeMap = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Para asegurar que solo se ejecute en el cliente
  }, []);

  if (!mounted) {
    return null; // No renderiza nada en el servidor
  }

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={[51.505, -0.09]} zoom={13} className={styles.leafletContainer}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            Estás aquí.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default RealTimeMap;
