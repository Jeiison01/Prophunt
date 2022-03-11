import { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import DetallesProducto from "../components/DetallesProducto";
import { FirebaseContext } from "../firebase";
import {collection, getDocs} from "firebase/firestore";
import styles from '../styles/Inicio.module.css'



export default function Home() {

  const [productos, guardarProductos] = useState([]);

  const {firebase} = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(firebase.db, 'productos'))
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
  

  return (
    <div>
      <Layout>
      <div className={styles.listado}>
        <div className={styles.contenedor}>
          <div className={styles.datos}>
            {productos.map(producto =>(
              <DetallesProducto
                key={producto.id}
                producto={producto}
              />
            ))}
          </div>  
        </div>
      </div>
      </Layout>
    </div>
  )
}
