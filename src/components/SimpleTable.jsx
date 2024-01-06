import React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table'

import '../style/SimpleTable.css'
// import data from '../../test/data.json'

const SimpleTable = () => {
  const columns = [
    {
      header: 'Codigo',
      accessorKey: 'id'
    },
    {
      header: 'DNI',
      accessorKey: 'dni'
    },
    {
      header: 'Codigo Alumno',
      accessorKey: 'codigoAlumno'
    }
    // {
    //   header: 'Carrera',
    //   accessor: 'carrera'
    // },
    // {
    //   header: 'Ciclo',
    //   accessor: 'ciclo'
    // },
    // {
    //   header: 'Monto',
    //   accessor: 'monto'
    // },
    // {
    //   header: 'Descuento',
    //   accessor: 'descuentoAdicional'
    // },
    // {
    //   header: 'Descuento que se aplicara',
    //   accessor: 'descuentoQueSeAplicara'
    // },
    // {
    //   header: 'Monto Total',
    //   accessor: 'montonTotal'
    // },
    // {
    //   header: 'Tipo de pago',
    //   accessor: 'tipoDePago'
    // },
    // {
    //   header: 'Temporada',
    //   accessor: 'temporada'
    // },
    // {
    //   header: 'Estado',
    //   accessor: 'estado'
    // },
    // {
    //   header: 'Observacion',
    //   accessor: 'observacionDescuentoAdicional'
    // },
    // {
    //   header: 'Secretaria',
    //   accessor: 'secretaria.nombre'
    // }
  ]

  const data = [
    {
      id: 1,
      dni: '76656800',
      codigoAlumno: 'A1'
    }
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  // console.log('Data:', data)
  // console.log('Columns:', columns)

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.column.columnDef.header}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SimpleTable
