import React from 'react'
import SeleccionadorAlumno from './SeleccionadorAlumno'

const ListaDeAlumnos = ({ alumnos }) => {
  // console.log(alumnos)

  if (alumnos.length === 0) {
    return (
      <div className='container-no-hay-alumnos-registrados'>
        "No hay alumnos registrados"
      </div>
    )
  } else {
    return (
      <>
        <div className='container-seleccionador-alumno titulo-tabla-lista-de-alumnos'>
          <main className='datos-seleccionador-alumno'>
            <span className='codigo-seleccionador-alumno'>Código</span>
            <span className='name-seleccionador-alumno'>Nombre</span>
            <span className='apelldoPaterno-seleccionador-alumno'>
              Apellido Paterno
            </span>
            <span className='apellidoMaterno-seleccionador-alumno'>
              Apellido Materno
            </span>
            <span className='grupo-seleccionador-alumno'>Grupo</span>
            <span className='carrera-seleccionador-alumno'>Carrera</span>
            <span className='dni-seleccionador-alumno'>DNI</span>
          </main>

          <span className='editar-seleccionador-alumno'>Acción</span>
        </div>
        {alumnos.map((opcion) => (
          <SeleccionadorAlumno
            key={opcion.numero}
            codigo={opcion.codigo}
            name={opcion.nombre}
            apellidoPaterno={opcion.apellidoPaterno}
            apellidoMaterno={opcion.apellidoMaterno}
            dni={opcion.dni}
            grupo={opcion.grupo}
            carrera={opcion.carrera}
          />
        ))}
      </>
    )
  }
}

export default ListaDeAlumnos
