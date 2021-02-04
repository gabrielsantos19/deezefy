import Link from 'next/link'
import { useState } from 'react'
import style from './Ouvinte.module.css'


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
    <div className={ `${style.ouvinte} ${deletado ? style.ouvinteDeletado : ''}` }>
      <div className={ style.nome }>
        { ouvinte.primeiro_nome } { ouvinte.sobrenome }
      </div>
      <div className={ style.usuario }>
        { ouvinte.usuario }
      </div>
      <div className={ style.telefone }>
        { ouvinte.telefone }
      </div>
      <div className={ style.menu }>
        <button onClick={ remover }>
          Remover
        </button>
      </div>
      
    </div>
  )
}
