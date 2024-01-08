import React, { useState, useEffect, useRef } from 'react'
import { db } from '../../public/services/firebase/firebase.js'
import { collection, query, onSnapshot } from 'firebase/firestore'
import GridAplicacion from './GridAplicacion'
import { EstadoBarraLateralProvider } from './EstadoBarraLateralProvider'
import { AnimatePresence } from 'framer-motion'

export const userContext = React.createContext()

const Login = () => {
  const [usuario, setUsuario] = useState('')
  const [pass, setPass] = useState('')
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([])
  const [concidenciaUsuario, setConcidenciaUsuario] = useState('')
  const [sesionIniciada, setSesionIniciada] = useState(false)
  const [temporada, setTemporada] = useState('')
  const [error, setError] = useState('')
  const primerIngreso = useRef(true)

  const handleChange = (e) => {
    const trimmedValue = e.target.value.trim()

    if (e.target.id === 'usuario') {
      setUsuario(trimmedValue)
    } else {
      setPass(trimmedValue)
    }
  }

  const iniciarSesion = () => {
    primerIngreso.current = false
    console.log('Iniciando sesión')
    const q = query(collection(db, 'usuarios'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaUsuarios = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setUsuariosRegistrados(listaUsuarios)
      setConcidenciaUsuario(listaUsuarios.filter(u => u.user === usuario && u.pass === pass))
    })

    // Asegúrate de realizar la limpieza cuando el componente se desmonta
    return () => unsubscribe()
  }

  useEffect(() => {
    console.log(primerIngreso.current)
  }, [primerIngreso.current])

  useEffect(() => {
    console.log(usuariosRegistrados)
  }
  , [usuariosRegistrados])

  useEffect(() => {
    console.log(concidenciaUsuario)
    if (concidenciaUsuario.length > 0) {
      setError('')
      const timeout = setTimeout(() => {
        setSesionIniciada(true)
      }, 5000)

      return () => clearTimeout(timeout)
    } else {
      if (primerIngreso.current) {
        setError('')
      } else {
        setError('Usuario o contraseña incorrectos')
      }
    }
  }
  , [concidenciaUsuario])

  useEffect(() => {
    console.log(usuario)
  }, [usuario])

  useEffect(() => {
    console.log(pass)
  }
  , [pass])

  return (
    sesionIniciada === false
      ? (
        <div style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <h1>Inicio de Sesión</h1>
            <div>
              <label>Usuario</label>
              <input type='text' id='usuario' value={usuario} onChange={handleChange} />
            </div>
            <div>
              <label>Contraseña</label>
              <input type='password' id='contraseña' value={pass} onChange={handleChange} />
            </div>
            <div>
              <label>{error}</label>
            </div>
            <button onClick={() => iniciarSesion()}>Iniciar Sesión</button>
          </div>

        </div>
        )
      : (
        <AnimatePresence>
          <userContext.Provider value={{ user: concidenciaUsuario[0].user, temporada }}>

            <EstadoBarraLateralProvider>
              <GridAplicacion />
            </EstadoBarraLateralProvider>
          </userContext.Provider>
        </AnimatePresence>

        )
  )
}

export default Login
