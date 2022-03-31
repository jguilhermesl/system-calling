import React, { useState, useEffect } from 'react'

import './style.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiFile, FiEdit2, FiTrash } from 'react-icons/fi'
import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify';

export default function AllCustomers() {

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        async function loadCustomers() {
            await firebase.firestore().collection('customers')
            .get()
            .then( (snapshot) => {
                let lista = [];

                snapshot.forEach( (doc) => {
                    lista.push({
                        id: doc.id,
                        nomeEmpresa: doc.data().nomeEmpresa,
                        CPF: doc.data().CPF,
                        address: doc.data().address

                    })
                    console.log(doc)
            })
            setCustomers(lista)
            console.log(lista)
        })
            
        }
        loadCustomers();
    }, [])

    async function deleteCustomer(id, customer) {
        await firebase.firestore().collection('customers')
        .doc(id)
        .delete()
        .then( () => {
            toast.success(`Cliente ${customer} deletado com sucesso.`)
            console.log(customers)
            async function loadCustomers() {
                await firebase.firestore().collection('customers')
                .get()
                .then( (snapshot) => {
                    let lista = [];
    
                    snapshot.forEach( (doc) => {
                        lista.push({
                            id: doc.id,
                            nomeEmpresa: doc.data().nomeEmpresa,
                            CPF: doc.data().CPF,
                            address: doc.data().address
    
                        })
                        console.log(doc)
                })
                setCustomers(lista)
                console.log(lista)
            })
                
            }
            loadCustomers();
        })
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Clientes cadastrados" >
                    <FiFile />
                </Title>

                <div className="container">
                <table>
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">CPF</th>
                                    <th scope="col">Endereço</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((item) => {
                                    return (
                                <tr>
                                    <td data-label="Nome">{item.nomeEmpresa}</td>
                                    <td data-label="CPF">{item.CPF}</td>
                                    <td data-label="Endereço">{item.address}</td>
                                    <td data-label="ID">{item.id}</td>
                                    <td data-label="#" className="buttonsTable">
                                        <button className="buttonSearch" onClick={() => deleteCustomer(item.id, item.nomeEmpresa)}style={{backgroundColor: 'red'}}><FiTrash /></button>
                                    </td>
                                </tr>)})}
                            </tbody>
                        </table>
                </div>

            </div>
        </div>
    )}