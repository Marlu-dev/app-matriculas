import '../style/registroAlumno.css'
import React, { useEffect } from 'react'
import db from '../../public/services/firebase/firebase.js'
import { addDoc, collection } from 'firebase/firestore'
import useValidation from '../hooks/useValidation'
import useSetFileds from '../hooks/useSetFields'
// import BotonAtras from "./BotonAtras";

import Select from './Select'

import RegistroApoderado from './RegistroApoderado'
import RegistroInversion from './RegistroInversion'

function RegistroAlumno () {
  // campos del formulario

  const [nombreApoderado, setNombreApoderado] = React.useState({})
  const [apoderadoValido, setApoderadoValido] = React.useState(false)

  const handleNombreApoderado = (e) => {
    setNombreApoderado(e)
  }

  const handleApoderadoValido = (e) => {
    setApoderadoValido(e)
  }

  // console.log(nombreApoderado)
  // console.log(apoderadoValido)

  const {
    selectedGrupo,
    name,
    apellidoPaterno,
    apellidoMaterno,
    direccion,
    referencia,
    dni,
    telefonoFijo,
    telefonoCelular,
    selectedCarrera,
    handleChange,
    noReferencia,
    noTelefonoFijo,
    noTelefonoCelular,
    estadoBotonReferencia,
    estadoBotonTelefonoFijo,
    estadoBotonTelefonoCelular
  } = useSetFileds()
  // errores

  // console.log(name)
  const {
    errorName,
    errorApellidoPaterno,
    errorApellidoMaterno,
    errorDireccion,
    errorReferencia,
    errorDni,
    errorTelefonoFijo,
    errorTelefonoCelular,
    isButtonDisabled,
    codigoNuevo,
    numeroNuevo,
    handleBlur
  } = useValidation(
    selectedGrupo,
    name,
    apellidoPaterno,
    apellidoMaterno,
    direccion,
    referencia,
    dni,
    telefonoFijo,
    telefonoCelular,
    selectedCarrera,
    estadoBotonReferencia,
    estadoBotonTelefonoFijo,
    estadoBotonTelefonoCelular,
    apoderadoValido
  )

  // console.log(name)
  // console.log(apellidoMaterno)

  useEffect(() => {
    // console.log(selectedGrupo)
  }, [selectedGrupo])

  async function registrarAlumno (e) {
    e.preventDefault()
    const fields = Object.fromEntries(new window.FormData(e.target))
    fields.numero = numeroNuevo
    fields.codigo = codigoNuevo
    fields.apoderado = nombreApoderado
    fields.nombre = name
    delete fields.nombreApoderado
    delete fields.apellidoPaternoApoderado
    delete fields.apellidoMaternoApoderado
    delete fields.dniApoderado
    delete fields.telefonoCelularApoderado
    console.log(fields)
    // console.log(fields)
    await addDoc(collection(db, 'alumnos'), fields)
    console.log(fields)
    // await setDoc(doc(db, "alumnos", "A7"), fields);
  }

  return (
    <div className='container-register'>
      <header className='header-register'>
        REGISTRO DE ALUMNO
      </header>

      <form className='form-registro' onSubmit={registrarAlumno}>
        <div className='form'>
          {/* ---REGISTRO TOTAL DE ALUMNOS */}
          <div className='details person'>
            <span className='title'>
              Datos Alumno
            </span>
            <div className='seccion-form'>
              {/* PRIMER DATO: Codigo */}
              <div className='input-seccion'>
                <div>
                  <label>Codigo</label>
                </div>
                <input
                  name='codigo'
                  id='codigo'
                  value={codigoNuevo}
                  readOnly
                  disabled
                />
              </div>

              {/* SEGUNDO DATO: Grupo */}
              <div className='input-seccion'>
                <div>
                  <label>Grupo</label>
                </div>
                <Select
                  coleccion='grupos'
                  nombre='grupo'
                  onSelectChange={handleChange}
                />
              </div>

              {/* TERCER DATO: Carrera */}
              <div className='input-seccion'>
                <div>
                  <label>Carrera</label>
                </div>
                <Select
                  coleccion={selectedGrupo}
                  nombre='carrera'
                  onSelectChange={handleChange}
                />
              </div>

              {/* CUARTO DATO: Nombre */}
              <div className='input-seccion'>
                <div>
                  <label>Nombre</label>
                  <label className='error-label'>{errorName}</label>
                </div>
                <input
                  className={errorName ? 'error-input' : ''}
                  name='name'
                  id='name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={name}
                  placeholder='Ingrese nombre de alumno' required
                />
              </div>

              {/* QUINTO DATO: Apellido Paterno */}
              <div className='input-seccion'>
                <div>
                  <label>Apellido Paterno</label>
                  <label className='error-label'>{errorApellidoPaterno}</label>
                </div>
                <input
                  className={errorApellidoPaterno ? 'error-input' : ''}
                  name='apellidoPaterno'
                  id='apellidoPaterno'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={apellidoPaterno}
                  placeholder='Ingrese apellido paterno' required
                />
              </div>

              {/* SEXTO DATO: Apellido Materno */}
              <div className='input-seccion'>
                <div>
                  <label>Apellido Materno</label>
                  <label className='error-label'>{errorApellidoMaterno}</label>
                </div>
                <input
                  className={errorApellidoMaterno ? 'error-input' : ''}
                  name='apellidoMaterno'
                  id='apellidoMaterno'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={apellidoMaterno}
                />
              </div>

              {/* SEPTIMO DATO: DNI */}
              <div className='input-seccion'>
                <div>
                  <label>DNI</label>
                  <label className='error-label'>{errorDni}</label>
                </div>
                <input
                  className={errorDni ? 'error-input' : ''}
                  name='dni'
                  id='dni'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={dni}
                  maxLength={8}
                />
              </div>

              {/* ESTE DATO PARA AGREGAR-- OCTAVO DATO: EDAD */}
              <div className='input-seccion'>
                <div>
                  <label>Edad</label>
                  <label className='error-label'>{errorDireccion}</label>
                </div>
                <input
                  className={errorDireccion ? 'error-input' : ''}
                  name='direccion'
                  id='direccion'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={direccion}
                />
              </div>

              {/* NOVENO DATO: Direccion */}
              <div className='input-seccion'>
                <div>
                  <label>Direccion</label>
                  <label className='error-label'>{errorDireccion}</label>
                </div>
                <input
                  className={errorDireccion ? 'error-input' : ''}
                  name='direccion'
                  id='direccion'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={direccion}
                />
              </div>

              {/* DECIMO DATO: Referencia */}
              <div className='input-seccion'>
                <div>
                  <label>Referencia</label>
                  <label className='error-label'>{errorReferencia}</label>
                </div>
                <input
                  className={errorReferencia ? 'error-input' : ''}
                  name='referencia'
                  id='referencia'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={referencia}
                />
                <div className='check-button'>
                  <input
                    type='checkbox'
                    name='checkbox1'
                    onClick={noReferencia}
                  />
                  <label for='checkbox1'>No tiene</label>
                </div>
              </div>

              {/* DECIMO PRIMER DATO: Telefono Fijo */}
              <div className='input-seccion'>
                <div>
                  <label>Telefono Fijo</label>
                  <label className='error-label'>{errorTelefonoFijo}</label>
                </div>
                <input
                  className={errorTelefonoFijo ? 'error-input' : ''}
                  name='telefonoFijo'
                  id='telefonoFijo'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={telefonoFijo}
                  maxLength={9}
                />
                <div className='check-button'>

                  <input
                    type='checkbox'
                    name='checkbox2'
                    onClick={noTelefonoFijo}
                  />
                  <label for='checkbox2'>No tiene</label>
                </div>
              </div>

              {/* DECIMO SEGUNDO DATO: Celular */}
              <div className='input-seccion'>
                <div>
                  <label>Telefono Celular</label>
                  <label className='error-label'>{errorTelefonoCelular}</label>
                </div>
                <input
                  className={errorTelefonoCelular ? 'error-input' : ''}
                  name='telefonoCelular'
                  id='telefonoCelular'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={telefonoCelular}
                  maxLength={9}
                />
                <div className='check-button'>

                  <input
                    type='checkbox'
                    name='checkbox3'
                    onClick={noTelefonoCelular}
                  />
                  <label for='checkbox3'>No tiene</label>
                </div>
              </div>

            </div>

          </div>

          {/* ---REGISTRO TOTAL DE APODERADO
          <div className="details apoderado">
            <RegistroApoderado
              registroNombreApoderado={handleNombreApoderado}
              handleApoderadoValido={handleApoderadoValido}
            />

          </div>

          ---REGISTRO TOTAL DE INVERSION
          <div className="details inversion">
            <RegistroInversion />

          </div> */}

        </div>

        <button className='btn-register' type='submit' disabled={isButtonDisabled} id='btn-submit'>
          Registrar
        </button>

      </form>
      {/* <BotonAtras /> */}
    </div>
  )
}

export default RegistroAlumno
