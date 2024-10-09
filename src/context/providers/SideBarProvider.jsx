
import { useState } from 'react'
import { SideBarContext } from '../myContexts/sideBarContext'


export const SideBarProvider = ({children}) => {


const [toOpen, setToOpen] = useState(false)


const openSideBar = () => {
    setToOpen(!toOpen)
}

  return (
    <SideBarContext.Provider value={{toOpen, openSideBar}}>
        {children}
    </SideBarContext.Provider>
  )
}
