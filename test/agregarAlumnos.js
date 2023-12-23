//* Esto es para agregar un solo documento, por el momento estará comentado
import { Timestamp, collection, addDoc } from 'firebase/firestore'
// import db from '../firebase/firebase.js'
// import { collection, addDoc } from 'firebase/firestore'

// const datos =
//   {
//     codigo: 'A2',
//     numero: 2,
//     nombre: 'Juan',
//     apellidoPaterno: 'Perez',
//     apellidoMaterno: 'Gomez',
//     edad: 20,
//     dni: '12345678',
//     grupo: 'semestral medicas',
//     carrera: 'Biología Pesquera',
//     direccion: 'Av. Los Alamos 123',
//     telefonoCelular: '987654321',
//     apoderado: {
//       nombreApoderado: 'Maria',
//       apellidoPaternoApoderado: 'Gomez',
//       apellidoMaternoApoderado: 'Perez',
//       dniApoderado: '87654321',
//       telefonoCelularApoderado: '987654321'
//     }
//   }

// const docRef = await addDoc(collection(db, 'alumnos'), datos)

//* Esto es para agregar varios documentos

import db from '../public/services/firebase/firebase.js'
// import { readFileSync } from 'fs'

// const alumnos = readFileSync('./carreras.json', 'utf8')

const grupos = [
  {
    nombre: 'Anual Continuo (Formativos)',
    inicio: {
      Ciencias: Timestamp.fromDate(new Date(2024, 2, 30, 7, 0, 0, 0)),
      Letras: Timestamp.fromDate(new Date(2024, 3, 3, 7, 0, 0, 0))
    },
    fin: 'Setiembre',
    horario: {
      dias: 'Lunes a Sabado',
      hora: '7:30am - 1:00pm + 3 tardes (3:00pm - 8:30pm)'
    },
    precios: {
      contado: 1400,
      crédito: 1500,
      cuotas: {
        1: 600,
        2: 500,
        3: 400
      }
    },

    descuentos: {
      excelencia: 0,
      exAlumno: 0
    },

    simulacroCarnet: 120
  }
]

// const datos = JSON.parse(carreras)

grupos.forEach(async (city) => {
  const referenciaColeccion = collection(db, 'carreras')
  await addDoc(referenciaColeccion, city)
})
