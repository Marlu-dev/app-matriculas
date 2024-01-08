import React, { useEffect } from 'react'

const SeleccionadorDocumentoExcelencia = ({ datos, estadoDocumento, funcion }) => {
  const revisarDocumento = () => {
    funcion(datos.dni, datos.id)
  }

  useEffect(() => {
    console.log(datos)
  }
  , [datos])

  return (
    <>
      {datos.docExcelenciaValidado === estadoDocumento
        ? (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', border: '2px solid black', cursor: 'pointer' }} onClick={revisarDocumento}>
            <div>
              <span>{datos.codigo}</span>
            </div>
            <div>
              <span>{datos.dni}</span>
            </div>
            <div>
              <span>{datos.nombre}</span>
            </div>
            <div>
              <span>{datos.apellidoPaterno}</span>
            </div>
            <div>
              <span>{datos.apellidoMaterno}</span>
            </div>
          </div>
          )
        : ''}
    </>
  )
}

export default SeleccionadorDocumentoExcelencia
