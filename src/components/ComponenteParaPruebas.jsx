import React from 'react'
import { recuperarColeccion } from '../../librerias/manipularDatos'
import Select from './Select'

const ComponenteParaPruebas = () => {
  recuperarColeccion('ciclos')
    .then((listaDeAlumnos) => {
      // Haz algo con la lista de alumnos
      console.log(listaDeAlumnos)
    })
    .catch((error) => {
      console.error('Error al recuperar la colección:', error)
    })
  return (
    <div>
      <Select coleccion='ciclos' />

    </div>
  )
}

export default ComponenteParaPruebas
