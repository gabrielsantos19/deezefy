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
  await pool.query(`SELECT * FROM playlist`)
  .then(results => {
    console.log(results)
    res.status(200).json({
      playlists: results.rows,
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
  const playlist = req.body

  await pool.query(`UPDATE playlist SET
                    nome = $1, 
                    status = $2, 
                    criador = $3, 
                    data_de_criacao = $4
                    WHERE nome = $1`,
                    [
                      playlist.nome, 
                      playlist.status, 
                      playlist.criador, 
                      playlist.data_de_criacao
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
  const playlist = req.body
  
  await pool.query(`DELETE FROM playlist 
                    WHERE nome = $1`, 
                    [
                        playlist.nome
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
