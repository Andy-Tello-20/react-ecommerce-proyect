import { Navigate } from 'react-router-dom';
import { useSession } from '../../context/myContexts/sesionContext2';
import { LoaderSpinner } from '../../components/common/Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSession();


  if (loading) {
    return <LoaderSpinner/>
  }

console.log('que es isAUTHENTICATED', isAuthenticated)


  // Si no está autenticado, guardar la URL actual para redirigir después del login
  

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;