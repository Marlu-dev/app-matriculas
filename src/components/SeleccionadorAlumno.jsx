import React from 'react'
import '../style/SeleccionadorAlumno.css'

const SeleccionadorAlumno = ({
  codigo,
  name,
  apellidoPaterno,
  apellidoMaterno,
  dni,
  grupo,
  carrera
}) => {
  return (
    <div className='container-seleccionador-alumno'>
      <main className='datos-seleccionador-alumno'>
        <span className='codigo-seleccionador-alumno'>{codigo}</span>
        <span className='name-seleccionador-alumno'>{name}</span>
        <span className='apelldoPaterno-seleccionador-alumno'>{apellidoPaterno}</span>
        <span className='apellidoMaterno-seleccionador-alumno'>{apellidoMaterno}</span>
        <span className='grupo-seleccionador-alumno'>{grupo}</span>
        <span className='carrera-seleccionador-alumno'>{carrera}</span>
        <span className='dni-seleccionador-alumno'>{dni}</span>
      </main>

      <button className='editar-seleccionador-alumno' value={codigo}>ojito</button>
    </div>
  )
}

export default SeleccionadorAlumno
