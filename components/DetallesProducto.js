import styles from '../styles/DetallesProducto.module.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import Link from 'next/link';

const DetallesProducto = ({producto}) => {
    const {id, comentarios, creado, descripcion, empresa, nombre, url, URLImage, votos} = producto;

  return (
    <li className={styles.producto}>
        <div className={styles.descripcion_producto}>
            <div>
                <img className={styles.imagen} src={URLImage}/>
            </div>
            <div>
                <Link href="/productos/[id]" as={`productos/${id}`}>
                    <a className={styles.titulo}>{nombre}</a>
                </Link>
                <p className={styles.texto_descripcion}>{descripcion}</p>
                <div className={styles.comentarios}>
                    <div>
                        <img src="/img/comentario.png"/>
                        <p>{comentarios.length} Comentarios</p>
                    </div>
                </div>
                <p>Publicado hace: {formatDistanceToNow(new Date(creado), {locale:
                es})}</p>
            </div>
        </div>
        <div className={styles.votos}>
            <div>&#9650; </div>
            <p>{votos}</p>
        </div>
    </li>
  )
}

export default DetallesProducto