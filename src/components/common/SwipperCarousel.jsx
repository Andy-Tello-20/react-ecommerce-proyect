// 

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Common.css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const SwipperCarousel = ({ productos }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      direction="horizontal"
      loop={true}
      spaceBetween={0} // 👉 espacio entre contenido
      slidesPerView={1} //👉 cantidad de imagenes por vista
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}  //👉 cada 5 segundos pasa al siguiente contenido automaticamente 

      pagination={{ clickable: true }}
      navigation={true}
      scrollbar={{ draggable: true }}
      // breakpoints={{
      //   320: {
      //     slidesPerView: 1, // Muestra 1 slide para pantallas pequeñas
      //     // spaceBetween: 5,
      //   },
      //   768: {
      //     slidesPerView: 2, // Muestra 2 slides para pantallas medianas
      //     // spaceBetween: 10,
      //   },
      //   1024: {
      //     slidesPerView: 3, // Muestra 3 slides para pantallas grandes
      //     // spaceBetween: 15,
      //   },
      //   1200: {
      //     slidesPerView: 4, // Muestra 4 slides para pantallas muy grandes
      //     // spaceBetween: 20,
      //   },
      // }}
    >
      <SwiperSlide>
        <img
          src="https://mlx.com.ar/wp-content/uploads/Slide_PCArmadas-jpg.webp"
          alt="Slide 1"
          
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://mlx.com.ar/wp-content/uploads/Slide_CM-42.png"
          alt="Slide 2"
    
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://mlx.com.ar/wp-content/uploads/Slide_Actualizacion.png"
          alt="Slide 3"
  
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://mlx.com.ar/wp-content/uploads/Slide_MODOsep.png"
          alt="Slide 4"
   
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://mlx.com.ar/wp-content/uploads/Slide_Intel-2.png"
          alt="Slide 5"
     
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://mlx.com.ar/wp-content/uploads/Slide_AMD9000.png"
          alt="Slide 6"
    
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://mlx.com.ar/wp-content/uploads/WEBBANNER-SC-MLX-PRODUCTOS-jpg.webp"
          alt="Slide 7"
       
        />
      </SwiperSlide>
    </Swiper>
  );
};