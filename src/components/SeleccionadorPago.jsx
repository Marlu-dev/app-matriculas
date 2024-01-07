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
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', border: '2px solid black', cursor: 'pointer' }} onClick={revisarMatricula}>
            <div>
              <span>{datos.temporada}</span>
            </div>
            <div>
              <span>{datos.ciclo}</span>
            </div>
            <div>
              <span>{datos.estadoPago}</span>
            </div>
          </div>
          )
        : ''}
    </>
  )
}

export default SeleccionadorPago
