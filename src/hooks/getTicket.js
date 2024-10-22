import { useNavigate } from 'react-router-dom';
import { SessionContext2 } from '../context/myContexts/sesionContext2';
import { useContext, useEffect, useState } from 'react';

export const ShoopingData = () => {

    const navigate = useNavigate()
    const [dataTicket, setDataTicket] = useState([])
    const { setIsAuthenticated } = useContext(SessionContext2)
    const [loading, setLoading] = useState(null);


    useEffect(() => {
        const getTicket = async () => {


            try {
                setLoading(true)
                const response = await fetch(`http://localhost:8080/api/ticket`, {
                    method: 'GET',
                    credentials: 'include',
                })
    
    
    
                if (!response.ok) {
                    throw new Error(response.status);
                } else {
    
                    let result = await response.json()
                    setLoading(false)
                    setDataTicket(result)
                    console.log('ticket es: ', result)
    
                }
            } catch (err) {
                if (err.message === '401') {
    
                    setIsAuthenticated(false)
                    navigate('/login')
    
    
                }
            }
    
    
        }
    
        getTicket()
    }, [navigate,setIsAuthenticated])
    
    

    return { dataTicket,loading }

}