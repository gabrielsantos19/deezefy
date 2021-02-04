import { useEffect, useState } from 'react';
import SideBar from  '../../components/sidebar';
import styles from '../../styles/AdicionarMusica.module.css'


export default function AdicionarMusica() {
  const [artistas, setArtistas] = useState([])
  const [nome, setNome] = useState('');
  const [criador, setCriador] = useState('');
  const [disponivel, setDisponivel] = useState(true);

  useEffect(() => {
    fetch('/api/artista')
    .then(response => response.json())
    .then(json => setArtistas(json.artistas))
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
        criador: criador,
        status: 'ativo'
      })
    })
    .then(response => {
      setNome('');
      setCriador('');
      setDisponivel(true);
    })
  }

  return (
    <main>
      <h1>Criar playlist</h1>

      <div>
        <div className={styles.form}>
          <label>Nome</label>
          <input type='text' 
            value={ nome }        
            onChange={ e => setNome(e.target.value) }>
          </input>

          <label>criador</label>
          <select onChange={ e => setCriador(e.target.value) }>
            {
              artistas.map(a => (
                <option key={a.usuario} value={a.usuario}>
                  {a.nome_artistico}
                </option>
              ))
            }
          </select>
          
          <button onClick={ adicionar } 
            disabled={ !disponivel }
            type='submit'>
            Enviar
          </button>
        </div>
      </div>

      <SideBar></SideBar>
    </main>
  )
}
