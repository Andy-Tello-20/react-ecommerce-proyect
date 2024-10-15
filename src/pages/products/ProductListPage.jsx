import { useState, useEffect } from 'react';
import { ProductCard } from '../../components/products/ProductCard';
import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../helpers/itemsById';
import { AddProductToCart } from '../../hooks/addProduct';
import './ProductPage.css'
import { LoaderSpinner } from '../../components/common/Loader';
import { SwipperCarousel } from '../../components/common/SwipperCarousel';
import { PreOrder } from '../../components/products/PreOrder';
import { SpinnerContainer } from '../../components/common/SpinnerContainer';


export const ProductListPage = () => {
  const { data: productsData, error: errorProducts, loading: loadingProducts } = useFetch('http://localhost:8080/api/products');

  //Al inicio "first" será un array vacio porque inicialmente "products" será undefined o null porque useFetch es un hook asíncrono que aún no habrá terminado de obtener los datos cuando el componente se monte por primera vez

  const [first, setFirst] = useState([]);
  const { id } = useParams();


  const { fetchAdd } = AddProductToCart()

  const handleAdd = (productId, quantity) => {
    console.log(`Producto para agregar con ID: ${productId}`)

    const URL= 'http://localhost:8080/api/carts/preOrderProduct'

    fetchAdd(productId, quantity, URL)
  }


  useEffect(() => {
    if (productsData) {
      if (id) {
        setFirst(getProduct(productsData, id));
      } else {
        setFirst(productsData);
      }
    }
  }, [productsData, id]);



  // console.log('que es first', first)

  if (loadingProducts) {
    return <SpinnerContainer Component={LoaderSpinner} />

  }

  return (
    errorProducts ? (
      <div>
        <strong>Error: {errorProducts}</strong>
      </div>
    )
      :
      (
        first.length > 1 ? (
          <>

            <SwipperCarousel productos={first} />

            <div className="container ">
              <div className='box-container'>
                {first.map((p) => (
                  <ProductCard
                    productos={p}
                    key={p._id}
                  />
                ))}
              </div>
            </div>
          </>
        ) : first.length === 1 ?


          <PreOrder item={first[0]} button={true} listActions={{ onAddProduct: (id, quantity) => handleAdd(id, quantity) }} />




          : (
            <p>No hay productos disponibles.</p>
          )
      )
  );

};
