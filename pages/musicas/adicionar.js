import { useEffect, useState } from 'react';
import SideBar from  '../../components/sidebar';
import styles from '../../styles/AdicionarMusica.module.css'


export default function AdicionarMusica() {
  const [artistas, setArtistas] = useState([])
  const [artista, setArtista] = useState('')
  const [nome, setNome] = useState('');
  const [duracao, setDuracao] = useState('');
  const [disponivel, setDisponivel] = useState(true);

  useEffect(() => {
    fetch('/api/artista')
    .then(response => response.json())
    .then(json => setArtistas(json.artistas))
    .catch(error => {})
  }, [])

  async function adicionar() {
    setDisponivel(false);
    fetch('/api/grava', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        artista: artista,
        musica: {
          nome: nome,
          duracao: duracao
        }
      })
    })
    .then(response => {
      setNome('');
      setDuracao('');
      setDisponivel(true);
    })
  }

  return (
    <div className={ styles.container }>
      <h1>Adicionar Música</h1>

      <div className={styles.form}>
        <label>Artista</label>
        <select onChange={ e => setArtista(e.target.value) }>
          {
            artistas.map(a => (
              <option key={a.usuario} value={a.usuario}>
                {a.nome_artistico}
              </option>
            ))
          }
        </select>

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
        
        <button onClick={ adicionar } 
          disabled={ !disponivel }
          type='submit'>Enviar
        </button>
      </div>

      <SideBar></SideBar>
    </div>
  )
}
