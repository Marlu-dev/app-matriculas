import React, { useState, useEffect, useRef } from 'react'
import { db } from '../../public/services/firebase/firebase.js'
import { collection, query, onSnapshot } from 'firebase/firestore'
import GridAplicacion from './GridAplicacion'
import { EstadoBarraLateralProvider } from './EstadoBarraLateralProvider'
import { AnimatePresence, motion } from 'framer-motion'
import '../style/Login.css'
import '../style/Loader.css'

export const userContext = React.createContext()

const Login = () => {
  const [usuario, setUsuario] = useState('')
  const [pass, setPass] = useState('')
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([])
  const [concidenciaUsuario, setConcidenciaUsuario] = useState('')
  const [sesionIniciada, setSesionIniciada] = useState(false)
  const [temporada, setTemporada] = useState('')
  const [error, setError] = useState('')
  const [nivel, setNivel] = useState('')
  const [estadoLoader, setEstadoLoader] = useState(false)
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
    setError('')
    setEstadoLoader(true)
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
    console.log(nivel)
  }
  , [nivel])

  useEffect(() => {
    console.log(concidenciaUsuario)
    if (concidenciaUsuario.length > 0) {
      setError('')
      setNivel(concidenciaUsuario[0].nivel)
      const timeout = setTimeout(() => {
        setSesionIniciada(true)
        setEstadoLoader(false)
      }, 3000)

      return () => clearTimeout(timeout)
    } else {
      if (primerIngreso.current) {
        const timeout = setTimeout(() => {
          setError('')
          setEstadoLoader(false)
        }, 1000)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setError('Usuario o contraseña incorrectos')
          setEstadoLoader(false)
        }, 1000)
        return () => clearTimeout(timeout)
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
        <div className='container-login-principal'>
          <motion.div
            className='container-login'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
          >
            <div class='container-lado-izquierdo'>
              <h1 class='titulo-inicio-sesion'>Inicio de Sesión</h1>
              <div class='campo-formulario'>
                <label for='usuario' class='etiqueta-usuario'>Usuario</label>
                <input type='text' id='usuario' class='input-usuario' value={usuario} onChange={handleChange} />
              </div>
              <div class='campo-formulario'>
                <label for='contraseña' class='etiqueta-contraseña'>Contraseña</label>
                <input type='password' id='contraseña' class='input-contraseña' value={pass} onChange={handleChange} />
              </div>
              <div class='mensaje-error'>
                <label class='error'>{error}</label>
              </div>
              <button class='boton-iniciar-sesion' onClick={() => iniciarSesion()}>Iniciar Sesión</button>
            </div>

            <div className='container-lado-derecho'>
              {}
            </div>
          </motion.div>
          {
            estadoLoader && <div class='custom-loader' />
          }

        </div>
        )
      : (
        <AnimatePresence>
          <userContext.Provider value={{ user: concidenciaUsuario[0].user, temporada, nivel }}>

            <EstadoBarraLateralProvider>
              <GridAplicacion />
            </EstadoBarraLateralProvider>
          </userContext.Provider>
        </AnimatePresence>

        )
  )
}

export default Login
