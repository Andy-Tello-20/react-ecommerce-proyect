// Formulario de inicio de sesión


import './Auth.css'
import useSubmitForm from '../../services/authService'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { loginContext } from '../../context/myContexts/loginContext'
import { LoaderSpinner } from '../common/Loader'






export const LoginForm = () => {

    const Url = 'http://localhost:8080/api/sessions/login'
    

    const { register, handleSubmit, Submit, loading } = useSubmitForm(Url);
    const { togleForm } = useContext(loginContext)



    return (
        <>
            <i className="uil uil-times form_close" onClick={togleForm}></i>
            <div className="form login_form">
                <form onSubmit={handleSubmit(Submit)}>
                    <h2>Login</h2>

                    <div className="input_box">
                        <input {...register('email', { required: 'email is required' })} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email" autoComplete='userName'></input>
                        <i className="uil uil-envelope-alt email"></i>
                    </div>
                    <div className="input_box">
                        <input {...register('password', { required: 'password is required' })} type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter your password" autoComplete="current-password"></input>
                        <i className="uil uil-lock password"></i>
                        <i className="uil uil-eye-slash pw_hide"></i>
                    </div>

                    <div className="option_field">
                        <span className="checkbox">
                            <input type="checkbox" id="check" />
                            <label htmlFor="check">Remember me</label>
                        </span>
                        <Link to="#" className="forgot_pw">Forgot password?</Link>
                    </div>

                    <button className="button">Ingresar</button>

                    <div className="login_signup">No tienes una cuenta? <Link to="/register" id="signup">Registrate</Link></div>


                    {loading &&

                        <div className='loaderContainer'>

                            <LoaderSpinner />

                        </div>

                    }


                </form>

            </div>




        </>

    )
}



