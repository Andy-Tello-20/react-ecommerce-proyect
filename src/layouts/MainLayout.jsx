import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import './main.css'
import { Footer } from '../components/common/Footer';
// import { CartLengthProvider } from '../context/providers/CartLengthProvider';



export const MainLayout = () => {

  // console.log('mainLayout. se ejecuto...')

  return (
    <>


      {/* <CartLengthProvider> */}
      <Header />
        <main className='home-section '>
       
          <Outlet /> {/* Renderiza las rutas hijas */}
        </main>
      {/* </CartLengthProvider> */}

    <Footer/>
    </>
  );
};

