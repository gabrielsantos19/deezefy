import { useState } from 'react'
import SideBar from '../../components/sidebar';
import style from '../../styles/Cadastro.module.css'


export default function CadastrarArtista() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [nomeArtistico, setNomeArtistico] = useState('')
  const [biografia, setBiografia] = useState('')
  const [anoDeFormacao, setAnoDeFormacao] = useState('')
  const [disponivel, setDisponivel] = useState(true)

  async function cadastrar() {
    setDisponivel(false);
    fetch('/api/artista', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome_artistico: nomeArtistico,
        biografia: biografia,
        ano_de_formacao: anoDeFormacao,
        email: email,
        senha: senha
      })
    })
    .then(response => {
      setSenha('');
      setDisponivel(true);
    })
  }

  return (
    <main>
      <div>
        <h1>Cadastro</h1>
  
        <label>E-mail</label>
        <input type='text' 
          value={ email }        
          onChange={ e => setEmail(e.target.value) }>
        </input>
        
        <label>Senha</label>
        <input type='text' 
          value={ senha }
          onChange={ e => setSenha(e.target.value) }>
        </input>

        <label>Nome artístico</label>
        <input type='text' 
          value={ nomeArtistico }
          onChange={ e => setNomeArtistico(e.target.value) }>
        </input>
        
        <label>Biografia</label>
        <input type='text' 
          value={ biografia }
          onChange={ e => setBiografia(e.target.value) }>
        </input>
        
        <label>Ano de formação</label>
        <input type='text' 
          value={ anoDeFormacao }
          onChange={ e => setAnoDeFormacao(e.target.value) }>
        </input>

        <button onClick={ cadastrar } 
          disabled={ !disponivel }
          type='submit'>
          Cadastrar
        </button>
      </div>

      <SideBar></SideBar>
    </main>
  )
}
