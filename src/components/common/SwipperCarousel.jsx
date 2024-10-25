import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Common.css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const SwipperCarousel = ({ productos, space = 0, slides = 4,
  autoplay = true, pagination = true , breakpoint = true , navigation = true}) => {

    console.log('recibo productos: ',productos)

  return (
    <Swiper 
      modules={[Navigation, Pagination, Autoplay]}
      direction="horizontal"
      loop={true}
      spaceBetween={space} // Espacio entre contenido
      slidesPerView={slides} // Cantidad de imágenes por vista
      autoplay={
        autoplay
          ? {
            delay: 5000,
            disableOnInteraction: false,
          }
          : false
      }
      pagination={pagination ? { clickable: true } : false}
      navigation={navigation}
      scrollbar={{ draggable: true }}
      breakpoints={
        breakpoint
          ? {
            300:{
              slidesPerView:2,
              spaceBetween:space
            },
            // 400: {
            //   slidesPerView: 3,
            //   spaceBetween: space, // Espacio entre slides para pantallas pequeñas
            // },
            700: {
              slidesPerView: 3,
              spaceBetween: space, // Espacio entre slides para pantallas medianas
            },
            // 1024: {
            //   slidesPerView: 3,
            //   spaceBetween: space, // Espacio entre slides para pantallas grandes
            // },
            1200: {
              slidesPerView: 4,
              spaceBetween: space, // Espacio entre slides para pantallas muy grandes
            }
          }
          : false
      }
    >
      {Array.isArray(productos) && productos.length > 0 ? (
        productos.map((i, index) => (
          <SwiperSlide key={index}> {/* Usa un identificador único si está disponible */}
            {i}
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>No hay productos disponibles.</SwiperSlide>
      )}
    </Swiper>
  );
};
