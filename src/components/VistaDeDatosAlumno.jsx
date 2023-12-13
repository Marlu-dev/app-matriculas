import React, { useState, useEffect } from 'react'
import db from '../../public/services/firebase/firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

const collectionAlumnos = collection(db, 'alumnos')

const VistaDeDatosAlumno = ({ codigo }) => {
  const [alumno, setAlumno] = useState({})

  useEffect(() => {
    const q = query(collectionAlumnos, where('codigo', '==', codigo))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const alumnosData = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          codigo: data.codigo,
          nombre: data.nombre,
          apellidoPaterno: data.apellidoPaterno,
          apellidoMaterno: data.apellidoMaterno,
          dni: data.dni,
          grupo: data.grupo,
          carrera: data.carrera,
          direccion: data.direccion,
          telefonoCelular: data.telefonoCelular,
          apoderado: data.apoderado
        }
      })

      if (alumnosData.length > 0) {
        setAlumno(alumnosData[0])
        console.log(alumno)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [codigo])

  return (
    <>
      <div>
        <h1>Alumno</h1>
        <div>
          <label>Nombre: </label>
          <label>{alumno.nombre}</label>
        </div>
        <div>
          <label>Apellido Paterno: </label>
          <label>{alumno.apellidoPaterno}</label>
        </div>
        <div>
          <label>Apellido Materno: </label>
          <label>{alumno.apellidoMaterno}</label>
        </div>
        <div>
          <label>DNI: </label>
          <label>{alumno.dni}</label>
        </div>
        <div>
          <label>Grupo: </label>
          <label>{alumno.grupo}</label>
        </div>
        <div>
          <label>Carrera: </label>
          <label>{alumno.carrera}</label>
        </div>
        <div>
          <label>Dirección: </label>
          <label>{alumno.direccion}</label>
        </div>
        <div>
          <label>Teléfono Celular: </label>
          <label>{alumno.telefonoCelular}</label>
        </div>
      </div>

      <div>
        <h1>Apoderado</h1>
        {alumno.apoderado
          ? (
            <div>
              <label>Nombre: </label>
              <label>{alumno.apoderado.nombreApoderado}</label>
            </div>
            )
          : (
            <label>No hay información de apoderado</label>
            )}

        {alumno.apoderado
          ? (
            <div>
              <label>Apellido Paterno: </label>
              <label>{alumno.apoderado.apellidoPaternoApoderado}</label>
            </div>
            )
          : (
            <label>No hay información de apoderado</label>
            )}

        {alumno.apoderado
          ? (
            <div>
              <label>Apellido Materno: </label>
              <label>{alumno.apoderado.apellidoMaternoApoderado}</label>
            </div>
            )
          : (
            <label>No hay información de apoderado</label>
            )}

        {alumno.apoderado
          ? (
            <div>
              <label>DNI : </label>
              <label>{alumno.apoderado.dniApoderado}</label>
            </div>
            )
          : (
            <label>No hay información de apoderado</label>
            )}

        {alumno.apoderado
          ? (
            <div>
              <label>Teléfono Celular : </label>
              <label>{alumno.apoderado.telefonoCelularApoderado}</label>
            </div>
            )
          : (
            <label>No hay información de apoderado</label>
            )}

      </div>

      {/* <div>
        <label>Apoderado</label>
        <label>{alumno.apoderado}</label>
      </div> */}
    </>
  )
}

export default VistaDeDatosAlumno
