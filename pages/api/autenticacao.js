import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { MdTapAndPlay } from 'react-icons/md'
import * as usuario from '../../lib/usuario.js'


export default function Autenticacao(req, res) {
  if (req.method == 'POST') {
    return post(req, res)
  }
  else {
    return res.status(405).end()
  }
}

async function post(req, res) {
  const {email, senha} = req.body
  
  await usuario.get(email)
  .then(result => {
    console.log(result)
    
    if(bcrypt.compareSync(senha, result.rows[0].senha)) {
      const payload = {
        email: result.rows[0].email,
        exp: 3000
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET)
      
      res.status(200).json({
        token: token
      })
    }
    else {
      res.status(500).end()
    }
  })
  .catch(error => {
    console.error(error);
    res.status(500).end()
  })
}
