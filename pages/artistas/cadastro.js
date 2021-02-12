import { useState } from 'react'
import SideBar from '../../components/sidebar';
import style from '../../styles/Atualizar.module.css'


export default function CadastrarArtista() {
  const [antigo, setAntigo] = useState({})
  const [todosUsuarios, setTodosUsuarios] = useState([])

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [dataDeNascimento, setDataDeNascimento] = useState(null)

  const [nomeArtistico, setNomeArtistico] = useState('')
  const [biografia, setBiografia] = useState('')
  const [anoDeFormacao, setAnoDeFormacao] = useState(0)
  const [usuario, setUsuario] = useState('')

  const [disponivel, setDisponivel] = useState(true)

  async function cadastrar() {
    setDisponivel(false);
    fetch('/api/artista', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
        data_de_nascimento: dataDeNascimento,
        nome_artistico: nomeArtistico,
        biografia: biografia,
        ano_de_formacao: anoDeFormacao,
        usuario: email
      })
    })
    .then(response => {
      setSenha('');
      setDisponivel(true);
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    cadastrar()
  }

  return (
    <main className={ style.container }>
      <h1>
        Cadastrar Artista
      </h1>

      <form className={ style.form }
          onSubmit={ handleSubmit }>
        
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
          Nome artístico
        </label>
        <input className={ style.input }
          value={ nomeArtistico }
          onChange={ e => setNomeArtistico(e.target.value) }>
        </input>

        <label className={ style.label }>
          Biografia
        </label>
        <textarea className={ style.input }
          type='text'
          value={ biografia }
          onChange={ e => setBiografia(e.target.value) }>
        </textarea>

        <label className={ style.label }>
          Ano de formação
        </label>
        <input className={ style.input }
          type='number'
          min='1900'
          value={ anoDeFormacao }
          onChange={ e => setAnoDeFormacao(e.target.value) }>
        </input>

        <button
            disabled={ !disponivel }
            type='submit'>
          Cadastrar artista
        </button>
      </form>

      <SideBar></SideBar>
    </main>
  )
}
