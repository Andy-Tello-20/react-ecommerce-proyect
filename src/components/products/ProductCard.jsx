// Tarjeta de producto reutilizable
import './Product.css';


import { Link } from "react-router-dom";

export const ProductCard = ({ productos, listActions }) => {
    // console.log('productos desde ProductCard: ', productos);


    const { thumbnail, title, price, id } = productos

    return (
        <Link className='product-link hover-effect ' to={`verMas/${id}`} >
            <div className="product-card ">

                {listActions && (
                    <div className="logo-cart">

                        <img src="" className="card-img-top" alt="logo" />
                        <i className='bx bx-shopping-bag'></i>

                    </div>
                )}


                <div className="main-images">
                    <img className="blue active" src={thumbnail} alt="blue" />
                </div>

                <div className="product-detail">
                    <span className="product_name" >{title}</span>

                    {/* <p>{description}</p> */}


                </div>


                <div className="stars">
                        <i className='bx bxs-star' ></i>
                        <i className='bx bxs-star' ></i>
                        <i className='bx bxs-star' ></i>
                        <i className='bx bxs-star' ></i>
                        <i className='bx bx-star' ></i>
                    </div>

                <div className='color-price'>

                    <div className='card-price'>
                        <span className='price_nu'>$ {price.toLocaleString('es-ES')}</span>
                    </div>

                </div>


            

            </div>
        </Link>

    );
};
