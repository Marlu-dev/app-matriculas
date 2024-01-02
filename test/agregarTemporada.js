import { crearTemporada } from '../librerias/manipularDatos.js'
import { Timestamp } from 'firebase/firestore'

const datos =
  {
    fechaInicio: Timestamp.fromDate(new Date(2023, 3, 13, 7, 30, 0, 0)),
    fechaFin: Timestamp.fromDate(new Date(2023, 11, 0, 0, 0, 0, 0)),
    nombre: 'Temporada 2021-I',
    ciclosAperturados: [
      {
        nombre: 'Anual Nuevo',
        inicio: Timestamp.fromDate(new Date(2023, 3, 13, 7, 30, 0, 0)),
        fin: Timestamp.fromDate(new Date(2023, 11, 0, 0, 0, 0, 0)),
        horario: {
          dias: 'Lunes a Sabado',
          hora: '7:00am - 1:00pm + 3 tardes (3:00pm - 8:30pm)'
        },
        precios: [
          {
            nombre: 'Contado',
            total: 1900

          },
          {
            nombre: 'Credito',
            total: 2000,
            cuotas: {
              1: 600,
              2: 500,
              3: 500,
              4: 400
            }

          }],

        descuentos: {
          excelencia: {
            contado: 1520,
            credito: {
              total: 1600,
              cuotas: {
                1: 550,
                2: 550,
                3: 500
              }
            }
          },
          exAlumno: 0
        },

        simulacroCarnet: 180,

        grupo: {
          1: 'Único'
        }
      }
    ]
  }

crearTemporada('T1', datos)
