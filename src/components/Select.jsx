import React, { useState, useEffect } from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore'

import { db } from '../../public/services/firebase/firebase.js'

const Select = ({
  coleccion,
  nombre,
  onSelectChange,
  opcionDefault,
  nombreCarreraSeleccionada,
  nombreCicloSeleccionado,
  arrayDeObjetos
}) => {
  const [opciones, setOpciones] = useState([])
  // console.log(nombre)

  // console.log(coleccion);
  // console.log(nombre);

  useEffect(() => {
    // console.log(nombreCarreraSeleccionada)
    // console.log(nombreCicloSeleccionado)
    // console.log(propiedadesObjeto)
    if (!coleccion) {
      setOpciones([])
      return
    }
    if (coleccion) {
      coleccion = coleccion.replace(/\s+/g, '').replace(/\./g, '')
    }
    const q = query(collection(db, coleccion))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaDeOpciones = querySnapshot.docs.map((doc) => {
        const objeto = {
          id: doc.id,
          nombre: doc.data().nombre
        }
        // console.log(nombreCarreraSeleccionada)
        // console.log(doc.data().nombre)

        if (
          nombreCarreraSeleccionada &&
          nombreCarreraSeleccionada === doc.data().nombre
        ) {
          objeto.datos = doc.data().ciclos
          return objeto
        }

        return objeto
      })

      setOpciones(listaDeOpciones)
      // console.log(listaDeOpciones)
    })
  }, [coleccion, nombreCarreraSeleccionada, nombreCicloSeleccionado])

  return (
    <div>
      <select name={nombre} id='opcion' onChange={onSelectChange}>
        <option value=''>{opcionDefault || 'Selecciona una opción'}</option>
        {
        nombre === 'grupo'
          ? opciones.map(
            (opcion) =>
              opcion.datos &&
              opcion.datos.map((item) => (
                item.nombre === nombreCicloSeleccionado
                  ? item.grupos.map((grupo) => (
                    <option key={grupo.nombre} value={grupo.nombre}>
                      {grupo.nombre}
                    </option>
                  ))
                  : null
              ))
          )
          : nombre === 'ciclo'
            ? opciones.map(
              (opcion) =>
                opcion.datos &&
                opcion.datos.map((item) => (
                  <option key={item.nombre} value={item.nombre}>
                    {item.nombre}
                  </option>
                ))
            )
            : arrayDeObjetos
              ? arrayDeObjetos.map((opcion) => (
                <option key={opcion.nombre} value={opcion.nombre}>
                  {opcion.nombre}
                </option>
              ))

              : opciones
                .slice() // Crear una copia para no modificar el array original
                .sort((a, b) => a.nombre.localeCompare(b.nombre)) // Ordenar alfabéticamente
                .map((opcion) => (
                  <option key={opcion.id} value={opcion.nombre}>
                    {opcion.nombre}
                  </option>
                ))
}
      </select>
    </div>
  )
}

export default Select
