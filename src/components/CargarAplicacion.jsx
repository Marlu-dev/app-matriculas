import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import GridAplicacion from './GridAplicacion'

export const userContext = React.createContext()

const CargarAplicacion = () => {
  const [user, setUser] = useState()
  const [temporada, setTemporada] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulamos la carga durante 3 segundos
    const timeout = setTimeout(() => {
      setUser({ nombre: 'Juan' })
      setTemporada('2021-1')
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
        : (
          <userContext.Provider value={{ user, temporada }}>
            <GridAplicacion />
          </userContext.Provider>
          )}
    </>
  )
}

export default CargarAplicacion
