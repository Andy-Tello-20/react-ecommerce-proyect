import React from 'react'
import './spinnerContainer.css'

export const SpinnerContainer = ({Component}) => {
  return (
    <div className='spinner-container'><Component/></div>
  )
}
