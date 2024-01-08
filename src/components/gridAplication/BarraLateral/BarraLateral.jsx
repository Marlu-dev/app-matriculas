import React, { useEffect, useState } from 'react'
import BtnBarraLateral from '../BarraLateral2/BtnBarraLateral'
import { useEstadoBarra, useSeleccion, useSeleccionToggle } from '../../EstadoBarraLateralProvider'

const BarraLateral = ({ menuSeleccionado }) => {
  const menuExpandido = useEstadoBarra()
  const hola = () => {
  }

  const seleccion = useSeleccion()

  useEffect(() => {
    menuSeleccionado(seleccion)
  }, [seleccion])

  const cambioSeleccion = useSeleccionToggle()

  return (
    <>
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
        titulo='RegistroCarrera'
        funcion={hola}
        expandido={menuExpandido}
        seleccion={cambioSeleccion}
        tituloParaMostrar='Registrar Carrera'
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
        titulo='GestionarDocumentosExcelencia'
        funcion={hola}
        expandido={menuExpandido}
        seleccion={cambioSeleccion}
        tituloParaMostrar='Documentos Excelencia'
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
        titulo='GestionarMatriculasEspeciales'
        funcion={hola}
        expandido={menuExpandido}
        seleccion={cambioSeleccion}
        tituloParaMostrar='Solicitudes'
      />
    </>
  )
}

export default BarraLateral
