import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import './style.css'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const { loadingAuth, logIn } = useContext(AuthContext)

    function handleSubmit(e){
        e.preventDefault();
        logIn(email, password)
    }

    return (
        <div>
            <div className="containerLogin">
                <div className="textsLogin">
                    <h1>Vamos logar!</h1>
                    <p>Bem vindo de volta.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="inputsLogin">
                        <input className="input" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className="input" placeholder='Senha' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <p className="forgotPassword">Forgot Password?</p>
                    <button type="submit" className="buttonLogIn">{loadingAuth ? <div className="loading"></div> : 'Log In'} </button>
                </form>

                <div className="lineOr">
                    <span>or</span>
                </div>

                <div className="dontHaveAccount">
                    <p>Não tem uma conta? <Link to="/register" className="spanRegister">Registre-se agora.</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login;