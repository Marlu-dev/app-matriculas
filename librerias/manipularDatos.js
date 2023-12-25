import { collection, doc, setDoc } from 'firebase/firestore'
import fs from 'fs'
import path from 'path'

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

export { crearJsonDesdeObjeto, agregarArrayDatosColeccionVacia }
