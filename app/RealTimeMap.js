// RealTimeMap.js
"use client";
import React, { useEffect, useState } from 'react';

const RealTimeMap = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (error) => console.error("Error al obtener la ubicación:", error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId); // Limpia el watcher al desmontar el componente
    } else {
      console.error("La geolocalización no está soportada en este navegador.");
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '300px' }}>
      {position ? (
        <iframe
          src={`https://www.google.com/maps?q=${position.lat},${position.lng}&z=15&output=embed`}
          style={{ width: '100%', height: '100%', border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      ) : (
        <p>Cargando ubicación en tiempo real...</p>
      )}
    </div>
  );
};

export default RealTimeMap;
