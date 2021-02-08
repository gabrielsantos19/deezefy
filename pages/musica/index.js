import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SideBar from '../../components/sidebar'


export default function Musica() {
  const [id, setId] = useState(0)
  const [nome, setNome] = useState('')
  const [duracao, setDuracao] = useState(0)
  const [artistas, setArtistas] = useState([])

  const [todosArtistas, setTodosArtistas] = useState([])
  const [disponivel, setDisponivel] = useState(true)

  const router = useRouter()
  useEffect(() => {
    const query = router.query

    fetch(`/api/musica?id=${ query.id }`)
    .then(response => response.json())
    .then(json => {
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
        id: id,
        nome: nome,
        duracao: duracao,
        artistas: artistas
      })
    })
    .then(response => {
      setDisponivel(true);
    })
    .catch(error => {})
  }

  function submitHandler(e) {
    e.preventDefault()
    putMusica()
  }

  function artistaInput(index) {
    return (
      <div key={ index }>
        <label>Artista { index+1 }</label>
        <select 
            key={ index }
            value={ index + 1 > artistas.length ? '' : artistas[index] }
            onChange={ e => setArtistaInput(index, e.target.value) }>
          <option disabled hidden></option>
          {
            todosArtistas.map(a => (
              <option key={index + a.usuario} value={a.usuario}>
                {a.nome_artistico}
              </option>
            ))
          }
        </select>
        <button onClick={ () => removerArtistaInput(index) }>
          Remover { index }
        </button>
      </div>
    )
  }

  function setArtistaInput(index, valor) {
    let novosArtistas = [...artistas]

    if(index == artistas.length) {
      novosArtistas.push(valor)
    }
    else
    {
      novosArtistas[index] = valor
    }
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
    <main>
      <h1>
        Atualizar Música
      </h1>
      <div>
        <form key={ nome }
            onSubmit={ submitHandler }>
          <label>id:</label>
          <input value={ id }
            onChange={ e => setId(e.target.value) }>
          </input>

          <label>nome:</label>
          <input value={ nome }
            onChange={ e => setNome(e.target.value) }>
          </input>

          <label>duração:</label>
          <input value={ duracao }
            onChange={ e => setDuracao(e.target.value) }>
          </input>

          {
            artistas.map((a, i) => artistaInput(i))
          }
          {
            artistaInput(artistas.length)
          }

          <button type='submit'>
            Salvar
          </button>
        </form>
      </div>

      <SideBar></SideBar>
    </main>
  )
}
