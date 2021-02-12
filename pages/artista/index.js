import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SideBar from '../../components/sidebar'
import style from '../../styles/Atualizar.module.css'


export default function Artista() {
  const router = useRouter()

  const [antigo, setAntigo] = useState({})
  const [todosUsuarios, setTodosUsuarios] = useState([])

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [dataDeNascimento, setDataDeNascimento] = useState(null)

  const [nomeArtistico, setNomeArtistico] = useState('')
  const [biografia, setBiografia] = useState('')
  const [anoDeFormacao, setAnoDeFormacao] = useState(0)
  const [usuario, setUsuario] = useState('')

  const [disponivel, setDisponivel] = useState(true)
  const [deletado, setDeletado] = useState(false)


  useEffect(() => {
    const query = router.query

    fetch(`/api/artista?email=${ query.email }`)
    .then(response => response.json())
    .then(json => {
      setAntigo(json.artista)

      setEmail(json.artista.email)
      setSenha(json.artista.senha)
      if(json.artista.data_de_nascimento) {
        setDataDeNascimento(json.artista.data_de_nascimento)
      }

      setNomeArtistico(json.artista.nome_artistico)
      setBiografia(json.artista.biografia)
      setAnoDeFormacao(json.artista.ano_de_formacao)
      setUsuario(json.artista.usuario)
    })
    .catch(() => {})
  }, [])

  useEffect(() => {
    fetch(`/api/usuarios`)
    .then(response => response.json())
    .then(json => {
      setTodosUsuarios(json.usuarios)
    })
    .catch(error => {})
  }, [])


  async function deleteUsuario() {
    setDisponivel(false)
    fetch('/api/usuario', {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: antigo.email
      })
    })
    .then(response => {
      setDisponivel(true);
    })
    .catch(error => {})
  }

  async function putArtista() {
    setDisponivel(false)
    fetch('/api/artista', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        antigo: antigo,
        novo: {
          email: email,
          senha: senha,
          data_de_nascimento: dataDeNascimento,
          nome_artistico: nomeArtistico,
          biografia: biografia,
          ano_de_formacao: anoDeFormacao,
          usuario: email
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
    putArtista()
  }

  return (
    <main>
      <div className={ style.container }>
        <h1>
          Atualizar artista
        </h1>
        <form className={ style.form }
            onSubmit={ handleSubmit }>
          
          <label className={ style.label }>
            E-mail
          </label>
          <input className={ style.input }
            value={ email }
            onChange={ e => setEmail(e.target.value) }>
          </input>
        
          <label className={ style.label }>
            Nova senha
          </label>
          <input className={ style.input }
            onChange={ e => setSenha(e.target.value) }>
          </input>

          <label className={ style.label }>
            Data de nascimento
          </label>
          <input className={ style.input }
            value={ dataDeNascimento ? dataDeNascimento : '' }
            type='date'
            onChange={ e => setDataDeNascimento(e.target.value) }>
          </input>

          <label className={ style.label }>
            Nome artístico
          </label>
          <input className={ style.input }
            value={ nomeArtistico }
            onChange={ e => setNomeArtistico(e.target.value) }>
          </input>

          <label className={ style.label }>
            Biografia
          </label>
          <textarea className={ style.input }
            value={ biografia }
            onChange={ e => setBiografia(e.target.value) }>
          </textarea>

          <label className={ style.label }>
            Ano de formação
          </label>
          <input className={ style.input }
            type='number'
            min='1900'
            value={ anoDeFormacao }
            onChange={ e => setAnoDeFormacao(e.target.value) }>
          </input>

          <label className={ style.label }>
            Usuário
          </label>
          <select className={ style.input }
              required 
              value={ usuario }
              onChange={ e => setUsuario(e.target.value) }>
            {
              todosUsuarios.map(u => (
                <option key={ u.email }
                    value={ u.email }>
                  { u.email }
                </option>
              ))
            }
          </select>

          <button type='submit'>
            Salvar alterações
          </button>

          <button type='button'
              onClick={ deleteUsuario }>
            Deletar usuário
          </button>
        </form>
      </div>

      <SideBar></SideBar>
    </main>
  )
}
