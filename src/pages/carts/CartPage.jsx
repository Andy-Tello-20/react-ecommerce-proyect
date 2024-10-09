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



export const CartPage = () => {


  const { data: cartData, error: errorCart, loading: loadingCart } = useFetch('http://localhost:8080/api/userCart')


  const { fetchAdd } = AddProductToCart()

  const { data: newData, fetchDelete } = DeleteProductToCart();

  const [copiProducts, setcopiProducts] = useState([])
  // console.log('loadingCart: ', loadingCart)

  useEffect(() => {

    // console.log('useEffect escucho cambios')

    if (cartData) {
      const dataProducts = cartData.cart.products.map(item => ({
        product: item.product,
        quantity: item.quantity
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

    return <SpinnerContainer Component={LoaderSpinner}/>
  
   


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


  const handleIncrease = async (productId, quantity) => {
    const newQuantity = quantity + 1;
    await fetchAdd(productId, newQuantity);


    const updatedCart = updateProductQuantity(copiProducts, productId, newQuantity);
    setcopiProducts(updatedCart);


  };

  const handleDecrease = async (productId, quantity) => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      await fetchAdd(productId, newQuantity);

      const updatedCart = updateProductQuantity(copiProducts, productId, newQuantity);
      setcopiProducts(updatedCart);

    }
  };

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
                    <div className="col align-self-center text-right text-muted">3 items</div>
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
                  <div className="col col-style">ITEMS 3</div>
                  <div className="col text-right">&euro; 132.00</div>
                </div>
                <form>
                  <p>SHIPPING</p>
                  <select className='shopping-select'><option className="text-muted">Standard-Delivery- &euro;5.00</option></select>
                  <p>GIVE CODE</p>
                  <input className='shopping-input' id="code" placeholder="Enter your code" />
                </form>
                <div className="row row-style">
                  <div className="col">TOTAL PRICE</div>
                  <div className="col text-right">&euro; 137.00</div>
                </div>
                <button className="shopping-btn">CHECKOUT</button>
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

