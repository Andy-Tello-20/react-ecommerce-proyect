// components/PublicRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSession } from '../../context/myContexts/sesionContext2';
import { LoaderSpinner } from '../../components/common/Loader';

export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSession();
 
 
  
  console.log('isauthenticated: ', isAuthenticated);

  if (loading) {
    return <LoaderSpinner />;
  }

  if (isAuthenticated) {
    // Obtener la URL almacenada, o redirigir a '/' si no hay una URL guardada

    const redirectURL = localStorage.getItem('redirectAfterLogin') || '/';

    // Limpiar el localStorage una vez usada la URL para evitar redirecciones incorrectas futuras
    localStorage.removeItem('redirectAfterLogin');

    return <Navigate to={redirectURL} />;
  }

  // // Si no está autenticado, guardar la URL actual para redirigir después del login
  // localStorage.setItem('redirectAfterLogin', location.pathname);

  return children;
};

export default PublicRoute;
