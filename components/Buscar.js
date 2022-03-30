import { useState } from 'react'
import styles from '../styles/Buscar.module.css'
import Router from 'next/router';



const Buscar = () => {

  const [busqueda, guardarBusqueda] = useState('');

  const buscarProducto = e => {
    e.preventDefault();
    if(busqueda.trim() === '') return

    //Redireccionar a /buscar
    Router.push({
      pathname: '/buscar',
      query: { q: busqueda }
    })
  }

  return (
    <form className={styles.form} onSubmit={buscarProducto}>
        <input 
          className={styles.input} 
          type="text" 
          placeholder='Buscar Productos...'
          onChange={e => guardarBusqueda(e.target.value)}
        />
        <button className={styles.inputsubmit}>Buscar</button>
    </form>
  )
}

export default Buscar