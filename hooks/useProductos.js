import { useState, useEffect, useContext } from "react"
import { FirebaseContext } from "../firebase";
import {collection, getDocs, orderBy, query} from "firebase/firestore";

const useProductos = (orden) => {
    

  const [productos, guardarProductos] = useState([]);

  const {firebase} = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(firebase.db, 'productos'),orderBy(orden, "desc")))
        const docs = []
        querySnapshot.forEach((doc) =>{
          docs.push({...doc.data(), id:doc.id})
        })
        guardarProductos(docs)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerProductos();
  }, [])
  

  return {
      productos
  }
}

export default useProductos