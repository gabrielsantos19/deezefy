import { useEffect, useState } from 'react'
import Link from  'next/link'
import jwt from 'jsonwebtoken'
import styles from '../styles/Home.module.css'
import Musica from '../components/musica'
import SideBar from  '../components/sidebar'


export default function Home() {
  const [musicas, setMusicas] = useState([])
  const [curtidas, setCurtidas] = useState([])

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

  useEffect(() => {
    const tokenRaw = localStorage.getItem('token')

    if(tokenRaw) {
      const token = jwt.decode(tokenRaw)

      fetch(`/api/curte?ouvinte=${ token.email }`)
      .then(response => response.json())
      .then(json => {
        setCurtidas(json.curtidas)
      })
      .catch(error => {})
    }
  }, [])

  return (
    <main>
      
      <div className={ styles.lista }>
        <div className={ styles.menu }>
          <h1>Músicas</h1>
          <div>
            <Link href='/musicas/adicionar'>
                <a>
                  <button>Criar</button>
                </a>
            </Link>
          </div>
        </div>
        {
          musicas.map(u => (
            <Musica key={ `${ u.id } ${ curtidas.length }` } 
              musica={ u }
              curte={ curtidas.find(e => e.musica == u.id) }>
            </Musica>
          ))
        }
      </div>

      <SideBar></SideBar>
    </main>
  )
}
