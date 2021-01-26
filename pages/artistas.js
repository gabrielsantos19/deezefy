import { useState, useEffect } from 'react';
import Artista from '../components/artista'
import SideBar from '../components/sidebar';
import style from '../styles/Artistas.module.css'


export default function Artistas() {
  const [artistas, setArtistas] = useState([]);

  useEffect(() => {
    fetch('/api/artista')
    .then(results => results.json())
    .then(json => setArtistas(json.artistas));
  }, []);

  return (
    <div className={ style.container }>
      <h1>Artistas</h1>
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
