import React, { useState, useContext } from 'react'

const barraContext = React.createContext()
const barraToggleContext = React.createContext()
const seleccionContext = React.createContext()
const seleccionToggleContext = React.createContext()

export function useEstadoBarra () {
  return useContext(barraContext)
}

export function useBarraToggle () {
  return useContext(barraToggleContext)
}

export function useSeleccion () {
  return useContext(seleccionContext)
}

export function useSeleccionToggle () {
  return useContext(seleccionToggleContext)
}

export function EstadoBarraLateralProvider ({ children }) {
  const [estadoBarra, setEstadoBarra] = useState(false)
  const [seleccion, setSeleccion] = useState('')

  const cambioSeleccion = (select) => {
    if (select === 'Contraer') {
      return
    }
    setSeleccion(select)
  }

  const toggleBarra = () => {
    setEstadoBarra(!estadoBarra)
  }

  return (
    <seleccionContext.Provider value={seleccion}>
      <seleccionToggleContext.Provider value={cambioSeleccion}>
        <barraContext.Provider value={estadoBarra}>
          <barraToggleContext.Provider value={toggleBarra}>
            {children}
          </barraToggleContext.Provider>
        </barraContext.Provider>
      </seleccionToggleContext.Provider>
    </seleccionContext.Provider>

  )
}
