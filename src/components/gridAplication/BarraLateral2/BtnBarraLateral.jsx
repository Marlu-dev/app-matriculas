import React, { useEffect, useRef } from 'react'
import './style/BtnBarralateral.css'

const BtnBarraLateral = ({ name, titulo, funcion, expandido, seleccion, tituloParaMostrar }) => {
  const root = document.getElementById('root')
  const btnRef = useRef(null)
  const iconoRef = useRef(null)

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
    if (funcion.length > 0) {
      funcion(!expandido)
    } else {
      funcion()
    }

    seleccion(titulo)
    // console.log(titulo);
  }

  return (
    <div className='btnBarraLateral' onClick={funcionQueRealiza}>
      <div className='icono' ref={iconoRef}>
        {name}
      </div>
      <div className='btnBarraLateralTitulo' ref={btnRef}>
        {tituloParaMostrar}
      </div>
    </div>
  )
}

export default BtnBarraLateral
