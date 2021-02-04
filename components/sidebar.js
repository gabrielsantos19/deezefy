import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './SideBar.module.css'
import { 
    MdHome, MdPerson, MdPlaylistPlay, 
    MdLibraryMusic, MdAddBox
} from "react-icons/md";


export default function SideBar() {
  return (
    <nav className={styles.menu}>
      <Link href='/'>
        <a className={ styles.logo }>
          Deezefy
        </a>
      </Link>

      <div className={ styles.submenu }>
        <Link href='/'>
          <a className={ styles.opcao }>
            <MdHome></MdHome>
            Músicas
          </a>
        </Link>

        <Link href='/ouvintes'>
          <a className={ styles.opcao }>
            <MdPerson></MdPerson>
            Ouvintes
          </a>
        </Link>

        <Link href='/artistas'>
          <a className={ styles.opcao }>
            <MdPerson></MdPerson>
            Artistas
          </a>
        </Link>

        <Link href='/playlists'>
          <a className={ styles.opcao }>
            <MdLibraryMusic></MdLibraryMusic>
            Playlists
          </a>
        </Link>
      </div>

      <Link href='/login'>
        <a className={ styles.opcao }>
          <MdPerson></MdPerson>
          Login
        </a>
      </Link>
    </nav>
  )
}