import React from 'react'
import '../style/SeleccionadorPago.css'

const SeleccionadorPago = ({ datos, estadoPago, funcionRevisarMatricula }) => {
  const revisarMatricula = () => {
    funcionRevisarMatricula(datos.id)
  }

  return (
    <>
      {datos.estadoPago === estadoPago
        ? (
          <div style={{ cursor: 'pointer' }} onClick={revisarMatricula}>
            <div className="container-select-un-dato">
              <div className="datos-select-un-dato">
                <span>
                  {datos.temporada}
                </span>
                <span>
                  {datos.ciclo}
                </span>
                <span>
                  {datos.estadoPago}
                </span>

              </div>
            </div>
          </div>
          )
        : ''}
    </>
  )
}

export default SeleccionadorPago
