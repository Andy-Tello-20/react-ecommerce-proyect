import { Outlet } from 'react-router-dom';
import { NavBarUp } from '../components/common/NavBarUp';





export const AuthLayout = () => {

  return (
    <>

      <NavBarUp />


      <Outlet /> {/* Renderiza las rutas hijas */}


    </>
  );
};



