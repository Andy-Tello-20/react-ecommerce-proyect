import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './main.css'
import { loginContext } from '../context/myContexts/loginContext'


export const HeaderAuth = () => {

  const {togleForm}=useContext(loginContext)

  return (
    <header className="header">
        <nav className="nav">
          <Link to="#" className="nav_logo">AndyStore</Link>

          <ul className="nav_items">
            <li className="nav_item">
              <Link to="/" className="nav_link">Home</Link>
              <Link to="#" className="nav_link">Product</Link>
              <Link to="#" className="nav_link">Services</Link>
              <Link to="#" className="nav_link">Contact</Link>
            </li>
          </ul>

          <button className="button" id="form-open" onClick={togleForm}>Login</button>
        </nav>
      </header>
  )
}
