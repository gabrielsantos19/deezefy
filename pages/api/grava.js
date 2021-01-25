import { pool } from "../../lib/pool.js"


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
  await pool.query(`SELECT * FROM grava`)
  .then(results => {
    console.log(results)
    res.status(200).json({
      gravacoes: results.rows
    })
  })
  .catch(error => {
    console.error(error)
    res.status(500).end()
  })
}

async function post(req, res) {
  const grava = req.body
  let id_musica = undefined

  await pool.query(
    `INSERT INTO musica
    (nome, duracao)
    VALUES ($1, $2)
    RETURNING id`, 
    [
      grava.musica.nome,
      grava.musica.duracao
    ]
  )
  .then(results => {
    console.log(results)
    id_musica = results.rows[0].id
  })
  .catch(error => {
    console.error(error)
    res.status(500).end()
  })

  if(id_musica) {
    await pool.query(
      `INSERT INTO grava
      (artista, musica) 
      VALUES ($1, $2)`,
      [
        grava.artista,
        id_musica
      ]
    )
    .then(results => {
        console.log(results)
        res.status(201).end()
    })
    .catch(error => {
        console.log(error)
        res.status(500).end()
    })
  }
}

async function put(req, res) {
  const {grava, novo} = req.body

  await pool.query(
    `UPDATE grava SET
    artista = $1,
    musica = $2
    WHERE artista = $3 AND musica = $4`, 
    [
      grava.artista,
      grava.musica,
      novo.artista,
      novo.musica
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

async function deleteMethod(req, res) {
  const grava = req.body

  await pool.query(
    `DELETE FROM grava 
    WHERE artista = $1 AND musica = $2`, 
    [
      grava.artista,
      grava.musica
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
