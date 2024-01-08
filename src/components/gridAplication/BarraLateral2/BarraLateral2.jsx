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
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-maximize'
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
            <path d='M4 8v-2a2 2 0 0 1 2 -2h2' />
            <path d='M4 16v2a2 2 0 0 0 2 2h2' />
            <path d='M16 4h2a2 2 0 0 1 2 2v2' />
            <path d='M16 20h2a2 2 0 0 0 2 -2v-2' />
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
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-maximize'
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
            <path d='M4 8v-2a2 2 0 0 1 2 -2h2' />
            <path d='M4 16v2a2 2 0 0 0 2 2h2' />
            <path d='M16 4h2a2 2 0 0 1 2 2v2' />
            <path d='M16 20h2a2 2 0 0 0 2 -2v-2' />
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
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-maximize'
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
            <path d='M4 8v-2a2 2 0 0 1 2 -2h2' />
            <path d='M4 16v2a2 2 0 0 0 2 2h2' />
            <path d='M16 4h2a2 2 0 0 1 2 2v2' />
            <path d='M16 20h2a2 2 0 0 0 2 -2v-2' />
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
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-maximize'
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
            <path d='M4 8v-2a2 2 0 0 1 2 -2h2' />
            <path d='M4 16v2a2 2 0 0 0 2 2h2' />
            <path d='M16 4h2a2 2 0 0 1 2 2v2' />
            <path d='M16 20h2a2 2 0 0 0 2 -2v-2' />
          </svg>
        }
        titulo='GestionPagos'
        funcion={hola}
        expandido={menuExpandido}
        seleccion={cambioSeleccion}
        tituloParaMostrar='Gestionar Pagos'
      />

      <BtnBarraLateral
        name={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-maximize'
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
            <path d='M4 8v-2a2 2 0 0 1 2 -2h2' />
            <path d='M4 16v2a2 2 0 0 0 2 2h2' />
            <path d='M16 4h2a2 2 0 0 1 2 2v2' />
            <path d='M16 20h2a2 2 0 0 0 2 -2v-2' />
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
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-maximize'
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
            <path d='M4 8v-2a2 2 0 0 1 2 -2h2' />
            <path d='M4 16v2a2 2 0 0 0 2 2h2' />
            <path d='M16 4h2a2 2 0 0 1 2 2v2' />
            <path d='M16 20h2a2 2 0 0 0 2 -2v-2' />
          </svg>
        }
        titulo={seleccion}
        funcion={handleRecargar}
        expandido={menuExpandido}
        seleccion={cambioSeleccion}
        tituloParaMostrar='Cerrar Sesión'
      />
    </>
  )
}

export default BarraLateral2
