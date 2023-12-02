import React, { useEffect, useState } from 'react'
import '../style/GridAplication.css'
import BarraTitulo from './gridAplication/BarraTitulo'
import BarraLateral2 from './gridAplication/BarraLateral2/BarraLateral2'
import Centro from './gridAplication/Main/Centro'
import logo from "../style/img/logo.jpg"

const GridAplicacion = () => {
  const [menuSeleccionadoBarraLateral2, setMenuSeleccionadoBarraLateral2] =
    useState('')

  // console.log(menuSeleccionadoBarraLateral2);

  const recuperarMenuSeleccionadoBarraLateral2 = (menu) => {
    setMenuSeleccionadoBarraLateral2(menu)
  }

  return (
    <>
      <div className='barraTitulo'>
        <BarraTitulo />
      </div>
      <div className='barraLateral1'>Barra Lateral 1</div>
      <div className='barraLateral2 barraLateral2Expandido' id='barraLateral2'>
        <BarraLateral2
          menuSeleccionado={recuperarMenuSeleccionadoBarraLateral2}
        />
      </div>
      <div className='header'>Header
          <header className="menu-de-pruebas">
          <div className="logo-nav">
                <img src= {logo} alt="LOGO NOBEL" />
          </div>
          <nav>
            <ul className="links-nav">
              <li><a href={`/menu`}>Inicio</a></li>
              <li><a href={`/registro`}>Matriculas</a></li>
              <li><a href={`/recuperar`}>Informacion</a></li>
              {/* <Link to={`/menu`}>Inicio</Link>
              <Link to={`/registro`}>Matriculas</Link>
              <Link to={`/recuperar`}>Informacion</Link>
              <Link to={`/`}>Registrarse</Link>
              <Link to={`/`}>Iniciar Sesion</Link> */}
            </ul>
          </nav>
          <a className="btns-nav" href="#">
            <button>Registrar</button>
            <button>Iniciar Sesion</button>
          </a>
        </header>
      </div>
      <div className='main'>
        <Centro menuSeleccionadoBarraLateral2={menuSeleccionadoBarraLateral2} />
      </div>
      {/* <div className="aside" id="aside">
        Aside
      </div> */}
    </>
  )
}

export default GridAplicacion
