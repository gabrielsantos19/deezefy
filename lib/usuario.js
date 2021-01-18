import { pool } from './pool.js'


export function get(email) {
  return new Promise(function(resolve, reject) {
    pool.query(`SELECT * FROM usuario`)
      .then(results => resolve(results))
      .catch(error => reject(error))
  })
}

export function post(usuario) {
  if(!usuario.data_de_nascimento) {
    usuario.data_de_nascimento = null
  }

  return new Promise(function(resolve, reject) {
    pool.query(`INSERT INTO usuario 
                (email, senha, data_de_nascimento) 
                VALUES ($1, $2, $3)`, 
                [
                  usuario.email, 
                  usuario.senha, 
                  usuario.data_de_nascimento
                ])
      .then(results => resolve(results))
      .catch(error => reject(error))
  })
}

export function put(usuario) {
  return new Promise(function(resolve, reject) {
    pool.query(`UPDATE usuario SET
                email = $1,
                senha = $2,
                data_de_nascimento = $3
                WHERE email = $1`, 
                [
                  usuario.email,
                  usuario.senha,
                  usuario.data_de_nascimento
                ])
      .then(results => resolve(results))
      .catch(error => reject(error))
  })
}

export function deleteMethod() {
  return
}

