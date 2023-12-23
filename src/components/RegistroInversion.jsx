import React, { useState, useEffect } from 'react'
import useObterArrayWhere from '../hooks/useObterArrayWhere'

const RegistroInversion = ({ grupo, dni }) => {
  const [data, setData] = useState({})
  const { dataCompleta } = useObterArrayWhere('grupos', 'nombre', '==', grupo)

  useEffect(() => {
    if (dataCompleta && dataCompleta.length > 0) {
      // Verifica si hay datos antes de intentar acceder a dataCompleta[0]
      setData(dataCompleta[0])
    }
  }, [dataCompleta, grupo])

  // const { precio, precioFinal, descuento } = useObtenerDescuento(grupo, dni)

  console.log(data)

  return (
    <div className='form'>
      <div className='details person'>
        <span className='title'>
          Inversión
        </span>
        <div className='seccion-form'>
          <div className='input-seccion'>
            <div>
              <label>Monto</label>
            </div>
            <input
              name='nombre'
              id='nombre'
              required
              disabled
              value={data.costo ? data.costo : ''}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistroInversion
