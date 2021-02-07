import Link from 'next/link'
import { useReducer, useState } from 'react'
import style from './Artista.module.css'


export default function Artista({ artista }) {
  const [seguido, setSeguido] = useState(false)
  const [deletado, setDeletado] = useState(false)

  function remover() {
    if(deletado) return

    fetch('/api/artista', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify ({
        email: artista.email
      })
    })
    .then(response => setDeletado(true))
    .catch(error => {})
  }

  function seguir() {
    fetch('/api/segue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        artista: artista.usuario,
        ouvinte: 'z77'
      })
    })
  }

  let button;
  if (seguido) {
    button = (
      <button className={style.seguindo} onClick={() => setSeguido(!seguido)}>
        Seguindo
      </button>
    )
  }
  else {
    button = (
      <button className={style.seguir} onClick={() => setSeguido(!seguido)}>
        Seguir
      </button>
    )
  }

  return (
    <div className={`${style.artista} ${deletado? style.artistaDeletado : ''}`}>
      <Link href={ `/artista?email=${ artista.email }` }>
        <a className={style.nome_artistico}>
          { artista.nome_artistico }
        </a>
      </Link>
      <div className={style.ano_de_formacao}>
        { artista.ano_de_formacao }
      </div>
      <div className={style.biografia}>
        { artista.biografia }
      </div>
      <div className={ style.menu }>
        { button }
        <button onClick={ remover }>
          Remover
        </button>
      </div>
    </div>
  )
}
