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
        <div className="row card-show-container">
            <section className="image-container col-sm-6 p-2">
                <img src={thumbnail} alt="" />
            </section>
            {/* <hr className="separator" /> */}
            <section className="data-container col-sm-6">
                <h1 className="product-title">{title}</h1>

                <div className="row price-info-container">
                    <p className="col-md-6 product-price">${price.toLocaleString('es-ES')}</p>
                 </div>
          
                <p className='price-info'>Disponible en tienda y listo para enviar</p>


                <div className="compra-detalle row">

                    <div className="quantity-order col-sm-6 mb-3">
                        <PreOrderComponent productQuantity={quantity} actions={{addUnit,removeUnit}}/>
                    </div>
                    

                    <button className="btn-add-product hover-effect  col-sm-6" onClick={() => listActions.onAddProduct(_id, quantity)}>Agregar al carrito</button>


                </div>

                <p className='pre-description'>{description}</p>
            </section>


        </div>
    )
}
