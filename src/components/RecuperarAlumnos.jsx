import React, { useState, useEffect } from 'react'

import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import db from '../services/firebase/firebase.js'
import '../style/SeleccionadorAlumno.css'
import '../style/RecuperarAlumnos.css'
import ListaDeAlumnos from './ListaDeAlumnos.jsx'
import Filtro from './Filtro.jsx'

const RecuperarAlumnos = () => {
  const [alumnosListaCompleta, setAlumnosListaCompleta] = useState([])
  const [resultadosAlumnos, setResultadosAlumnos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [ordenarPor, setOrdenarPor] = useState('numero')
  const [filtrosObtenidosGrupo, setFiltrosObtenidosGrupo] = useState([])
  const [filtrosObtenidosCarrera, setFiltrosObtenidosCarrera] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'alumnos'), orderBy(ordenarPor, 'asc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaDeAlumnos = querySnapshot.docs.map((doc) => doc.data())
      setAlumnosListaCompleta(listaDeAlumnos)
    })
  }, [ordenarPor])

  const filtrarBusqueda = (alumnosListaCompleta, carreraFiltrada) => {
    return alumnosListaCompleta.filter((alumno) => {
      const busquedaLowerCase = busqueda.toLowerCase().trim()

      const nombreCompletoSinEspacios = `${alumno.nombre?.toLowerCase()?.replace(/\s/g, '')}${alumno.apellidoPaterno?.toLowerCase()}${alumno.apellidoMaterno?.toLowerCase()}`

      const nombreCompletoConEspacios = `${alumno.nombre?.toLowerCase()} ${alumno.apellidoPaterno?.toLowerCase()} ${alumno.apellidoMaterno?.toLowerCase()}`

      // Crear una expresión regular a partir de la búsqueda
      const regex = new RegExp(
        busquedaLowerCase
          .split(' ')
          .map((word) => `(?=.*\\b${word})`)
          .join(''),
        'i'
      )

      // Verificar si la carrera coincide con la carrera filtrada
      const carreraAlumno = alumno.carrera?.toLowerCase()
      if (carreraFiltrada && carreraFiltrada?.toLowerCase() !== carreraAlumno) {
        return false
      }

      return (
        (regex.test(nombreCompletoSinEspacios) ||
          regex.test(nombreCompletoConEspacios)) &&
        (!carreraFiltrada || carreraFiltrada?.toLowerCase() === carreraAlumno)
      )
    })
  }

  // console.log(alumnosListaCompleta);
  // console.log(busqueda);

  const ejecutarbusqueda = () => {
    const listaDeAlumnosFinal = aplicarFiltroRecibidos(filtrarBusqueda(alumnosListaCompleta, ''), filtrosObtenidosGrupo, filtrosObtenidosCarrera)

    setResultadosAlumnos(listaDeAlumnosFinal)
  }

  const handleChange = (e) => {
    setBusqueda(e.target.value)
  }

  const handleChangeSelect = (e) => {
    setOrdenarPor(e.target.value)
    // console.log(e.target.value)
  }

  const obtenerFiltrosGrupo = (e) => {
    setFiltrosObtenidosGrupo(e)
  }

  const obtenerFiltrosCarrera = (e) => {
    setFiltrosObtenidosCarrera(e)
  }

  useEffect(() => {
    const listaDeAlumnosFinal = aplicarFiltroRecibidos(filtrarBusqueda(alumnosListaCompleta, ''), filtrosObtenidosGrupo, filtrosObtenidosCarrera)

    setResultadosAlumnos(listaDeAlumnosFinal)
  }, [filtrosObtenidosGrupo, filtrosObtenidosCarrera])

  // console.log(filtrosObtenidosGrupo);
  // console.log(filtrosObtenidosCarrera);

  const aplicarFiltroRecibidos = (alumnosLista, filtrosObtenidosGrupo, filtrosObtenidosCarrera) => {
    // console.log("Grupos",filtrosObtenidosGrupo);
    // console.log("Carreras", filtrosObtenidosCarrera);

    return alumnosLista.filter((alumno) => {
      // console.log("Grupo del alumno:", alumno.grupo);
      // console.log("Carrera del alumno:", alumno.carrera);
      // Filtrar por grupo
      if (filtrosObtenidosGrupo.length > 0 && !filtrosObtenidosGrupo.includes(alumno.grupo)) {
        return false
      }

      // Filtrar por carrera
      if (filtrosObtenidosCarrera.length > 0 && !filtrosObtenidosCarrera.includes(alumno.carrera)) {
        return false
      }

      // Si el alumno pasa ambos filtros, se incluye en el resultado
      return true
    })
  }

  // const listaFinal = aplicarFiltroRecibidos(alumnosListaCompleta, filtrosObtenidosGrupo, filtrosObtenidosCarrera)
  // // console.log("listaFinal",listaFinal);

  return (
    <div className='container-recuperar-alumnos'>
      <div className='container-izquierda-recuperar-alumnos'>
        <div>
          <h1>Recuperar Alumnos</h1>
          <input
            onChange={handleChange}
            value={busqueda}
            type='text'
            placeholder='Buscar...'
          />

          <button onClick={ejecutarbusqueda}>Buscar</button>

        </div>

        <ListaDeAlumnos alumnos={resultadosAlumnos} />
      </div>
      <div className='container-derecha'>
        <h1>Ordenar</h1>
        <label>Ordenar por</label>
        <select name='' id='' onChange={handleChangeSelect}>
          <option value='numero'>Codigo</option>
          <option value='nombre'>Nombre</option>
          <option value='apellidoPaterno'>Apellido Paterno</option>
          <option value='apellidoMaterno'>Apellido Materno</option>
          <option value='carrera'>Carrera</option>
        </select>
        <h1>Filtros</h1>
        <section>
          <Filtro nombre='Grupo' coleccion='grupos' funcionObtenerFiltros={obtenerFiltrosGrupo} />

          <Filtro nombre='Carrera' coleccion='carreras' funcionObtenerFiltros={obtenerFiltrosCarrera} />
        </section>
      </div>
    </div>
  )
}

export default RecuperarAlumnos
