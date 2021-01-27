import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Musica from '../components/musica';
import SideBar from  '../components/sidebar';


export default function Home() {
  const [musicas, setMusicas] = useState([]);

  useEffect(() => {
    let mounted = true
    
    fetch('/api/musica')
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
    <div className={ styles.container }>
      <h1>Músicas</h1>
      <div className={ styles.lista }>
        {
          musicas.map(u => (
            <Musica key={u.id} musica={u}></Musica>
          ))
        }
      </div>

      <SideBar></SideBar>
    </div>
  )
}
