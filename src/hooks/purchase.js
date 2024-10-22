import { useNavigate } from 'react-router-dom';
import { SessionContext2 } from '../context/myContexts/sesionContext2';
import { useContext, useState } from 'react';

export const Purchase = () => {

    const navigate = useNavigate()
    const [preferenceId, setPreferenceId] = useState(false)
    const {setIsAuthenticated } = useContext(SessionContext2)
    const [loading, setLoading] = useState(null);

    const fetchMercadoPago = async () => {

        try {
            setLoading(true)
            const response = await fetch(`http://localhost:8080/api/create_preference`, {
                method: 'POST',
                credentials: 'include',
            })

 

            if (!response.ok) {
                throw new Error(response.status);
            } else {

                let result = await response.json()

                setPreferenceId(result)
                setLoading(false)

            }
        } catch (err) {
            if (err.message === '401') {
                setIsAuthenticated(false)
                navigate('/login')

            }
        }


    }

    return { fetchMercadoPago, loading, preferenceId,setPreferenceId,setLoading }
}

