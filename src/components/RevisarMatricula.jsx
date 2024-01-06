import React from 'react'
import RevisarPagos from './RevisarPagos'

const RevisarMatricula = ({ datos }) => {
  console.log(datos)
  return (
    <div>
      {datos.length === 0
        ? 'Selecciona alguna matrícula'
        : <RevisarPagos datos={datos} />}
    </div>
  )
}

export default RevisarMatricula
