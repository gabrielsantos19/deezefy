import Link from 'next/link'
import { useState } from 'react'
import jwt from 'jsonwebtoken'
import style from './Cartao.module.css'


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
        if(response.status == 201) {
          setCurtida(true)
        }
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
      <button className={ style.botao } onClick={ deixarDeCurtir }>
        Curtiu
      </button>
    )
  }
  else {
    button = (
      <button className={ style.botao } onClick={ curtir }>
        Curtir
      </button>
    )
  }

  return (
    <div className={ deletada ? style.caixaDeletada : style.caixa }>
      <Link href={ `/musica?id=${ musica.id }`}>
        <a title={ musica.nome} 
            className={ style.texto1 }>
          { musica.nome }
        </a>
      </Link>

      { 
        musica.artistas.map(a => (
          <div className={ style.texto2 }
              key={ a }>
            { a }
          </div>
        )) 
      }

      <div className={ style.texto3 }>
        Duração: { musica.duracao }
      </div>

      <div className={ style.rodape }>
        { button }
        <button className={ style.botao }
            onClick={ deletar }>
          Deletar
        </button>
      </div>
    </div>
  )
}
