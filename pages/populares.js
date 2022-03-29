import Layout from "../components/Layout";
import DetallesProducto from "../components/DetallesProducto";
import useProductos from "../hooks/useProductos";
import styles from '../styles/Inicio.module.css'



export default function Populares() {
  const {productos} = useProductos('votos');
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
