import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore'
import db from '../../public/services/firebase/firebase'
import '../style/Filtro.css'

const Filtro = ({ nombre, coleccion, funcionObtenerFiltros }) => {
  const [opciones, setOpciones] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [seleccion, setSeleccion] = useState([])

  useEffect(() => {
    const q = query(collection(db, coleccion))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaDeOpciones = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre
      }))
      setOpciones(listaDeOpciones)
      console.log(opciones)
    })

    // Desvincular el listener cuando el componente se desmonta
    return () => unsubscribe()
  }, [])

  const buscarOpcion = (e) => {
    setBusqueda(e.target.value)
  }

  useEffect(() => {
    funcionObtenerFiltros(seleccion)
  }, [seleccion])

  const filtrarBusqueda = (opciones, busqueda) => {
    return opciones.filter((opcion) => {
      if (opcion.nombre && typeof opcion.nombre === 'string') {
        const busquedaLowerCase = busqueda.toLowerCase().trim()
        const nombreOpcion = opcion.nombre.toLowerCase().trim()
        const regex = new RegExp(
          busquedaLowerCase
            .split(' ')
            .map((word) => `(?=.*\\b${word})`)
            .join(''),
          'i'
        )

        return regex.test(nombreOpcion)
      } else {
        return false // O maneja esto de acuerdo a tus necesidades
      }
    })
  }

  const checkboxSeleccionado = (e) => {
    const { name, checked } = e.target
    if (checked) {
      setSeleccion([...seleccion, name])
    } else {
      setSeleccion(seleccion.filter((item) => item !== name))
    }
  }

  //   console.log('seleccion', seleccion)

  return (
    <>
      <div className="content">
        <div className="search">
          <div className="image-search">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="icon icon-tabler icon-tabler-search" 
              width="15" 
              height="15" 
              viewBox="0 0 24 24" 
              stroke-width="4" 
              stroke="#2c3e50" 
              fill="none" 
              stroke-linecap="round" 
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </div>
          <input 
            type='text' 
            onChange={buscarOpcion} 
            placeholder='Buscar...' required
          />
        </div>
        <div className='options'>
          <div className="options"/>
            {filtrarBusqueda(opciones, busqueda).map((opcion) => (
              <div key={opcion.id}>   
                <div className='check-options'>
                  <input
                    type='checkbox' 
                    name={opcion.nombre}
                    id={opcion.id}
                    onChange={checkboxSeleccionado}  
                  />
                  <label 
                    for={opcion.id}
                    className='checkbox'
                  >
                    {opcion.nombre} {/* No tiene */}
                  </label>
                </div>
              </div>
            ))}

        </div>
        
      </div>

    </>
  )
}

export default Filtro