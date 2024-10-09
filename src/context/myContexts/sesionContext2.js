// context/SessionContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

export const SessionContext2 = createContext();

export const useSession = () => useContext(SessionContext2);

export const SessionProvider2 = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true'; // Si no es "true", se establecerá como false
  })
 


console.log('se ejecuta SessionProvider2')

  useEffect(() => {
    // Simula una petición al backend para comprobar si la sesión es válida
    const checkSession = async () => {
      try {
        // Aquí harías una petición real para comprobar el estado de la sesión

        const response = await fetch('http://localhost:8080/api/check-session', {
          method: 'GET',
          credentials: 'include',
        });



        if (response.ok) {
          setIsAuthenticated(true);  // El usuario está autenticado
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('isAuthenticated'); // Elimina la sesión si no está autenticado
        }

     
      } catch (error) {
        setIsAuthenticated(false); // Error en la petición
        localStorage.removeItem('isAuthenticated')
      }
    };

    checkSession();
    
  }, [isAuthenticated]);

  return (
    <SessionContext2.Provider value={{ isAuthenticated ,setIsAuthenticated}}>
      {children}
    </SessionContext2.Provider>
  );
};
