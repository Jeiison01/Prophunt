import { Fragment, useContext } from "react";

import {useRouter} from "next/router";

import {FirebaseContext} from "../firebase";
import {collection, addDoc} from "firebase/firestore";



export default function ApiRNG({entradas}) {
  const  {id, name, description, latitude, longitude,  field1, field2, created_at} = entradas.channel;
  const valores = Object.values(entradas.feeds);

      //hook de routing para rediccionar
      const router = useRouter();

      
      //Context con las operaciones crud de firebase
      const {usuario, firebase} = useContext(FirebaseContext);
      const {db} = firebase

      async function sendData(){
      
        //Si el usuario no esta autenticado llevar al login
        if(!usuario){
          return router.push('/login')
        }
        //crear el objeto de nuevo producto
        const item = {
          id,
          name,
          description,
          latitude,
          longitude,
          field1,
          field2,
          created_at
        }
          //Insertarlo en la base de datos
          await addDoc(collection(db, "items"), (item))
          return router.push('/')
      }  

  return (
    <Fragment>
        <h1>{name}</h1>
        <p>{description}</p>
        <p>{field1}</p>
        <p>{field2}</p>
        <h1>Feeds: </h1>
        {valores.map(val=>{
          return<p>Entry_Id: {val.entry_id}</p>
        })}
        <button
          type="submit"
          value="Enviar"
          onClick={() => sendData()}
        >Enviar</button>
    </Fragment>
  )
}
