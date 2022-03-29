import React from 'react';
import { Link } from 'react-router-dom'
import './style.css'

import imgWoman from '../../assets/womantalk.png'

function Home() {
    return (
        <div className="containerHome">
            <img src={imgWoman} alt="Imagem" />
            <div className="info-home">
                <div className="textsHome">
                    <h1>Vamos trabalhar!</h1>
                    <p> Lorem ipsum dolor sit amet, consceteur adispica elit. Id otenti sdasl tellus vetibulasad dictum ajsad x auig juste casue augue, cras asc.</p>
                </div>
                <div className="buttonsHome">
                    <Link to="/login" className="buttonLinkHome">Sign in</Link>
                    <Link to="/register" className="buttonLinkHomeRegister">Register</Link>
                </div>
            </div>

        </div>
    )
}

export default Home;

