import { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import SideBar from '../components/sidebar'
import style from '../styles/Atualizar.module.css'


export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [status, setStatus] = useState(1);
  const [mensagem, setMensagem] = useState('');
  const [token, setToken] = useState({})

  useEffect(() => {
    const tokenRaw = localStorage.getItem('token')
    if(tokenRaw) {
      setToken(jwt.decode(tokenRaw))
    }
  }, [])
  
  async function login() {
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
      localStorage.setItem('token', json.token)
      const tokenRaw = localStorage.getItem('token')
      if(tokenRaw) {
        setToken(jwt.decode(tokenRaw))
        setMensagem('Sucesso!')
      }
    })
    .catch(error => {
      setMensagem('Erro!')
    })
  }

  function sair() {
    localStorage.removeItem('token')
    const tokenRaw = localStorage.getItem('token')
    if(!tokenRaw) {
      setMensagem()
      setToken({})
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    login()
  }

  return (
    <main className={ style.container }>
      <h1>Login</h1>

      <h2>{ mensagem }</h2>
      
      {
        token.email ? (
          <>
            <div>
              Logado como:
            </div>
            { token.email }
            <div>
              <button type='button'
                onClick={ sair }>
                Sair
              </button>
            </div>
          </>
        ) : ''
      }
      <form className={ style.form }
          onSubmit={ handleSubmit }>
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

        <button
            disabled={ !status }
            type='submit'>
          Entrar
        </button>
      </form>
        

      <SideBar></SideBar>
    </main>
  )
}
