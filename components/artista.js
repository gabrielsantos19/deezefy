import Link from 'next/link'
import { useState } from 'react'
import style from '../styles/Artista.module.css'


export default function Artista({ artista }) {
  return (
    <div className={style.artista}>
      <div>{ JSON.stringify(artista) }</div>
      <div>{ artista.email }</div>
      <div>{ artista.nome_artistico }</div>
    </div>
  )
}
