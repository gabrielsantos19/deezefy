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
  await pool.query(`SELECT * FROM curte`)
  .then(results => {
    console.log(results)
    res.status(200).json({
      curtidas: results.rows
    })
  })
  .catch(error => {
    console.error(error)
    res.status(500).end()
  })
}

async function post(req, res) {
  const curte = req.body

  await pool.query(
    `INSERT INTO curte
    (musica, ouvinte)
    VALUES ($1, $2)`, 
    [
      curte.musica,
      curte.ouvinte
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
  const curte = req.body

  await pool.query(
    `DELETE FROM curte 
    WHERE musica = $1 AND ouvinte = $2`, 
    [
      curte.musica,
      curte.ouvinte
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
