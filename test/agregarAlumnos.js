//* Esto es para agregar un solo documento, por el momento estará comentado

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
import { collection, addDoc } from 'firebase/firestore'
import { readFileSync } from 'fs'

const alumnos = readFileSync('./alumnos.json', 'utf8')
const datos = JSON.parse(alumnos)

datos.forEach(async (city) => {
  const referenciaColeccion = collection(db, 'alumnos')
  await addDoc(referenciaColeccion, city)
})
