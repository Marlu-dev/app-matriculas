import '../style/registroAlumno.css'
import React, { useEffect } from 'react'
import db from '../services/firebase/firebase.js'
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
    <div className="container-register">
      <header className="header-register">
        REGISTRO DE ALUMNO
      </header>

      <form className='form-registro' onSubmit={registrarAlumno}>
        <div className='from'>
          {/* ---REGISTRO TOTAL DE ALUMNoS */}
          <div className="details person">
              <span className="title">
                Datos Alumno
              </span>
              <div className="seccion-form">
                {/* PRIMER DATO */}
                <div className="input-seccion">
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

                {/* SEGUNDO DATO */}
                <div className="input-seccion">
                  <div>
                    <label>Grupo</label>
                  </div>
                  <Select
                    coleccion='grupos'
                    nombre='grupo'
                    onSelectChange={handleChange}
                  />
                </div>

                {/* TERCER DATO */}
                <div className="input-seccion">
                  <div>
                    <label>Nombre</label>
                    <label>{errorName}</label>
                  </div>
                  <input
                    name='name'
                    id='name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={name}
                  />
                </div>

                {/* CUARTO DATO */}
                <div className="input-seccion">
                  <div>
                    <label>Apellido Paterno</label>
                    <label>{errorApellidoPaterno}</label>
                  </div>
                  <input
                    name='apellidoPaterno'
                    id='apellidoPaterno'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={apellidoPaterno}
                  />
                </div>

                {/* QUINTO DATO */}
                <div className="input-seccion">
                  <div>
                    <label>Apellido Materno</label>
                    <label>{errorApellidoMaterno}</label>
                  </div>
                  <input
                    name='apellidoMaterno'
                    id='apellidoMaterno'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={apellidoMaterno}
                  />
                </div>

                {/* SEXTO DATO: Direccion */}
                <div className="input-seccion">
                  <div>
                    <label>Direccion</label>
                    <label>{errorDireccion}</label>
                  </div>
                  <input
                    name='direccion'
                    id='direccion'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={direccion}
                  />
                </div>

                {/* SEPTIMO DATO */}
                <div className="input-seccion">
                  <div>
                    <label>Referencia</label>
                    <label>{errorReferencia}</label>
                  </div>
                  <input
                    name='referencia'
                    id='referencia'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={referencia}
                  />
                  <div>
                    <label>No tiene</label>
                    <input type='checkbox' name='' onClick={noReferencia} />
                  </div>
                </div>

                {/* OCTAVO DATO: DNI */}
                <div className="input-seccion">
                  <div>
                    <label>DNI</label>
                    <label>{errorDni}</label>
                  </div>
                  <input
                    name='dni'
                    id='dni'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={dni}
                    maxLength={8}
                  />
                </div>

                {/* NOVENO DATO: Telefono Fijo */}
                <div className="input-seccion">
                  <div>
                    <label>Telefono Fijo</label>
                    <label>{errorTelefonoFijo}</label>
                  </div>
                  <input
                    name='telefonoFijo'
                    id='telefonoFijo'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={telefonoFijo}
                    maxLength={9}
                  />
                  <div>
                    <label>No tiene</label>
                    <input type='checkbox' name='' onClick={noTelefonoFijo} />
                  </div>
                </div>

                {/* DECIMO DATO: Celular */}
                <div className="input-seccion">
                  <div>
                    <label>Telefono Celular</label>
                    <label>{errorTelefonoCelular}</label>
                  </div>
                  <input
                    name='telefonoCelular'
                    id='telefonoCelular'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={telefonoCelular}
                    maxLength={9}
                  />
                  <div>
                    <label>No tiene</label>
                    <input type='checkbox' name='' onClick={noTelefonoCelular} />
                  </div>
                </div>

                {/* DECIMO PRIMER DATO: Carrera */}
                <div className="input-seccion">
                  <div>
                    <label>Carrera</label>
                  </div>
                  <Select
                    coleccion={selectedGrupo}
                    nombre='carrera'
                    onSelectChange={handleChange}
                  />
                </div>

              </div>
              
          </div>


      {/* ---REGISTRO TOTAL DE APODERADO 
          <div className="details person">
            <RegistroApoderado
              registroNombreApoderado={handleNombreApoderado}
              handleApoderadoValido={handleApoderadoValido}
            />   

          </div>

          ---REGISTRO TOTAL DE INVERSION
          <div className="details person">
            <RegistroInversion /> 
                      
          </div> */}


        </div>

        <button type='submit' disabled={isButtonDisabled} id='btn-submit'>
          Registrar
        </button>

      </form>
      {/* <BotonAtras /> */}
    </div>
  )
}

export default RegistroAlumno



