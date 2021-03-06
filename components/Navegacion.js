import Link from "next/link"
import styles from '../styles/Navegacion.module.css'
import { FirebaseContext } from "../firebase"
import { useContext, Fragment } from "react";

const Navegacion = () => {

  const {usuario} = useContext(FirebaseContext);

  return (
    <nav className={styles.nav}>
        <Link href="/"><a>Inicio</a></Link>
        <Link href="/populares"><a>Populares</a></Link>
        {usuario && (
        <Fragment>
          <Link href="/nuevo-producto"><a>Nuevo Producto</a></Link>
          <Link href="/RNG"><a>Proyecto RNG</a></Link>
        </Fragment>
        )}
    </nav>
  )
}

export default Navegacion