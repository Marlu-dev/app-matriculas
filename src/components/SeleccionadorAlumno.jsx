import React, { useState } from 'react'
import '../style/SeleccionadorAlumno.css'
import ModalDeEdicionDeDatos from './ModalDeEdicionDeDatos'

import { AnimatePresence } from 'framer-motion'

const SeleccionadorAlumno = ({
  codigo,
  name,
  apellidoPaterno,
  apellidoMaterno,
  dni,
  grupo,
  carrera
}) => {
  const [modal, setModal] = useState(false)
  const activarModal = () => {
    setModal(!modal)
  }

  return (
    <div className='container-select-alumno'>
      <main className='datos-select-alumno'>
        <span className='codigo-select-alumno'>
          {codigo}
        </span>
        <span className='name-select-alumno'>
          {name}
        </span>
        <span className='apelldoPaterno-select-alumno'>
          {apellidoPaterno}
        </span>
        <span className='apellidoMaterno-select-alumno'>
          {apellidoMaterno}
        </span>
        <span className='grupo-select-alumno'>
          {grupo}
        </span>
        <span className='carrera-select-alumno'>
          {carrera}
        </span>
        <span className='dni-select-alumno'>
          {dni}
        </span>
        <AnimatePresence>
          {modal && 
            <ModalDeEdicionDeDatos 
            cerrar={activarModal} 
            codigo={codigo} 
            />
          }
        </AnimatePresence>

        <div className="icons-select-alumno">
          <div
            className='ver-seleccionador-alumno'
            value={codigo}
            onClick={activarModal}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-eye'
              width='40'
              height='40'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='black'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
              <path d='M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6' />
            </svg>
          </div>

          <div
            className='editar-seleccionador-alumno'
            value={codigo}
            onClick={activarModal}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-edit'
              width='40'
              height='40'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='black'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1' />
              <path d='M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z' />
              <path d='M16 5l3 3' />
            </svg>
          </div>
        </div>
      </main>

      
    </div>
  )
}

export default SeleccionadorAlumno
