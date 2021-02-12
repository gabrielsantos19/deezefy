import { useRouter } from 'next/router'
import { useEffect, useState, Fragment } from 'react'
import SideBar from '../../components/sidebar'
import style from '../../styles/Atualizar.module.css'


export default function Musica() {
  const [antiga, setAntiga] = useState({})

  const [id, setId] = useState(0)
  const [nome, setNome] = useState('')
  const [duracao, setDuracao] = useState('')
  const [artistas, setArtistas] = useState([''])

  const [todosArtistas, setTodosArtistas] = useState([])
  const [disponivel, setDisponivel] = useState(true)

  const router = useRouter()
  useEffect(() => {
    const query = router.query

    fetch(`/api/musica?id=${ query.id }`)
    .then(response => response.json())
    .then(json => {
      setAntiga(json.musica)

      setId(json.musica.id)
      setNome(json.musica.nome)
      setDuracao(json.musica.duracao)
      setArtistas(json.musica.artistas)
    })
    .catch(() => {})
  }, [])

  useEffect(() => {
    fetch('/api/artistas')
    .then(response => response.json())
    .then(json => setTodosArtistas(json.artistas))
    .catch(error => {})
  }, [])

  async function putMusica() {
    setDisponivel(false)
    fetch('/api/musica', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        antiga: antiga,
        nova: {
          id: id,
          nome: nome,
          duracao: duracao,
          artistas: artistas
        }
      })
    })
    .then(response => {
      console.log(response)
      if(response.status == 200)
      {
        setAntiga({...nova})
      }
      setDisponivel(true);
    })
    .catch(error => {})
  }

  function artistaInput(index) {
    return (
      <Fragment key={ index }>
        <label className={ style.label }>
          Artista { index+1 }
        </label>
        <div className={ style.bloco }>
          <select className={ style.select }
              value={ artistas[index] ? artistas[index] : '' }
              onChange={ e => setArtistaInput(index, e.target.value) }
              required>
            <option disabled hidden></option>
            {
              todosArtistas.map(a => (
                <option key={index + a.usuario} 
                    value={a.usuario}>
                  {a.nome_artistico}
                </option>
              ))
            }
          </select>
          <button type='button'
              onClick={ () => removerArtistaInput(index) }>
            Remover
          </button>
        </div>
      </Fragment>
    )
  }

  function setArtistaInput(index, valor) {
    if(index < artistas.length) {
      let novosArtistas = [...artistas]
      novosArtistas[index] = valor
      setArtistas(novosArtistas)
    }
  }

  function pushArtistas() {
    let novosArtistas = [...artistas]
    novosArtistas.push('')
    setArtistas(novosArtistas)
  }

  function removerArtistaInput(index) {
    if(artistas.length > 1) {
      let novosArtistas = [...artistas]
      novosArtistas.splice(index, 1)
      setArtistas(novosArtistas)
    }
  }

  return (
    <main className={ style.container }>
      <h1>
        Atualizar Música
      </h1>

      <form className={ style.form }>
        <label className={ style.label }>
          Nome da música
        </label>
        <input type='text' 
          value={ nome }        
          onChange={ e => setNome(e.target.value) }
          required>
        </input>

        <label className={ style.label }>
          Duração
        </label>
        <input type='number' 
          value={ duracao }
          min='0'
          onChange={ e => setDuracao(e.target.value) }
          required>
        </input>
        
        {
          artistas.map((a, i) => artistaInput(i))
        }
        <button type='button'
            onClick={ pushArtistas }>
          Incluir outro artista
        </button>

        <button type='submit'>
          Salvar
        </button>
      </form>

      <SideBar></SideBar>
    </main>
  )
}
