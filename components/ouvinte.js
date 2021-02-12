import Link from 'next/link'
import { useState } from 'react'
import style from './Cartao.module.css'


export default function Ouvinte({ ouvinte }) {
  const [deletado, setDeletado] = useState(false)

  function remover() {
    if(deletado) return

    fetch('/api/ouvinte', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify ({
        email: ouvinte.email
      })
    })
    .then(response => setDeletado(true))
    .catch(error => {})
  }

  return (
    <div className={ deletado ? style.caixaDeletada : style.caixa }>
      <Link href={ `/ouvinte?email=${ ouvinte.email }` }>
        <a className={ style.texto1 }>
          { ouvinte.primeiro_nome } { ouvinte.sobrenome }
        </a>
      </Link>
      <div className={ style.texto2 }>
        { ouvinte.usuario }
      </div>
      <div className={ style.texto3 }>
        Telefone(s): { ouvinte.telefone.join(' · ') }
      </div>
      <div className={ style.rodape }>
        <button className={ style.botao }
            onClick={ remover }>
          Remover
        </button>
      </div>
      
    </div>
  )
}
