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

    const URL = 'http://localhost:8080/api/carts/preOrderProduct'

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



  console.log('que es first', first)

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


            <div className="carousel-container">
              <SwipperCarousel productos={first} cardItem={ProductCard} />
            </div>

            <div className="container ">

              <div className="row start pb-3 p-0">


                <div className="col-12 star-product mb-5 mt-3 p-0">

                  <img src="https://www.lg.com/content/dam/channel/wcms/pe/images/monitores/45gr75dc-b_awf_espr_pe_c/features/ultragear-45gr75dc-01-ultragear-d.jpg" alt="" />
                </div>



                <section className='col-md-4 filter-one mb-3'>
                  <img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/01/ps5-2930282.jpg?tf=1200x" alt="" />
                </section>

                <section className='col-md-8 filter-two mb-3'>
                  <img src="https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/wallpapers/rtx-3070/3070-header-r2.png" alt="" />
                </section>


              </div>




              <div className='products-container
                 box-container'>
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
