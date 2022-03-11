import Buscar from "./Buscar"
import Navegacion from "./Navegacion"
import Link from "next/link"
import styles from '../styles/Header.module.css'
import { FirebaseContext } from "../firebase"
import { useContext } from "react"

const Header = () => {

    const {usuario, firebase} = useContext(FirebaseContext);
  return (
    <header className={styles.titulo}>
        <div className={styles.contenedor}>
            <div className={styles.inicio}>
                <Link href="/">
                    <a className={styles.logo}>P</a>
                </Link>

                <Buscar />

                <Navegacion />
            </div>
                {usuario ? (
                    <div className={styles.loggedin}>
                        <p>Hola: {usuario.displayName} </p>
                        <button className={`${styles.boton} ${styles.boton3}`} type="button" onClick={() => firebase.cerrarSesion()}>Cerrar Sesión</button></div>
                ):(
                    <div className={styles.inicio}>
                        <Link href="/login"><a className={styles.boton}>Login</a></Link>
                        <Link href="/crear-cuenta"><a className={`${styles.boton} ${styles.boton2}`}>Crear Cuenta</a></Link>
                    </div>
                    )}
        </div>
    </header>
  )
}

export default Header