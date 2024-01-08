import React, { useEffect } from 'react'
import '../style/SeleccionadorMatriculaEspecial.css'

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
          <div style={{ cursor: 'pointer' }} onClick={revisarDocumento}>
            <div className="container-select-un-dato-new">
              <div className="datos-select-un-dato-new">
                <span>
                  {datos.id}
                </span>

                <span>
                  {datos.dni}
                </span>

                <span>
                  {datos.tipoDePago}
                </span>

                <span>
                  {datos.secretaria.nombre}
                </span>

              </div>
            </div>

          </div>
          )
        : ''}
    </>
  )
}

export default SeleccionadorMatriculaEspecial
