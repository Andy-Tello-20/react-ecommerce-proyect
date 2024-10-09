// import React, { useContext, useEffect } from 'react';

import { LoginForm } from '../../components/auth/LoginForm';
import './AuthPage.css'
import { loginContext } from '../../context/myContexts/loginContext';
import { useContext, useEffect } from 'react';




export const LoginPage = () => {
 


  const { visibleForm ,togleForm} = useContext(loginContext)

  useEffect(() => {
    // Asegura que el formulario de registro esté visible al montar
    if (!visibleForm) {
      togleForm();  // Solo activa si no está visible
    }
  
    return () => {
      // Asegura que el formulario de registro se oculte al desmontar
      if (visibleForm) {
        togleForm();  // Solo activa si está visible
      }
    }
  }, [])
 
  
  console.log('visibleForm desde LoginPage: ', visibleForm)

  // // Si authState es true, no renderiza nada ya que se realiza la redirección en useEffect
  // if (authState) {
  //   return null;
  // }

  // Renderizar LoginForm solo si no está autenticado y no está cargando
  return (
   
    <section className={visibleForm  ? "home show" : "home"}>
      {
      visibleForm && 

      <div className='form_container'>
        <LoginForm />
      </div>
      }
      </section>
    

   

  )
};