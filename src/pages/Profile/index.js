import { useState, useContext } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import './style.css'
import avatar from '../../assets/avatar.png'

import { AuthContext } from '../../contexts/auth'

import { FiSettings, FiUpload, FiPower } from 'react-icons/fi'
export default function Profile() {
    const { user, signOut } = useContext(AuthContext)

    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [phone, setPhone] = useState(user && user.phone)

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Minha conta" >
                    <FiSettings />
                </Title>

                <div className="container">
                    <form className="formProfile">
                        <div className="photoProfile">
                            <input type="file" accept="image/*" />
                            {avatarUrl === null ?
                                <img src={avatar} /> :
                                <img src={avatarUrl} />}
                            <span className="iconUploadProfile">
                                <FiUpload />
                            </span>
                            <button onClick={() => signOut()} className="buttonSignOut">Sair</button>
                        </div>
                        <div className="textProfile">
                            <label>Nome</label>
                            <input className="input" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                            <label>Email</label>
                            <input className="input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                            <label>Número</label>
                            <input className="input" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <button type="submit">Salvar</button>
                        </div>
                        
                    </form>
                </div>
            </div >
        </div >
    )
}