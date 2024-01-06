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
        <h1>Gestion de Pagos</h1>
        <div style={{ display: 'flex', flexDirection: 'row' }}>

          <div>
            <input type='text' value={dni} onChange={handleChange} maxLength={8} />
            <button onClick={identificarAlumno}>Identificar</button>
          </div>
          <div className='container-identificar-alumno-datos'>
            <div>
              <label>DNI: </label>
              <span>{coincidencia && coincidencia.length > 0 ? coincidencia[0].dni : ''}</span>
            </div>
            <div>
              <label>Nombre: </label>
              <span>{coincidencia && coincidencia.length > 0 ? coincidencia[0].nombre : ''}</span>
            </div>
            <div>
              <label>Apellido Paterno: </label>
              <span>{coincidencia && coincidencia.length > 0 ? coincidencia[0].apellidoPaterno : ''}</span>
            </div>
            <div>
              <label>Apellido Materno: </label>
              <span>{coincidencia && coincidencia.length > 0 ? coincidencia[0].apellidoMaterno : ''}</span>
            </div>
          </div>
        </div>

      </div>
      <div className='container-recuperar-pagos'>
        <div>
          <p>Activo</p>
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

        <div>
          <p>Retrasado</p>
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

        <div>
          <p>Cancelado</p>
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
        <RevisarMatricula datos={coincidenciaMatricula.filter(matricula => matricula.id === codigoMatriculaEscogida)} />
      </div>
    </div>
  )
}

export default GestionPagos
