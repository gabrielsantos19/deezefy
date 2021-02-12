import bcrypt, { hash } from 'bcrypt'
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
  const client = await pool.connect()
  
  const hashedPassword = bcrypt.hashSync(ouvinte.senha, 10)

  try {
    await client.query('BEGIN')
    const usuarioInserido = await client.query(`
      INSERT INTO usuario
      (email, senha, data_de_nascimento)
      VALUES ($1, $2, $3)
      ON CONFLICT DO NOTHING`,
      [
        ouvinte.email,
        hashedPassword,
        ouvinte.data_de_nascimento
      ]
    )
    const ouvinteInserido = await client.query(
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
    const results = await client.query('COMMIT')

    console.log(results)
    res.status(201).end()
  }
  catch(error) {
    await client.query('ROLLBACK')
    console.error(error)
    res.status(500).end()
  }
  finally {
    client.release()
  }
}

async function put(req, res) {
  const antigo = req.body.antigo
  const novo = req.body.novo

  const client = await pool.connect()
  
  let hash
  if(novo.senha) {
    hash = bcrypt.hashSync(novo.senha, 10)
  }
  else {
    hash = antigo.senha
  }

  try {
    await client.query('BEGIN')
    await client.query(
      `UPDATE ouvinte SET
        primeiro_nome = $1, 
        sobrenome = $2, 
        telefone = $3, 
        usuario = $4
      WHERE usuario = $5`, 
      [
        novo.primeiro_nome,
        novo.sobrenome,
        novo.telefone,
        novo.usuario,
        antigo.usuario
      ]
    )
    await client.query(
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
    const results = await client.query('COMMIT')

    console.log(results)
    res.status(200).end()
  }
  catch(error) {
    await client.query('ROLLBACK')
    console.error(error)
    res.status(500).end()
  }
  finally {
    client.release()
  }
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
