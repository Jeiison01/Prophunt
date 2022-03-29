import Layout from "../components/Layout";
import ApiRNG from "../components/ApiRNG";




export default function RNG({entradas}) {


  return (
    <div>
      <Layout>
        <ApiRNG
          key={entradas.channel.id}
          entradas={entradas}
        />
      </Layout>
    </div>
  )
}

export async function getStaticProps(){
  
            const url = 'https://api.thingspeak.com/channels/548625/field/2.json'
            const respuesta = await fetch(url)
            const entradas = await respuesta.json()
  return {
    props: {
      entradas
    }
  }
}