import React, { useEffect, useState } from 'react'
import BarraTitulo from './gridAplication/BarraTitulo'
import '../style/Loading.css'
import '../style/Loader.css'

const Loading = () => {
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return '.'
        }
        return prevDots + '.'
      })
    }, 500)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='pantalla-de-carga'>
      <BarraTitulo />
      <div className='logo-loading'>
        {/* <h3 className='message-loading'>Cargando aplicativo {dots}</h3> */}
        <div class='custom-loader' />
      </div>
    </div>
  )
}

export default Loading
