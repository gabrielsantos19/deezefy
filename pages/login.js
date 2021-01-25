import { useState } from 'react'
import SideBar from '../components/sidebar';
import style from '../styles/Login.module.css'


export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [status, setStatus] = useState(1);
  const [mensagem, setMensagem] = useState('');
  
  function login() {
    setMensagem('...')
    fetch('/api/autenticacao', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        senha: senha
      })
    })
    .then(response => response.json())
    .then(json => {
      setMensagem('Sucesso!')
      localStorage.setItem('token', json.token)
    })
    .catch(error => {
      setMensagem('Erro!')
    })
  }

  return (
    <div className={ style.container }>
      <div>
        <h1>Login</h1>

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
        <button onClick={ login } 
          disabled={ !status }
          type='submit'>Entrar
        </button>
        <h2>
          { mensagem }
        </h2>
      </div>

      <SideBar></SideBar>
    </div>
  )
}
