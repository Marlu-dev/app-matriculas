import React, { useRef } from 'react'
import '../style/ModalDeEdicionDeDatos.css'
import { motion } from 'framer-motion'
import VistaDeDatosAlumno from './VistaDeDatosAlumno'
import VistaEdicionDeDatosAlumno from './VistaEdicionDeDatosAlumno'

const ModalDeEdicionDeDatos = ({ cerrar, codigo, accion }) => {
  const sonidoRef = useRef(new Audio('../../src/sound/error.mp3'))

  const ejecutarSonido = () => {
    const sonido = sonidoRef.current
    sonido.currentTime = 0
    sonido.play()
  }

  const detenerPropagacion = (event) => {
    event.stopPropagation()
  }

  return (
    <div
      className='modal-edicion-datos-fondo-invisible'
      onClick={ejecutarSonido}
    >
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.2 }}
        style={{ translateX: '-50%', translateY: '-50%' }}
        className='modal-edicion-datos'
        onClick={detenerPropagacion}
      >
        <div className='titlebar'>
          <div className='title' />
          <div className='controls'>
            <div className='close-button' onClick={cerrar}>
              &#x2715;
            </div>
          </div>
        </div>
        <div style={{ overflowY: 'auto' }}>

          {
            accion === 'ver' ? (<VistaDeDatosAlumno codigo={codigo} />) : accion === 'editar' ? (<VistaEdicionDeDatosAlumno codigo={codigo} />) : (<div>Accion no definida</div>)
          }
        </div>
      </motion.div>
      ;
    </div>
  )
}

export default ModalDeEdicionDeDatos
