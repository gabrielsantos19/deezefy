import { TokenExpiredError } from "jsonwebtoken";
import { useState, useEffect } from "react";
import SideBar from "../components/sidebar";
import style from '../styles/Conta.module.css'


export default function Perfil() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  function sair() {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <div className={ style.container }>
      <h1>Perfil</h1>
      <div>
        <div>
          { token }
        </div>
        <button onClick={sair}>
          Sair
        </button>
      </div>

      <SideBar></SideBar>
    </div>
  )
}
