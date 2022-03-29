import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "AIzaSyDzvUcBdETE7Das1GLCGDuWHTQ7csTUJNM",
    authDomain: "system-calling.firebaseapp.com",
    projectId: "system-calling",
    storageBucket: "system-calling.appspot.com",
    messagingSenderId: "883100621762",
    appId: "1:883100621762:web:d2f77c0eb7fbb57e3bd45b",
    measurementId: "G-5B149NQQ70"
  };
 
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;