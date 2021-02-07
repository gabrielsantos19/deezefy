import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SideBar from '../../components/sidebar'


export default function Artista() {
  const router = useRouter()

  const query = router.query
  const [nomeArtistico, setNomeArtistico] = useState('')
  const [biografia, setBiografia] = useState('')
  const [anoDeFormacao, setAnoDeFormacao] = useState(0)
  const [email, setEmail] = useState('')
  const [disponivel, setDisponivel] = useState(true)

  useEffect(() => {
    fetch(`/api/artista?email=${ query.email }`)
    .then(response => response.json())
    .then(json => {
      setNomeArtistico(json.artista.nome_artistico)
      setBiografia(json.artista.biografia)
      setAnoDeFormacao(json.artista.ano_de_formacao)
      setEmail(json.artista.email)
    })
    .catch(() => {})
  }, [])

  async function putArtista() {
    setDisponivel(false)
    fetch('/api/artista', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome_artistico: nomeArtistico,
        biografia: biografia,
        ano_de_formacao: anoDeFormacao,
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
    putArtista()
  }

  return (
    <main>
      <h1>
        Atualizar artista
      </h1>
      <div>
        <form onSubmit={ submitHandler }>
          <label>nome artistico:</label>
          <input value={ nomeArtistico }
            onChange={ e => setNomeArtistico(e.target.value) }>
          </input>

          <label>biografia:</label>
          <input value={ biografia }
            onChange={ e => setBiografia(e.target.value) }>
          </input>

          <label>ano_de_formacao:</label>
          <input value={ anoDeFormacao }
            onChange={ e => setAnoDeFormacao(e.target.value) }>
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
