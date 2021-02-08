import Link from 'next/link'
import { useState } from 'react'
import jwt from 'jsonwebtoken'
import style from './Artista.module.css'


export default function Artista({ artista, seguido }) {
  const [deletada, setDeletada] = useState(false)
  const [seguindo, setSeguindo] = useState(seguido? true : false)

  async function deletar() {
    if(!deletada) {
      fetch('/api/artista', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
          email: artista.email
        })
      })
      .then(response => setDeletada(true))
      .catch(error => {})
    }
  }

  async function seguir() {
    const tokenRaw = localStorage.getItem('token')
    const token = jwt.decode(tokenRaw)

    if(tokenRaw) {
      fetch('/api/segue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artista: artista.usuario,
          ouvinte: token.email
        })
      })
      .then(response => {
        setSeguindo(true)
      })
      .catch(error => {})
    }
  }

  async function deixarDeSeguir() {
    const tokenRaw = localStorage.getItem('token')
    const token = jwt.decode(tokenRaw)
    
    if(tokenRaw) {
      fetch('/api/segue', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          artista: artista.usuario,
          ouvinte: token.email
        })
      })
      .then(response => {
        setSeguindo(false)
      })
      .catch(error => {})
    }
  }

  let button;
  if (seguindo) {
    button = (
      <button className={style.seguindo} 
          onClick={ deixarDeSeguir }>
        Seguindo
      </button>
    )
  }
  else {
    button = (
      <button className={style.seguir} 
          onClick={ seguir }>
        Seguir
      </button>
    )
  }

  return (
    <div className={`${style.artista} ${deletada? style.artistaDeletada : ''}`}>
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
        <button onClick={ deletar }>
          Remover
        </button>
      </div>
    </div>
  )
}
