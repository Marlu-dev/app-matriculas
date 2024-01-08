import React, { useEffect, useState } from 'react'
import { db } from '../../public/services/firebase/firebase.js'
import { collection, query, onSnapshot, updateDoc, doc, addDoc, setDoc, deleteDoc, where } from 'firebase/firestore'
import '../style/RegistroCarrera.css'
import { useSnackbar } from 'notistack'
import Select from './Select.jsx'
import '../style/GestionarDocumentosExcelencia.css'
import SeleccionadorDocumentoExcelencia from './SeleccionadorDocumentoExcelencia.jsx'
import { PDFViewer } from '@react-pdf/renderer'
import EditarEstadoDocumentoExcelencia from './EditarEstadoDocumentoExcelencia.jsx'

const GestionarDocumentosExcelencia = () => {
  const [listaDeAlumnosConDocumentosDeExcelencia, setListaDeAlumnosConDocumentosDeExcelencia] = useState([])
  const [dniDocumentoEscogido, setDniDocumentoEscogido] = useState('')
  const [codigoAlumnoEscogido, setCodigoAlumnoEscogido] = useState('')

  const obtenerCodigoDocumentoEscogido = (dni, codigo) => {
    setDniDocumentoEscogido(dni)
    setCodigoAlumnoEscogido(codigo)
  }

  useEffect(() => {
    const q = query(collection(db, 'alumnos'), where('docExcelencia', '==', true))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const alumnoExceelencia = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setListaDeAlumnosConDocumentosDeExcelencia(alumnoExceelencia)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    console.log(listaDeAlumnosConDocumentosDeExcelencia)
  }
  , [listaDeAlumnosConDocumentosDeExcelencia])

  return (
    <div className='container-gestionar-documentos-excelencia'>
      <div className='container-lista-documentos-excelencia'>
        <h1>Documentos Excelencia</h1>
        <div>
          Revisados
          {
          listaDeAlumnosConDocumentosDeExcelencia.map((datos) => (
            <SeleccionadorDocumentoExcelencia key={datos.id} datos={datos} estadoDocumento funcion={obtenerCodigoDocumentoEscogido} />
          ))
        }
        </div>
        <div>
          Pendientes
          {
          listaDeAlumnosConDocumentosDeExcelencia.map((datos) => (
            <SeleccionadorDocumentoExcelencia key={datos.id} datos={datos} estadoDocumento={false} funcion={obtenerCodigoDocumentoEscogido} />
          ))
        }
        </div>

      </div>
      <div className='editar-estado-documentos-excelencia'>
        <EditarEstadoDocumentoExcelencia dni={dniDocumentoEscogido} codigoAlumnoEscogido={codigoAlumnoEscogido} />
      </div>
    </div>
  )
}

export default GestionarDocumentosExcelencia
