import React, { useState } from 'react';
import './cartItems.css';
import { PreOrderComponent } from '../common/PreOrderComponent';

export const CartItems = ({ productos, cartActions }) => {
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
      <div className="cartItems-product-card" key={p.product._id}>
        <div className="cartItems-items-containers">
          <aside className="cartItems-main-images">
            <img id="blue" className="blue active" src={p.product.thumbnail} alt="blue" />
          </aside>

          <aside className="cartItems-details">
            <div className="descriptions">
              <div className="cartItems-product-detail">
                <span className="cartItems-product_name">{p.product.title}</span>

              
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

              <div className="cartItems-actions">
                <button onClick={() => handleRemove(p.product._id)}>
                  {loadingProductId === p.product._id ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </div>

            <div className="price-container">
              <div className="cartItems-color-price">
                <div className="price">
                  <span className="price_nu">${(p.product.price * p.quantity).toLocaleString('es-ES')}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    ))
  );
};
