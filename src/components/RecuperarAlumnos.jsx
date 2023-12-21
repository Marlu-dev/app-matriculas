import React, { useState, useEffect } from 'react'

import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import db from '../../public/services/firebase/firebase.js'
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

  // console.log(ordenarPor)

  useEffect(() => {
    const q = query(collection(db, 'alumnos'), orderBy(ordenarPor, 'asc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaDeAlumnos = querySnapshot.docs.map((doc) => doc.data())
      setAlumnosListaCompleta(listaDeAlumnos)
    })

    return () => unsubscribe()
  }, [])

  // console.log(alumnosListaCompleta)

  useEffect(() => {
    const listaDeAlumnosFinal = ordenarAlumnos(aplicarFiltroRecibidos(filtrarBusqueda(alumnosListaCompleta, ''), filtrosObtenidosGrupo, filtrosObtenidosCarrera), ordenarPor)

    setResultadosAlumnos(listaDeAlumnosFinal)
  }, [ordenarPor])

  const ordenarAlumnos = (alumnosListaCompleta, ordenarPor) => {
    return alumnosListaCompleta.sort((a, b) => {
      if (a[ordenarPor] > b[ordenarPor]) {
        return 1
      }
      if (a[ordenarPor] < b[ordenarPor]) {
        return -1
      }
      return 0
    })
  }

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
    <div className='container-recuperar'>
      {/* CONTAINER PRINCIPAL */}
      <div className='container-principal'>
        <div>
          <header className='header-register'>
            DATOS DE ALUMNOS
          </header>
          {/* CONTAINER SEARCH */}
          <div className='container-search'>
            <input
              onChange={handleChange}
              value={busqueda}
              type='text'
              placeholder='Buscar...'
            />

            {/* <button 
              onClick={ejecutarbusqueda}
            > */}
              <div className='button-search' onClick={ejecutarbusqueda}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='icon icon-tabler icon-tabler-search'
                  width='25'
                  height='25'
                  viewBox='0 0 24 24'
                  stroke-width='3.5'
                  stroke='#2c3e50'
                  fill='none'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
                  <path d='M21 21l-6 -6' />
                </svg>
              </div>
            {/* </button> */}
          </div>
          

        </div>

        <ListaDeAlumnos alumnos={resultadosAlumnos} />
      </div> {/* FIN: CONTAINER PRINCIPAL */}

      {/* CONTAINER SECUNDARIO */}
      <div className='container-register'>
        {/* <div className="main-register"></div> */}
        <span className='header-register'>
          Orden de busqueda
        </span>
        <div className='input-seccion'>
          <label>
            Ordenar por:
          </label>
          <div className='main-dropdwon'>
            <div className='select-container'>
              <select name='' id='' onChange={handleChangeSelect}>
                <option value='numero'>Codigo</option>
                <option value='nombre'>Nombre</option>
                <option value='apellidoPaterno'>Apellido Paterno</option>
                <option value='apellidoMaterno'>Apellido Materno</option>
                <option value='carrera'>Carrera</option>
              </select>
              <div className='select-icon'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='icon icon-tabler icon-tabler-chevron-down'
                  width='25'
                  height='25'
                  viewBox='0 0 24 24'
                  stroke-width='3.5'
                  stroke='#2c3e50'
                  fill='none'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M6 9l6 6l6 -6' />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <span className='header-register'>
          Filtros de Busqueda
        </span>

        {/* FILTROS DE BUSQUEDA */}
        <section className='filtros-busqueda'>
          <div className='select-filter'>
            {/* FILTRO: Grupo */}
            <div className='title-filter'>
              <label>
                Grupo:
              </label>
            </div>
            <div className='filter-main'>
              <Filtro
                nombre='Grupo'
                coleccion='grupos'
                funcionObtenerFiltros={obtenerFiltrosGrupo}
              />
            </div>

          </div>
          <div className='select-filter'>
            {/* FILTRO: Carrera */}
            <div className='title-filter'>
              <label>
                Carrera:
              </label>
            </div>
            <Filtro
              nombre='Carrera'
              coleccion='carreras'
              funcionObtenerFiltros={obtenerFiltrosCarrera}
            />
          </div>
        </section>
        {/* FIN: FILTROS DE BUSQUEDA */}
      </div> {/* FIN: CONTAINER SECUNDARIO */}
    </div>
  )
}

export default RecuperarAlumnos
