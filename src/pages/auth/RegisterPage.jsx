// Página de registro

import { useContext, useEffect } from 'react'
import { RegisterForm } from '../../components/auth/RegisterForm'
import { loginContext } from '../../context/myContexts/loginContext'



export const RegisterPage = () => {

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  const { visibleFormRegister, togleRegister } = useContext(loginContext)

  useEffect(() => {
    // Asegura que el formulario de registro esté visible al montar
    if (!visibleFormRegister) {
      togleRegister();  // Solo activa si no está visible
    }
  
    return () => {
      // Asegura que el formulario de registro se oculte al desmontar
      if (visibleFormRegister) {
        togleRegister();  // Solo activa si está visible
      }
    }
  }, [])
  console.log('visibleFormRegister desde registerPage: ', visibleFormRegister)


  return (

   
    <section className={visibleFormRegister  ? "home show" : "home"}>
      {
        visibleFormRegister &&

        <div className='register_container'>

          <RegisterForm />

        </div>
      }
      </section>
  



  )
}
