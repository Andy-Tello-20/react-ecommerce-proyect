import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip'
import './cartItems2.css'

import { PreOrderComponent } from '../common/PreOrderComponent';
import { Link } from 'react-router-dom';

export const CartItems2 = ({ productos, cartActions }) => {
    const [loadingProductId, setLoadingProductId] = useState(null); // Estado para controlar qué producto está cargando

    const handleIncrease = async (productId, quantity) => {
        setLoadingProductId(productId); // Inicia el loader para este producto
        await cartActions.onIncrease(productId, quantity);
        setLoadingProductId(null); // Detiene el loader después de la acción
    };

    const handleDecrease = async (productId, quantity) => {
        setLoadingProductId(productId); // Inicia el loader para este producto
        await cartActions.onDecrease(productId, quantity);
        setLoadingProductId(null); // Detiene el loader después de la acción
    };

    const handleRemove = async (productId) => {
        setLoadingProductId(productId); // Inicia el loader para este producto
        await cartActions.onRemove(productId);
        setLoadingProductId(null); // Detiene el loader después de la acción
    };

    return (
        productos && productos.map((p) => (


            <div className="row border-top border-bottom" key={p.product._id}>
                <div className="row main align-items-center">
                    <div className={p.product.stock < p.quantity ? "item-disable col-2" : "col-2"}>
                        <Link to={`/verMas/${p.product.id}`} >  <img className="img-fluid" src={p.product.thumbnail} alt='' /></Link>
                    </div>
                    <div className={p.product.stock < p.quantity ? "item-disable col" : "col"}>
                        {/* <div className="row text-muted">Shirt</div> */}
                        <div className="row">{p.product.title}</div>
                    </div>
                    <div className="col">




                        <PreOrderComponent
                            productQuantity={p.quantity}
                            loader={loadingProductId === p.product._id} // Solo muestra o se pasa la prop loader en el producto actual
                            cartActions={{
                                onIncrease: () => handleIncrease(p.product._id, p.quantity),
                                onDecrease: () => handleDecrease(p.product._id, p.quantity),
                            }}
                            idProduct={p.product._id}
                        />

                    </div>
                    <div className="col col-price pf-container">
                        <div className={p.product.stock < p.quantity ? "item-disable" : undefined}>
                            ${(p.product.price * p.quantity).toLocaleString('es-ES')}
                        </div>

                        {
                            p.product.stock < p.quantity

                            &&

                            <li className='bx bx-info-circle btn-info' data-tooltip-id={p.product._id}
                                data-tooltip-content="Este producto no tiene suficiente stock"
                                data-tooltip-place="top">

                            </li>
                        }


                        {p.product.price < p.lastPrice ? (

                            <>
                                <del className='lastPrice'>${(p.lastPrice).toLocaleString('es-ES')}</del>

                                <li className='bx bx-info-circle btn-info' data-tooltip-id={p.product._id}
                                    data-tooltip-content="Este producto ha reducido su precio recientemente."
                                    data-tooltip-place="top">

                                </li>
                            </>


                        ) : p.product.price > p.lastPrice ? (

                            <li clasName='bx bx-info-circle btn-info' data-tooltip-id={p.product._id}
                                data-tooltip-content="Este producto ha aumentó su precio recientemente."
                                data-tooltip-place="top">

                            </li>
                        ) : null}

                        <Tooltip id={p.product._id} />
                        <span className="close" onClick={() => handleRemove(p.product._id)}>&#10005;</span>
                    </div>
                </div>

            </div>
        ))
    );
};
