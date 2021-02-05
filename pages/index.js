import { useEffect, useState } from 'react'
import Link from  'next/link'
import styles from '../styles/Home.module.css'
import Musica from '../components/musica'
import SideBar from  '../components/sidebar'


export default function Home() {
  const [musicas, setMusicas] = useState([]);

  useEffect(() => {
    let mounted = true
    
    fetch('/api/musicas')
    .then(results => results.json())
    .then(json => {
      if(mounted)
        setMusicas(json.musicas)
    })
    .catch(error => {})

    return function cleanup() {
      mounted = false
    }
  }, []);

  return (
    <main>
      <div className={ styles.menu }>
        <h1>Músicas</h1>
        <Link href='/musicas/adicionar'>
            <a>
              <button>Criar</button>
            </a>
        </Link>
      </div>
      <div className={ styles.lista }>
        {
          musicas.map(u => (
            <Musica key={u.id} musica={u}></Musica>
          ))
        }
      </div>

      <SideBar></SideBar>
    </main>
  )
}
