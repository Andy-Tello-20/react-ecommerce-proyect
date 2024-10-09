// Formulario de registro

import React, { useContext } from 'react'
import useSubmitForm from '../../services/authService'
import { Link } from 'react-router-dom'
import { loginContext } from '../../context/myContexts/loginContext'



export const RegisterForm = () => {
    const Url = 'http://localhost:8080/api/sessions/register'
    const Path = '/login'

    const { register, handleSubmit, Submit } = useSubmitForm(Url, Path);
    const { togleRegister } = useContext(loginContext)


    return (
        <>
           
           <i className="uil uil-times form_close" onClick={togleRegister}></i>
            <div className="form signup_form">
                <form onSubmit={handleSubmit(Submit)}>
                    <h2>Registro</h2>

                    <div className="input_box input_name">
                        <input {...register('first_name', { required: 'First name is required' })} type="text" className="form-control" id="validationCustom01" placeholder="Ingresa tu nombre" ></input>

                        <input {...register('last_name', { required: 'Last name is required' })} type="text" className="form-control" id="validationCustom02" placeholder='Ingresa tu Apellido' required></input>
                    </div>

                <div className="input_box">
                <input {...register('age', { required: 'Age is required' })} type="number" className="form-control" id="validationCustom03" placeholder='Ingresa tu edad' required></input>
                </div>

                    <div className="input_box">
                    <input {...register('email', { required: 'email is required' })} type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" placeholder='Ingresa un email' required ></input>
                        <i className="uil uil-envelope-alt email"></i>
                    </div>
                    <div className="input_box">
                    <input {...register('password', { required: 'password is required' })} type="password" className="form-control" id="validationCustomPassword" placeholder='Ingresa una Contraseña' required></input>
                        <i className="uil uil-lock password"></i>
                        <i className="uil uil-eye-slash pw_hide"></i>
                    </div>
                  

                    <button className="button" type="submit">Registrate</button>

                    <div className="login_signup">Ya tienes una cuenta? <Link to="/login" >Ingresa aqui</Link></div>
                </form>
            </div>
        </>
    )
}
