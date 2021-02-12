import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import SideBar from '../../components/sidebar'
import style from '../../styles/Atualizar.module.css'


export default function Ouvinte() {
  const router = useRouter()

  const [antigo, setAntigo] = useState({})
  const [todosUsuarios, setTodosUsuarios] = useState([])

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [dataDeNascimento, setDataDeNascimento] = useState(null)
  
  const [primeiroNome, setPrimeiroNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [telefones, setTelefones] = useState([''])
  const [usuario, setUsuario] = useState('')

  const [disponivel, setDisponivel] = useState(true)
  const [deletado, setDeletado] = useState(false)

  
  useEffect(() => {
    const query = router.query

    fetch(`/api/ouvinte?email=${ query.email }`)
    .then(response => response.json())
    .then(json => {
      setAntigo(json.ouvinte)
      
      setEmail(json.ouvinte.email)
      if(json.ouvinte.data_de_nascimento) {
        const data = json.ouvinte.data_de_nascimento.split('T')[0]
        setDataDeNascimento(data)
      }

      setPrimeiroNome(json.ouvinte.primeiro_nome)
      setSobrenome(json.ouvinte.sobrenome)
      setTelefones(json.ouvinte.telefone)
      setUsuario(json.ouvinte.usuario)
    })
    .catch(() => {})
  }, [])

  useEffect(() => {
    fetch(`/api/usuarios`)
    .then(response => response.json())
    .then(json => {
      setTodosUsuarios(json.usuarios)
    })
    .catch(error => {})
  }, [])


  async function deleteUsuario() {
    setDisponivel(false)
    fetch('/api/usuario', {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: antigo.email
      })
    })
    .then(response => {
      setDisponivel(true);
    })
    .catch(error => {})
  }

  async function putOuvinte() {
    setDisponivel(false)
    fetch('/api/ouvinte', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        antigo: antigo,
        novo: {
          email: email,
          senha: senha,
          data_de_nascimento: dataDeNascimento,
          primeiro_nome: primeiroNome,
          sobrenome: sobrenome,
          telefone: telefones,
          usuario: email
        }
      })
    })
    .then(response => {
      setDisponivel(true);
    })
    .catch(error => {})
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

  function submitOuvinte(e) {
    e.preventDefault()
    putOuvinte()
  }

  return (
    <main>
      <div className={ style.container }>
        <h1>
          Atualizar Ouvinte
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
            Nova senha
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

          <label className={ style.label }>
            Usuário
          </label>
          <select className={ style.input }
              required 
              value={ usuario }
              onChange={ e => setUsuario(e.target.value) }>
            {
              todosUsuarios.map(u => (
                <option key={ u.email }
                    value={ u.email }>
                  { u.email }
                </option>
              ))
            }
          </select>

          <button type='submit'>
            Salvar alterações
          </button>

          <button type='button'
              onClick={ deleteUsuario }>
            Deletar usuário
          </button>
        </form>
      </div>

      <SideBar></SideBar>
    </main>
  )
}
