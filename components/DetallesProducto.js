import styles from '../styles/DetallesProducto.module.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

const DetallesProducto = ({producto}) => {
    const {id, comentarios, creado, descripcion, empresa, nombre, url, URLImage, votos} = producto;

  return (
    <li className={styles.producto}>
        <div className={styles.descripcion_producto}>
            <div>
                <img className={styles.imagen} src={URLImage}/>
            </div>
            <div>
                <a className={styles.titulo}>{nombre}</a>

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