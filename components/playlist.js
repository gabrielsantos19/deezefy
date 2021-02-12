import Link from 'next/link'
import { useState } from 'react'
import style from './Cartao.module.css'


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
    <div className={ deletada ? style.caixaDeletada : style.caixa }>
      <Link href={ `/playlist?nome=${ playlist.nome }&criador=${ playlist.criador }` }>
        <a className={ style.texto1 }>
          { playlist.nome }
        </a>
      </Link>
      <div className={ style.texto2 }>
        { playlist.criador }
      </div>
      <div className={ style.texto3 }>
        { playlist.data_da_criacao }
      </div>
      <div className={ style.rodape }>
        <button className={ style.botao }
            onClick={ deletar }>
          Deletar
        </button>
      </div>
    </div>
  )
}
