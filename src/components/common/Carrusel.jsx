import React from 'react'
import "../products/showProduct.css"
import { ShowProduct } from '../products/ShowProduct'
import { Link } from 'react-router-dom'

export const Carrusel = ({ productos }) => {
    return (
        <>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="container carousel-inner">



                    {productos && productos.map((i, index) => (

                       
                        <div key={i._id}
                        
                            className={`carousel-item ${index === 0 ? 'active' : ''}`}
                        >

                            <Link to={`verMas/${i.id}`}>
                                <ShowProduct item={i} />
                            </Link>


                        </div>
                    ))}


                </div>
                <button className="carousel-control-prev d-flex justify-content-start p-2" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon rounded bg-primary " aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next d-flex justify-content-end p-2" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon rounded bg-primary " aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}
