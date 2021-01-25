import { TokenExpiredError } from "jsonwebtoken";
import { useState, useEffect } from "react";
import SideBar from "../components/sidebar";
import style from '../styles/Conta.module.css'


export default function Perfil() {
  return (
    <div className={ style.container }>
      <h1>Perfil</h1>
      <div>
        <div>
          {getToken()}
        </div>
        <button onClick={removeToken}>
          Sair
        </button>
      </div>

      <SideBar></SideBar>
    </div>
  )
}

function getToken() {
  return localStorage.getItem('token')
}

function removeToken() {
  localStorage.removeItem('token')
}
