import bcrypt from 'bcrypt'
import { pool } from '../../lib/pool.js'


export default (req, res) => {
  if(req.method == 'GET') {
    return get(req, res)
  }
  else if (req.method == 'POST') {
    return post(req, res)
  }
  else if (req.method == 'PUT') {
    return put(req, res)
  }
  else if (req.method == 'DELETE') {
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
    FROM usuario
    WHERE email = $1`,
    [
      query.email
    ]
  )
  .then(results => {
    console.log(results)
    res.status(200).json({
      usuario: results.rows[0]
    })
  })
  .catch(error => {
    console.error(error)
    res.status(500).end()
  })
}

async function post(req, res) {
  res.status(500).end()
}

async function put(req, res) {
  const antigo = req.body.antigo
  const novo = req.body.novo

  const hash = bcrypt.hashSync(usuario.senha, 10)

  await pool.query(
    `UPDATE usuario SET
      email = $1,
      senha = $2,
      data_de_nascimento = $3
    WHERE email = $4`, 
    [
      novo.email,
      hash,
      novo.data_de_nascimento,
      antigo.email
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
  const usuario = req.body
  
  await pool.query(
    `DELETE FROM usuario 
    WHERE usuario = $1`, 
    [
      usuario.email
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

