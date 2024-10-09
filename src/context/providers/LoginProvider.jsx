import React, { useState } from 'react'
import { loginContext } from '../myContexts/loginContext'


export const LoginProvider = ({children}) => {

    // console.log('se ejecuto LoginProvider')

    const [visibleForm, setVisibleForm] = useState(false)
    const [visibleFormRegister, setVisibleFormRegister] =useState(false)

    const togleForm = () => {
        setVisibleForm(!visibleForm)
    }

    const togleRegister = () => {
        setVisibleFormRegister(!visibleFormRegister)
    }

  
    return (
        <loginContext.Provider value={{visibleForm,togleForm,visibleFormRegister,togleRegister}}>
            {children} {/* Renderiza los hijos correctamente */}
        </loginContext.Provider>
    );
  
}
