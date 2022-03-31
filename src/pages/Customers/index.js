import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiFile } from 'react-icons/fi'
import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify';
import persons from '../../assets/persons.svg'

import { Link } from 'react-router-dom'

import './style.css'

export default function Customers() {
    const { user } = useContext(AuthContext)
    const [nomeEmpresa, setNomeEmpresa] = useState('')
    const [address, setAddress] = useState('')
    const [CPF, setCPF] = useState('')

    async function handleAdd(e) {
        e.preventDefault();
        if (nomeEmpresa !== '' && CPF !== '' && address !== '') {
            await firebase.firestore().collection('customers')
                .add({
                    nomeEmpresa: nomeEmpresa,
                    address: address,
                    CPF: CPF
                })
                .then(() => {
                    setNomeEmpresa('');
                    setAddress('');
                    setCPF('');
                    toast.success('Cliente cadastrado com sucesso.')
                })
                .catch(() => {
                    toast.error('Erro ao cadastrar essa empresa.')
                })
        } else {
            toast.info('Preencha todos os campos.')
        }
    }

    return (
        <div>
            <Header />
            <div className="content">
            <Title name="Clientes" >
                    <FiFile /> <Link to="/allcustomers" className="buttonSeeCustomers">Ver todos clientes</Link>
                </Title>

                <div className="container">
                    <form className="formCustomers" onSubmit={handleAdd}>
                        <div className="textFormCustomers">
                            <label>Nome do cliente/empresa:</label>
                            <input className="inputCustomers" onChange={(e) => setNomeEmpresa(e.target.value)} value={nomeEmpresa} placeholder="Empresa Fantasia" />
                            <label>CPF</label>
                            <input className="inputCustomers" onChange={(e) => setCPF(e.target.value)} value={CPF} placeholder="000.000.000-00" />
                            <label>Endereço</label>
                            <input className="inputCustomers" onChange={(e) => setAddress(e.target.value)} value={address} placeholder="Rua Fantasia, 14" />
                            <button className="buttonCustomers" type='submit'>Cadastrar</button>
                        </div>
                        <div className="imageNewCall">
                            <img src={persons} />
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}