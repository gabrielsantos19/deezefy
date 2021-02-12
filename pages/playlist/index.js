import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SideBar from '../../components/sidebar'
import style from '../../styles/Atualizar.module.css'


export default function Playlist() {
  const [antiga, setAntiga] = useState({})

  const [nome, setNome] = useState('')
  const [status, setStatus] = useState('')
  const [criador, setCriador] = useState('')
  const [dataDaCriacao, setDataDaCriacao] = useState(null)

  const [todosUsuarios, setTodosUsuarios] = useState([])
  const [disponivel, setDisponivel] = useState(true)
  const [deletada, setDeletada] = useState(false)


  const router = useRouter()
  useEffect(() => {
    const query = router.query

    fetch(`/api/playlist?nome=${ query.nome }&criador=${ query.criador }`)
    .then(response => response.json())
    .then(json => {
      setAntiga(json.playlist)
      
      setNome(json.playlist.nome)
      setStatus(json.playlist.status)
      setCriador(json.playlist.criador)

      const data = json.playlist.data_da_criacao.split('T')[0]
      if(data) {
        setDataDaCriacao(data)
      }
    })
    .catch(() => {})
  }, [])

  useEffect(() => {
    fetch('/api/usuarios')
    .then(response => response.json())
    .then(json => {
      setTodosUsuarios(json.usuarios)
    })
    .catch(error => {})
  }, [])

  async function putPlaylist() {
    setDisponivel(false)
    fetch('/api/playlist', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        antiga: antiga,
        nova: {
          nome: nome,
          status: status,
          criador: criador,
          data_da_criacao: dataDaCriacao
        }
      })
    })
    .then(response => {
      setDisponivel(true);
    })
    .catch(error => {})
  }

  async function deletarPlaylist() {
    setDisponivel(false)
    fetch('/api/playlist', {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(antiga)
    })
    .then(response => {
      setDeletada(true)
    })
    .catch(error => {})
  }

  function handleSubmit(e) {
    e.preventDefault()
    putPlaylist()
  }

  return (
    <main className={ style.container }>
      <h1>
        Atualizar Playlist
      </h1>
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

        <button type='submit'>
          Salvar alterações
        </button>
        
        <button type='button'
            onClick={ deletarPlaylist }>
          Deletar playlist
        </button>
      </form>

      <SideBar></SideBar>
    </main>
  )
}
