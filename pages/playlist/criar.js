import { useEffect, useState } from 'react';
import SideBar from  '../../components/sidebar';
import styles from '../../styles/AdicionarMusica.module.css'


export default function AdicionarMusica() {
  const [nome, setNome] = useState('');
  const [criador, setCriador] = useState('');
  const [disponivel, setDisponivel] = useState(true);

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
    <div className={ styles.container }>
      <h1>Criar playlist</h1>

      <div>
        <div className={styles.form}>
          <label>Nome</label>
          <input type='text' 
            value={ nome }        
            onChange={ e => setNome(e.target.value) }>
          </input>

          <label>criador</label>
          <input 
            value={ criador }
            onChange={ e => setCriador(e.target.value) }>
          </input>
          
          <button onClick={ adicionar } 
            disabled={ !disponivel }
            type='submit'>
            Enviar
          </button>
        </div>
      </div>

      <SideBar></SideBar>
    </div>
  )
}
