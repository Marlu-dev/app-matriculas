import React, { useEffect, useContext } from 'react'
import BtnBarraLateral from './BtnBarraLateral'
import { useBarraToggle, useEstadoBarra, useSeleccion, useSeleccionToggle } from '../../EstadoBarraLateralProvider'
import { userContext } from '../../Login'

const BarraLateral2 = ({ menuSeleccionado }) => {
  const { user, temporada } = useContext(userContext)
  const hola = () => {
  }

  console.log(user, temporada)

  const cambio = useBarraToggle()
  const menuExpandido = useEstadoBarra()
  const seleccion = useSeleccion()
  const cambioSeleccion = useSeleccionToggle()

  const handleRecargar = () => {
    window.location.reload()
  }

  useEffect(() => {
    menuSeleccionado(seleccion)
  }, [seleccion])

  return (
    <>
      <div style={{ height: '20%', width: '100%' }}>
        <BtnBarraLateral
          name={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-layout-sidebar-left-expand'
              width='44'
              height='44'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#00abfb'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z' />
              <path d='M9 4v16' />
              <path d='M14 10l2 2l-2 2' />
            </svg>
        }
          titulo='Contraer'
          funcion={cambio}
          expandido={menuExpandido}
          seleccion={cambioSeleccion}
          tituloParaMostrar='Contraer'
        />

        <BtnBarraLateral
          name={
            <svg
              xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-home' width='44'
              height='44'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#00abfb'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            ><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M5 12l-2 0l9 -9l9 9l-2 0' /><path d='M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7' /><path d='M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6' />
            </svg>
        }
          titulo='MenuInicial'
          funcion={hola}
          expandido={menuExpandido}
          seleccion={cambioSeleccion}
          tituloParaMostrar='Inicio'
        />

      </div>
      <div style={{ height: '60%', width: '100%' }}>
        <BtnBarraLateral
          name={
            <svg
              xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-user-plus' width='44'
              height='44'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#00abfb'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            ><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' /><path d='M16 19h6' /><path d='M19 16v6' /><path d='M6 21v-2a4 4 0 0 1 4 -4h4' />
            </svg>
        }
          titulo='RegistroAlumno'
          funcion={hola}
          expandido={menuExpandido}
          seleccion={cambioSeleccion}
          tituloParaMostrar='Registrar Alumno'
        />
        <BtnBarraLateral
          name={
            <svg
              xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-user-search' width='44'
              height='44'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#00abfb'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            ><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' /><path d='M6 21v-2a4 4 0 0 1 4 -4h1.5' /><path d='M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' /><path d='M20.2 20.2l1.8 1.8' />
            </svg>
        }
          titulo='RecuperarAlumnos'
          funcion={hola}
          expandido={menuExpandido}
          seleccion={cambioSeleccion}
          tituloParaMostrar='Buscar Alumno'
        />

        <BtnBarraLateral
          name={
            <svg
              xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-library-plus' width='44'
              height='44'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#00abfb'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            ><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M7 3m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z' /><path d='M4.012 7.26a2.005 2.005 0 0 0 -1.012 1.737v10c0 1.1 .9 2 2 2h10c.75 0 1.158 -.385 1.5 -1' /><path d='M11 10h6' /><path d='M14 7v6' />
            </svg>
        }
          titulo='RegistroMatricula'
          funcion={hola}
          expandido={menuExpandido}
          seleccion={cambioSeleccion}
          tituloParaMostrar='Registrar Matricula'
        />

        <BtnBarraLateral
          name={
            <svg
              xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-report-money' width='44'
              height='44'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#00abfb'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            ><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2' /><path d='M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z' /><path d='M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5' /><path d='M12 17v1m0 -8v1' />
            </svg>
        }
          titulo='GestionPagos'
          funcion={hola}
          expandido={menuExpandido}
          seleccion={cambioSeleccion}
          tituloParaMostrar='Gestionar Pagos'
        />
      </div>

      <div style={{ height: '20%', width: '100%' }}>

        <BtnBarraLateral
          name={
            <svg
              xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-user' width='44'
              height='44'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#00abfb'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            ><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' /><path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
            </svg>

        }
          titulo={seleccion}
          funcion={hola}
          expandido={menuExpandido}
          seleccion={cambioSeleccion}
          tituloParaMostrar={user}
        />
        <BtnBarraLateral
          name={
            <svg
              xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-transfer-out' width='44'
              height='44'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#00abfb'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            ><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M4 19v2h16v-14l-8 -4l-8 4v2' /><path d='M13 14h-9' /><path d='M7 11l-3 3l3 3' />
            </svg>
        }
          titulo={seleccion}
          funcion={handleRecargar}
          expandido={menuExpandido}
          seleccion={cambioSeleccion}
          tituloParaMostrar='Cerrar Sesión'
        />
      </div>

    </>
  )
}

export default BarraLateral2
