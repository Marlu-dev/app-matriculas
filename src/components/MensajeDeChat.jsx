import React, { useContext } from 'react'
import { userContext } from './Login.jsx'
import { motion } from 'framer-motion'

const MensajeDeChat = ({ usuario, mensaje }) => {
  const { user, temporada } = useContext(userContext)
  console.log(user, temporada)
  console.log(usuario)

  return (
    <motion.div
      style={{
        position: 'relative',
        display: 'flex', // Cambiado a 'inline-block'
        padding: '10px',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: user === usuario ? 'flex-end' : 'flex-start'
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}

    >
      <div style={{
        display: 'inline-block',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}
      >
        <div style={
        {
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: user === usuario ? 'blue' : 'green',
          height: '100%',
          padding: '10px',
          justifyContent: 'flex-end',
          borderRadius: '10px'
        }
        }
        >
          <label style={
        {
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold'
        }
        }
          >{usuario}
          </label>
          <label style={
        {
          color: 'white',
          display: 'flex',
          fontSize: '16px',
          justifyContent: user === usuario ? 'flex-end' : 'flex-start'
        }
        }
          >{mensaje}
          </label>
        </div>

      </div>
    </motion.div>
  )
}

export default MensajeDeChat
