import React, { useEffect, useState } from 'react'
import { recuperarColeccion } from '../../librerias/manipularDatos'
const GestionPagos = () => {
  const [listaDeMatriculas, setListaDeMatriculas] = useState([])

  // monto: 1280,
  //   descuentoAdicional: '1000',
  //   codigoAlumno: 'A1',
  //   montonTotal: 400,
  //   estado: 'pendiente',
  //   observacionDescuentoAdicional: '',
  //   ciclo: 'Semestral',
  //   secretaria: { nombre: 'Juan' },
  //   carrera: 'Medicina',
  //   dni: '76656800',
  //   tipoDePago: 'Credito',
  //   descuentoQueSeAplicara: 'excelencia',
  //   temporada: '2021-1',
  //   id: 'M1'

  useEffect(() => {
    recuperarColeccion('matriculas')
      .then((lista) => {
        setListaDeMatriculas(lista)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  , [])

  useEffect(() => {
    console.log(listaDeMatriculas)
  }
  , [listaDeMatriculas])

  return (
    <>xd</>
  )
}

export default GestionPagos
