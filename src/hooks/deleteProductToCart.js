import {  useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { cartLength } from '../context/myContexts/cartLength';
import { useNavigate } from 'react-router-dom';






export const DeleteProductToCart = () => {


  const navigate=useNavigate()
  const {dataMinus} = useContext(cartLength)
  const [data, setData] = useState([]);
  const [errorFetch, setErrorFetch] = useState(null);


  const deleteItem = () => {
    toast.info('Producto eliminado del carrito', { autoClose: 2000 })
  }


  // Función para hacer la petición DELETE
  const fetchDelete = async (array, productId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/carts/deleteProduct/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(response.status);
      } else {
        dataMinus()
        deleteItem()
      }

      // Filtramos el array para eliminar el producto eliminado
      const newArray = array.filter((i) => i.product._id !== productId);
      console.log('newArray es: ', newArray)
      setData(newArray);  // Actualizamos el estado con el nuevo array
    } catch (error) {
      navigate('/login')
      setErrorFetch(error);
      console.log(error);
    }
  };

  // Retornamos los datos y la función para eliminar productos
  return { data, errorFetch, fetchDelete };
};
