import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SideBar from '../../components/sidebar'


export default function Musica() {
  const router = useRouter()
  const query = router.query
  const [id, setId] = useState('')
  const [nome, setNome] = useState('')
  const [duracao, setDuracao] = useState(0)
  const [disponivel, setDisponivel] = useState(true)

  useEffect(() => {
    fetch(`/api/musica?id=${ query.id }`)
    .then(response => response.json())
    .then(json => {
      setId(json.musica.id)
      setNome(json.musica.nome)
      setDuracao(json.musica.duracao)
    })
    .catch(() => {})
  }, [])

  async function putMusica() {
    setDisponivel(false)
    fetch('/api/musica', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        nome: nome,
        duracao: duracao
      })
    })
    .then(response => {
      setDisponivel(true);
    })
    .catch(error => {})
  }

  function submitHandler(e) {
    e.preventDefault()
    putMusica()
  }

  return (
    <main>
      <h1>
        Atualizar Música
      </h1>
      <div>
        <form onSubmit={ submitHandler }>
          <label>id:</label>
          <input value={ id }
            onChange={ e => setId(e.target.value) }>
          </input>

          <label>nome:</label>
          <input value={ nome }
            onChange={ e => setNome(e.target.value) }>
          </input>

          <label>duração:</label>
          <input value={ duracao }
            onChange={ e => setDuracao(e.target.value) }>
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
