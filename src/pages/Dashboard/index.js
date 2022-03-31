import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth'
import './style.css'

import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiMessageCircle, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import firebase from '../../services/firebaseConnection'
import { format} from 'date-fns'

export default function Dashboard() {

    const [calls, setCalls] = useState([])
    const { signOut, user } = useContext(AuthContext)
    const [loadingCalls, setLoadingCalls] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState()


    useEffect( () => {
        async function loadCalls() {
            await firebase.firestore().collection('calls')
            .orderBy('created', 'desc')
            .get()
            .then( (snapshot) => {
                updateState(snapshot)
                setLoadingCalls(false)
            })
            .catch( (error) => {
                console.log('Erro ao buscar' + error)
                setLoadingMore(false)
            })
        }
        loadCalls();
    }, [])

    async function updateState(snapshot) {
        const isCollectionEmpty = snapshot.size === 0;

        if (!isCollectionEmpty) {
            let lista = [];

                snapshot.forEach( (doc) => {
         
                    lista.push({
                        cliente: doc.data().cliente,
                        assunto: doc.data().assunto,
                        clienteId: doc.data().clienteId,
                        complemento: doc.data().complemento, 
                        status: doc.data().status,
                        userId: doc.data().userId,
                        createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy')
                    })
                })
                const lastDoc = snapshot.docs[snapshot.docs.length - 1] // pegando o ultimo documentos

                setCalls(calls => [...calls, ...lista])
                setLastDocs(lastDoc)
        } else {
            setIsEmpty(true)
        }
    }



    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Atendimentos" >
                    <FiMessageCircle />
                </Title>

                {loadingCalls &&
                    <div className="loadingCalls"></div>
                }

                {loadingCalls === false &&
                <div className="container">
                    {calls.length === 0 ? (
                    <div className="ifDontHaveCall">
                        <p>Nenhum chamado registrado...</p>
                        <Link className="newCall" to="/new"><FiPlus /> Novo chamado</Link>
                    </div>) : (
                    <div className="haveCall">
                        <Link className="newCall" to="/new"><FiPlus /> Novo chamado</Link>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calls.map((item) => (
                                <tr>
                                    <td data-label="Cliente">{item.cliente}</td>
                                    <td data-label="Assunto">{item.assunto}</td>
                                    <td data-label="Status">
                                        <span className="badge" style={{ backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999'}}>{item.status}</span>
                                    </td>
                                    <td data-label="Cadastrado">{item.createdFormated}</td>
                                    <td data-label="#" className="buttonsTable">
                                        <button className="buttonSearch"><FiSearch /></button>
                                        <button className="buttonEdit"><FiEdit2 /></button>
                                    </td>
                                </tr>))}
                                
                            </tbody>
                        </table>
                    </div>  
                    )
                    }
                </div>}
            </div>
        </div>


    )
}