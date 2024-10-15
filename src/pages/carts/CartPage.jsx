import React from 'react'
import { useState, useEffect } from 'react';
import { DeleteProductToCart } from '../../hooks/deleteProductToCart';
import { NavLink } from 'react-router-dom';
import { LoaderSpinner } from '../../components/common/Loader';
import { AddProductToCart } from '../../hooks/addProduct';
import { useFetch } from '../../hooks/useFetch';
import { CartItems2 } from '../../components/products/CartItem2';
import './CartPage.css'
import { SpinnerContainer } from '../../components/common/SpinnerContainer';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('APP_USR-90de6bf5-3d87-4363-9799-51af21718e99')



export const CartPage = () => {




  const { data: cartData, error: errorCart, loading: loadingCart } = useFetch('http://localhost:8080/api/userCart')


  console.log('data es: ', cartData)

  const { fetchAdd } = AddProductToCart()

  const { data: newData, fetchDelete } = DeleteProductToCart();

  const [preferenceId, setPreferenceId] = useState(null)
  const [copiProducts, setcopiProducts] = useState([])
  // console.log('loadingCart: ', loadingCart)

  useEffect(() => {

    // console.log('useEffect escucho cambios')

    if (cartData) {
      const dataProducts = cartData.products.map(item => ({
        product: item.product,
        quantity: item.quantity,
        lastPrice: item.lastPrice
      }));

      console.log('dataProducts es: ', dataProducts)

      setcopiProducts(dataProducts)
    }

  }, [cartData])


  useEffect(() => {

    setcopiProducts(newData); // Actualizamos el estado con los productos filtrados


  }, [newData])

  // console.log('ahora copiProducts es: ', copiProducts)





  if (loadingCart) {

    return <SpinnerContainer Component={LoaderSpinner} />




  }

  const handleRemove = async (productId) => {

    await fetchDelete(copiProducts, productId)

  };


  const updateProductQuantity = (arr, id, newQuantity) => {
    return arr.map(product => {
      if (product.product._id === id) {
        // Modificamos el producto que coincide con el id
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
  };

  const URL = 'http://localhost:8080/api/carts/product'
  const handleIncrease = async (productId, quantity) => {
    const newQuantity = quantity + 1;
    await fetchAdd(productId, newQuantity, URL);


    const updatedCart = updateProductQuantity(copiProducts, productId, newQuantity);
    setcopiProducts(updatedCart);


  };

  const handleDecrease = async (productId, quantity) => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      await fetchAdd(productId, newQuantity, URL);

      const updatedCart = updateProductQuantity(copiProducts, productId, newQuantity);
      setcopiProducts(updatedCart);

    }
  };




  const sumatory = copiProducts.reduce((acumulador, valorActual) => {

    let suma = acumulador + (valorActual.product.price * valorActual.quantity)
    return suma
  }, 0)


  const fetchMercadoPago = async () => {

    const response = await fetch(`http://localhost:8080/api/create_preference`, {
      method: 'POST',
      credentials: 'include',
    })


    if (response.ok) {
      const result = await response.json()
      console.log('response es: ', result)

      setPreferenceId(result)
    }

  }



  return (

    errorCart ? (
      <div>
        <strong>Error: {errorCart}</strong>
      </div>
    ) : (
      copiProducts.length > 0 ? (
        <div className='shopping-body mt-4'>

          <div className="card">
            <div className="row">
              <div className="col-md-8 cart">
                <div className="title-cart">

                  <div className="row">
                    <div className="col"><h4><b>Shopping Cart</b></h4></div>
                    <div className="col align-self-center text-right text-muted">{copiProducts.length} items</div>
                  </div>


                </div>
                <CartItems2 productos={copiProducts} cartActions={{
                  onRemove: (id) => handleRemove(id),
                  onIncrease: (id, q) => handleIncrease(id, q),
                  onDecrease: (id, q) => handleDecrease(id, q)

                }} />
              </div>

              <div className="col-md-4 summary">
                <div><h5><b>Summary</b></h5></div>
                <hr />
                <div className="row">

                  {copiProducts.length > 1 ? <div className="col col-style">ITEMS {copiProducts.length}</div> : <div className="col col-style">ITEM {copiProducts.length}</div>}

                  <div className="col text-right">$ {(sumatory).toLocaleString('es-ES')}</div>
                </div>
                <form>
                  <p>SHIPPING</p>
                  <select className='shopping-select'><option className="text-muted">Standard-Delivery- &euro;5.00</option></select>
                  <p>GIVE CODE</p>
                  <input className='shopping-input' id="code" placeholder="Enter your code" />
                </form>
                <div className="row row-style">
                  <div className="col">TOTAL PRICE</div>
                  <div className="col text-right total-price">$ {(sumatory).toLocaleString('es-ES')}</div>
                </div>

                <div className="btn-check-container">
                  <button className="shopping-btn" onClick={fetchMercadoPago}>CHECKOUT</button>

                  {preferenceId &&
                    <Wallet className="shopping-btn" initialization={{ preferenceId }} />
                  }
                </div>

              </div>
            </div>

          </div>


        </div>
      ) : (
        <>
          <h4 className='mb-4'>Tu carrito esta vacio </h4>
          <button className='btn btn-primary'><NavLink className="nav-link " aria-current="page" to="/">Volver a Inicio</NavLink></button>
        </>

      )
    )
  )
}

