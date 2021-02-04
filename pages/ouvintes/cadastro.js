import { useState } from 'react'
import SideBar from '../../components/sidebar';
import style from '../../styles/Cadastro.module.css'


export default function Cadastro() {
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

  async function submitHandler(e) {
    e.preventDefault()
    cadastrar()
  }

  return (
    <main>
      <div className={ style.container }>
        <h1>Cadastro de Ouvinte</h1>
  
        <form className={ style.formulario } onSubmit={ submitHandler }>
          <div className={ style.campo }>
            <label>E-mail</label>
            <input type='text' 
              value={ email }        
              onChange={ e => setEmail(e.target.value) }>
            </input>
          </div>
          
          <div className={ style.campo }>
            <label>Senha</label>
            <input type='text' 
              value={ senha }
              onChange={ e => setSenha(e.target.value) }>
            </input>
          </div>
    
          <div className={ style.campo }>
            <label>Primeiro nome</label>
            <input type='text' 
              value={ primeiroNome }
              onChange={ e => setPrimeiroNome(e.target.value) }>
            </input>
          </div>
          
          <div className={ style.campo }>
            <label>Sobrenome</label>
            <input type='text' 
              value={ sobrenome }
              onChange={ e => setSobrenome(e.target.value) }>
            </input>
          </div>
          
          <div className={ style.campo }>
            <label>Telefone</label>
            <input type='text' 
              value={ telefone }
              onChange={ e => setTelefone(e.target.value) }>
            </input>
          </div>
    
          <div className={ style.botaoEnviar }>
            <button 
              disabled={ !disponivel }
              type='submit'>
              Cadastrar
            </button>
          </div>
        </form>
      </div>
      

      <SideBar></SideBar>
    </main>
  )
}
