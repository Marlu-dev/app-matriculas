import React, { useState, useEffect } from 'react'
import db from '../../public/services/firebase/firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import "../style/VistaDeDatosAlumno.css"

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
    <div className="main-container"> {/* MAIN CONTAINER */}
      {/* CONTAINER ALUMNO */}
      <div className='person-container'>
        <header className='header-register'>
        DATOS DE ALUMNO
        </header>

        {/* DATOS ALUMNO */}
        <div className="datos-container">
          <div className='container-dato'>
            <label className='title-dato'>
              Nombre: 
            </label>
            <label className='content-dato'>
              {alumno.nombre}
            </label>
          </div>
          <div className='container-dato'>
            <label className='title-dato'>
              Apellido Paterno: 
            </label>
            <label className='content-dato'>
              {alumno.apellidoPaterno}
            </label>
          </div>
          <div className='container-dato'>
            <label className='title-dato'>
              Apellido Materno: 
            </label>
            <label className='content-dato'>
              {alumno.apellidoMaterno}
            </label>
          </div>
          <div className='container-dato'>
            <label className='title-dato'>
              DNI: 
            </label>
            <label className='content-dato'>
              {alumno.dni}
            </label>
          </div>
          <div className='container-dato'>
            <label className='title-dato'>
              Grupo: 
            </label>
            <label className='content-dato'>
              {alumno.grupo}
            </label>
          </div>
          <div className='container-dato'>
            <label className='title-dato'>
              Carrera: 
            </label>
            <label className='content-dato'>
              {alumno.carrera}
            </label>
          </div>
          <div className='container-dato'>
            <label className='title-dato'>
              Dirección: 
            </label>
            <label className='content-dato'>
              {alumno.direccion}
            </label>
          </div>
          <div className='container-dato'>
            <label className='title-dato'>
              Teléfono Celular: 
            </label>
            <label className='content-dato'>
              {alumno.telefonoCelular}
            </label>
          </div>

        </div> {/* FIN DATOS ALUMNO */}

      </div>{/* FIN CONTAINER ALUMNO */}

      {/* CONTAINER APODERADO */}
      <div className='person-container'>
        <header className='header-register'>
        DATOS DE APODERADO
        </header>

        {/* DATOS APODERADO */}
        <div className="datos-container">
          {alumno.apoderado
            ? (
              <div className='container-dato'>
                <label className='title-dato'>
                  Nombre: 
                </label>
                <label className='content-dato'>
                  {alumno.apoderado.nombreApoderado}
                </label>
              </div>
              )
            : (
              <label className='error-dato'>
                No hay información de apoderado
              </label>
              )}

          {alumno.apoderado
            ? (
              <div className='container-dato'>
                <label className='title-dato'>
                  Apellido Paterno: 
                </label>
                <label className='content-dato'>
                  {alumno.apoderado.apellidoPaternoApoderado}
                </label>
              </div>
              )
            : (
              <label className='error-dato'>
                No hay información de apoderado
              </label>
              )}

          {alumno.apoderado
            ? (
              <div className='container-dato'>
                <label className='title-dato'>
                  Apellido Materno: 
                </label>
                <label className='content-dato'>
                  {alumno.apoderado.apellidoMaternoApoderado}
                </label>
              </div>
              )
            : (
              <label className='error-dato'>
                No hay información de apoderado
              </label>
              )}

          {alumno.apoderado
            ? (
              <div className='container-dato'>
                <label className='title-dato'>
                  DNI : 
                </label>
                <label className='content-dato'>
                  {alumno.apoderado.dniApoderado}
                </label>
              </div>
              )
            : (
              <label className='error-dato'>
                No hay información de apoderado
              </label>
              )}

          {alumno.apoderado
            ? (
              <div className='container-dato'>
                <label className='title-dato'>
                  Teléfono Celular : 
                </label>
                <label className='content-dato'>
                  {alumno.apoderado.telefonoCelularApoderado}
                </label>
              </div>
              )
            : (
              <label className='error-dato'>
                No hay información de apoderao
              </label>
              )}

        </div>{/* FIN DATOS APODERADO */}

      </div>{/* FIN CONTAINER APODERADO */}

    </div> {/* FIN MAIN CONTAINER */}
      

      {/* <div>
        <label>Apoderado</label>
        <label>{alumno.apoderado}</label>
      </div> */}
    </>
  )
}

export default VistaDeDatosAlumno
