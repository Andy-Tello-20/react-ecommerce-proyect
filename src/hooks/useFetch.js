import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext2 } from '../context/myContexts/sesionContext2';
// import { toast } from 'react-toastify';

// Un custom hook es una función de JavaScript que encapsula y reutiliza lógica relacionada con React, como el manejo de estados (useState), efectos (useEffect), contextos (useContext), y otros hooks de React.
// No devuelven elementos HTML o JSX. En lugar de eso, devuelven datos, funciones u otros valores que puedes utilizar en tus componentes para manejar la lógica de la aplicación.

export const useFetch = (url,redirect='/login') => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const {setIsAuthenticated} = useContext(SessionContext2)
  const navigate = useNavigate();


  // const sessionExpired = () => {
  //   toast.error(
  //     'Sesión Expirada',
  //     { autoClose: 2000 }
  //    )
  // }

  useEffect(() => {

    console.log('se ejecuta usefetch')
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
        });
      
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }

        const result = await response.json();
        // console.log('await response es: ',url, result)
        setData(result);
        setLoading(false) 

      } catch (err) {
        if (err.message === '401') {
          setIsAuthenticated(false)
          navigate(redirect);
          setData(false)
          // sessionExpired ()
        } else {
          setError(err.message);
          console.log(err,'error clas: ', err.message)
        }
      }
    };

    fetchData();

 

   }, [url, redirect,navigate,setIsAuthenticated]);



  return { data, error, loading  };
};
