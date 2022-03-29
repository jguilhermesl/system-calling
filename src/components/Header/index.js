import { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom'

import './style.css'
import avatar from '../../assets/avatar.png'
import { AuthContext } from '../../contexts/auth'
import { FiHome, FiUser, FiSettings, FiMenu } from "react-icons/fi";

export default function Header() {
    const { user } = useContext(AuthContext)

    return (
        <>
            <div className='sidebar' >
                <ul>
                    <div className="imageWrapperHeader">
                        <img src={user.avatarUrl === null ? avatar : user.avatarUrl} />
                    </div>
                    <div className="iconsList">
                        <Link to="/dashboard" className="linkItemHeader"> <li><FiHome className="iconHeader" /> Chamados</li> </Link>
                        <Link to="/customers" className="linkItemHeader"> <li><FiUser className="iconHeader" /> Clientes</li> </Link>
                        <Link to="/profile" className="linkItemHeader"> <li><FiSettings className="iconHeader" /> Minha conta</li> </Link>
                    </div>
                </ul>
            </div>
        </>

    )
}