import { useEffect, useState } from 'react';
import SideBar from  '../../components/sidebar';
import styles from '../../styles/AdicionarMusica.module.css'


export default function AdicionarMusica() {
  const [todosArtistas, setTodosArtistas] = useState([])
  const [artistas, setArtistas] = useState([])
  const [nome, setNome] = useState('');
  const [duracao, setDuracao] = useState('');
  const [disponivel, setDisponivel] = useState(true);

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
      setNome('');
      setDuracao('');
      setDisponivel(true);
    })
  }

  function artistaInput(index) {
    return (
      <div key={ index }>
        <label>Artista { index+1 }</label>
        <select 
            key={ index }
            value={ artistas[index] }
            onChange={ e => setArtistaInput(index, e.target.value) }>
          <option selected disabled hidden></option>
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
      <h1>Adicionar Música</h1>

      <div className={styles.form}>
        <label>Nome da música</label>
        <input type='text' 
          value={ nome }        
          onChange={ e => setNome(e.target.value) }>
        </input>

        <label>Duração</label>
        <input type='number' 
          value={ duracao }
          onChange={ e => setDuracao(e.target.value) }>
        </input>
        
        {
          artistas.map((a, i) => artistaInput(i))
        }
        {
          artistaInput(artistas.length)
        }

        <button onClick={ adicionar } 
          disabled={ !disponivel }
          type='submit'>Enviar
        </button>
      </div>

      <SideBar></SideBar>
    </main>
  )
}
