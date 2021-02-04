import Link from 'next/link'
import { useState } from 'react'
import style from './Playlist.module.css'


export default function Playlist({ playlist }) {
  return (
    <div className={ style.playlist }>
      <div className={ style.nome }>
        { playlist.nome }
      </div>
      <div className={ style.criador }>
        { playlist.criador }
      </div>
      <div className={ style.data_da_criacao }>
        { playlist.data_da_criacao }
      </div>
    </div>
  )
}
