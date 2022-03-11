import { useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/CrearCuenta.module.css"
import Router from "next/router";

import firebase from "../firebase";

//Validaciones
import useValidacion from "../hooks/useValidacion";
import validarIniciarSesion from "../validacion/validarIniciarSesion";

const STATE_INICIAL = {
  email:'',
  password: ''
}



export default function Login() {
  const [error, guardarError] = useState(false);
  
  const {valores, errores, submitForm, handleSubmit, handleChange, handleBlur} = 
  useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password} = valores;

  async function iniciarSesion(){
    try {
      await firebase.login(email, password);
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
        <h1 className={styles.titulo}>Iniciar Sesión</h1>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          
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
              value="Iniciar Sesión"
               className={styles.submit}
          />
        </form>
      </div>
      </Layout>
    </div>
  )
}