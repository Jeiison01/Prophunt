import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import DetallesProducto from "../components/DetallesProducto";
import useProductos from "../hooks/useProductos";
import styles from '../styles/Inicio.module.css'


export default function Buscar() {


  

  const router = useRouter();
  const {query: {q}} = router;

  
  //Todos los productos
  const {productos} = useProductos('creado');
  const [resultado, guardarResultado] = useState([])

  useEffect(() => {
    const busqueda = q.toLowerCase();
    const filtro = productos.filter(producto => {
      return(
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      )
    })
    guardarResultado(filtro)
  }, [q, productos])

  return (
    <div>
      <Layout>
      <div className={styles.listado}>
        <div className={styles.contenedor}>
          <div className={styles.datos}>
            {resultado.map(producto =>(
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