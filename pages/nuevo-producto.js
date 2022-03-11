import { useState, useContext } from "react";
import Layout from "../components/Layout";
import styles from "../styles/CrearCuenta.module.css"
import Router, {useRouter} from "next/router";

import {FirebaseContext} from "../firebase";
import {collection, addDoc} from "firebase/firestore";
import {ref, getDownloadURL, uploadBytesResumable} from '@firebase/storage'

//Validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearProducto from "../validacion/validarCrearProducto";

const STATE_INICIAL = {
  nombre:'',
  empresa:'',
  // imagen: '',
  url:'',
  descripcion:''
}


export default function NuevoProducto() {
  //State para las imagenes
  const [uploading, setUploading] = useState(false);
  const [URLImage, setURLImage] = useState('');

  const [error, guardarError] = useState(false);
  
  const {valores, errores, submitForm, handleSubmit, handleChange, handleBlur} 
  = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  const {nombre, empresa, imagen, url, descripcion} = valores;

  //hook de routing para rediccionar
  const router = useRouter();

  //Context con las operaciones crud de firebase
  const {usuario, firebase} = useContext(FirebaseContext);
  const {db} = firebase

  async function crearProducto(){
    //Si el usuario no esta autenticado llevar al login
    if(!usuario){
      return router.push('/login')
    }
    //crear el objeto de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      URLImage,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now()
    }
    //Insertarlo en la base de datos
    await addDoc(collection(db, "productos"), (producto))
    return router.push('/')
  }

  const handleImageUpload = e => {
    //Se obtiene referencia de la ubicación donde se guardará la imagen
    const file = e.target.files[0];
    const imageRef = ref(firebase.storage, 'productos/' + file.name);
    
    //Se inicia la subida
    setUploading(true);
    const uploadTask = uploadBytesResumable(imageRef, file);
    

    //Registra eventos para cuando detecte un cambio en el estado de la subida
    uploadTask.on('state_changed',
      //Muestra progreso de la subida
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        console.log(`Subiendo imagen: ${progress}% terminado`);
      },
      //En caso de error
      error =>{
        setUploading(false);
        console.log(error);
      },
      //Subida finalizada correctamente
      () =>{
        setUploading(false);
        getDownloadURL(uploadTask.snapshot.ref).then(url =>{
          console.log('Imagen disponible en:', url);
          setURLImage(url);
        })
      }
    )
  }

  return (
    <div>
      <Layout>
      <div >
        <h1 className={styles.titulo}>Nuevo Producto</h1>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend>Información General</legend>
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
            <label htmlFor="empresa">Empresa</label>
            <input
            type="text"
            id="empresa"
            placeholder="Nombre Empresa o Compañia"
            name="empresa"
            value={empresa}
            onChange={handleChange}
            onBlur={handleBlur}
            />
          </div>
          {errores.empresa && <p className={styles.error}>{errores.empresa}</p>}
          
          <div className={styles.campo}>
            <label htmlFor="imagen">Imagen</label>
            <input
            accept="image/*"
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleImageUpload}
            />
          </div>

          <div className={styles.campo}>
            <label htmlFor="url">URL</label>
            <input
            type="url"
            id="url"
            name="url"
            placeholder="URL de tu producto"
            value={url}
            onChange={handleChange}
            onBlur={handleBlur}
            />
          </div>
          {errores.url && <p className={styles.error}>{errores.url}</p>}

          </fieldset>
          <fieldset>
            <legend>Sobre tu Producto</legend>

            <div className={styles.campo}>
            <label htmlFor="descripcion">Descripcion</label>
            <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Descripción de tu producto"
            value={descripcion}
            onChange={handleChange}
            onBlur={handleBlur}
            />
          </div>
          {errores.descripcion && <p className={styles.error}>{errores.descripcion}</p>}
          </fieldset>

          {error && <p className={styles.error}>{error}</p>}
          <input type="submit"
              value="Crear Producto"
               className={styles.submit}
          />
        </form>
      </div>
      </Layout>
    </div>
  )
}