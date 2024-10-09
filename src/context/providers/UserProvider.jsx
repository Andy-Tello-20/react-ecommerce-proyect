import React from 'react'
import {userContext} from '../myComponents/userContext'
import { useFetch } from '../../hooks/useFetch'


export const UserProvider = ({children}) => {


    const { data: profileData, loading: loadingProfile } = useFetch('http://localhost:8080/api/userProfile')

  return (
    <div>UserProvider</div>
  )
}
