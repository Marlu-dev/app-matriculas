import React from 'react'
import RevisarPagos from './RevisarPagos'
import '../style/RevisarMatricula.css'

const RevisarMatricula = ({ datos }) => {
  console.log(datos)
  return (
    <div /* className='text-vacio' */>
      {datos.length === 0
        ? 'Selecciona alguna matrícula'
        : <RevisarPagos datos={datos} />}
    </div>
  )
}

export default RevisarMatricula
