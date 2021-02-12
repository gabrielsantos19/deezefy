import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MdAdd } from 'react-icons/md'
import Playlist from '../../components/playlist'
import SideBar from  '../../components/sidebar'
import style from '../../styles/Home.module.css'


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
      
      <div className={ style.lista }>
        <div className={ style.menu }>
          <div className={ style.titulo }>
            Playlists
          </div>
          <div>
            <Link href='/playlists/criar'>
              <a>
                <button className={ style.botaoCriar }>
                  <MdAdd></MdAdd>Criar
                </button>
              </a>
            </Link>
          </div>
        </div>
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
