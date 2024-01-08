import React, { useState, useEffect, useContext, useRef } from 'react'
import '../style/GridAplication.css'
import BarraTitulo from './gridAplication/BarraTitulo'
import BarraLateral2 from './gridAplication/BarraLateral2/BarraLateral2'
import Centro from './gridAplication/Main/Centro'
import BarraLateral from './gridAplication/BarraLateral/BarraLateral'
import { motion } from 'framer-motion'
import { db } from '../../public/services/firebase/firebase.js'
import { collection, query, onSnapshot, updateDoc, doc } from 'firebase/firestore'
import MensajeDeChat from './MensajeDeChat.jsx'
import { userContext } from './Login.jsx'

const GridAplicacion = () => {
  const [menuSeleccionadoBarraLateral2, setMenuSeleccionadoBarraLateral2] =
    useState('')

  const recuperarMenuSeleccionadoBarraLateral2 = (menu) => {
    setMenuSeleccionadoBarraLateral2(menu)
  }

  const [arrayDeMensajes, setArrayDeMensajes] = useState([])
  const { user, temporada } = useContext(userContext)
  const [mensaje, setMensaje] = useState('')
  const mensajesContainerRef = useRef(null)
  const [chatActivado, setChatActivado] = useState(false)
  console.log(user, temporada)

  // const ajustarTamanio = () => {
  //   const inputElement = document.getElementById('inputCreciente')

  //   // Guardar la posición actual del cursor y el valor del input
  //   const cursorPos = inputElement.selectionStart
  //   const valorInput = inputElement.value

  //   // Establecer temporalmente la altura del input a su altura máxima para calcular el scrollHeight
  //   inputElement.style.height = 'auto'
  //   const nuevoAlto = inputElement.scrollHeight

  //   // Establecer la altura del input
  //   inputElement.style.height = nuevoAlto + 'px'

  //   // Restaurar el valor y la posición del cursor
  //   inputElement.value = valorInput
  //   inputElement.setSelectionRange(cursorPos, cursorPos)
  // }

  useEffect(() => {
    const q = query(collection(db, 'chat'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setArrayDeMensajes(chats[0].mensajes)
    })

    // Asegúrate de realizar la limpieza cuando el componente se desmonta
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    console.log(arrayDeMensajes)
  }, [arrayDeMensajes])

  useEffect(() => {
    console.log(mensaje)
  }
  , [mensaje])

  useEffect(() => {
    // Accede al contenedor de mensajes y ajusta el desplazamiento al final
    if (mensajesContainerRef.current) {
      mensajesContainerRef.current.scrollTop = mensajesContainerRef.current.scrollHeight
    }
  }, [arrayDeMensajes, chatActivado])

  const enviarMensaje = async () => {
    try {
      await updateDoc(doc(db, 'chat', 'chat'), {
        mensajes: [...arrayDeMensajes, { user, mensaje }]
      })
      setMensaje('')
    } catch (error) {
    }
  }

  const handleChange = (e) => {
    setMensaje(e.target.value)
  }

  const activarChat = () => {
    setChatActivado(!chatActivado)
  }

  return (
    <>
      <div className='barraTitulo'>
        <BarraTitulo />
      </div>
      <div className='barraLateral1 barraLateral2Expandido' id='barraLateral1'>
        <BarraLateral
          menuSeleccionado={recuperarMenuSeleccionadoBarraLateral2}
        />
      </div>
      <motion.div className='barraLateral2 barraLateral2Expandido' id='barraLateral2'>
        <BarraLateral2
          menuSeleccionado={recuperarMenuSeleccionadoBarraLateral2}
        />
      </motion.div>

      {/* <div className='header_principal'>
        <BarraDeHerramientas />
      </div> */}

      <div className='main'>
        <Centro menuSeleccionadoBarraLateral2={menuSeleccionadoBarraLateral2} />
      </div>

      {
        chatActivado && (
          <motion.div
            style={{
              position: 'absolute',
              right: '5%',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#02529eff',
              width: '30%',
              height: '80%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px',
              padding: '10px'
            }}
            initial={{ opacity: 0, x: 50, y: '-50%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}

          >
            <div
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden'
              }}
            >
              <div
                ref={mensajesContainerRef}
                style={{
                  width: '100%',
                  height: '98%',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  overflow: 'auto',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {arrayDeMensajes.map((mensaje, index) => (
                  <MensajeDeChat
                    key={index}
                    usuario={mensaje.user}
                    mensaje={mensaje.mensaje}
                  />
                ))}
              </div>
            </div>
            <div style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row' }}>
              <input
                type='text'
                style={{
                  width: '100%',
                  height: '100%',
                  fontSize: '16px',
                  whiteSpace: 'pre-wrap',
                  overflow: 'hidden',
                  transition: 'height 0.3s',
                  outline: 'none'
                }}
                id='inputCreciente'
                // onInput={ajustarTamanio}
                onChange={handleChange}
                value={mensaje}
              />
              <button onClick={enviarMensaje}>Enviar</button>
            </div>
          </motion.div>
        )
      }

      <div
        className='btnChat'
        style={{
          position: 'absolute',
          right: '2%',
          bottom: '5%',
          backgroundColor: '#00abfb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }} onClick={activarChat}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-message' width='44'
          height='44'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='white'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        ><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M8 9h8' /><path d='M8 13h6' /><path d='M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z' />
        </svg>
      </div>
      {/* <div className="aside" id="aside">
        Aside
      </div> */}
    </>
  )
}

export default GridAplicacion
