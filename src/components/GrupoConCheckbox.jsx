import React, { useEffect, useState } from 'react'
import { db } from '../../public/services/firebase/firebase.js'
import { collection, query, onSnapshot } from 'firebase/firestore'

const GrupoConCheckbox = ({ orden }) => {
  const [listaDeCiclos, setListaDeCiclos] = useState([])
  //   const [coincidenciaCiclo, setCoincidenciaCiclo] = useState([])
  //   const [activo, setActivo] = useState(false)

  //   const handleChage = () => {
  //     setActivo(!activo)
  //   }

  useEffect(() => {
    console.log(orden)
  }
  , [orden])

  useEffect(() => {
    const q = query(collection(db, 'ciclos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ciclos = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setListaDeCiclos(ciclos)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div>
      {listaDeCiclos.grupo.orden}
    </div>
  )
}

export default GrupoConCheckbox
