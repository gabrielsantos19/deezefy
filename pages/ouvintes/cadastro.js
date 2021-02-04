import { makePublicRouterInstance } from 'next/router';
import { useState } from 'react'
import SideBar from '../../components/sidebar';
import style from '../../styles/Cadastro.module.css'


export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [primeiroNome, setPrimeiroNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [disponivel, setDisponivel] = useState(true)

  async function cadastrar() {
    setDisponivel(false);
    fetch('/api/ouvinte', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        primeiro_nome: primeiroNome,
        sobrenome: sobrenome,
        telefone: [telefone],
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
    <div className={ style.container }>
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

        <label>Primeiro nome</label>
        <input type='text' 
          value={ primeiroNome }
          onChange={ e => setPrimeiroNome(e.target.value) }>
        </input>
        
        <label>Sobrenome</label>
        <input type='text' 
          value={ sobrenome }
          onChange={ e => setSobrenome(e.target.value) }>
        </input>
        
        <label>Telefone</label>
        <input type='text' 
          value={ telefone }
          onChange={ e => setTelefone(e.target.value) }>
        </input>

        <button onClick={ cadastrar } 
          disabled={ !disponivel }
          type='submit'>
          Cadastrar
        </button>
      </div>

      <SideBar></SideBar>
    </div>
  )
}
