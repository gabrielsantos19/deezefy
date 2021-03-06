import { useState, useEffect } from "react";
import SideBar from "../components/sidebar";


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
    <main>
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
    </main>
  )
}
