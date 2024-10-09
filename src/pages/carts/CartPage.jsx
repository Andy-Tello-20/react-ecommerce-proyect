import React from 'react'
import { useState, useEffect } from 'react';
import { DeleteProductToCart } from '../../hooks/deleteProductToCart';
import { NavLink } from 'react-router-dom';
import { CartItems } from '../../components/products/CartItems';
import { LoaderSpinner } from '../../components/common/Loader';
import { AddProductToCart } from '../../hooks/addProduct';
import { useFetch } from '../../hooks/useFetch';



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
    return <LoaderSpinner />

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
        <div className='container '>


          <CartItems productos={copiProducts}  cartActions={{
            onRemove: (id) => handleRemove(id),
            onIncrease: (id, q) => handleIncrease(id, q),
            onDecrease: (id, q) => handleDecrease(id, q)

          }} />
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

