import { useState, useEffect } from 'react'
import Link from 'next/link'
import jwt from 'jsonwebtoken'
import { MdAdd } from 'react-icons/md'
import Artista from '../../components/artista'
import SideBar from '../../components/sidebar'
import style from '../../styles/Home.module.css'


export default function Artistas() {
  const [artistas, setArtistas] = useState([])
  const [seguidos, setSeguidos] = useState([])

  useEffect(() => {
    fetch('/api/artistas')
    .then(results => results.json())
    .then(json => {
      setArtistas(json.artistas)
    })
    .catch(error => {})
  }, [])

  useEffect(() => {
    const tokenRaw = localStorage.getItem('token')
    const token = jwt.decode(tokenRaw)
    
    if(tokenRaw) {
      fetch(`/api/segue?ouvinte=${ token.email }`)
      .then(response => response.json())
      .then(json => {
        setSeguidos(json.seguidos)
      })
      .catch(error => {})
    }
  }, [])

  return (
    <main>
      
      <div className={ style.lista }>
        <div className={ style.menu }>
          <div className={ style.titulo }>
            Artistas
          </div>
          <div>
            <Link href='/artistas/cadastro'>
              <a>
                <button className={ style.botaoCriar }>
                  <MdAdd></MdAdd>Cadastrar
                </button>
              </a>
            </Link>
          </div>
        </div>
        {
          artistas.map(u => (
            <Artista key={u.usuario + seguidos.length} 
              artista={u}
              seguido={ seguidos.find(e => e.artista == u.usuario) }>
            </Artista>
          ))
        }
      </div>

      <SideBar></SideBar>
    </main>
  )
}
