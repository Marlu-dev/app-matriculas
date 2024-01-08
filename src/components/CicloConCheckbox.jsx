import React, { useEffect, useState } from 'react'
import { db } from '../../public/services/firebase/firebase.js'
import { collection, query, onSnapshot } from 'firebase/firestore'
import GrupoConCheckbox from './GrupoConCheckbox.jsx'

const CicloConCheckbox = ({ id }) => {
  const [listaDeCiclos, setListaDeCiclos] = useState([])
  const [coincidenciaCiclo, setCoincidenciaCiclo] = useState([])
  const [activo, setActivo] = useState(false)

  const handleChage = () => {
    setActivo(!activo)
  }

  useEffect(() => {
    console.log(activo)
  }
  , [activo])

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

  useEffect(() => {
    setCoincidenciaCiclo(listaDeCiclos.filter((ciclo) => ciclo.id === id))
  }
  , [listaDeCiclos])

  useEffect(() => {
    console.log(coincidenciaCiclo)
  }
  , [coincidenciaCiclo])

  return (
    <div>
      {
            coincidenciaCiclo.length > 0
              ? (
                <>
                  <label>{coincidenciaCiclo[0].nombre}</label>
                  <input type='checkbox' name='' id='' checked={activo} onChange={() => handleChage()} />
                  {
  activo && coincidenciaCiclo[0]?.grupos
    ? (
        Object.keys(coincidenciaCiclo[0].grupos).map((grupoKey) => (
          <GrupoConCheckbox key={grupoKey} orden={coincidenciaCiclo[0].grupos[grupoKey]} />
        ))
      )
    : ''
}

                </>

                )
              : ''
        }
    </div>
  )
}

export default CicloConCheckbox
