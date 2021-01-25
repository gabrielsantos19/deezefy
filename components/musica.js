import Link from 'next/link'
import { useState } from 'react'
import style from '../styles/Musica.module.css'


async function atualizar(musica, setEdit) {
  setEdit(2);
  fetch('/api/musica', {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: m_nome,
      senha: m_senha
    })
  })
  .then(response => {
    setEdit(0);
  })
}

export default function Musica({ musica }) {
  const [edit, setEdit] = useState(false);

  if(!edit) {
    return apresentar(musica, setEdit);
  } else {
    return editar(musica, setEdit);
  }
}

function apresentar(musica, setEdit) {
  return (
    <div className={style.musica}>
      <Link href=''>
        <a className={style.nome}>
          {musica.nome}, {musica.duracao}
        </a>
      </Link>
      <div onClick={() => setEdit(true)}>
        EDITAR
      </div>
    </div>
  )
}

function editar(musica, setEdit) {
  return (
    <div className={style.musica}>
      <input type='text' defaultValue={musica.nome}></input>
      <input type='text' defaultValue={musica.duracao}></input>
      <input type='button' 
        onClick={() => setEdit(false)}>
        SALVAR
      </input>
    </div>
  )
}
