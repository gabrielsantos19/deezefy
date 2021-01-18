import { pool } from "../../lib/pool.js"
import * as usuario from "../../lib/usuario.js"


export default (req, res) => {
  if(req.method == "GET") {
    return get(req, res)
  }
  else if (req.method == "POST") {
    return post(req, res)
  }
  else if (req.method == "PUT") {
    return put(req, res)
  }
  else if (req.method == "DELETE") {
    return deleteMethod(req, res)
  }
  else {
    return res.status(405).end()
  }
}

async function get(req, res) {
  await pool.query(`SELECT * FROM artista
                    JOIN usuario ON usuario.email = artista.usuario`)
  .then(results => {
    console.log(results)
    res.status(200).json({
      artistas: results.rows,
    })
  })
  .catch(error => {
    console.error(error)
    res.status(500).end()
  })
}

async function post(req, res) {
  const artista = req.body
  
  await usuario.post(artista)
  .then(results => {})
  .catch(error => {})

  await pool.query(`INSERT INTO artista
                    (nome_artistico, biografia, ano_de_formacao, usuario)
                    VALUES ($1, $2, $3, $4)`, 
                    [
                        artista.nome_artistico, 
                        artista.biografia, 
                        artista.ano_de_formacao,
                        artista.email
                    ])
  .then(results => {
    console.log(results)
    res.status(201).end()
  })
  .catch(error => {
    console.error(error)
    res.status(500).end()
  })
}

async function put(req, res) {
  const artista = req.body

  await usuario.put(artista)
  .then(results => {
    console.log(results)
    res.status(200).end()
  })
  .catch(error => {
    console.error(error)
    res.status(500).end()
  })
}

async function deleteMethod(req, res) {
  const artista = req.body
  
  await pool.query(`DELETE FROM artista 
                    WHERE usuario = $1`, 
                    [
                        artista.email
                    ])
  .then(results => {
    console.log(results)
    res.status(200).end()
  })
  .catch(error => {
    console.error(error)
    res.status(500).end()
  })
}
