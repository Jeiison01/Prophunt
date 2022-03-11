import { useState, useEffect } from "react";
import firebase from "../firebase";

function useAutenticacion(){
    const[usuarioAutenticado, guardarUsuarioAutenticado] = useState(null);

    useEffect(() => {
        const unsusbribe = firebase.auth.onAuthStateChanged(usuario => {
            if(usuario){
                guardarUsuarioAutenticado(usuario);
            }else{
                guardarUsuarioAutenticado(null);
            }
        })
        return () => unsusbribe();
    }, []);

    return usuarioAutenticado
    
}

export default useAutenticacion;