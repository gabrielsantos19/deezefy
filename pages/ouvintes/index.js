import { useState, useEffect } from "react";
import Link from 'next/link';
import style from '../../styles/Home.module.css'
import Ouvinte from '../../components/ouvinte'
import SideBar from '../../components/sidebar';


export default function Ouvintes() {
  const [ouvintes, setOuvintes] = useState([]);

  useEffect(() => {
    fetch('/api/ouvintes')
    .then(results => results.json())
    .then(json => setOuvintes(json.ouvintes));
  }, []);

  return (
    <main>
      
      <div className={ style.lista }>
        <div className={ style.menu }>
          <h1>Ouvintes</h1>
          <div>
            <Link href='/ouvintes/cadastro'>
              <a>
                <button>Cadastrar</button>
              </a>
            </Link>
          </div>
        </div>
        {
          ouvintes.map(u => (
            <Ouvinte key={u.usuario} ouvinte={u}></Ouvinte>
          ))
        }
      </div>

      <SideBar></SideBar>
    </main>
  )
}
