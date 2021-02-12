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
    FROM artista
    JOIN usuario ON usuario.email = artista.usuario
    WHERE email = $1`,
    [
      query.email
    ]
  )
  .then(results => {
    console.log(results)
    res.status(200).json({
      artista: results.rows[0],
    })
  })
  .catch(error => {
    console.error(error)
    res.status(500).end()
  })
}

async function post(req, res) {
  const artista = req.body
  const client = await pool.connect()
  
  const hashedPassword = bcrypt.hashSync(artista.senha, 10)

  try {
    await client.query('BEGIN')
    const usuarioInserido = await client.query(`
      INSERT INTO usuario
      (email, senha, data_de_nascimento)
      VALUES ($1, $2, $3)
      ON CONFLICT DO NOTHING`,
      [
        artista.email,
        hashedPassword,
        artista.data_de_nascimento
      ]
    )
    const artistaInserido = await client.query(
      `INSERT INTO artista
      (nome_artistico, biografia, ano_de_formacao, usuario)
      VALUES ($1, $2, $3, $4)`, 
      [
        artista.nome_artistico, 
        artista.biografia, 
        artista.ano_de_formacao,
        artista.email
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
      `UPDATE artista SET
        nome_artistico = $1, 
        biografia = $2, 
        ano_de_formacao = $3, 
        usuario = $4
      WHERE usuario = $5`,
      [
        novo.nome_artistico, 
        novo.biografia, 
        novo.ano_de_formacao,
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
