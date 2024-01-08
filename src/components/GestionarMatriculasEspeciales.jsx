import React, { useState, useEffect } from 'react'
import { db } from '../../public/services/firebase/firebase.js'
import { collection, query, onSnapshot, where } from 'firebase/firestore'
import '../style/GestionarDocumentosExcelencia.css'
import SeleccionadorMatriculaEspecial from './SeleccionadorMatriculaEspecial.jsx'
import EditarEstadoMatriculaEspecial from './EditarEstadomatriculaEspecial.jsx'
import '../style/GestionarMatriculasEspeciales.css'
const GestionarMatriculasEspeciales = () => {
  const [listaDeMatriculasEspeciales, setListaDeMatriculasEspeciales] = useState([])

  const [idMatriculaEscogida, setIdMatriculaEscogida] = useState('')

  const obtenerCodigoDocumentoEscogido = (id) => {
    setIdMatriculaEscogida(id)
  }

  useEffect(() => {
    console.log(idMatriculaEscogida)
  }
  , [idMatriculaEscogida])

  useEffect(() => {
    const q = query(collection(db, 'matriculas'), where('descuentoAdicional', '>', 0))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const matriculasEspeciales = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setListaDeMatriculasEspeciales(matriculasEspeciales)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    console.log(listaDeMatriculasEspeciales)
  }
  , [listaDeMatriculasEspeciales])

  return (
    <div className='container-gestionar-matriculas-especiales'>
      <div className='container-lista-de-matriculas-especiales'>
        <h1 className='header-register'>
          Solicitudes de Matrículas Especiales
        </h1>

        <div className='input-seccion'>
          <div className='sub-title'>
            <label>
              - Pendiente
            </label>
          </div>
          {
          listaDeMatriculasEspeciales.map((datos) => (
            <SeleccionadorMatriculaEspecial 
              key={datos.id} 
              datos={datos} 
              estadoMatricula='pendiente' 
              funcion={obtenerCodigoDocumentoEscogido} 
            />
          ))
        }
        </div>

        <div className='input-seccion'>
          <div className='sub-title'>
            <label>
              - Validados
            </label>
          </div>
          {
          listaDeMatriculasEspeciales.map((datos) => (
            <SeleccionadorMatriculaEspecial 
              key={datos.id} 
              datos={datos} 
              estadoMatricula='validado' 
              funcion={obtenerCodigoDocumentoEscogido} 
            />
          ))
        }
        </div>

        <div className='input-seccion'>
          <div className='sub-title'>
            <label>
              - Rechazados
            </label>
          </div>
          {
          listaDeMatriculasEspeciales.map((datos) => (
            <SeleccionadorMatriculaEspecial 
              key={datos.id} 
              datos={datos} 
              estadoMatricula='rechazada' 
              funcion={obtenerCodigoDocumentoEscogido} 
            />
          ))
        }
        </div>

      </div>

      <div className='editar-estado-matriculas-especiales'>
        <EditarEstadoMatriculaEspecial 
          idMatriculaEscogida={idMatriculaEscogida} 
        />
        
      </div>
    </div>
  )
}

export default GestionarMatriculasEspeciales
