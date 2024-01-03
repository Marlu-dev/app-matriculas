import React from 'react'
import { useReactTable } from '@tanstack/react-table'

const SimpleTable = () => {
  const columns = [
    {
      Header: 'Codigo',
      accessor: 'id'
    },
    {
      Header: 'DNI',
      accessor: 'dni'
    },
    {
      Header: 'Codigo Alumno',
      accessor: 'codigoAlumno'
    },
    {
      Header: 'Carrera',
      accessor: 'carrera'
    },
    {
      Header: 'Ciclo',
      accessor: 'ciclo'
    },
    {
      Header: 'Monto',
      accessor: 'monto'
    },
    {
      Header: 'Descuento',
      accessor: 'descuentoAdicional'
    },
    {
      Header: 'Descuento que se aplicara',
      accessor: 'descuentoQueSeAplicara'
    },
    {
      Header: 'Monto Total',
      accessor: 'montonTotal'
    },
    {
      Header: 'Tipo de pago',
      accessor: 'tipoDePago'
    },
    {
      Header: 'Temporada',
      accessor: 'temporada'
    },
    {
      Header: 'Estado',
      accessor: 'estado'
    },
    {
      Header: 'Observacion',
      accessor: 'observacionDescuentoAdicional'
    },
    {
      Header: 'Secretaria',
      accessor: 'secretaria.nombre'
    }
  ]

  useReactTable({ listaDeMatriculas, columns })

  return (
    <div>SimpleTable</div>
  )
}

export default SimpleTable
