import { useState, useEffect } from 'react'
import Link from 'next/link'
import Artista from '../../components/artista'
import SideBar from '../../components/sidebar'
import style from '../../styles/Home.module.css'


export default function Artistas() {
  const [artistas, setArtistas] = useState([]);

  useEffect(() => {
    fetch('/api/artista')
    .then(results => results.json())
    .then(json => setArtistas(json.artistas));
  }, []);

  return (
    <div className={ style.container }>
      <div className={ style.menu }>
        <h1>Artistas</h1>
        <Link href='/artistas/cadastro'>
          <a>
            <button>Cadastrar</button>
          </a>
        </Link>
      </div>
      <div className={style.lista}>
        {
          artistas.map(u => (
            <Artista key={u.usuario} artista={u}></Artista>
          ))
        }
      </div>

      <SideBar></SideBar>
    </div>
  )
}
