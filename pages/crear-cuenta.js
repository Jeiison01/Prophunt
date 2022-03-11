import { useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/CrearCuenta.module.css"
import Router from "next/router";

import firebase from "../firebase";

//Validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearCuenta from "../validacion/validarCrearCuenta";

const STATE_INICIAL = {
  nombre:'',
  email:'',
  password: ''
}

export default function CrearCuenta() {
  const [error, guardarError] = useState(false);
  
  const {valores, errores, submitForm, handleSubmit, handleChange, handleBlur} = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  const {nombre, email, password} = valores;

  async function crearCuenta(){
    try {
      await firebase.registrar(nombre, email, password);
      Router.push('/')
    } catch (error) {
      console.error('Hubo un error al crear el usuario', error.message)
      guardarError(error.message)
    }
  }

  return (
    <div>
      <Layout>
      <div >
        <h1 className={styles.titulo}>Crear Cuenta</h1>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.campo}>
            <label htmlFor="nombre">Nombre</label>
            <input
            type="text"
            id="nombre"
            placeholder="Tu Nombre"
            name="nombre"
            value={nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            />
          </div>
          {errores.nombre && <p className={styles.error}>{errores.nombre}</p>}
          <div className={styles.campo}>
            <label htmlFor="email">Email</label>
            <input
            type="email"
            id="email"
            placeholder="Tu Email"
            name="email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            />
          </div>
          {errores.email && <p className={styles.error}>{errores.email}</p>}
          <div className={styles.campo}>
            <label htmlFor="password">Password</label>
            <input
            type="password"
            id="password"
            placeholder="Tu Password"
            name="password"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            />
          </div>
          {errores.password && <p className={styles.error}>{errores.password}</p>}
          {error && <p className={styles.error}>{error}</p>}
          <input type="submit"
              value="Crear Cuenta"
               className={styles.submit}
          />
        </form>
      </div>
      </Layout>
    </div>
  )
}