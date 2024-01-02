import React, { useEffect, useState } from 'react'
import { recuperarColeccion, subirDocumentoExcelencia } from '../../librerias/manipularDatos'
import Select from './Select'

const RegistroInversion = ({ ciclo, dni }) => {
  const [listaDeCiclos, setListaDeCiclos] = useState([])
  const [tipoDePagoSeleccionado, setTipoDePagoSeleccionado] = useState()
  const [montoSeleccionado, setMontoSeleccionado] = useState()

  console.log(dni)

  useEffect(() => {
    recuperarColeccion('ciclos').then((listaDeCiclos) => {
      setListaDeCiclos(listaDeCiclos)
    })
  }, [ciclo])

  const precio = listaDeCiclos.find((c) => {
    return c.nombre === ciclo
  })

  const handleChange = (e) => {
    setTipoDePagoSeleccionado(e.target.value)
  }

  const montos = precio ? precio.precios : null

  useEffect(() => {
    if (montos) {
      const montoEncontrado = montos.find((m) => m.nombre === tipoDePagoSeleccionado)

      if (montoEncontrado) {
        setMontoSeleccionado(montoEncontrado.total)
      } else {
        setMontoSeleccionado('')
      }
    }
  }, [tipoDePagoSeleccionado, montos])

  return (
    <div className='form'>
      <div className='details person'>
        <span className='title'>Inversión</span>
        <div className='seccion-form'>
          <div className='input-seccion'>
            <div>
              <label>Monto</label>
            </div>
            <input name='nombre' id='nombre' required disabled value={montoSeleccionado} />
            <Select onSelectChange={handleChange} arrayDeObjetos={montos} />
          </div>
          <div className='input-seccion'>
            <div>
              <label>Descuentos</label>
              <div>
                <label>Ex-alumno</label>
              </div>
              <div>
                <label>Excelencia</label>
                <input type='file' name='' id='' onChange={e => subirDocumentoExcelencia(e.target.files, dni)} />
                <button>Subir</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistroInversion
