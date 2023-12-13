import React from 'react'

const RegistroInversion = () => {
  return (
    <>
      <h1>Inversión</h1>
      <fieldset className='seccion-form'>
        <div>
          <label>Nombre</label>
          {/* <label>{errorName}</label> */}
        </div>
        <input
          name='nombre'
          id='nombre'
          //   value={apoderado.nombre}
          //   onChange={handleChange}
          //   onBlur={handleBlur}
        />
      </fieldset>
    </>
  )
}

export default RegistroInversion
