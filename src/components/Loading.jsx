import React, { useEffect, useState } from 'react'
import BarraTitulo from './gridAplication/BarraTitulo'
import '../style/Loading.css'
import banner from '../../src/style/img/wallpaper.webp'

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
        <img src={banner} alt='' />
        <h3 className='message-loading'>Cargando aplicativo {dots}</h3>
      </div>
    </div>
  )
}

export default Loading
