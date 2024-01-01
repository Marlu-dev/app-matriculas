import React, { useEffect, useState } from 'react'
import { recuperarColeccion, subirDocumentoExcelencia, agregarDatosExcelencia } from '../../librerias/manipularDatos'
import '../style/RegistroMatricula.css'
import Select from './Select'

const RegistroMatricula = () => {
  const [alumnos, setAlumnos] = useState([])
  const [dni, setDni] = useState('')
  const [selectedCarrera, setSelectedCarrera] = useState('')
  const [selectedCiclo, setSelectedCiclo] = useState('')
  const [coincidencia, setCoincidencia] = useState([])
  const [listaDeCiclos, setListaDeCiclos] = useState([])
  const [tipoDePagoSeleccionado, setTipoDePagoSeleccionado] = useState()
  const [montoSeleccionado, setMontoSeleccionado] = useState()
  const [descuentoExAlumno, setDescuentoExAlumno] = useState(false)
  const [descuentoExcelencia, setDescuentoExcelencia] = useState(false)
  const [infoDocumentoExcelencia, setInfoDocumentoExcelencia] = useState()
  const [descuentoQueSeAplicara, setDescuentoQueSeAplicara] = useState()
  const [montoFinal, setMontoFinal] = useState()

  useEffect(() => {
    if (descuentoExcelencia && descuentoExAlumno) {
      setDescuentoQueSeAplicara('Excelencia')
    } else if (descuentoExcelencia && !descuentoExAlumno) {
      setDescuentoQueSeAplicara('Excelencia')
    } else if (!descuentoExcelencia && descuentoExAlumno) {
      setDescuentoQueSeAplicara('Ex-alumno')
    } else {
      setDescuentoQueSeAplicara('Ninguno')
    }
  }, [descuentoExcelencia, descuentoExAlumno])

  console.log(listaDeCiclos)
  console.log(descuentoQueSeAplicara)
  console.log(montoSeleccionado)

  const actualizarInfoDocumentoExcelencia = (e) => {
    setInfoDocumentoExcelencia(e.target.files[0])
  }

  useEffect(() => {
    console.log('infoDocumentoExcelencia: ', infoDocumentoExcelencia)
  }, [infoDocumentoExcelencia])

  const enviarDocumentoExcelencia = () => {
    if (!infoDocumentoExcelencia) {
      return
    }

    console.log(coincidencia[0].id)
    const ref = subirDocumentoExcelencia(infoDocumentoExcelencia, dni)
    console.log(ref)
    agregarDatosExcelencia(coincidencia[0].id)
  }

  useEffect(() => {
    recuperarColeccion('ciclos').then((listaDeCiclos) => {
      setListaDeCiclos(listaDeCiclos)
    })
  }, [selectedCiclo])

  // console.log(selectedCiclo)

  const precio = listaDeCiclos.find((c) => {
    return c.nombre === selectedCiclo
  })

  // console.log(precio)

  const montos = precio ? precio.precios : null
  const descuentos = precio ? precio.descuentos : null

  console.log(montos)
  console.log(descuentos)

  const identificarAlumno = () => {
    recuperarColeccion('alumnos')
      .then(res => setAlumnos(res))
      .catch(err => console.log(err))
  }

  const seleccionDeTipoDePago = (e) => {
    setTipoDePagoSeleccionado(e.target.value)
  }

  useEffect(() => {
    console.log(montos)
    console.log(tipoDePagoSeleccionado)
    if (montos) {
      const montoEncontrado = montos.find((m) => m.nombre === tipoDePagoSeleccionado)

      if (descuentoQueSeAplicara === 'Excelencia') {
        const montosFinales = descuentos.excelencia
        console.log(montosFinales)
        if (tipoDePagoSeleccionado === 'Contado') {
          setMontoFinal(montosFinales.contado)
        }

        console.log(montoFinal)

        if (montoEncontrado) {
          setMontoSeleccionado(montoEncontrado.total)
        } else {
          setMontoSeleccionado('')
        }
      }
    }
  }, [tipoDePagoSeleccionado, montos])

  // useEffect(() => {
  //   if (descuentoQueSeAplicara === 'Excelencia') {
  //     setMontoFinal('xd')
  //   } else if (descuentoQueSeAplicara === 'Ex-alumno') {
  //     setMontoFinal('xd')
  //   } else {
  //     setMontoFinal('xd')
  //   }
  // }, [descuentoQueSeAplicara])

  useEffect(() => {
    console.log('alumnos: ', alumnos)
    setCoincidencia(alumnos.filter(alumno => alumno.dni === dni))
    console.log(coincidencia)
  }, [alumnos])

  useEffect(() => {
    // if (coincidencia.matriculas.length > 0) {
    //   console.log(coincidencia.matriculas.length)
    // }

    console.log('cambio en coincidencia')
    console.log(coincidencia)

    if (coincidencia.length > 0) {
      if (coincidencia[0].matriculas.length > 0) {
        console.log(coincidencia[0].matriculas.length)
        setDescuentoExAlumno(true)
      } else {
        setDescuentoExAlumno(false)
      }
    }

    if (coincidencia.length > 0) {
      if (coincidencia[0].docExcelencia) {
        setDescuentoExcelencia(true)
      } else {
        setDescuentoExcelencia(false)
      }
    }
  }, [coincidencia])

  const handleChange = (e) => {
    const newQuery = e.target.value
    if (/^\d+$/.test(newQuery) || newQuery === '') {
      setDni(newQuery)
    }

    if (e.target.name === 'carrera') {
      setSelectedCarrera(e.target.value)
    }

    if (e.target.name === 'ciclo') {
      setSelectedCiclo(e.target.value)
    }
  }

  return (
    <div className='container-registro-matricula'>
      <div className='container-identificar-alumno' style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Registro de Matrícula</h1>
        <div style={{ display: 'flex', flexDirection: 'row' }}>

          <div>
            <input type='text' value={dni} onChange={handleChange} maxLength={8} />
            <button onClick={identificarAlumno}>Identificar</button>
          </div>
          <div className='container-identificar-alumno-datos'>
            <div>
              <label>DNI: </label>
              <span>{coincidencia && coincidencia.length > 0 ? coincidencia[0].dni : ''}</span>
            </div>
            <div>
              <label>Nombre: </label>
              <span>{coincidencia && coincidencia.length > 0 ? coincidencia[0].nombre : ''}</span>
            </div>
            <div>
              <label>Apellido Paterno: </label>
              <span>{coincidencia && coincidencia.length > 0 ? coincidencia[0].apellidoPaterno : ''}</span>
            </div>
            <div>
              <label>Apellido Materno: </label>
              <span>{coincidencia && coincidencia.length > 0 ? coincidencia[0].apellidoMaterno : ''}</span>
            </div>
          </div>
        </div>

      </div>

      <div className='container-matricular-alumno'>
        <div className='form'>
          <div className='details person'>
            <span className='title'>Inversión</span>
            <div className='seccion-form'>
              {/* TERCER DATO: Carrera */}
              <div className='input-seccion'>
                <div>
                  <label>Carrera</label>
                </div>
                <div className='main-dropdwon'>
                  <div className='select-container'>
                    <Select
                      coleccion='carreritas'
                      nombre='carrera'
                      onSelectChange={handleChange}
                    />
                    <div className='select-icon'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        class='icon icon-tabler icon-tabler-chevron-down'
                        width='25'
                        height='25'
                        viewBox='0 0 24 24'
                        stroke-width='3.5'
                        stroke='#2c3e50'
                        fill='none'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      >
                        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                        <path d='M6 9l6 6l6 -6' />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEGUNDO DATO: Grupo */}
              <div className='input-seccion'>
                <div>
                  <label>Ciclo</label>
                </div>
                <div className='main-dropdwon'>
                  <div className='select-container'>
                    <Select
                      coleccion='carreritas'
                      nombre='ciclo'
                      onSelectChange={handleChange}
                      nombreCarreraSeleccionada={selectedCarrera}
                    />
                    <div className='select-icon'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        class='icon icon-tabler icon-tabler-chevron-down'
                        width='25'
                        height='25'
                        viewBox='0 0 24 24'
                        stroke-width='3.5'
                        stroke='#2c3e50'
                        fill='none'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      >
                        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                        <path d='M6 9l6 6l6 -6' />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEGUNDO DATO: Grupo */}
              <div className='input-seccion'>
                <div>
                  <label>Grupo</label>
                </div>
                <div className='main-dropdwon'>
                  <div className='select-container'>
                    <Select
                      coleccion='carreritas'
                      nombre='grupo'
                      onSelectChange={handleChange}
                      nombreCarreraSeleccionada={selectedCarrera}
                      nombreCicloSeleccionado={selectedCiclo}
                    />
                    <div className='select-icon'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        class='icon icon-tabler icon-tabler-chevron-down'
                        width='25'
                        height='25'
                        viewBox='0 0 24 24'
                        stroke-width='3.5'
                        stroke='#2c3e50'
                        fill='none'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      >
                        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                        <path d='M6 9l6 6l6 -6' />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className='input-seccion'>
                <div>
                  <label>Descuentos</label>
                  <div>
                    <label>Ex-alumno</label>
                  </div>
                  <div>
                    <label>Excelencia</label>
                    <input type='file' name='' id='' onChange={e => subirDocumentoExcelencia(e.target.files[0], dni)} />
                    <button>Subir</button>
                  </div>
                </div>

              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className='container-gestionar-descuentos'>
        <div className='input-seccion'>
          <div>
            <label>Descuentos</label>
            <div>
              <label>Ex-alumno</label>
              {coincidencia && coincidencia.length > 0 && <span>{descuentoExAlumno ? 'Sí' : 'No'}</span>}
            </div>

            <div>
              <label>Excelencia</label>
              {coincidencia && coincidencia.length > 0 && <span>{descuentoExcelencia ? 'Sí' : 'No'}</span>}
              {descuentoExcelencia ? '' : <><input type='file' name='' id='' onChange={actualizarInfoDocumentoExcelencia} /><button onClick={enviarDocumentoExcelencia}>Subir</button></>}
            </div>

          </div>

        </div>
      </div>
      <div className='container-ver-resumen-pagos'>
        <div className='input-seccion'>
          <div>
            <label>Monto</label>
          </div>
          <div className='input-seccion'>
            <div>
              <label>Forma de Pago</label>
            </div>
            <div className='main-dropdwon'>
              <div className='select-container'>
                <Select onSelectChange={seleccionDeTipoDePago} arrayDeObjetos={montos} />
                <div className='select-icon'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='icon icon-tabler icon-tabler-chevron-down'
                    width='25'
                    height='25'
                    viewBox='0 0 24 24'
                    stroke-width='3.5'
                    stroke='#2c3e50'
                    fill='none'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M6 9l6 6l6 -6' />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div>
            <span>Monto original: {montoSeleccionado}</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RegistroMatricula
