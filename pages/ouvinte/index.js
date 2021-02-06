import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SideBar from '../../components/sidebar'


export default function Ouvinte() {
  const router = useRouter()

  const query = router.query
  const [primeiroNome, setPrimeiroNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [telefone, setTelefone] = useState([])
  const [email, setEmail] = useState('')
  const [disponivel, setDisponivel] = useState(true)

  useEffect(() => {
    fetch(`/api/ouvinte?email=${ query.email }`)
    .then(response => response.json())
    .then(json => {
      setPrimeiroNome(json.ouvinte.primeiro_nome)
      setSobrenome(json.ouvinte.sobrenome)
      setTelefone(json.ouvinte.telefone)
      setEmail(json.ouvinte.email)
    })
    .catch(() => {})
  }, [])

  async function putOuvinte() {
    setDisponivel(false)
    fetch('/api/ouvinte', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        primeiro_nome: primeiroNome,
        sobrenome: sobrenome,
        telefone: telefone,
        email: email
      })
    })
    .then(response => {
      setDisponivel(true);
    })
    .catch(error => {})
  }

  function submitHandler(e) {
    e.preventDefault()
    putOuvinte()
  }

  return (
    <main>
      <h1>
        Atualizar Ouvinte
      </h1>
      <div>
        <form onSubmit={ submitHandler }>
          <label>primeiro nome:</label>
          <input value={ primeiroNome }
            onChange={ e => setPrimeiroNome(e.target.value) }>
          </input>

          <label>sobrenome:</label>
          <input value={ sobrenome }
            onChange={ e => setSobrenome(e.target.value) }>
          </input>

          <label>telefone:</label>
          <input value={ telefone }
            onChange={ e => setTelefone(e.target.value) }>
          </input>

          <label>email:</label>
          <input value={ email }
            onChange={ e => setEmail(e.target.value) }>
          </input>

          <button type='submit'>
            Salvar
          </button>
        </form>
      </div>

      <SideBar></SideBar>
    </main>
  )
}
