import React, { useContext, useEffect, useState } from 'react'
import { cartLength } from '../myContexts/cartLength'
import { SessionContext2 } from '../myContexts/sesionContext2'



export const CartLengthProvider = ({ children }) => {

 

  const {isAuthenticated} = useContext(SessionContext2)
    const [data, setData] = useState(0);

    const dataPlus= () => {
        setData(prevData => prevData + 1)
    }

    const dataMinus = () => {
        setData(prevData => prevData - 1)
    }

    useEffect(() => {

       
        const fetchData = async () => {

          
          try {
            const response = await fetch('http://localhost:8080/api/userCart', {
              method: 'GET',
              credentials: 'include',
            });
          
            if (!response.ok) {
              throw new Error(`${response.status}`);
            }
    
            const result = await response.json();

            setData(result.products.length);

    
          } catch (err) {
            if (err.message === '401') {
               console.log('error: ',err)
            }
          }
        };
    
        if(isAuthenticated){
        fetchData();
        }
     
    
       }, [data,isAuthenticated]);
    
       console.log('CartLengthProvider se ejecuta, data es: ', data)

    return (
        <cartLength.Provider value={{ data,setData, dataPlus, dataMinus }}>
            {children}
        </cartLength.Provider>
    )
}
