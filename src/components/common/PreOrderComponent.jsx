import React from 'react'
import './preOrder.css'
import { LoaderSpinner } from './Loader'

export const PreOrderComponent = ({ productQuantity, actions, cartActions, idProduct, loader }) => {

  return (
    <div className="increment-decrement ">
  
      {loader ? (
        <div className="loader-spinner"><LoaderSpinner size='28' color='#7cbf1e'/></div> // Aquí podrías tener un spinner visual o texto
      ) : (
        <>
          {actions ? (
            <button
              type="button"
              className=" btn-decrement"
              onClick={actions.removeUnit}
            >
              -
            </button>
          ) : cartActions ? (
            <button
              type="button"
              className=" btn-decrement"
              onClick={() => cartActions.onDecrease(idProduct, productQuantity)}
            >
              -
            </button>
          ) : null}

          <span className="quantite">{productQuantity}</span>

          {actions ? (
            <button
              type="button"
              className=" btn-increment"
              onClick={actions.addUnit}
            >
              +
            </button>
          ) : cartActions ? (
            <button
              type="button"
              className=" btn-increment"
              onClick={() => cartActions.onIncrease(idProduct, productQuantity)}
            >
              +
            </button>
          ) : null}
        </>
      )}
    </div>
  )
}
