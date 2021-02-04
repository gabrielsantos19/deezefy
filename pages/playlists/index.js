import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';
import Playlist from '../../components/playlist';
import SideBar from  '../../components/sidebar';
import Link from 'next/link';


export default function Home() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    let mounted = true
    
    fetch('/api/playlist')
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
    <div className={ styles.container }>
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
    </div>
  )
}
