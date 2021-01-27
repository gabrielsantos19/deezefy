import Link from 'next/link'
import { useState } from 'react'
import style from '../styles/Ouvinte.module.css'


export default function Ouvinte({ ouvinte }) {
  return (
    <div className={style.ouvinte}>
      <div className={ style.nome }>
        { ouvinte.primeiro_nome } { ouvinte.sobrenome }
      </div>
      <div className={ style.usuario }>
        { ouvinte.usuario }
      </div>
      <div className={ style.telefone }>
        { ouvinte.telefone }
      </div>
      
    </div>
  )
}
