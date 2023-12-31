import React, { useState, useEffect, useRef } from 'react'
import useValidationApoderado from '../hooks/useValidationApoderado'

const RegistroApoderado = ({
  registroNombreApoderado,
  handleApoderadoValido,
  datosApoderado
}) => {
  const banderaTelefonoCelularApoderado = useRef()
  const [bandera, setBandera] = useState(false)
  // const [banderaApoderadoValido, setBanderaApoderadoValido] = useState(false)
  const [apoderado, setApoderado] = useState({})
  const [copiaCelularApoderado, setCopiaCelularApoderado] = useState('')

  console.log(datosApoderado)

  useEffect(() => {
    if (datosApoderado) {
      setApoderado({
        nombreApoderado: datosApoderado.nombreApoderado,
        apellidoPaternoApoderado: datosApoderado.apellidoPaternoApoderado,
        apellidoMaternoApoderado: datosApoderado.apellidoMaternoApoderado,
        dniApoderado: datosApoderado.dniApoderado,
        telefonoCelularApoderado: datosApoderado.telefonoCelularApoderado
      })

      if (datosApoderado.telefonoCelularApoderado === 'No tiene') {
        setCopiaCelularApoderado('')
      } else {
        setCopiaCelularApoderado(datosApoderado.telefonoCelularApoderado)
      }
    }
  }, [datosApoderado])

  // const nombreApoderado = datosApoderado.nombreApoderado
  // const apellidoPaternoApoderado = datosApoderado.apellidoPaternoApoderado
  // const apellidoMaternoApoderado = datosApoderado.apellidoMaternoApoderado
  // const dniApoderado = datosApoderado.dniApoderado
  // const telefonoCelularApoderado = datosApoderado.telefonoCelularApoderado

  // const [apoderado, setApoderado] = useState({
  //   nombreApoderado: '',
  //   apellidoPaternoApoderado: '',
  //   apellidoMaternoApoderado: '',
  //   dniApoderado: '',
  //   telefonoCelularApoderado: ''
  // })

  function noTelefonoCelular () {
    setBandera(banderaTelefonoCelularApoderado.current.checked)
    const telefonoCelularApoderadoElement = document.getElementById(
      'telefonoCelularApoderado'
    )
    if (telefonoCelularApoderadoElement.disabled) {
      telefonoCelularApoderadoElement.disabled = false
      telefonoCelularApoderadoElement.focus()
      setApoderado({ ...apoderado, telefonoCelularApoderado: copiaCelularApoderado })
    } else {
      telefonoCelularApoderadoElement.disabled = true
      setApoderado({ ...apoderado, telefonoCelularApoderado: 'No tiene' })
    }
  }

  // useEffect(() => {
  //   if (bandera) {
  //     setApoderado({ ...apoderado, telefonoCelularApoderado: 'No tiene' })
  //   } else {
  //     setApoderado({ ...apoderado, telefonoCelularApoderado: '' })
  //   }
  // }, [bandera])

  function handleChange (e) {
    const { name, value } = e.target
    const newQuery = value

    if (e.target.name === 'dni') {
      if (/^\d+$/.test(newQuery) || newQuery === '') {
        setApoderado({ ...apoderado, [name]: value })
        return
      }
    }
    if (e.target.name === 'telefonoCelularApoderado') {
      if (/^\d+$/.test(newQuery) || newQuery === '') {
        setApoderado({ ...apoderado, [name]: value })
        return
      }
    }

    if (e.target.name === 'nombreApoderado') {
      setApoderado({ ...apoderado, [name]: value })
      return
    }

    if (e.target.name === 'apellidoPaternoApoderado') {
      setApoderado({ ...apoderado, [name]: value })
      return
    }

    if (e.target.name === 'apellidoMaternoApoderado') {
      setApoderado({ ...apoderado, [name]: value })
      return
    }

    if (e.target.name === 'dniApoderado') {
      if (/^\d+$/.test(newQuery) || newQuery === '') {
        setApoderado({ ...apoderado, [name]: value })
      }
    }
  }

  // console.log(apoderado);
  const {
    errorName,
    errorApellidoPaterno,
    errorApellidoMaterno,
    errorDni,
    errorTelefonoCelular,
    apoderadoValido,
    handleBlur
  } = useValidationApoderado(
    apoderado.nombreApoderado,
    apoderado.apellidoPaternoApoderado,
    apoderado.apellidoMaternoApoderado,
    apoderado.dniApoderado,
    apoderado.telefonoCelularApoderado,
    bandera
  )

  useEffect(() => {
    registroNombreApoderado(apoderado)
  }, [apoderado])

  useEffect(() => {
    handleApoderadoValido(apoderadoValido)
  }, [apoderadoValido])

  return (
    <>
      <div className='from '>
        <div className='details person'>
          <span className='title'>
            Datos Apoderado
          </span>

          {/* -- INICIO --  */}
          <div className='seccion-form'>
            {/* PRIMER DATO: Nombre */}
            <div className='input-seccion'>
              <div>
                <label>Nombre</label>
                <label className='error-label'>{errorName}</label>
              </div>
              <input
                className={errorName ? 'error-input' : ''}
                name='nombreApoderado'
                id='nombreApoderado'
                value={apoderado.nombreApoderado}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Fernando Roman' required
              />
            </div>

            {/* SEGUNDO DATO: Apellido Paterno */}
            <div className='input-seccion'>
              <div>
                <label>Apellido Paterno</label>
                <label className='error-label'>{errorApellidoPaterno}</label>
              </div>
              <input
                className={errorApellidoPaterno ? 'error-input' : ''}
                name='apellidoPaternoApoderado'
                id='apellidoPaternoApoderado'
                value={apoderado.apellidoPaternoApoderado}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Navarro' required
              />
            </div>

            {/* TECER DATO: Apellido Materno */}
            <div className='input-seccion'>
              <div>
                <label>Apellido Materno</label>
                <label className='error-label'>{errorApellidoMaterno}</label>
              </div>
              <input
                className={errorApellidoMaterno ? 'error-input' : ''}
                name='apellidoMaternoApoderado'
                id='apellidoMaternoApoderado'
                value={apoderado.apellidoMaternoApoderado}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Lopez' required
              />
            </div>

            {/* CUARTO DATO: DNI */}
            <div className='input-seccion'>
              <div>
                <label>DNI</label>
                <label className='error-label'>{errorDni}</label>
              </div>
              <input
                className={errorDni ? 'error-input' : ''}
                name='dniApoderado'
                id='dniApoderado'
                value={apoderado.dniApoderado}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={8}
                placeholder='89693566' required
              />
            </div>

            {/* QUINTO DATO: CELULAR  */}
            <div className='input-seccion'>
              <div>
                <label>Celular</label>
                <label className='error-label'>{errorTelefonoCelular}</label>
              </div>
              <input
                className={errorTelefonoCelular ? 'error-input' : ''}
                name='telefonoCelularApoderado'
                id='telefonoCelularApoderado'
                value={apoderado.telefonoCelularApoderado}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={9}
                placeholder='949363534' required
                disabled={apoderado.telefonoCelularApoderado === 'No tiene'}
              />

              <div className='check-button'>
                <input
                  type='checkbox'
                  name='checkbox4'
                  ref={banderaTelefonoCelularApoderado}
                  onChange={noTelefonoCelular}
                  onBlur={handleBlur}
                  id='checkbox4'
                  checked={apoderado.telefonoCelularApoderado === 'No tiene'}
                />
                <label for='checkbox4' className='checkbox'>
                  {/* No tiene */}
                </label>
              </div>
            </div>
            {/* -- FIN --  */}

          </div>
        </div>
      </div>
    </>
  )
}

export default RegistroApoderado
