import Link from "next/link"
import styles from '../styles/Navegacion.module.css'
import { FirebaseContext } from "../firebase"
import { useContext } from "react";

const Navegacion = () => {

  const {usuario} = useContext(FirebaseContext);

  return (
    <nav className={styles.nav}>
        <Link href="/"><a>Inicio</a></Link>
        <Link href="/populares"><a>Populares</a></Link>
        {usuario && (
        <Link href="/nuevo-producto"><a>Nuevo Producto</a></Link>
        )}
    </nav>
  )
}

export default Navegacion