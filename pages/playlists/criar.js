import { useEffect, useState } from 'react';
import SideBar from  '../../components/sidebar';
import style from '../../styles/Atualizar.module.css'


export default function AdicionarMusica() {
  const [nome, setNome] = useState('')
  const [status, setStatus] = useState('')
  const [criador, setCriador] = useState('')
  const [dataDaCriacao, setDataDaCriacao] = useState(null)

  const [todosUsuarios, setTodosUsuarios] = useState([])
  const [disponivel, setDisponivel] = useState(true)

  useEffect(() => {
    fetch('/api/usuarios')
    .then(response => response.json())
    .then(json => setTodosUsuarios(json.usuarios))
    .catch(error => {})
  }, [])

  async function adicionar() {
    setDisponivel(false);
    fetch('/api/playlist', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nome,
        status: status,
        criador: criador,
        data_da_criacao: dataDaCriacao
      })
    })
    .then(response => {
      setNome('');
      setCriador('');
      setDisponivel(true);
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    adicionar()
  }

  return (
    <main className={ style.container }>
      <h1>Criar playlist</h1>

      <form className={ style.form }
          onSubmit={ handleSubmit }>
        <label className={ style.label }>
          Nome
        </label>
        <input value={ nome }
          onChange={ e => setNome(e.target.value) }>
        </input>

        <label className={ style.label }>
          Status
        </label>
        <select value={ status }
            onChange={ e => setStatus(e.target.value) }
            required>
          <option disabled hidden></option>
          <option value='ativo'>Ativo</option>
          <option value='inativo'>Inativo</option>
        </select>

        <label className={ style.label }>
          Criador
        </label>
        <select value={ criador }
            onChange={ e => setCriador(e.target.value) }
            required>
          <option disabled hidden></option>
          {
            todosUsuarios.map(u => (
              <option key={ u.email } value={ u.email }>
                { u.email }
              </option>
            ))
          }
        </select>

        <label className={ style.label }>
          Data da criação
        </label>
        <input type='date'
          value={ dataDaCriacao ? dataDaCriacao : '' }
          onChange={ e => setDataDaCriacao(e.target.value) }>
        </input>
          
        <button
            disabled={ !disponivel }
            type='submit'>
          Criar playlist
        </button>
      </form>

      <SideBar></SideBar>
    </main>
  )
}
