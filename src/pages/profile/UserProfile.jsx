import React, { useEffect, useState } from 'react'
import { LoaderSpinner } from '../../components/common/Loader'
import { useFetch } from '../../hooks/useFetch'


export const UserProfile = () => {

  const { data: profileData, loading: loadingProfile } = useFetch('http://localhost:8080/api/userProfile')

  const [user, setUser] = useState([])
  const [cargando, setcargando] = useState(true)


  useEffect(() => {

    console.log('userProfile escucho cambios')
    
    if (profileData ) {
      setUser(profileData )
      setcargando(loadingProfile)

    }

  }, [profileData , loadingProfile])


  if (cargando) {
    return <div className='container'>

      <LoaderSpinner />

    </div>


  }

  console.log('user es: ', user, 'y loading es: ', loadingProfile)

  return (
    <div className='container'>

      <strong>{user.fistName} {user.lastName}</strong>

      <p>Email: {user.email}</p>
      <p>Edad: {user.age}</p>
      <p>Tipo de rol: {user.role}</p>





    </div>
  )
}
