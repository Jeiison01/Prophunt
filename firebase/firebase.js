import { initializeApp } from "firebase/app";
import firebaseConfig from './config'
import {createUserWithEmailAndPassword, 
        getAuth, 
        updateProfile, 
        signInWithEmailAndPassword,
        signOut} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from '@firebase/storage'

class Firebase{
    constructor(){
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth();
        this.db = getFirestore();
        this.storage = getStorage(this.app);
    }
    //Registra un usuario
    async registrar(nombre, email, password){
        const nuevoUsuario = await createUserWithEmailAndPassword(this.auth, email, password);
        return await updateProfile(nuevoUsuario.user,{
            displayName: nombre
        })
    }

    //Inicia sesión del usuario
    async login (email, password){
        return await signInWithEmailAndPassword(this.auth, email, password);
    }

    //Cierra la sesión del usuario
    async cerrarSesion(){
        await signOut(this.auth);
    }
}

const firebase = new Firebase();

export default firebase;