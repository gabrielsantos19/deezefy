import { useState, useEffect } from "react";
import style from '../../styles/Home.module.css'
import Ouvinte from '../../components/ouvinte'
import SideBar from '../../components/sidebar';


export default function Ouvintes() {
  const [ouvintes, setOuvintes] = useState([]);

  useEffect(() => {
    fetch('/api/ouvinte')
    .then(results => results.json())
    .then(json => setOuvintes(json.ouvintes));
  }, []);

  return (
    <div className={ style.container }>
      <h1>Ouvintes</h1>
      <div className={ style.lista }>
        {
          ouvintes.map(u => (
            <Ouvinte key={u.usuario} ouvinte={u}></Ouvinte>
          ))
        }
      </div>

      <SideBar></SideBar>
    </div>
  )
}
