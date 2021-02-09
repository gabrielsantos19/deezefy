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
    FROM playlist
    WHERE nome = $1
      AND criador = $2`,
    [
      query.nome,
      query.criador
    ]
  )
  .then(results => {
    console.log(results)
    res.status(200).json({
      playlist: results.rows[0],
    })
  })
  .catch(error => {
    console.error(error)
    res.status(500).end()
  })
}

async function post(req, res) {
  const playlist = req.body
  const dataObj = new Date()
  const data = dataObj.toISOString().split('T')[0]

  await pool.query(
    `INSERT INTO playlist
    (nome, status, criador, data_da_criacao)
    VALUES ($1, $2, $3, $4)`, 
    [
      playlist.nome, 
      playlist.status, 
      playlist.criador, 
      data
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
  const antiga = req.body.antiga
  const nova = req.body.nova

  await pool.query(
    `UPDATE playlist SET
    nome = $1, 
    status = $2, 
    criador = $3, 
    data_da_criacao = $4
    WHERE nome = $5
      AND criador = $6`,
    [
      nova.nome, 
      nova.status, 
      nova.criador, 
      nova.data_da_criacao,
      antiga.nome,
      antiga.criador
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
  const playlist = req.body
  
  await pool.query(
    `DELETE FROM playlist 
    WHERE nome = $1
    AND criador = $2`, 
    [
      playlist.nome,
      playlist.criador
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
