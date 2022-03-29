import {useEffect, useContext, useState, Fragment} from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

import {FirebaseContext} from '../../firebase'
import {getDoc, doc, updateDoc, deleteDoc} from "firebase/firestore";

import Error404 from '../../components/404';
import styles from '../../styles/[id].module.css'

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { enIE, es } from 'date-fns/locale';



const Producto = () => {

    //State del componente
    const [producto, guardarProducto] = useState({});
    const [error, guardarError] = useState(false);
    const [comentario, guardarComentario] = useState({})
    const [consultarDB, guardarConsultarDB] = useState(true)

    //Routing para obtener el id actual
    const router = useRouter();
    const {query: {id}} = router;

    //Context de firebase
    const {firebase, usuario} = useContext(FirebaseContext);
    const {db} = firebase

    useEffect(() => {
      if(id && consultarDB){
        const docRef = doc(db, "productos", id)
        const obtenerProdcuto = async () => {
        const producto = await getDoc(docRef);
        if(producto.exists()){
          guardarProducto(producto.data());
          guardarConsultarDB(false)
        }else {
          guardarError(true);
          guardarConsultarDB(false)
        }
          }
          obtenerProdcuto();
      }
    }, [id])

    //Verificar
    if(Object.keys(producto).length === 0 && !error){
      return 'Cargando...'
    }

    const {comentarios, creado, descripcion, empresa, nombre, url, URLImage, votos, creador, haVotado} = producto;

    //Administrar y validar los votos
    const votarProducto = () =>{
      if(!usuario){
        return router.push('/login')
      }

      //obtener y sumar un nuevo voyo
      const nuevoTotal = votos + 1;

      //Verificar si el usuario actualiza ha votado
      if(haVotado.includes(usuario.uid)) return;

      //Guardar el ID del usuario que ha votado
      const nuevoHaVotado = [...haVotado, usuario.uid];

      //Actualizar en la BD
      const votosRef = doc(db, 'productos', id)
      updateDoc(votosRef,{votos: nuevoTotal, haVotado: nuevoHaVotado})

      //Actualizar en el State
      guardarProducto({
        ...producto,
        votos: nuevoTotal
      })
      guardarConsultarDB(true); //hay un voto por lo que vuelve a hacer la consulta a la BD 
    }

    //Funciones para crear comentarios

    const comentarioChange = e => {
      guardarComentario({
        ...comentario,
        [e.target.name]: e.target.value
      })
    }
    //Identifica si el comentario es el creador del producto

    const esCreador = id =>{
      if(creador.id == id) {
        return true;
      }
    }

    const agregarComentario = e => {
      e.preventDefault();

      if(!usuario){
        return router.push('/login')
      }
      //Información extra al comentario
      comentario.usuarioId = usuario.uid;
      comentario.usuarioNombre = usuario.displayName

      //Tomar copia de comentarios y agregarlos al arreglo
      const nuevosComentarios = [...comentarios, comentario];

      //Actualizar la BD
      const comenRef = doc(db, 'productos', id)
      updateDoc(comenRef,{comentarios: nuevosComentarios})

      //Actualizar el state
      guardarProducto({
        ...producto,
        comentarios:nuevosComentarios
      })
      guardarConsultarDB(true); //hay un COMENTARIO por lo que vuelve a hacer la consulta a la BD 
    }

    //Función que revisa que el creador del producto sea el mismo que esta autenticado
    const puedeBorrar = () => {
      if(!usuario) return false;

      if(creador.id === usuario.uid){
        return true
      }
    }

    //Elimina un producto de la bd
    const eliminarProducto = async () => {
      if(!usuario){
        return router.push('/login')
      }

      if(creador.id !== usuario.uid){
        return router.push('/')
      }
      try {
        await deleteDoc(doc(db, 'productos', id))
        router.push('/')

      } catch (error) {
        console.log('Hubo un error', error)
      }
    }

  return (
    <Layout>
      <Fragment>
        {error ? <Error404/> : (
          <div className={styles.contenedor}>
          <h1>{nombre}</h1>
          <div className={styles.contenedor_producto}>
            <div >
              <p className={styles.texto}>Publicado hace: {formatDistanceToNow(new Date(creado), {locale:
                  es})}</p>
              <p className={styles.texto}>Por: {creador.nombre} de {empresa} </p>
                  <img src={URLImage} className={styles.texto}/>
                  <p className={styles.texto}>{descripcion}</p>

                  {usuario && (
                    <Fragment>
                      <h2>Agrega tu comentario</h2>
                  <form className={styles.form} onSubmit={agregarComentario}>
                    <div className={styles.campo}>
                      <input 
                        type="text"
                        name="mensaje"
                        onChange={comentarioChange}
                      />
                    </div>
                    <input type="submit" className={styles.submit} value="Agregar Comentario" />
                  </form>
                    </Fragment>
                  )}
                  <h2 className={styles.tituloh2}>Comentarios</h2>
                  {comentarios.length === 0 ? "Aún no hay comentarios" :(
                    <ul>
                      {comentarios.map((comentario, i) =>(
                        <li className={styles.comentario} key={`${comentario.usuarioId}-${i}`}>
                          <p>{comentario.mensaje}</p>
                          <p>Escrito por:
                            <span>  
                              {''} {comentario.usuarioNombre}
                            </span>
                          </p>
                          {esCreador(comentario.usuarioId) && <p className={styles.creador}>Es Creador</p>}
                        </li>
                      ))}
                    </ul>
                  )}
                  
            </div>
            <aside>
              <a className={`${styles.boton} ${styles.boton3}`} href={url}>
                Visitar URL
              </a>
              
              <p className={styles.votos}>{votos} Votos</p>
              {usuario &&
              <a className={`${styles.boton} ${styles.boton2} ${styles.boton3}`} onClick={votarProducto}>Votar</a>
              }
            </aside>
          </div>
          {puedeBorrar() &&
            <a className={`${styles.boton} ${styles.boton2} ${styles.boton3}`} onClick={eliminarProducto}>Eliminar Producto</a>
          }
        </div>
        
        )}
        
      </Fragment>
    </Layout>
  )
}

export default Producto