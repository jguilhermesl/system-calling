import React, { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';

import { toast } from 'react-toastify'

export const AuthContext = createContext({})

function AuthProvider ({ children }) {
    const [user, setUser] = useState(null); 
    const [loadingAuth, setLoadingAuth] = useState(false)

    useEffect(()=> {

        function loadStorage() {
            const storageUser = localStorage.getItem('SistemaUser');
            // se tem algo no storage, entra aqui...
            if(storageUser){
                setUser(JSON.parse(storageUser)) 
            }
        }

        loadStorage()

    }, [])

    //function para cadastro
    async function signUp(email, nome, phone, password){
        setLoadingAuth(true)
        // função espera os dados chegarem, então...
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;
            let email = value.user.email
            
            await firebase.firestore().collection('users')
            .doc(uid).set({
                nome: nome,
                avatarUrl: null,
                phone: phone, 
                email: email
            })
            .then( () => {
                let data = {
                    uid: uid,
                    nome: nome,
                    phone: phone,
                    email: value.user.email,
                    avatarUrl: null
                };
                setUser(data);
                storageUser(data);
                toast.success('Bem vindo à plataforma!')
                setLoadingAuth(false)

            } )
            .catch( error => {
                console.log(error);
                setLoadingAuth(false);
                toast.error('Ops, algo deu errado.')
            })
        })
    }

    function storageUser(data){
        localStorage.setItem('SistemaUser', JSON.stringify(data))
    }

    async function signOut(){
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }

    //fazendo login do usuário
    async function logIn(email, password) {
        setLoadingAuth(true)
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then( async (value)=>{
            let uid = value.user.uid
            
            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get();

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                avatarUrl: userProfile.data().avatarUrl,
                email: userProfile.data().email,
                phone: userProfile.data().phone
            }
            setUser(data)
            storageUser(data)
            toast.success(`Bem vindo de volta!`)
            setLoadingAuth(false)
        })
        .catch((error)=>{
            alert('ERRO AO FAZER LOGIN' + error)
            setLoadingAuth(false)
            toast.error('Ops, algo deu errado!')
        })
    }

    return (
        <AuthContext.Provider 
        value={{
            signed: !!user, 
            user, 
            signUp,
            signOut, 
            logIn,
            loadingAuth,
            setUser,
            storageUser
            }} >
        {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

