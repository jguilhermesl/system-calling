import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import './style.css'
function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [nome, setNome] = useState('')
    const [phone, setPhone] = useState('')

    const { signUp, loadingAuth } = useContext(AuthContext)

    function handleSubmit(e) {
        e.preventDefault();

        if (nome !== '' && email !== '' && phone !== '' && password !== '') {
            signUp(email, nome, phone, password)
        }
    }




    return (
        <div className="containerRegister">
            <div className="textsRegister">
                <h1>Vamos te cadastrar!</h1>
                <p>Olá, usuário. Você terá uma brilhante jornada.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputsRegister">
                    <input className="input" placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)} />
                    <input className="input" placeholder='Telefone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <input className="input" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="input" type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="buttonRegister" type="submit">{loadingAuth ? <div className="loading"></div> : 'Cadastrar'}</button>
            </form>
            <div className="dontHaveAccount">
                <p>Já tem uma conta? Faça <Link to="/login" className="spanLogin">Login</Link></p>.
            </div>
        </div >
    )
}

export default Register;