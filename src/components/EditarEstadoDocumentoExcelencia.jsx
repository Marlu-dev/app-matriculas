import React, { useState, useEffect } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc, query, collection, where, onSnapshot } from 'firebase/firestore'
import { db } from '../../public/services/firebase/firebase.js'
import { useSnackbar } from 'notistack'

const EditarEstadoDocumentoExcelencia = ({ dni, codigoAlumnoEscogido }) => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [alumno, setAlumno] = useState({})
  const [matriculasAlumno, setMatriculasAlumno] = useState([])
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    console.log(dni)
    console.log(codigoAlumnoEscogido)
  }, [dni, codigoAlumnoEscogido])

  useEffect(() => {
    const q = query(collection(db, 'matriculas'), where('dni', '==', dni))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const alumnoRecuperado = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setMatriculasAlumno(alumnoRecuperado)
    })

    return () => unsubscribe()
  }, [dni, codigoAlumnoEscogido])

  useEffect(() => {
    const q = query(collection(db, 'alumnos'), where('codigo', '==', codigoAlumnoEscogido))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const alumnoRecuperado = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setAlumno(alumnoRecuperado[0])
    })

    return () => unsubscribe()
  }, [dni, codigoAlumnoEscogido])

  useEffect(() => {
    console.log(matriculasAlumno)
    console.log(alumno)
  }, [matriculasAlumno, alumno])

  useEffect(() => {
    const storage = getStorage()
    const fileRef = ref(storage, `certificadosExcelencia/${dni}`)

    const fetchData = async () => {
      try {
        const downloadUrl = await getDownloadURL(fileRef)
        setUrl(downloadUrl)
      } catch (error) {
        console.error('Error fetching download URL:', error)
        setError('Error fetching document. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Cleanup function to cancel any ongoing tasks
    return () => {
      // Cancel any ongoing tasks here (if needed)
    }
  }, [dni])

  useEffect(() => {
    console.log(url)
  }, [url])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  const validar = async () => {
    try {
      await updateDoc(doc(db, 'alumnos', codigoAlumnoEscogido), {
        docExcelenciaValidado: true
      })

      for (const matricula of matriculasAlumno) {
        const { id, descuentoAdicional } = matricula
        if (descuentoAdicional === 0) {
          await updateDoc(doc(db, 'matriculas', id), {
            estado: 'validado'
          })
        }
      }
      enqueueSnackbar('Se aceptó el documento', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    } catch (error) {
      enqueueSnackbar('No se aceptar el documento', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    }
  }

  const rechazar = async () => {
    try {
      await updateDoc(doc(db, 'alumnos', codigoAlumnoEscogido), {
        docExcelenciaValidado: false,
        docExcelencia: false
      })

      enqueueSnackbar('Se rechazó el documento', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    } catch (error) {
      enqueueSnackbar('No se rechazó el documento', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    }
  }

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      {
  dni !== ''
    ? (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
        <iframe src={url} width='100%' height='100%' style={{ flex: '1' }} />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
          <button type='button' style={{ flex: '1', margin: '0 5px', maxWidth: '150px' }} onClick={() => rechazar()}>Rechazar</button>
          <button type='button' style={{ flex: '1', margin: '0 5px', maxWidth: '150px' }} onClick={() => validar()}>Validar</button>
        </div>
      </div>
      )
    : (
        'Selecciona un usuario'
      )
}

    </div>
  )
}

export default EditarEstadoDocumentoExcelencia
