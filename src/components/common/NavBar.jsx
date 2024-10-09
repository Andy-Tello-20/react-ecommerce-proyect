import React from 'react'
import {NavLink} from 'react-router-dom'
import './Common.css'

function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">AndyStore</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse flex-end" id="navbarSupportedContent">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/">Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">Tu Carrito</NavLink>
              </li>
             

              {/* <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/cart">Cart</Link></li>
                  <li><Link className="dropdown-item" to="#">Another action</Link></li>
                  <li></li>
                  <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                </ul> 
              </li> */}
              
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;