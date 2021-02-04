import Link from 'next/link'
import { useState } from 'react'
import style from './Playlist.module.css'


export default function Playlist({ playlist }) {
  const [deletada, setDeletada] = useState(false)

  async function deletar() {
    fetch('/api/playlist', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playlist)
    })
    .then(response => setDeletada(true))
    .catch(error => {})
  }

  return (
    <div className={ deletada ? style.playlistDeletada : style.playlist }>
      <div className={ style.nome }>
        { playlist.nome }
      </div>
      <div className={ style.criador }>
        { playlist.criador }
      </div>
      <div className={ style.data_da_criacao }>
        { playlist.data_da_criacao }
      </div>
      <div>
        <button onClick={ deletar }>
          Deletar
        </button>
      </div>
    </div>
  )
}
