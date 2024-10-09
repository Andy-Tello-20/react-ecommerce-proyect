import React, { useEffect } from 'react'
import { lineSpinner } from 'ldrs'


export const LoaderSpinner = () => {

  useEffect(() => {
    lineSpinner.register();
  }, []);


  return (
  
      <l-line-spinner
        size="65"
        stroke="6"
        speed="1.2"
        color="#6298DF"
      ></l-line-spinner>


  )
}
