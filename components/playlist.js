import Link from 'next/link'
import { useState } from 'react'
import style from '../styles/Playlist.module.css'


export default function Playlist({ playlist }) {
  return (
    <div className={style.playlist}>
      { JSON.stringify(playlist) }
    </div>
  )
}
