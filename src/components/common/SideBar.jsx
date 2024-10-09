import React, { useContext } from 'react'
import './Common.css'
import { Link } from 'react-router-dom'
import { SideBarContext } from '../../context/myContexts/sideBarContext'
// import {ShoppingCart} from '@mui/icons-material'
// import {Badge} from '@mui/material'
import { cartLength } from '../../context/myContexts/cartLength'



export const SideBar = () => {

  const { data } = useContext(cartLength)
  const dataLength = data.toString()

  const { openSideBar, toOpen } = useContext(SideBarContext)

  return (
    <>
      <div className={toOpen ? "sidebar open" : "sidebar"}>
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus icon"></i>
          <div className="logo_name">CodingLab</div>
          <i className="bx bx-menu" id="btn" onClick={openSideBar}></i>
        </div>
        <ul className="nav-list">
          {/* <li>
            <i className="bx bx-search"></i>
            <input type="text" placeholder="Search..." />
            <span className="tooltip">Search</span>

          </li> */}
          <li>
            <Link to="/">
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Inicio</span>
            </Link>
            <span className="tooltip">Inicio</span>
          </li>
          <li>
            <Link to="/profile">
              <i className="bx bx-user"></i>
              <span className="links_name">Perfil</span>
            </Link>
            <span className="tooltip">Perfil</span>
          </li>
          {/* <li>
            <Link to="#">
              <i className="bx bx-chat"></i>
              <span className="links_name">Messages</span>
            </Link>
            <span className="tooltip">Messages</span>
          </li> */}
          {/* <li>
            <Link to="#">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="links_name">Analytics</span>
            </Link>
            <span className="tooltip">Analytics</span>
          </li> */}
          {/* <li>
            <Link to="#">
              <i className="bx bx-folder"></i>
              <span className="links_name">File Manager</span>
            </Link>
            <span className="tooltip">Files</span>
          </li> */}
          <li>
            <Link to="/cart">
              {/* <Badge badgeContent={dataLength} color="primary">
                <ShoppingCart color="action" />
              </Badge> */}
              <i className="bx bx-cart-alt">

                {data > 0 && <div className="i-badge">{dataLength}</div>}

              </i>
              <span className="links_name">Carrito</span>
            </Link>
            <span className="tooltip">Carrito</span>
          </li>
          {/* <li>
            <Link to="#">
              <i className="bx bx-heart"></i>
              <span className="links_name">Saved</span>
            </Link>
            <span className="tooltip">Saved</span>
          </li> */}
          {/* <li>
            <Link to="#">
              <i className="bx bx-cog"></i>
              <span className="links_name">Setting</span>
            </Link>
            <span className="tooltip">Setting</span>
          </li> */}
          <li className="profile">
            <div className="profile-details">
              <img src="profile.jpg" alt="profileImg" />
              <div className="name_job">
                <div className="name">Prem Shahi</div>
                <div className="job">Web designer</div>
              </div>
            </div>
            <i className="bx bx-log-out" id="log_out"></i>
          </li>
        </ul>
      </div>


    </>
  )
}
