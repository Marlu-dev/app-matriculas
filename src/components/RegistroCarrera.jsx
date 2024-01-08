import React, { useState, useEffect } from 'react'
import { db } from '../../public/services/firebase/firebase.js'
import { collection, query, onSnapshot, updateDoc, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore'
import '../style/RegistroCarrera.css'
import { useSnackbar } from 'notistack'
import Select from './Select.jsx'

const RegistroCarrera = () => {
  const [listaDeCarreras, setListaDeCarreras] = useState([])
  const [listaDeCiclos, setListaDeCiclos] = useState([])
  const [carreraNueva, setCarreraNueva] = useState('')
  const [ciclosActivados, setCiclosActivados] = useState({})
  const [codigoCarrerita, setCodigoCarrerita] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const [carreraQueSeEliminara, setCarreraQueSeEliminara] = useState('')
  const [idCarreraQueSeEliminara, setIdCarreraQueSeEliminara] = useState('')

  useEffect(() => {
    const q = query(collection(db, 'carreritas'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const carreras = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setListaDeCarreras(carreras)
    })
    return () => unsubscribe()
  }, [])

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
    const codigo = listaDeCarreras.length
    setCodigoCarrerita('carrera' + codigo)
  }, [listaDeCarreras])

  const handleCheckboxChange = (cicloId) => {
    setCiclosActivados((prevCiclosActivados) => {
      return { ...prevCiclosActivados, [cicloId]: !prevCiclosActivados[cicloId] }
    })
  }

  const carreritas = listaDeCarreras.map((carrera) => {
    const ciclosActivos = listaDeCiclos.filter((ciclo) => ciclosActivados[ciclo.id])

    const ciclos = ciclosActivos.map((ciclo) => ({
      nombre: ciclo.nombre,
      grupos: Object.keys(ciclo.grupo || {}).map((numero) => ({
        nombre: ciclo.grupo[numero]
      }))
    }))

    return {
      nombre: carreraNueva,
      ciclos
    }
  })

  const registrarCarrera = async () => {
    try {
      if (codigoCarrerita !== '') {
        console.log(codigoCarrerita)

        const coleccionRef = collection(db, 'carreritas')
        setDoc(doc(coleccionRef, `${codigoCarrerita}`), carreritas[0])
      }

      enqueueSnackbar('Se registró la carrera indicada', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    } catch (error) {
      enqueueSnackbar('No se pudo registrar la carrera indicada', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    }
  }

  const obtenerCarreraSeleccionada = (e) => {
    if (e.target.name === 'carrera') {
      setCarreraQueSeEliminara(e.target.value)
    }
  }

  useEffect(() => {
    console.log(carreraQueSeEliminara)
    const coincidencia = listaDeCarreras.filter((carrera) => carrera.nombre === carreraQueSeEliminara)

    console.log(coincidencia)
    setIdCarreraQueSeEliminara(coincidencia[0]?.id)
  }
  , [carreraQueSeEliminara])

  const elminarCarrera = async () => {
    try {
      await deleteDoc(doc(db, 'carreritas', `${idCarreraQueSeEliminara}`))
      enqueueSnackbar('Se eliminó la carrera seleccionada', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    } catch (error) {
      enqueueSnackbar('No se pudo eliminar la carrera sleccionada', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    }
  }

  return (
    <div className='container-registro-carrera'>
      <div className='container-formulario-registro-carrera'>
        <h1>Gestión de Carreras</h1>
        <h2>Registrar Carrera</h2>
        <div>
          <label>Nombre de la Carrera</label>
          <input
            type='text'
            name='carrera'
            id=''
            value={carreraNueva}
            onChange={(e) => setCarreraNueva(e.target.value)}
          />
        </div>
        <div className='container-ver-ciclos'>
          <h4>Marque los ciclos que se incuirán en la carrera</h4>
          {listaDeCiclos.map((ciclo) => (
            <div className='container-ciclo' key={ciclo.id}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h5>{ciclo.nombre}</h5>
                <input
                  type='checkbox'
                  name={ciclo.nombre}
                  id={ciclo.id}
                  checked={ciclosActivados[ciclo.id] || false}
                  onChange={() => handleCheckboxChange(ciclo.id)}
                />
              </div>

              {/* {ciclosActivados[ciclo.id] &&
              ciclo.grupo &&
              Object.keys(ciclo.grupo).map((numero) => {
                const valor = ciclo.grupo[numero]
                console.log('grupo', valor)
                return (
                  <div key={numero} style={{ display: 'flex', flexDirection: 'row' }}>
                    <br />
                    <h5>{valor}</h5>
                    <input type='checkbox' name={valor} />
                  </div>
                )
              })} */}
            </div>
          ))}
        </div>
        <button onClick={() => registrarCarrera()}>Registrar</button>
      </div>
      <div className='container-eliminar-carrera'>
        <h2>Eliminar Carrera</h2>
        <div className='container-carreras'>
          <Select
            coleccion='carreritas'
            nombre='carrera'
            id='id'
            placeholder='Seleccione una carrera'
            onSelectChange={obtenerCarreraSeleccionada}
          />
          <button onClick={elminarCarrera}>Eliminar</button>
        </div>
      </div>
      <div className='container-ver-carreras'>
        <div>
          <h2>Carreras Registradas</h2>
        </div>
        {listaDeCarreras.map((carrera) => {
          return (
            <div className='container-carrera' key={carrera.id}>
              <h3>{carrera.nombre}</h3>
              <div>
                <h4>Ciclos</h4>
                {carrera.ciclos.map((ciclo) => {
                  return (
                    <div className='container-ciclo' key={ciclo.nombre}>
                      <h4>{ciclo.nombre}</h4>
                    </div>
                  )
                })}
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RegistroCarrera
