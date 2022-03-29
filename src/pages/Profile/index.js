import { useState, useContext } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import './style.css'
import avatar from '../../assets/avatar.png'
import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify'

import { AuthContext } from '../../contexts/auth'

import { FiSettings, FiUpload, FiPower } from 'react-icons/fi'
export default function Profile() {
    const { user, signOut, setUser, storageUser } = useContext(AuthContext)

    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [phone, setPhone] = useState(user && user.phone)
    const [imageAvatar, setImageAvatar] = useState(null)

    async function handleSave(e) {
        e.preventDefault();
        if (imageAvatar === null && phone !== '' && nome !== '') {
            console.log('sem foto')
            await firebase.firestore().collection('users')
                .doc(user.uid).update({
                    nome: nome,
                    phone: phone
                })
                .then(() => {
                    let data = {
                        ...user,
                        nome: nome,
                        phone: phone
                    }
                    setUser(data)
                    storageUser(data)
                    toast.success('Dados alterados com sucesso.')
                })
                .catch((error) => {
                    toast.error('Ops, algo deu errado.')
                }) 
        } else if (nome !== '' && imageAvatar !== null && phone !== '') {
            handleUpload();
            console.log('com foto')
        } 
    }

    async function handleUpload() {
        const currentUid = user.uid
        console.log('chegou na handle upload')
        const uploadTask = await firebase.storage().ref(`images/${currentUid}/${imageAvatar.name}`)
            .put(imageAvatar)
            .then(async () => {
                console.log('Foto enviada com sucesso.')
                await firebase.storage().ref(`images/${currentUid}`)
                    .child(imageAvatar.name).getDownloadURL()
                    .then(async (url) => {
                        let urlFoto = url
                        await firebase.firestore().collection('users').doc(currentUid)
                            .update({
                                avatarUrl: url,
                                nome: nome,
                                phone: phone,
                            })
                            .then(() => {
                                let data = {
                                    ...user,
                                    avatarUrl: url,
                                    nome: nome,
                                    phone: phone
                                }
                                setUser(data);
                                storageUser(data);
                                toast.success('Dados alterados com sucesso.')
                            })
                            .catch( (error) => {
                                toast.error('Ops, algo deu errado.')
                            })
                        
                    })
                    .catch( (error) => {
                        toast.error('Ops, algo deu errado.')
                    })
            })
            .catch( (error) => {
                toast.error('Ops, algo deu errado.')
            })
            
    }

    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            if (image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg') {
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(image))
            } else {
                toast.warning('Envie uma imagem do tipo JPG, JPEG ou PNG.')
                setImageAvatar(null)
                return null
            }
        }
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Minha conta" >
                    <FiSettings /> <button onClick={() => signOut()} className="buttonSignOut">Sair</button>
                </Title>

                <div className="container">
                    <form className="formProfile" onSubmit={handleSave}>
                        <div className="photoProfile">
                            <input type="file" accept="image/*" onChange={handleFile} />
                            {avatarUrl === null ?
                                <img src={avatar} /> :
                                <img src={avatarUrl}></img>}
                            <span className="iconUploadProfile">
                                <FiUpload />
                            </span>
                        </div>
                        <div className="textProfile">
                            <label>Nome</label>
                            <input className="inputTextProfile" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                            <label>Email</label>
                            <input className="inputTextProfile" type="text" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                            <label>Número</label>
                            <input className="inputTextProfile" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <button type="submit">Salvar</button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}