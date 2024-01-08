import React, { useEffect } from 'react'

const SeleccionadorMatriculaEspecial = ({ datos, estadoMatricula, funcion }) => {
  const revisarDocumento = () => {
    funcion(datos.id)
  }

  useEffect(() => {
    console.log(datos.id)
  }
  , [datos.id])

  useEffect(() => {
    console.log(datos)
  }
  , [datos])

  useEffect(() => {
    console.log(estadoMatricula)
  }
  , [estadoMatricula])

  return (
    <>
      {datos.estado === estadoMatricula
        ? (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', border: '2px solid black', cursor: 'pointer' }} onClick={revisarDocumento}>
            <div>
              <span>{datos.id}</span>
            </div>
            <div>
              <span>{datos.dni}</span>
            </div>
            <div>
              <span>{datos.tipoDePago}</span>
            </div>
            <div>
              <span>{datos.secretaria.nombre}</span>
            </div>
          </div>
          )
        : ''}
    </>
  )
}

export default SeleccionadorMatriculaEspecial
