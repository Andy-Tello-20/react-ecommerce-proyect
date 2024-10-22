import React from 'react'
import './shopping.css'
import { ShoopingData } from '../../hooks/getTicket'
import { SpinnerContainer } from '../../components/common/SpinnerContainer'
import { LoaderSpinner } from '../../components/common/Loader'

export const Shopping = () => {

    const { dataTicket, loading } = ShoopingData()


    if (loading) {

        return <SpinnerContainer Component={LoaderSpinner} />

    }

    const formatPurchaseDate = (datetime) => {
        const date = new Date(datetime)
        return date.toLocaleString() //👉 Se formatea la fecha de la DB
      };

    return (


        <div className='container'>
        { dataTicket.length > 0 && dataTicket.map((i) => (
            <div className="receipt__body row mb-4" key={i._id}>
                <div className="left col-md-6">
                    <div className="left__name">
                        <span>Date</span>
                        <span>{formatPurchaseDate(i.purchase_datetime)}</span>
                    </div>
                    <div className="left__items">
                        <span>Your Tickets</span>
                        <table className="tickets">
                            <tbody>
                                {i.products.map((td, index) => (
                                    <tr key={index}>
                                        <td className="type">{td.title}</td>
                                        <td className="price">{td.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="left__total">
                        <span>Price: <b>${(i.amount).toLocaleString('es-ES')}</b></span>
                        <span>Payment: <b>Credit Card</b></span>
                    </div>
                    <div className="left__notice">
                        <span>
                        Referencia de compra: <b>{i.code}</b>.
                        </span>
                    </div>
                </div>
                <div className="right col-md-6">
                    <div className="right__poster" id="John-Wick-Chapter-2"></div>
                    <div className="right__title">
                        <span>John Wick: Chapter 2</span>
                    </div>
                    <div className="right__time">
                        <span>Time</span>
                        <span>9:37 PM</span>
                    </div>
                    <div className="right__cinema">
                        <span>Cinema Hall</span>
                        <span>03</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
    
    )
}
