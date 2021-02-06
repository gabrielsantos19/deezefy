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
  const query = req.query

  await pool.query(
    `SELECT * 
    FROM ouvinte
    JOIN usuario ON usuario.email = ouvinte.usuario
    WHERE email = $1`,
    [
      query.email
    ]
  )
  .then(results => {
    console.log(results)
    res.status(200).json({
      ouvinte: results.rows[0]
    })
  })
  .catch(error => {
    console.error(error)
    res.status(500).end()
  })
}

async function post(req, res) {
  const ouvinte = req.body
  
  await usuario.post(ouvinte)
  .then(results => {})
  .catch(error => {})

  await pool.query(
    `INSERT INTO ouvinte
    (primeiro_nome, sobrenome, telefone, usuario)
    VALUES ($1, $2, $3, $4)`, 
    [
      ouvinte.primeiro_nome,
      ouvinte.sobrenome,
      ouvinte.telefone,
      ouvinte.email
    ]
  )
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
  const ouvinte = req.body

  // await usuario.put(ouvinte)
  // .then(results => {
  //   console.log(results)
  // })
  // .catch(error => {
  //   console.error(error)
  // })

  await pool.query(
    `UPDATE ouvinte SET
    primeiro_nome = $1, 
    sobrenome = $2, 
    telefone = $3, 
    usuario = $4
    WHERE usuario = $4`, 
    [
      ouvinte.primeiro_nome,
      ouvinte.sobrenome,
      ouvinte.telefone,
      ouvinte.email
    ]
  )
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
  const ouvinte = req.body
  
  await pool.query(
    `DELETE FROM ouvinte 
    WHERE usuario = $1`, 
    [
      ouvinte.email
    ]
  )
  .then(results => {
    console.log(results)
    res.status(200).end()
  })
  .catch(error => {
    console.error(error)
    res.status(500).end()
  })
}
