// TODO Objetivo: mostrar los pagos de un alumno y poder revisarlos

//* IMPORTACIONES
import React, { useEffect, useState } from 'react'
import '../style/GestionPagos.css'
// import { recuperarColeccion } from '../../librerias/manipularDatos'
import SeleccionadorPago from './SeleccionadorPago'
import RevisarMatricula from './RevisarMatricula'
import { db } from '../../public/services/firebase/firebase.js'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { recuperarColeccion } from '../../librerias/manipularDatos.js'

const GestionPagos = () => {
  //* ESTADOS

  const [dni, setDni] = useState('')
  const [alumnos, setAlumnos] = useState([])
  const [coincidencia, setCoincidencia] = useState([])
  const [coincidenciaMatricula, setCoincidenciaMatricula] = useState([])
  const [listaDeMatriculas, setListaDeMatriculas] = useState([])
  const [codigoMatriculaEscogida, setCodigoMatriculaEscogida] = useState('')

  //* FUNCIONES

  const obtenerCodidoMatriculaRevisar = (codigoMatricula) => {
    setCodigoMatriculaEscogida(codigoMatricula)
  }

  const identificarAlumno = () => {
    recuperarColeccion('alumnos')
      .then(res => setAlumnos(res))
      .catch(err => console.log(err))
  }

  const handleChange = (e) => {
    const newQuery = e.target.value
    if (/^\d+$/.test(newQuery) || newQuery === '') {
      setDni(newQuery)
    }
  }

  //* EFECTOS

  useEffect(() => {
    const q = query(collection(db, 'matriculas'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const nuevasMatriculas = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setListaDeMatriculas(nuevasMatriculas)
    })

    // Asegúrate de realizar la limpieza cuando el componente se desmonta
    return () => unsubscribe()
  }, [alumnos])

  useEffect(() => {
    console.log(listaDeMatriculas)
    setCoincidenciaMatricula(listaDeMatriculas.filter(matricula => matricula.dni === dni))
  }
  , [listaDeMatriculas])

  useEffect(() => {
    console.log(coincidenciaMatricula)
  }, [coincidenciaMatricula])

  useEffect(() => {
    setCoincidencia(alumnos.filter(alumno => alumno.dni === dni))
  }, [alumnos])

  //* VISTA

  return (
    <div className='container-gestion-de-pagos'>
      <div className='container-identificar-alumno-gestion-de-pagos' style={{ display: 'flex', flexDirection: 'column' }}>
        {/* <h1>Gestion de Pagos</h1> */}
        <header className='header-register'>
          GESTION DE PAGOS
        </header>

        <div className='container-indentificar-1'>
          <div className='container-search-identificar'>
            <input
              type='text'
              value={dni}
              onChange={handleChange}
              maxLength={8}
              placeholder='Buscar con DNI...'
            />
            {/* <button onClick={identificarAlumno}>Identificar</button> */}

            <div
              className='button-search-identificar'
              onClick={identificarAlumno}
            >
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
            </div> {/*  */}
          </div>
        </div>

        <div className='container-identificar-2'>
          <div className='container-identificar-alumno-datos'>
            <div>
              {/* <label>DNI: </label> */}
              <label className='title-dato'>
                DNI:
              </label>
              <span className='content-dato'>
                {coincidencia &&
                coincidencia.length > 0
                  ? coincidencia[0].dni
                  : ''}
              </span>
            </div>
            <div>
              {/* <label>Nombre: </label> */}
              <label className='title-dato'>
                Nombre:
              </label>
              <span className='content-dato'>
                {coincidencia &&
                coincidencia.length > 0
                  ? coincidencia[0].nombre
                  : ''}
              </span>
            </div>
            <div>
              {/* <label>Apellido Paterno: </label> */}
              <label className='title-dato'>
                Apellido Paterno:
              </label>
              <span className='content-dato'>
                {coincidencia &&
                coincidencia.length > 0
                  ? coincidencia[0].apellidoPaterno
                  : ''}
              </span>
            </div>
            <div>
              {/* <label>Apellido Materno: </label> */}
              <label className='title-dato'>
                Apellido Materno:
              </label>
              <span className='content-dato'>
                {coincidencia &&
                coincidencia.length > 0
                  ? coincidencia[0].apellidoMaterno
                  : ''}
              </span>
            </div>
          </div> {/*  */}

        </div>

      </div>

      <div className='container-recuperar-pagos'>
        <div className='input-seccion'>
          <div className='sub-title'>
            <label>
              - Activo
            </label>
          </div>
          {
          coincidenciaMatricula.map((pago) => (
            <SeleccionadorPago
              key={pago.id}
              datos={pago}
              estadoPago='activo'
              funcionRevisarMatricula={obtenerCodidoMatriculaRevisar}
            />
          ))
        }
        </div>

        <div className='input-seccion'>
          <div className='sub-title'>
            <label>
              - Retrasado
            </label>
          </div>
          {/* <p>Retrasado</p> */}
          {
          coincidenciaMatricula.map((pago) => (
            <SeleccionadorPago
              key={pago.id}
              datos={pago}
              estadoPago='retrasado'
              funcionRevisarMatricula={obtenerCodidoMatriculaRevisar}
            />
          ))
        }
        </div>

        <div className='input-seccion'>
          <div className='sub-title'>
            <label>
              - Cancelado
            </label>
          </div>
          {/* <p>Cancelado</p> */}
          {
          coincidenciaMatricula.map((pago) => (
            <SeleccionadorPago
              key={pago.id}
              datos={pago}
              estadoPago='cancelado'
              funcionRevisarMatricula={obtenerCodidoMatriculaRevisar}
            />
          ))
        }
        </div>

      </div>
      <div className='container-revisar-pagos'>
        <RevisarMatricula
          datos={coincidenciaMatricula.filter(matricula =>
            matricula.id === codigoMatriculaEscogida)}
        />
      </div>
    </div>
  )
}

export default GestionPagos
