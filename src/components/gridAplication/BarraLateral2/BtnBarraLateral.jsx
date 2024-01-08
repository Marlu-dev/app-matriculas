import React, { useEffect, useRef, useState } from 'react'
import './style/BtnBarralateral.css'
import { useEstadoBarra, useSeleccion } from '../../EstadoBarraLateralProvider'
import { motion } from 'framer-motion'

const BtnBarraLateral = ({ name, titulo, funcion, expandido, seleccion, tituloParaMostrar }) => {
  const [mostrarAlPasarMouse, setMostrarAlPasarMouse] = useState(false)
  const root = document.getElementById('root')
  const btnRef = useRef(null)
  const iconoRef = useRef(null)

  const mostrarAlPasarMouseHandler = () => {
    setMostrarAlPasarMouse(true)
  }

  const ocultarAlSalirMouseHandler = () => {
    setMostrarAlPasarMouse(false)
  }

  const estadoBarra = useEstadoBarra()
  const seleccionActual = useSeleccion()

  useEffect(() => {
    console.log(seleccionActual)
  }, [seleccion])

  useEffect(() => {
    console.log(mostrarAlPasarMouse)
  }, [mostrarAlPasarMouse])

  useEffect(() => {
    if (root) {
      const btn = btnRef.current
      const icono = iconoRef.current

      if (expandido) {
        root.style.gridTemplateColumns = '250px 1fr'
        if (btn) btn.style.display = 'flex'
        if (icono) icono.style.width = '20%'
      } else {
        root.style.gridTemplateColumns = '80px 1fr'
        if (btn) btn.style.display = 'none'
        if (icono) icono.style.width = '100%'
      }
    }
  }, [expandido])

  const funcionQueRealiza = () => {
    setMostrarAlPasarMouse(false)
    if (funcion.length > 0) {
      funcion(!expandido)
    } else {
      funcion()
    }

    seleccion(titulo)
    console.log(titulo)
  }

  return (
    <div className='container-barra-lateral' style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
      <div
        className='btnBarraLateral'
        onClick={funcionQueRealiza}
        onMouseEnter={mostrarAlPasarMouseHandler}
        onMouseLeave={ocultarAlSalirMouseHandler}
      >
        <div className='icono' ref={iconoRef}>
          {name}
        </div>
        <div className='btnBarraLateralTitulo' ref={btnRef} style={{ display: 'flex', textAlign: 'center' }}>
          {tituloParaMostrar}
        </div>
      </div>
      {mostrarAlPasarMouse && !estadoBarra && (
        <motion.div
          style={{
            display: 'flex',
            position: 'absolute',
            top: '10%',
            left: '110%',
            color: 'white',
            backgroundColor: '#0f3170',
            padding: '3px 10px',
            borderRadius: '5px',
            zIndex: 2,
            whiteSpace: 'nowrap' // Esto evita que el contenido se envuelva
          }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {tituloParaMostrar}
        </motion.div>

      )}
    </div>

  )
}

export default BtnBarraLateral
