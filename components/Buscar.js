import styles from '../styles/Buscar.module.css'
import Link from 'next/link'


const Buscar = () => {
  return (
    <form className={styles.form}>
        <input className={styles.input} type="text" placeholder='Buscar Productos...'/>
        <Link href='/buscar'><a className={styles.inputsubmit}>Buscar</a></Link>
    </form>
  )
}

export default Buscar