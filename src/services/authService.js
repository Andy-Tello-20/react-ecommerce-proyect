import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { SessionContext2 } from '../context/myContexts/sesionContext2';


const useSubmitForm = (Url) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const {setIsAuthenticated} = useContext(SessionContext2) 
  const [loading, setLoading] = useState(false)

  const errorNotify = () => {
    toast.error(
      'No autorizado. Por favor, verifica tu email y contraseña.',
       { autoClose: 2000 }
      )
  }

  const succesNotify = (name) => {
    toast.success(
      `Bienvenido ${name} 😁`
      ,
      { autoClose: 2000 }
    )
  }



  const Submit = async (data) => {

    
    setLoading(true)
    try {
      const response = await fetch(Url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      const result = await response.json()


      if (response.ok && result.type === 'login') {
        console.log('Logueo exitoso');
        localStorage.setItem('isAuthenticated', 'true')
        setIsAuthenticated(localStorage.getItem('isAuthenticated'))
        succesNotify(result.name); // Mostrar toast de éxito
        navigate('/'); // Redirigir a la ruta deseada
      }
       else {
        console.log('Registro exitoso')
        succesNotify(result.message)
        navigate('/login')
        
      }
    } catch (error) {
      console.error('Error:', error);
      errorNotify(); // Mostrar toast de error en caso de fallo de red
      setLoading(false); // Asegúrate de detener el estado de loading también en caso de error
    }
  };

  return { register, handleSubmit, Submit, loading };
};

export default useSubmitForm;
