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
  await pool.query(`SELECT * FROM musica`)
  .then(results => {
    console.log(results)
    res.status(200).json({
      musicas: results.rows
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
  const musica = req.body

  await pool.query(
    `UPDATE musica SET
    nome = $1,
    duracao = $2
    WHERE id = $3`, 
    [
      musica.nome,
      musica.duracao,
      musica.id
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
  const musica = req.body

  await pool.query(
    `DELETE FROM musica 
    WHERE id = $1`, 
    [
      musica.id
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
