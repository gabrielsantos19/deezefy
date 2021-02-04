import Link from 'next/link'
import { useState } from 'react'
import style from './Musica.module.css'


export default function Musica({ musica }) {
  const [curtida, setCurtida] = useState(false)

  async function deletar(id) {
    fetch('/api/musica', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        musica: musica
      })
    })
  }

  async function curtir() {
    fetch('/api/curte', {
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
  if (curtida) {
    button = (
      <button className={ style.curtiu } onClick={() => setCurtida(false)}>
        Curtiu
      </button>
    )
  }
  else {
    button = (
      <button className={ style.curtir } onClick={() => setCurtida(true)}>
        Curtir
      </button>
    )
  }

  return (
    <div className={style.musica}>
      <Link href=''>
        <a>
          <div className={style.nome}>
            {musica.nome}
          </div>
          <div>{musica.duracao}</div>
        </a>
      </Link>
      <div className={ style.rodape }>
        { button }
        <button>
          Deletar
        </button>
      </div>
    </div>
  )
}
