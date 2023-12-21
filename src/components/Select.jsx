import React, { useState, useEffect } from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore'

import db from '../../public/services/firebase/firebase.js'

const Select = ({ coleccion, nombre, onSelectChange, opcionDefault }) => {
  const [opciones, setOpciones] = useState([])

  // console.log(coleccion);
  // console.log(nombre);

  useEffect(() => {
    if (!coleccion) {
      setOpciones([])
      return
    }
    if (coleccion) {
      coleccion = coleccion.replace(/\s+/g, '').replace(/\./g, '')
    }
    const q = query(collection(db, coleccion))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaDeOpciones = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre
      }))
      // console.log(listaDeOpciones);
      setOpciones(listaDeOpciones)
    })
  }, [coleccion])

  return (
    <div>
      <select name={nombre} id='opcion' onChange={onSelectChange}>
        <option value=''>{opcionDefault || 'Selecciona una opción'}</option>
        {opciones
          .slice() // Crear una copia para no modificar el array original
          .sort((a, b) => a.nombre.localeCompare(b.nombre)) // Ordenar alfabéticamente
          .map((opcion) => (
            <option key={opcion.id} value={opcion.nombre}>
              {opcion.nombre}
            </option>
          ))}
      </select>
    </div>

  )
}

export default Select
