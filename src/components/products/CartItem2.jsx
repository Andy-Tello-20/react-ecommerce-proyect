import React, { useState } from 'react';
// import './cartItems.css';
import { PreOrderComponent } from '../common/PreOrderComponent';

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
                    <div className="col-2"><img className="img-fluid" src={p.product.thumbnail} alt='' /></div>
                    <div className="col">
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
                        {/* <a href="#">-</a>
                        <a href="#" className="border">1</a>
                        <a href="#">+</a> */}
                    </div>
                    <div className="col col-price">${(p.product.price * p.quantity).toLocaleString('es-ES')} 
                        <span className="close" onClick={() => handleRemove(p.product._id)}>&#10005;</span></div>
                </div>
            </div>
        ))
    );
};
