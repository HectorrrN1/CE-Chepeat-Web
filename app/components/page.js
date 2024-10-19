import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './CarouselOfertas.module.css'; // Importa tu archivo de estilos

const CarouselOfertas = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const ofertas = [
    {
      titulo: 'A 50% de descuento',
      descripcion: '(Todos los productos de panadería después de las 9 PM todos los días)',
    },
    {
      titulo: '25% de descuento en pasteles',
      descripcion: '(Promoción válida todo el mes)',
    },
    {
      titulo: '2x1 en café',
      descripcion: '(Lunes a viernes de 4 a 6 PM)',
    },
  ];

  return (
    <div className={styles.discountSection}>
      <Slider {...settings}>
        {ofertas.map((oferta, index) => (
          <div key={index} className={styles.discountBanner}>
            <h2>{oferta.titulo}</h2>
            <p>{oferta.descripcion}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselOfertas;
