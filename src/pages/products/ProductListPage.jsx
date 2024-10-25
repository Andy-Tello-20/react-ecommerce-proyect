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
import dataImages from '../../data/images.json'


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



   const productCards= first.map((p) => (
    <ProductCard
      productos={p}
      key={p._id}
    />
  ))

  const imagesLinks = dataImages.map((i) => (
    <img className={'imgLinks'} src={i.url} alt={i.title} key={i.id}/>
  ))

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


            <div className="carousel-container mb-4 mb-sm-5">
              <SwipperCarousel productos={imagesLinks} slides={1} autoplay={true} breakpoint={false} />
            </div>

{/* ver si conviene o no la clase container */}
            <div className="container class-container-home">

              <div className="row start pb-3 p-0">

                <section className='col-md-8 filter-two mb-3'>

                  <h2 className='swipper-products-title'>Ofertas</h2>
            
                  <SwipperCarousel  productos={productCards} space={15} autoplay={false} pagination={false}/>

                </section>

              <section className='col-md-4 filter-one mb-3 fade-in '>
                  <img src="https://st2.depositphotos.com/4960805/43031/i/450/depositphotos_430310836-stock-photo-playstation-dual-sense-controller-sao.jpg" alt="" />

                  <h4 className='text-overlay onSaleTitle responsive-font'>Encuentra aqui el mejor precio</h4>
                </section>


                <div className="col-12 star-product mb-5 mt-3 p-0 fade-in ">

                  <img src="https://www.shutterstock.com/shutterstock/videos/1069134196/thumb/1.jpg?ip=x480" alt="" />
                  <div className='overlay-announcement '></div>

                  <h3 className='text-overlay text-announcement responsive-font'>Muy pronto, tu consola preferida
                  </h3>
        

                  {/* <p className=' text-overlay text-announcement-p ' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dignissimos fugit incidunt asperiores iure consequatur iusto .</p> */}
                </div>

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
