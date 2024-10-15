import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { cartLength } from '../context/myContexts/cartLength';
import { useNavigate } from 'react-router-dom';
import { SessionContext2 } from '../context/myContexts/sesionContext2';



export const AddProductToCart = () => {

  const navigate = useNavigate();
const {dataPlus} = useContext(cartLength)
const {setIsAuthenticated} = useContext(SessionContext2)
const [errorFetch, setErrorFetch] = useState(null);



  const addProductNotify = () => {
    toast.success(
      'Producto agregado al carrito',
      { autoClose: 1000 }
    )
  }
  
  


  // Función para hacer la petición DELETE
  const fetchAdd = async ( productId,quantity,URL) => {

    console.log('se ejecuta fetchAdd')

    try {
      
      const response = await fetch(`${URL}/${productId}/${quantity}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(response.status);
      }else{
        addProductNotify()
        dataPlus()
    
      }
     
    } catch (err) {
      if (err.message === '401') {
        setIsAuthenticated(false)
        navigate('/login')
        setErrorFetch(err);
        // sessionExpired ()
      } 
    }
  };

  // Retornamos los datos y la función para eliminar productos
  return { errorFetch, fetchAdd };
};
