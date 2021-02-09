import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import Playlist from '../../components/playlist';
import SideBar from  '../../components/sidebar';
import Link from 'next/link';


export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    let mounted = true
    
    fetch('/api/playlists')
    .then(results => results.json())
    .then(json => {
      if(mounted)
        setPlaylists(json.playlists)
    })
    .catch(error => {})

    return function cleanup() {
      mounted = false
    }
  }, []);

  return (
    <main>
      <div className={ styles.menu }>
        <h1>Playlists</h1>
        <Link href='/playlists/criar'>
          <a>
            <button>Criar</button>
          </a>
        </Link>
      </div>
      <div className={ styles.lista }>
        {
          playlists.map(u => (
            <Playlist key={u.nome + u.criador} playlist={u}></Playlist>
          ))
        }
      </div>

      <SideBar></SideBar>
    </main>
  )
}
