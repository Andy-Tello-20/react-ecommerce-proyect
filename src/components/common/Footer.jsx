import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'


export const Footer = () => {
  return (
    <footer>
    <div class="content">
      <div class="top">
        <div class="logo-details">
          <span class="logo_name">Andystore</span>
        </div>
        <div class="media-icons">

          <Link to="https://www.linkedin.com/in/andr%C3%A9s-tello/"><i class="fab fa-linkedin-in"></i></Link>

        </div>
      </div>
      <div class="link-boxes">
        <ul class="box mb-0">
          <li class="link_name">Company</li>
          <li><Link to="#">Home</Link></li>
          <li><Link to="#">Contact us</Link></li>
        </ul>
        <ul class="box mb-0">
          <li class="link_name">Services</li>
          <li><Link to="#">App design</Link></li>
          <li><Link to="#">FRONTEND</Link></li>
          <li><Link to="#">BACKEND</Link></li>
       
        </ul>
        <ul class="box mb-0">
          <li class="link_name">Account</li>
          <li><Link to="/profile">Profile</Link></li>
          {/* <li><Link to="#">My account</Link></li> */}
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/shopping">Shopping</Link></li>
        </ul>
       
      </div>
    </div>
    <div class="bottom-details">
      <div class="bottom_text">
        <span class="copyright_text">Copyright &#169; 2024 <Link to="#">AndyTello.</Link>All rights reserved</span>
        <span class="policy_terms">
          <Link to="#">Privacy policy</Link>
          <Link to="#">Terms & condition</Link>
        </span>
      </div>
    </div>
  </footer>
  )
}
