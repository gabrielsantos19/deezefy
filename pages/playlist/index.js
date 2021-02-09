import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SideBar from '../../components/sidebar'


export default function Playlist() {
  const [antiga, setAntiga] = useState({})

  const [nome, setNome] = useState('')
  const [status, setStatus] = useState('')
  const [criador, setCriador] = useState('')
  const [dataDaCriacao, setDataDaCriacao] = useState('')

  const [todosUsuarios, setTodosUsuarios] = useState([])
  const [disponivel, setDisponivel] = useState(true)

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
      setDataDaCriacao(json.playlist.data_da_criacao)
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

  function handleSubmit(e) {
    e.preventDefault()
    putPlaylist()
  }

  return (
    <main>
      <h1>
        Atualizar Playlist
      </h1>
      <div>
        <form onSubmit={ handleSubmit }>
          <label>Nome:</label>
          <input value={ nome }
            onChange={ e => setNome(e.target.value) }>
          </input>

          <label>Status:</label>
          <select value={ status }
              onChange={ e => setStatus(e.target.value) }>
            <option value='ativo'>Ativo</option>
            <option value='inativo'>Inativo</option>
          </select>

          <label>Criador:</label>
          <select 
              onChange={ e => setCriador(e.target.value) }>
            <option disabled hidden></option>
            {
              todosUsuarios.map(u => (
                <option key={ u.email } value={ u.email }>
                  { u.email }
                </option>
              ))
            }
          </select>

          <label>Data da criação:</label>
          <input type='date'
            value={ dataDaCriacao.split('T')[0] }
            onChange={ e => setDataDaCriacao(e.target.value) }>
          </input>

          <button type='submit'>
            Salvar
          </button>
        </form>
      </div>

      <SideBar></SideBar>
    </main>
  )
}
