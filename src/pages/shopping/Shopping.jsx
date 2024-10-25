import React from 'react'
import './shopping.css'
import { ShoopingData } from '../../hooks/getTicket'
import { SpinnerContainer } from '../../components/common/SpinnerContainer'
import { LoaderSpinner } from '../../components/common/Loader'
import { SwipperCarousel } from '../../components/common/SwipperCarousel'


export const Shopping = () => {

    const { dataTicket, loading } = ShoopingData()


    if (loading) {

        return <SpinnerContainer Component={LoaderSpinner} />

    }

    const thumbnails = (arr, imgName) => { 
        console.log('que es arr: ', arr)
        
        const newArr = arr.map((i, index) => (
            <img className={imgName} src={i.product.thumbnail} alt="" key={index} />
        ))
        
        return newArr
    };
    


    const formatPurchaseDate = (datetime) => {
        const date = new Date(datetime)
        const options = { day: 'numeric', month: 'long' }
        const formattedDate = date.toLocaleDateString('es-ES', options) //👉 Se formatea la fecha de la DB
        return formattedDate
    };

    const lowerTitle = (title) => {
        const newTitle = title.toLowerCase()
        return newTitle
    }

    return (


        <div className='container py-4'>
            {dataTicket.length > 0 && dataTicket.map((i) => (
                <div className="receipt__body row mb-4" key={i._id}>
                    <div className="left__name">
                        <span >{formatPurchaseDate(i.purchase_datetime)}</span>
                    </div>
                    <div className="left col-md-6">
                        <div className="left__items">
                            <span>Your Ticket</span>
                            <div className="tickets">
                                <ul>
                                    {i.products.map((td, index) => (
                                        <li key={index}>{`${td.title} (x ${td.quantity}u)  $${(td.price).toLocaleString('es-ES')}`}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="left__total">
                            <span>TOTAL: <b>${(i.amount).toLocaleString('es-ES')}</b></span>
                            <span>Payment: <b>Credit Card</b></span>
                        </div>
                        <div className="left__notice">
                            <span>
                            Purchase code: <b>{i.code}</b>.
                            </span>
                        </div>
                    </div>
                    <div className="right col-md-6 py-2">
                        <div className="right__poster py-3">

                                    {i.products.length >= 2 ? 
                                    <SwipperCarousel productos={thumbnails(i.products)} autoplay={false} breakpoint={false} slides={1} pagination={false}/> 
                                    : thumbnails(i.products, 'img-only') }
                            

                        </div>
                        
                    </div>
                </div>
            ))}
        </div>

    )
}
