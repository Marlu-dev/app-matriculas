import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Login from './Login'

const CargarAplicacion = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulamos la carga durante 3 segundos
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 5000)

    // Limpiar el temporizador si el componente se desmonta antes de que se complete el tiempo
    return () => clearTimeout(timeout)
  }, []) // El segundo argumento del useEffect debe ser un array vacío para que solo se ejecute una vez al montar el componente

  return (
    <>
      {loading
        ? (
          <Loading />
          )
        : <Login />}
    </>
  )
}

export default CargarAplicacion
