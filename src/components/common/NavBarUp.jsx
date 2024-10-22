import React, { useContext, useState } from 'react'
import './navBarUp.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cartLength } from '../../context/myContexts/cartLength'
import { loginContext } from '../../context/myContexts/loginContext'
import { SessionContext2 } from '../../context/myContexts/sesionContext2'
import { LogOutFetch } from '../../helpers/logOut'
import { toast } from 'react-toastify';



export const NavBarUp = () => {

    const navigate = useNavigate()

    const sessionExpired = () => {
        toast.error(
            'Sesión Cerrada',
            { autoClose: 1000 }
        )
    }


    const [BurgerMenu, setBurgerMenu] = useState(false)
    const [dropdownOne, setDropdownOne] = useState(false)
    // const [dropdownTwo, setDropdownTwo] = useState(false)
    // const [dropdownThree, setDropdownThree] = useState(false)

    const location = useLocation()

    console.log('la ubicacion es: ', location.pathname)

    if (location.pathname !== '/login') {
        localStorage.setItem('redirectAfterLogin', location.pathname);
    }



    const { isAuthenticated, setIsAuthenticated } = useContext(SessionContext2)
    const { togleForm, togleRegister } = useContext(loginContext)

    const generalShow = (setState, currentState) => {
        setState(!currentState);
    };

    const { data, setData } = useContext(cartLength)
    const dataLength = data.toString()

    const sessionClose = async () => {

        const fetchResponse = await LogOutFetch()

        if (fetchResponse) {
            setIsAuthenticated(false)
            setData(0)
            sessionExpired()
            navigate('/')
        }

    }



    return (
        <nav className='nav-container'>



            <div className="navbar">
                <i className='bx bx-menu' onClick={() => generalShow(setBurgerMenu, BurgerMenu)}></i>
                <div className="logo"><Link to="/">AndyStore</Link></div>
                <div className={BurgerMenu ? "nav-links menuActive " : "nav-links"}>

                    <div className="sidebar-logo">
                        {/* <div className="logo"><Link to="/">AndyStore</Link></div> */}
                        <i className='bx bx-x' onClick={() => generalShow(setBurgerMenu, BurgerMenu)}></i>
                    </div>

                    {isAuthenticated ?

                        <ul className="links">
                            {/* <li><Link to="/">Inicio</Link></li> */}
                            <li className='drop-container'>

                                <div className="drop-perfil">
                                    <Link to="#">Perfil</Link>
                                    <i className='bx bxs-chevron-down htmlcss-arrow arrow' onClick={() => generalShow(setDropdownOne, dropdownOne)}></i>
                                </div>

                                <ul className={dropdownOne ? "htmlCss-sub-menu sub-menu showDrop" : "htmlCss-sub-menu sub-menu "}>

                                    <li className='li-data'><Link to="/profile">Tus datos</Link></li>
                                    <li className='li-data'><Link to="/profile">Configuracion</Link></li>
                                    {/* <li className="more">
                                        <span><Link to="#">More</Link>
                                            <i className='bx bxs-chevron-right arrow more-arrow' onClick={() => generalShow(setDropdownTwo, dropdownTwo)}></i>
                                        </span>
                                        <ul className={dropdownTwo ? "more-sub-menu sub-menu showDrop" : "more-sub-menu sub-menu"}>
                                            <li><Link to="#">Neumorphism</Link></li>
                                            <li><Link to="#">Pre-loader</Link></li>
                                            <li><Link to="#">Glassmorphism</Link></li>
                                        </ul>
                                    </li> */}
                                </ul>
                            </li>
                            {/* <li>
                                <Link to="#">JAVASCRIPT</Link>
                                <i className='bx bxs-chevron-down js-arrow arrow ' onClick={() => generalShow(setDropdownThree, dropdownThree)}></i>
                                <ul className={dropdownThree ? "js-sub-menu sub-menu showDrop" : "js-sub-menu sub-menu"}>
                                    <li><Link to="#">Dynamic Clock</Link></li>
                                    <li><Link to="#">Form Validation</Link></li>
                                    <li><Link to="#">Card Slider</Link></li>
                                    <li><Link to="#">Complete Website</Link></li>
                                </ul>
                            </li> */}



                            <li className="li-shopping">


                                <Link className='carrito-btn' to="/shopping">Mis Compras</Link>


                            </li>


                            <Link className='carrito-btn' to="/cart">
                                <li className="bx bx-cart-alt pr-0">


                                    {data > 0 && <div className="i-badge">{dataLength}</div>}


                                </li>
                            </Link>

                            <li className='li-exit'>
                                <Link to="#" onClick={sessionClose}>Salir</Link>
                            </li>
                        </ul>

                        :
                        <ul className='links'>
                            <li><Link to="#" className="nav_link">Contacto</Link></li>
                            <li><Link to="/" className="nav_link">Productos</Link></li>
                            <li><Link to="#" className="nav_link">Servicios</Link></li>



                            {location.pathname === '/login'
                                ?
                                <button className="button-login" id="form-open" onClick={togleForm}>
                                    <span>
                                        Iniciar Sesion
                                    </span>
                                </button>

                                :
                                <li><Link to="/login" className="nav_link">Iniciar Sesion</Link></li>

                            }


                            {location.pathname === '/register'
                                ?
                                <button className="button-login" id="form-open" onClick={togleRegister}>
                                    <span>
                                        registrate
                                    </span>
                                </button>

                                :

                                <li><Link to="/register" className="nav_link">Registrate</Link></li>

                            }

                        </ul>

                    }

                </div>




                {/* <div className="search-box">
                        <i className='bx bx-search'></i>
                        <div className="input-box">
                            <input type="text" placeholder="Search..." />
                        </div>
                    </div> */}
            </div>



        </nav>
    )
}
