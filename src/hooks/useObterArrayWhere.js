import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import db from '../../public/services/firebase/firebase.js'

function useObterArrayWhere (coleccion, campo, operador, valor) {
  console.log('coleccion', coleccion, 'campo', campo, 'operador', operador, 'valor', valor)
  const coleccionPedida = collection(db, coleccion)
  const [dataCompleta, setDataCompleta] = useState([])

  useEffect(() => {
    const q = query(coleccionPedida, where(campo, operador, valor))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const dataBruta = querySnapshot.docs.map((doc) => doc.data())
      setDataCompleta(dataBruta)
    })

    return () => {
      unsubscribe()
    }
  }, [valor])

  console.log(dataCompleta)

  return { dataCompleta }
}

export default useObterArrayWhere
