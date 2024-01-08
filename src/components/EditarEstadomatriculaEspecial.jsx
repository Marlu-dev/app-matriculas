import React, { useState, useEffect } from 'react'
import { doc, updateDoc, query, collection, where, onSnapshot } from 'firebase/firestore'
import { db } from '../../public/services/firebase/firebase.js'
import { useSnackbar } from 'notistack'
import '../style/EditarEstadomatriculaEspecial.css'

const EditarEstadoMatriculaEspecial = ({ idMatriculaEscogida }) => {
  const [alumno, setAlumno] = useState({})
  const [matriculasAlumno, setMatriculasAlumno] = useState([])
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (idMatriculaEscogida === '') return
    const matriculaDocRef = doc(db, 'matriculas', idMatriculaEscogida)
    const unsubscribe = onSnapshot(matriculaDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const matriculaData = {
          ...docSnapshot.data(),
          id: docSnapshot.id
        }
        setMatriculasAlumno([matriculaData])
      } else {
        setMatriculasAlumno([])
      }
    })

    return () => unsubscribe()
  }, [idMatriculaEscogida])

  useEffect(() => {
    if (matriculasAlumno.length === 0) return
    const q = query(collection(db, 'alumnos'), where('dni', '==', matriculasAlumno[0]?.dni))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const alumnoRecuperado = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setAlumno(alumnoRecuperado[0])
    })

    return () => unsubscribe()
  }, [idMatriculaEscogida])

  useEffect(() => {
    console.log(alumno)
  }, [alumno])

  useEffect(() => {
    if (matriculasAlumno.length > 0) {
      console.log(matriculasAlumno)
    }
  }, [matriculasAlumno])

  useEffect(() => {
    console.log(idMatriculaEscogida)
  }, [idMatriculaEscogida])

  useEffect(() => {
    console.log(matriculasAlumno)
    console.log(alumno)
  }, [matriculasAlumno, alumno])

  const validar = async () => {
    try {
      await updateDoc(doc(db, 'matriculas', idMatriculaEscogida), {
        estado: 'validado'
      })

      enqueueSnackbar('Se validó la matrícula', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    } catch (error) {
      enqueueSnackbar('No se pudo validar la matrícula', {
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
      await updateDoc(doc(db, 'matriculas', idMatriculaEscogida), {
        estado: 'rechazada',
        estadoPago: 'cancelado'
      })

      enqueueSnackbar('Se rechazó la matricula', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    } catch (error) {
      enqueueSnackbar('No se pudo rechazar la matricula', {
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
    <div  
    style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column' }}>
      <div className='datos-container'>
        <div className='title-dato-new' >{
          matriculasAlumno[0] && matriculasAlumno[0].id
        }
        </div>
      </div>
      {
  alumno.docExcelencia === true && alumno.docExcelenciaValidado === false
    ? (
        'Se require primero la validación del documento de excelencia académica'
      )
    : idMatriculaEscogida !== ''
      ? (
        <div className='datos-container'>
          <label className='title-dato'>
            Matricula Especial 
          </label>

          <div className='container-dato'>
            <label className='title-dato'>
              Descuento Adicional: 
              </label>
            <span className='content-dato'>
              {matriculasAlumno[0] &&
              matriculasAlumno[0].descuentoAdicional}
            </span>
          </div>

          <div className='container-dato'>
            <label className='title-dato'>
              Observación: 
            </label>
            <span className='content-dato'>
              {matriculasAlumno[0] && 
              matriculasAlumno[0].observacionDescuentoAdicional}
            </span>
          </div>
        </div> 
        )
      : 'Selecciona una matrícula'
}

      {
  matriculasAlumno[0] && matriculasAlumno[0].estado === 'pendiente'
    ? (
      <div className='datos-container'
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
        <button 
          type='button' 
          style={{ flex: '1', margin: '0 5px', maxWidth: '150px' }} 
          onClick={() => rechazar()}>
          Rechazar
        </button>
        <button 
          type='button' 
          style={{ flex: '1', margin: '0 5px', maxWidth: '150px' }} 
          onClick={() => validar()}>
          Validar
        </button>
      </div>
      )
    : matriculasAlumno[0] && matriculasAlumno[0].estado === 'rechazada'
      ? (
        <div className='datos-container'>
          <div className='title-dato-new' >
            Matrícula Rechazada
          </div>
        </div>
        )
      : matriculasAlumno[0] && matriculasAlumno[0].estado === 'validado'
        ? (
          <div className='datos-container'>
            <div className='title-dato-new' >
              Matrícula Validada
            </div>
          </div>
          )
        : ''
}

    </div>
  )
}

export default EditarEstadoMatriculaEspecial
