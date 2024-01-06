import '../style/registroAlumno.css'
import React, { useEffect, useState } from 'react'
import { db } from '../../public/services/firebase/firebase.js'
import { addDoc, collection, query, onSnapshot, where } from 'firebase/firestore'
import useValidation from '../hooks/useValidation'
import useSetFiledsEditorDeDatos from '../hooks/useSetFieldsEditorDeDatos.js'
// import BotonAtras from "./BotonAtras";

import Select from './Select'

import RegistroApoderado from './RegistroApoderado'
import RegistroInversion from './RegistroInversion'

function VistaEdicionDeDatosAlumno ({ codigo }) {
  // campos del formulario

  const [nombreApoderado, setNombreApoderado] = React.useState({})
  const [apoderadoValido, setApoderadoValido] = React.useState(false)

  const handleNombreApoderado = (e) => {
    setNombreApoderado(e)
  }

  const handleApoderadoValido = (e) => {
    setApoderadoValido(e)
  }

  const [alumno, setAlumno] = useState({})
  const collectionAlumnos = collection(db, 'alumnos')

  useEffect(() => {
    const q = query(collectionAlumnos, where('codigo', '==', codigo))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const alumnosData = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          codigo: data.codigo,
          nombre: data.nombre,
          apellidoPaterno: data.apellidoPaterno,
          apellidoMaterno: data.apellidoMaterno,
          edad: data.edad,
          referencia: data.referencia,
          dni: data.dni,
          grupo: data.grupo,
          carrera: data.carrera,
          direccion: data.direccion,
          telefonoCelular: data.telefonoCelular,
          telefonoFijo: data.telefonoFijo,
          apoderado: data.apoderado
        }
      })

      if (alumnosData.length > 0) {
        setAlumno(alumnosData[0])
        console.log(alumno)
        console.log(alumno.apoderado)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [codigo])

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
    handleChange,
    noReferencia,
    noTelefonoFijo,
    noTelefonoCelular,
    estadoBotonReferencia,
    estadoBotonTelefonoFijo,
    estadoBotonTelefonoCelular
  } = useSetFiledsEditorDeDatos(alumno.nombre, alumno.apellidoPaterno, alumno.apellidoMaterno, alumno.direccion, alumno.referencia, alumno.dni, alumno.edad, alumno.telefonoFijo, alumno.telefonoCelular, alumno.grupo, alumno.carrera)

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
    estadoBotonReferencia,
    estadoBotonTelefonoFijo,
    estadoBotonTelefonoCelular,
    apoderadoValido
  )

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
                    value={codigo}
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
                  name='name'
                  id='name'
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
                  disabled={referencia === 'No tiene'}
                  placeholder='A una cuadra de Bomberos' required
                />
                <div className='check-button'>
                  <input
                    type='checkbox'
                    name='checkbox1'
                    id='checkbox1'
                    checked={referencia === 'No tiene'}
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
                  disabled={telefonoFijo === 'No tiene'}
                  placeholder='044566545' required
                />
                <div className='check-button'>

                  <input
                    type='checkbox'
                    name='checkbox2'
                    id='checkbox2'
                    checked={telefonoFijo === 'No tiene'}
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
                  disabled={telefonoCelular === 'No tiene'}
                  placeholder='944363534' required
                />
                <div className='check-button'>

                  <input
                    type='checkbox'
                    name='checkbox3'
                    id='checkbox3'
                    checked={telefonoCelular === 'No tiene'}
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
              datosApoderado={alumno.apoderado}
            />
          </div>

        </div>

        <button className='btn-register' type='submit' disabled={isButtonDisabled} id='btn-submit'>
          Actualizar Datos
        </button>

      </form>
      {/* <BotonAtras /> */}
    </div>
  )
}

export default VistaEdicionDeDatosAlumno
