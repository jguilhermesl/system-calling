import { useState, useEffect, useContext } from 'react'
import {useParams, useHistory} from 'react-router-dom'
import './style.css'
import { FiPlus, FiEdit } from 'react-icons/fi';

import { AuthContext } from '../../contexts/auth'

import firebase from '../../services/firebaseConnection'
import {} from 'react-router-dom'

import Header from '../../components/Header'
import Title from '../../components/Title'
import imageNewCall from '../../assets/imageNewCall.svg'
import { toast } from 'react-toastify'

export default function New() {
    const { user } = useContext(AuthContext)
    const { id } = useParams();
    const history = useHistory();

    const [loadCustomers, setLoadCustomers] = useState(true)
    const [customers, setCustomers] = useState([])

    const [customerSelected, setCustomerSelected] = useState(0)
    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')
    const [complemento, setComplemento] = useState('')
    const [idCustomer, setIdCustomer] = useState(false)

    useEffect(() => {
        async function loadCustomers() {
            await firebase.firestore().collection('customers')
                .get()
                .then((snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeEmpresa: doc.data().nomeEmpresa
                        })
                    })

                    if (lista.length === 0) {
                        setCustomers([{
                            id: '1', nomeEmpresa: 'FREELA'
                        }])
                        setLoadCustomers(false);
                        return;
                    }
                    setCustomers(lista)
                    setLoadCustomers(false)

                    if(id) {
                        loadId(lista)
                    }
                })
                .catch((error) => {
                    console.log('Ops, algo deu errado.');
                    setLoadCustomers(false)
                    setCustomers([{ id: 1, nomeFantasia: '' }])
                })
        }
        loadCustomers()
    }, [])

    async function loadId(lista) {
        await firebase.firestore().collection('calls')
        .doc(id).get()
        .then((snapshot) => {
            setAssunto(snapshot.data().assunto)
            setComplemento(snapshot.data().complemento)
            setStatus(snapshot.data().status)

            let index = lista.findIndex(item => item.id === snapshot.data().clienteId)
            setCustomerSelected(index)
            setIdCustomer(true);
        })
        .catch( (error) => {
            toast.error('Nenhum ID encontrado.')
            setIdCustomer(false)
        })
    }


    async function handleRegister(e) {
        e.preventDefault();

        if(idCustomer) {
            await firebase.firestore().collection('calls')
            .doc(id)
            .update({
                cliente: customers[customerSelected].nomeEmpresa,
                assunto: assunto,
                status: status,
                clienteId: customers[customerSelected].id,
                complemento: complemento,
                userId: user.uid
            })
            .then(() => {
                toast.success('Cliente atualizado com sucesso.')
                setCustomerSelected(0);
                setComplemento('');
                history.push('/dashboard')
                
            })
            return
        }

        await firebase.firestore().collection('calls')
            .add({
                created: new Date(),
                cliente: customers[customerSelected].nomeEmpresa,
                assunto: assunto,
                status: status,
                clienteId: customers[customerSelected].id,
                complemento: complemento,
                userId: user.uid
            })
            .then(() => {
                toast.success('Chamado criado com sucesso.')
                setComplemento('')
                setCustomerSelected(0);
            })
            .error((error) => {
                toast.error('Ops, algo deu errado.')
            })
    }

    // chamado quando troca o select
    function handleChangeSelect(e) {
        setAssunto(e.target.value)
        console.log(e.targe.value)
    }

    function handleChangeCustomers(e) {
        setCustomerSelected(e.target.value)
    }


    return (
        <div>
            <Header />
            <div className="content">
                <Title name={idCustomer === true ? `Editando chamado` : `Novo chamado`} >
                    {idCustomer === true && <FiEdit />}
                    {idCustomer === false && <FiPlus />}
                </Title>

                <div className="container">
                    <form className="formNewCall" onSubmit={handleRegister}>
                        <div className="formTextNewCall">
                            <label>Cliente {loadCustomers === true && (
                                <div className="loading"></div>
                            )
                            }</label>
                            <select value={customerSelected} onChange={handleChangeCustomers}>
                                {customers.map((item, index) => {
                                    return (
                                        <option key={item.id} value={index}>{item.nomeEmpresa}</option>
                                    )
                                })}
                            </select>

                            <label>Assunto</label>
                            <select value={assunto} onChange={handleChangeSelect}>
                                <option value='Suporte'>Suporte</option>
                                <option value='Visita Técnica'>Visita Técnica</option>
                                <option value='Financeiro'>Financeiro</option>
                                <option value='Administrativo'>Administrativo</option>
                            </select>

                            <label>Status</label>
                            <div className="inputStatus">
                                <input type="radio" name="radio" value="Aberto" checked={status === 'Aberto'} onChange={(e) => setStatus(e.target.value)} /> <span>Em aberto</span>
                                <input type="radio" name="radio" value="Progresso" checked={status === 'Progresso'} onChange={(e) => setStatus(e.target.value)} /> <span>Em progresso</span>
                                <input type="radio" name="radio" value="Atendido" checked={status === 'Atendido'} onChange={(e) => setStatus(e.target.value)} /> <span>Atendido</span>
                            </div>

                            <label>Complemento</label>
                            <textarea
                                type="text"
                                placeholder="Descreva seu problema..."
                                value={complemento}
                                onChange={(e) => setComplemento(e.target.value)} />
                            <button type="submit">{idCustomer ? 'Editar' : 'Registrar' } </button>
                        </div>
                        <div className="imageNewCall">
                            <img src={imageNewCall} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}