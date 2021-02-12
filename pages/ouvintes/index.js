import { useState, useEffect } from 'react'
import Link from 'next/link';
import { MdAdd } from 'react-icons/md'
import style from '../../styles/Home.module.css'
import Ouvinte from '../../components/ouvinte'
import SideBar from '../../components/sidebar'


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
          <div className={ style.titulo }>
            Ouvintes
          </div>
          <div>
            <Link href='/ouvintes/cadastro'>
              <a>
                <button className={ style.botaoCriar }>
                  <MdAdd></MdAdd>Cadastrar
                </button>
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
