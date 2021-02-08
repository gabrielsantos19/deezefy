import Link from 'next/link'
import { useState } from 'react'
import jwt from 'jsonwebtoken'
import style from './Musica.module.css'


export default function Musica({ musica, curte }) {
  const [curtida, setCurtida] = useState(curte ? true : false)
  const [deletada, setDeletada] = useState(false)

  async function deletar() {
    fetch('/api/musica', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: musica.id
      })
    })
    .then(response => {
      setDeletada(true)
    })
    .catch(error => {})
  }

  async function curtir() {
    const tokenRaw = localStorage.getItem('token')

    if(tokenRaw) {
      const token = jwt.decode(tokenRaw)

      fetch('/api/curte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          musica: musica.id,
          ouvinte: token.email
        })
      })
      .then(response => {
        setCurtida(true)
      })
      .catch(error => {})
    }
  }

  async function deixarDeCurtir() {
    const tokenRaw = localStorage.getItem('token')

    if(tokenRaw) {
      const token = jwt.decode(tokenRaw)

      fetch('/api/curte', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          musica: musica.id,
          ouvinte: token.email
        })
      })
      .then(response => {
        setCurtida(false)
      })
      .catch(error => {})
    }
  }

  let button;
  if (curtida) {
    button = (
      <button className={ style.curtiu } 
          onClick={ deixarDeCurtir }>
        Curtiu
      </button>
    )
  }
  else {
    button = (
      <button className={ style.curtir } 
          onClick={ curtir }>
        Curtir
      </button>
    )
  }

  return (
    <div className={ deletada ? style.musicaDeletada : style.musica }>
      <Link href={ `/musica?id=${ musica.id }`}>
        <a>
          <div className={style.nome}>
            {musica.nome}
          </div>
          <div>{musica.duracao}</div>
        </a>
      </Link>
      <div className={ style.rodape }>
        <button onClick={ deletar }>
          Deletar
        </button>
        { button }
      </div>
    </div>
  )
}
