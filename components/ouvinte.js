import Link from 'next/link'
import { useState } from 'react'
import style from '../styles/Ouvinte.module.css'


export default function Ouvinte({ ouvinte }) {
  return (
    <div className={style.ouvinte}>
      { JSON.stringify(ouvinte) }
    </div>
  )
}
