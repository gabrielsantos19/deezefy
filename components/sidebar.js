import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/SideBar.module.css'
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
      <Link href='/'>
        <a className={ styles.opcao }>
          <MdHome></MdHome>
          Início
        </a>
      </Link>
      <Link href='/login'>
        <a className={ styles.opcao }>
          <MdPerson></MdPerson>
          Login
        </a>
      </Link>
      <Link href='/perfil'>
        <a className={ styles.opcao }>
          <MdPerson></MdPerson>
          Perfil
        </a>
      </Link>
      <Link href='/musicas/adicionar'>
        <a className={ styles.opcao }>
          <MdAddBox></MdAddBox>
          Adicionar música
        </a>
      </Link>

      <div className={ styles.grupo }>
        Ouvinte
      </div>
      <Link href='/ouvintes'>
        <a className={ styles.opcao }>
          <MdPerson></MdPerson>
          Ouvintes
        </a>
      </Link>
      <Link href='/cadastro'>
        <a className={ styles.opcao }>
          <MdPerson></MdPerson>
          Cadastrar
        </a>
      </Link>

      <div className={ styles.grupo }>
        Artista
      </div>
      <Link href='/artistas'>
        <a className={ styles.opcao }>
          <MdPerson></MdPerson>
          Artistas
        </a>
      </Link>
      <Link href='/cadastro_artista'>
        <a className={ styles.opcao }>
          <MdPerson></MdPerson>
          Cadastrar
        </a>
      </Link>

      <div className={ styles.grupo }>
        Playlists
      </div>
      <Link href='/playlists'>
        <a className={ styles.opcao }>
          <MdLibraryMusic></MdLibraryMusic>
          Playlists
        </a>
      </Link>
      <Link href='/playlists/criar'>
        <a className={ styles.opcao }>
          <MdAddBox></MdAddBox>
          Criar
        </a>
      </Link>
    </nav>
  )
}