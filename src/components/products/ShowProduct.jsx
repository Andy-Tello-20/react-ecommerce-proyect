import React from 'react'
import "./showProduct.css"


export const ShowProduct = ({ item, button, listActions }) => {

  // console.log('item desde showProduct: ', item)

  const { title, description, thumbnail, price, _id } = item

  // console.log('title: ', title)

  return (

    <>

      <div className="show-product-card" >


        <div className="show-items-containers">

          <aside className="show-details">

           { button && <div className="show-logo-cart">
              <img src="" alt="logo" />
              <i className='bx bx-shopping-bag'></i>
            </div>}

            <div className="show-product-detail">
              <span className="show-product_name">{title}</span>
              <p>{description}</p>
              <div className="stars">
                <i className='bx bxs-star'></i>
                <i className='bx bxs-star'></i>
                <i className='bx bxs-star'></i>
                <i className='bx bxs-star'></i>
                <i className='bx bx-star'></i>
              </div>
            </div>


          { button && <div className="show-color-price">
              <div className="price">
                <span className="price_nu">${price},00</span>
                {/* <span className="price_letter">Nine dollar only</span>  */}
              </div>
            </div>}



            {button &&
              <div className="button btn-container">
                <div className="show-button">
                  <div className="show-button-layer"></div>
                  <button onClick={() => listActions.onAddProduct(_id)} className='btn-add'>
                    Agregar
                  </button>

                </div>
              </div>
            }


          </aside>

          <aside className="show-main-images">
            <img id="blue" className="blue active" src={thumbnail} alt="blue" />

          </aside>

        </div>





      </div>




    </>


    
    
    

  )
}
