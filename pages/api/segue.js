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
  const { ouvinte } = req.query

  await pool.query(
    `SELECT * 
    FROM segue
    WHERE ouvinte = $1`,
    [
      ouvinte
    ]
  )
  .then(results => {
    console.log(results)
    res.status(200).json({
      seguidos: results.rows
    })
  })
  .catch(error => {
    console.error(error)
    res.status(500).end()
  })
}

async function post(req, res) {
  const segue = req.body
  
  await pool.query(
    `INSERT INTO segue (artista, ouvinte)
    VALUES ($1, $2)`, 
    [
      segue.artista,
      segue.ouvinte
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
  res.status(500).end()
}

async function deleteMethod(req, res) {
  const segue = req.body

  await pool.query(
    `DELETE FROM segue 
    WHERE artista = $1 AND ouvinte = $2`, 
    [
      segue.artista,
      segue.ouvinte
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
