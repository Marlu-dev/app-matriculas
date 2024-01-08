import React, { useEffect } from 'react'
import '../style/SeleccionadorDocumentoExcelencia.css'

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
          <div style={{ cursor: 'pointer' }} onClick={revisarDocumento}>
            <div className="container-select-un-dato-new">
              <div className="datos-select-un-dato-new">
                <span>
                  {datos.codigo}
                </span>
              
                <span>
                  {datos.dni}
                </span>
              
                <span>
                  {datos.nombre}
                </span>
              
                <span>
                  {datos.apellidoPaterno}
                </span>
              
                <span>
                  {datos.apellidoMaterno}
                </span>
              </div>
            </div>

            
              
          </div>
          )
        : ''}
    </>
  )
}

export default SeleccionadorDocumentoExcelencia
