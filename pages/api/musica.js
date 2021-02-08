import { allowedStatusCodes } from "next/dist/lib/load-custom-routes"
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
  const { id } = req.query
  
  await pool.query(
    `WITH artistas AS (
      SELECT array_agg(artista) AS artistas
      FROM grava 
      WHERE musica = $1 
      GROUP BY musica
    )
    SELECT *
    FROM musica, artistas
    WHERE id = $1`,
    [
      id
    ]
  )
  .then(results => {
    console.log(results)
    
    res.status(200).json({
      musica: results.rows[0]
    })
  })
  .catch(error => {
    console.error(error)
    res.status(500).end()
  })
}

async function post(req, res) {
  const musica = req.body
  
  await pool.query(
    `WITH musica AS (
      INSERT INTO musica (nome, duracao) 
      VALUES ($1, $2) 
      RETURNING id AS musica
    ), artista AS (
      SELECT json_array_elements_text($3) 
      AS artista
    )
    INSERT INTO grava (artista, musica) 
      SELECT * FROM artista, musica`,
    [
      musica.nome,
      musica.duracao,
      JSON.stringify(musica.artistas)
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

async function put(req, res) {
  const musica = req.body

  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    await client.query(`
      DELETE FROM grava 
      WHERE musica = $1`,
      [
        musica.id
      ]
    )
    await client.query(`
      WITH musica AS (
        SELECT $1::INTEGER AS id
      ), artistas AS (
        SELECT json_array_elements_text($2) 
        AS artista
      )
      INSERT INTO grava (artista, musica) 
        SELECT * FROM artistas, musica`,
      [
        musica.id,
        JSON.stringify(musica.artistas)
      ]
    )
    await client.query(`
      UPDATE musica SET
        nome = $2,
        duracao = $3
      WHERE id = $1`,
      [
        musica.id,
        musica.nome,
        musica.duracao
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
