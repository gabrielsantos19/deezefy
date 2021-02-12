import { useEffect, useState, Fragment } from 'react'
import SideBar from  '../../components/sidebar'
import style from '../../styles/Atualizar.module.css'


export default function AdicionarMusica() {
  const [nome, setNome] = useState('')
  const [duracao, setDuracao] = useState('')
  const [artistas, setArtistas] = useState([''])

  const [todosArtistas, setTodosArtistas] = useState([])
  const [disponivel, setDisponivel] = useState(true)

  useEffect(() => {
    fetch('/api/artistas')
    .then(response => response.json())
    .then(json => setTodosArtistas(json.artistas))
    .catch(error => {})
  }, [])

  async function adicionar() {
    setDisponivel(false);
    fetch('/api/musica', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nome,
        duracao: duracao,
        artistas: artistas
      })
    })
    .then(response => {
      setNome('')
      setDuracao('')
      setDisponivel(true)
    })
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
              >
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

  function submitMusica(e) {
    e.preventDefault()
    adicionar()
  }

  return (
    <main className={ style.container }>
      <h1>
        Adicionar Música
      </h1>

      <form className={ style.form }
          onSubmit={ submitMusica }>
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

        <button
            disabled={ !disponivel }
            type='submit'>
          Enviar
        </button>
      </form>

      <SideBar></SideBar>
    </main>
  )
}
