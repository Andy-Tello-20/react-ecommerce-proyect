import React, { useState } from 'react'
import './preOrder.css'
import { PreOrderComponent } from '../common/PreOrderComponent'


export const PreOrder = ({ item, listActions }) => {



    const [quantity, setQuantity] = useState(1);

    const addUnit = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const removeUnit = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1)
        }

    }


    const { title, description, thumbnail, price, _id,stock } = item

    return (
        <div className="card-show-container">
            <section className="image-container col-lg-7 col-md-7 col-sm-6 p-2">
                <img src={thumbnail} alt="" />
            </section>
            {/* <hr className="separator" /> */}
            <section className="data-container col-md-5">
                <h1 className="product-title">{title}</h1>
                <div className="stars-valuation">
                        <i className='bx bxs-star' ></i>
                        <i className='bx bxs-star' ></i>
                        <i className='bx bxs-star' ></i>
                        <i className='bx bxs-star' ></i>
                        <i className='bx bx-star' ></i>
                    </div>
                <p className='price-info'>Stock: {stock}</p>

                 <div className="price-info-container">
                    <p className='price-info'>Precio especial</p>
                    <p className="product-price">${price.toLocaleString('es-ES')}</p>
                 </div>

                

                <div className="compra-detalle">

                    <div className="quantity-order">
                        <p>Cantidad:</p>
                        <PreOrderComponent productQuantity={quantity} actions={{addUnit,removeUnit}}/>
                    </div>
                    

                    <button className="btn-add-product" onClick={() => listActions.onAddProduct(_id, quantity)}>Agregar al carrito</button>
                </div>
            </section>


        </div>
    )
}
