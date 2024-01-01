import { collection, doc, setDoc, query, onSnapshot, updateDoc, getDoc } from 'firebase/firestore'
import fs from 'fs'
import path from 'path'
import { db, storage } from '../public/services/firebase/firebase.js'
import { ref, uploadBytes } from 'firebase/storage'

function crearJsonDesdeObjeto (objeto) {
  const nuevoDoc = JSON.stringify(objeto)
  console.log(nuevoDoc)

  // agregar nuevoDoc a un nuevo archivo json

  const ruta = path.join(process.cwd(), 'ciclos.json')

  fs.writeFileSync(ruta, nuevoDoc)
}

async function agregarArrayDatosColeccionVacia (db, datos, coleccion, prefijoId) {
  const coleccionRef = collection(db, coleccion)

  for (let i = 0; i < datos.length; i++) {
    const dato = datos[i]
    // const grupoRef = await gruposCollection.add(ciclo)
    await setDoc(doc(coleccionRef, `${prefijoId + i}`), dato)
  }
}

function recuperarColeccion (nombreColeccion) {
  return new Promise((resolve, reject) => {
    const q = query(collection(db, nombreColeccion))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaDeAlumnos = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      resolve(listaDeAlumnos)
    }, (error) => {
      reject(error)
    })
  })
}

function subirDocumentoExcelencia (archivo, dni) {
  const storageRef = ref(storage, `certificadosExcelencia/${dni}`)
  uploadBytes(storageRef, archivo).then((snapshot) => {
    console.log('Documento subido')
  })

  return storageRef
}

function crearTemporada (nombreTemporada, datos) {
  const coleccionRef = collection(db, 'temporadas')
  setDoc(doc(coleccionRef, `${nombreTemporada}`), datos)
}

async function agregarMatricula (datos, codigo) {
  const coleccionRef = doc(db, 'alumnos', codigo)

  const documento = await getDoc(coleccionRef)
  if (documento.exists()) {
    const matriculasActuales = documento.data().matriculas || []

    const nuevoArrayMatriculas = [...matriculasActuales, datos]

    await updateDoc(coleccionRef, { matriculas: nuevoArrayMatriculas })
  } else {
    console.error('El documento no existe')
  }
}

async function agregarDatosExcelencia (codigo) {
  const coleccionRef = doc(db, 'alumnos', codigo)

  const documento = await getDoc(coleccionRef)
  if (documento.exists()) {
    await updateDoc(coleccionRef, { docExcelencia: true })
  } else {
    console.error('El documento no existe')
  }
}

export { crearJsonDesdeObjeto, agregarArrayDatosColeccionVacia, recuperarColeccion, subirDocumentoExcelencia, crearTemporada, agregarMatricula, agregarDatosExcelencia }
