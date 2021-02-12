import { Fragment, useState } from 'react'
import SideBar from '../../components/sidebar';
import style from '../../styles/Atualizar.module.css'


export default function Cadastro() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [dataDeNascimento, setDataDeNascimento] = useState(null)
  
  const [primeiroNome, setPrimeiroNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [telefones, setTelefones] = useState([''])
  const [usuario, setUsuario] = useState('')

  const [disponivel, setDisponivel] = useState(true)


  async function cadastrar() {
    setDisponivel(false);
    fetch('/api/ouvinte', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
        data_de_nascimento: dataDeNascimento,
        primeiro_nome: primeiroNome,
        sobrenome: sobrenome,
        telefone: telefones,
        usuario: email
      })
    })
    .then(response => {
      setSenha('');
      setDisponivel(true);
    })
  }

  function removerTelefone(index) {
    let novosTelefones = [...telefones]
    novosTelefones.splice(index, 1)
    setTelefones(novosTelefones)
  }

  function setTelefone(index, valor) {
    console.log(telefones)
    if(index < telefones.length) {
      let novosTelefones = [...telefones]
      novosTelefones[index] = valor
      setTelefones(novosTelefones)
    }
  }

  function pushTelefones() {
    let novosTelefones = [...telefones]
    novosTelefones.push('')
    setTelefones(novosTelefones)
  }

  function renderTelefoneInput(index) {
    return (
      <Fragment key={ index }>
        <label className={ style.label }>
          Telefone { index + 1 }
        </label>
        <div className={ style.bloco }>
          <input className={ style.input }
            value={ telefones[index] }
            onChange={ e => setTelefone(index, e.target.value) }>
          </input>
          <button type='button'
              onClick={ () => removerTelefone(index) }>
            REMOVER
          </button>
        </div>
      </Fragment>
    )
  }

  async function submitOuvinte(e) {
    e.preventDefault()
    cadastrar()
  }

  return (
    <main className={ style.container }>
      <h1>
        Cadastrar Ouvinte
      </h1>

      <form
          className={ style.form }
          onSubmit={ submitOuvinte }>
        
        <label className={ style.label }>
          E-mail
        </label>
        <input className={ style.input }
          value={ email }
          onChange={ e => setEmail(e.target.value) }>
        </input>
      
        <label className={ style.label }>
          Senha
        </label>
        <input className={ style.input }
          onChange={ e => setSenha(e.target.value) }>
        </input>

        <label className={ style.label }>
          Data de nascimento
        </label>
        <input className={ style.input }
          value={ dataDeNascimento ? dataDeNascimento : '' }
          type='date'
          onChange={ e => setDataDeNascimento(e.target.value) }>
        </input>

        <label className={ style.label }>
          Primeiro nome
        </label>
        <input className={ style.input }
          value={ primeiroNome }
          onChange={ e => setPrimeiroNome(e.target.value) }>
        </input>

        <label className={ style.label }>
          Sobrenome
        </label>
        <input className={ style.input }
          value={ sobrenome }
          onChange={ e => setSobrenome(e.target.value) }>
        </input>

        {
          telefones.map((t, i) => renderTelefoneInput(i))
        }
        <button type='button'
            onClick={ pushTelefones }>
          Adicionar outro telefone
        </button>
    
        <button 
          disabled={ !disponivel }
          type='submit'>
          Cadastrar ouvinte
        </button>
      </form>

      <SideBar></SideBar>
    </main>
  )
}
