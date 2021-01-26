import Link from 'next/link'
import { useState } from 'react'
import style from '../styles/Artista.module.css'


export default function Artista({ artista }) {
  const [seguido, setSeguido] = useState(false)

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
    <div className={style.artista}>
      <div className={style.cabecalho}>
        <div className={style.nome_artistico}>
          { artista.nome_artistico }
        </div>
        { button }        
      </div>
      <div className={style.ano_de_formacao}>
        { artista.ano_de_formacao }
      </div>
      <div className={style.biografia}>
        { artista.biografia }
      </div>
    </div>
  )
}
