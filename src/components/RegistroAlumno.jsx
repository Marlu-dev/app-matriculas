import '../style/registroAlumno.css'
import React, { useEffect } from 'react'
import { db } from '../../public/services/firebase/firebase.js'
import { addDoc, collection, setDoc, doc } from 'firebase/firestore'
import useValidation from '../hooks/useValidation'
import useSetFileds from '../hooks/useSetFields'
// import BotonAtras from "./BotonAtras";

import RegistroApoderado from './RegistroApoderado'
// import RegistroInversion from './RegistroInversion'

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
    edad,
    telefonoFijo,
    telefonoCelular,
    selectedCarrera,
    selectedCiclo,
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
    errorEdad,
    errorTelefonoFijo,
    errorTelefonoCelular,
    isButtonDisabled,
    codigoNuevo,
    numeroNuevo,
    handleBlur
  } = useValidation(

    name,
    apellidoPaterno,
    apellidoMaterno,
    direccion,
    referencia,
    dni,
    edad,
    telefonoFijo,
    telefonoCelular,
    estadoBotonReferencia,
    estadoBotonTelefonoFijo,
    estadoBotonTelefonoCelular,
    apoderadoValido
  )

  // console.log(name)
  // console.log(apellidoMaterno)
  console.log(selectedCiclo)

  console.log(isButtonDisabled)

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
    fields.apellidoPaterno = apellidoPaterno
    fields.apellidoMaterno = apellidoMaterno
    fields.direccion = direccion
    fields.referencia = referencia
    fields.dni = dni
    fields.edad = edad
    fields.telefonoFijo = telefonoFijo
    fields.telefonoCelular = telefonoCelular
    delete fields.checkbox1
    delete fields.checkbox2
    delete fields.checkbox3
    delete fields.checkbox4
    delete fields.nombreApoderado
    delete fields.apellidoPaternoApoderado
    delete fields.apellidoMaternoApoderado
    delete fields.dniApoderado
    delete fields.telefonoCelularApoderado
    console.log(fields)
    // console.log(fields)
    // await addDoc(collection(db, 'alumnos'), fields)
    await setDoc(doc(db, 'alumnos', codigoNuevo), fields)
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

            {/* -- INICIO --  */}
            <div className='seccion-form'>
              {/* PRIMER DATO: Codigo */}
              <div className='input-seccion'>
                <div>
                  <label>Codigo</label>
                </div>
                <div className='codigo-sec'>
                  <input
                    name='codigo'
                    id='codigo'
                    value={codigoNuevo}
                    readOnly
                    disabled
                  />
                </div>
              </div>

              {/* CUARTO DATO: Nombre */}
              <div className='input-seccion'>
                <div>
                  <label>Nombre</label>
                  <label className='error-label'>{errorName}</label>
                </div>
                <input
                  className={errorName ? 'error-input' : ''}
                  name='nombre'
                  id='nombre'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={name}
                  placeholder='Diego Alejandro' required
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
                  placeholder='Suarez' required
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
                  placeholder='Velasquez' required
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
                  placeholder='75657567' required
                />
              </div>

              {/* ESTE DATO PARA AGREGAR-- OCTAVO DATO: EDAD */}
              <div className='input-seccion'>
                <div>
                  <label>Edad</label>
                  <label className='error-label'>{errorEdad}</label>
                </div>
                <input
                  className={errorEdad ? 'error-input' : ''}
                  name='edad'
                  id='edad'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={edad}
                  placeholder='23' required
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
                  placeholder='Av. Pedro Muñiz 225' required
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
                  placeholder='A una cuadra de Bomberos' required
                />
                <div className='check-button'>
                  <input
                    type='checkbox'
                    name='checkbox1'
                    id='checkbox1'
                    onClick={noReferencia}
                  />
                  <label for='checkbox1' className='checkbox'>
                    {/* No tiene */}
                  </label>
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
                  placeholder='044566545' required
                />
                <div className='check-button'>

                  <input
                    type='checkbox'
                    name='checkbox2'
                    id='checkbox2'
                    onClick={noTelefonoFijo}
                  />
                  <label for='checkbox2' className='checkbox'>
                    {/* No tiene */}
                  </label>
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
                  placeholder='944363534' required
                />
                <div className='check-button'>

                  <input
                    type='checkbox'
                    name='checkbox3'
                    id='checkbox3'
                    onClick={noTelefonoCelular}
                  />
                  <label for='checkbox3' className='checkbox'>
                    {/* No tiene */}
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* -- FIN --  */}

          {/* ---REGISTRO TOTAL DE APODERADO */}
          <div className='details apoderado'>
            <RegistroApoderado
              registroNombreApoderado={handleNombreApoderado}
              handleApoderadoValido={handleApoderadoValido}
            />
          </div>

          {/* ---REGISTRO TOTAL DE INVERSION
          <div className='details inversion'>
            <RegistroInversion grupo={selectedGrupo} ciclo={selectedCiclo} dni={dni} />

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
