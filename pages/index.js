import Layout from "../components/Layout";
import DetallesProducto from "../components/DetallesProducto";
import styles from '../styles/Inicio.module.css'
import useProductos from "../hooks/useProductos";



export default function Home() {
  const {productos} = useProductos('creado');


  return (
    <div>
      <Layout>
      <div className={styles.listado}>
        <div className={styles.contenedor}>
          <div className={styles.datos}>
            {productos.map(producto =>(
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
