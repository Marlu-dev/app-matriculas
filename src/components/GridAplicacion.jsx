import React, { useEffect, useState } from 'react'
import '../style/GridAplication.css'
import BarraTitulo from './gridAplication/BarraTitulo'
import BarraLateral2 from './gridAplication/BarraLateral2/BarraLateral2'
import Centro from './gridAplication/Main/Centro'


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

      <header className='header_principal'>
          <nav>
            {/* <ul className="links-nav_principal">
              <li><a href={`/menu`}>Inicio</a></li>
              <li><a href={`/registro`}>Matriculas</a></li>
              <li><a href={`/recuperar`}>Informacion</a></li>
            </ul> */}
            <a href="#" class= "btn-accion_principal">
              
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M10 12h4v4h-4z" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell-plus" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12.5 17h-8.5a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6a2 2 0 1 1 4 0a7 7 0 0 1 4 6v1" />
                <path d="M9 17v1a3 3 0 0 0 3.51 2.957" />
                <path d="M16 19h6" />
                <path d="M19 16v6" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell-ringing" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727" />
                <path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727" />
              </svg>
            </a>
            
          </nav>
          <a className="btns-nav_principal" href="#">
            <button>Registrar</button>
            <button>Iniciar Sesion</button>
          </a>
        
      </header>


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
