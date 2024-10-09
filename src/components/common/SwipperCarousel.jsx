import React, { useEffect } from 'react';
import Swiper from 'swiper';
import './Common.css'

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { ShowProduct } from '../products/ShowProduct';
import { Link } from 'react-router-dom';

export const SwipperCarousel = ({ productos }) => {
  useEffect(() => {
    // Inicializar Swiper sin asignarlo a una variable
    new Swiper('.swiper', {
      modules: [Navigation, Pagination,Autoplay], // Usa los módulos de Swiper
      direction: 'horizontal',
      loop: true,


      autoplay: {
        delay: 5000, // Tiempo entre deslizamientos en milisegundos (3 segundos)
        disableOnInteraction: false, // Permite que siga después de la interacción del usuario
      },

      // Paginación
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      // Flechas de navegación
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // Scrollbar (opcional)
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }, []); // El array vacío asegura que Swiper se inicialice solo al montar el componente

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        {productos &&
          productos.map((i, index) => (
            <div className="swiper-slide" key={index}>
              <Link to={`verMas/${i.id}`}>
                <ShowProduct item={i} />
              </Link>
            </div>
          ))}

       
      </div>

      {/* Paginación */}
      <div className="swiper-pagination"></div>

      {/* Flechas de navegación */}
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>

      {/* Scrollbar (opcional) */}
      <div className="swiper-scrollbar"></div>
    </div>
  );
};
