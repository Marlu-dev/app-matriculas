import React, { useContext, useEffect, useState } from 'react'
import { recuperarColeccion, subirDocumentoExcelencia, agregarDatosExcelencia, agregarMatricula } from '../../librerias/manipularDatos'
import '../style/RegistroMatricula.css'
import Select from './Select'
import { userContext } from './CargarAplicacion'

const RegistroMatricula = () => {
  const [codigo, setCodigo] = useState('')
  const [alumnos, setAlumnos] = useState([])
  const [dni, setDni] = useState('')
  const [selectedCarrera, setSelectedCarrera] = useState('')
  const [selectedCiclo, setSelectedCiclo] = useState('')
  const [coincidencia, setCoincidencia] = useState([])
  const [listaDeCiclos, setListaDeCiclos] = useState([])
  const [tipoDePagoSeleccionado, setTipoDePagoSeleccionado] = useState()
  // const [montoSeleccionado, setMontoSeleccionado] = useState()
  const [descuentoExAlumno, setDescuentoExAlumno] = useState(false)
  const [descuentoExcelencia, setDescuentoExcelencia] = useState(false)
  const [infoDocumentoExcelencia, setInfoDocumentoExcelencia] = useState()
  const [relevanteDelAlumno, setRelevanteDelAlumno] = useState()
  const [montoFinal, setMontoFinal] = useState()
  const [montosOriginales, setMontosOriginales] = useState()
  const [descuentosDelCiclo, setDescuentosDelCiclo] = useState([])
  const [descuentosDisponibles, setDescuentosDisponibles] = useState()
  const [descuentoQueSeAplicara, setDescuentoQueSeAplicara] = useState()
  const [montoOriginal, setMontoOriginal] = useState()
  const [montoSimulacroCarnet, setMontoSimulacroCarnet] = useState()
  const [montoTotal, setMontoTotal] = useState()
  const [descuentoAdicional, setDescuentoAdicional] = useState(0)
  const [observacionDescuentoAdicional, setObservacionDescuentoAdicional] = useState('')

  const [estadoMatricula, setEstadoMatricula] = useState('')

  const [matricula, setMatricula] = useState({})

  const { user, temporada } = useContext(userContext)
  console.log(user)
  console.log(temporada)

  console.log(tipoDePagoSeleccionado)

  const handleChangeDescuentoAdicional = (e) => {
    const newQuery = e.target.value
    if (/^\d+$/.test(newQuery) || newQuery === '') {
      setDescuentoAdicional(newQuery)
    }
  }

  const handleChangeObservacionDescuentoAdicional = (e) => {
    setObservacionDescuentoAdicional(e.target.value)
  }

  const registrarMatricula = () => {
    agregarMatricula(matricula, codigo)
  }

  useEffect(() => {
    if (descuentoExcelencia && descuentoExAlumno) {
      setRelevanteDelAlumno('excelencia')
    } else if (descuentoExcelencia && !descuentoExAlumno) {
      setRelevanteDelAlumno('excelencia')
    } else if (!descuentoExcelencia && descuentoExAlumno) {
      setRelevanteDelAlumno('exAlumno')
    } else {
      setRelevanteDelAlumno('nada')
    }
  }, [descuentoExcelencia, descuentoExAlumno])

  useEffect(() => {
    console.log(relevanteDelAlumno)
  }, [relevanteDelAlumno])
  // console.log(listaDeCiclos)
  // console.log(RelevanteDelAlumno)
  // console.log(montoSeleccionado)
  // console.log(selectedCarrera)
  // console.log(selectedCiclo)

  const actualizarInfoDocumentoExcelencia = (e) => {
    setInfoDocumentoExcelencia(e.target.files[0])
  }

  useEffect(() => {
    if (descuentoQueSeAplicara === 'excelencia') {
      setEstadoMatricula('pendiente')
    } else if (descuentoAdicional > 0) {
      setEstadoMatricula('pendiente')
    } else {
      setEstadoMatricula('aceptado')
    }
  }, [])

  useEffect(() => {
    setMatricula({ ...matricula, temporada, carrera: selectedCarrera, ciclo: selectedCiclo, tipoDePago: tipoDePagoSeleccionado, monto: montoFinal, descuentoQueSeAplicara, descuentoAdicional, observacionDescuentoAdicional, montonTotal: montoTotal })
  }
  , [selectedCarrera, selectedCiclo, tipoDePagoSeleccionado, montoFinal, descuentoAdicional, observacionDescuentoAdicional, montoTotal])

  useEffect(() => {
    console.log(infoDocumentoExcelencia)
  }, [infoDocumentoExcelencia])

  const enviarDocumentoExcelencia = async () => {
    if (!infoDocumentoExcelencia) {
      return
    }

    // console.log(coincidencia[0].id)
    const ref = subirDocumentoExcelencia(infoDocumentoExcelencia, dni)
    // console.log(ref)
    await agregarDatosExcelencia(coincidencia[0].id)
    identificarAlumno()
  }

  useEffect(() => {
    recuperarColeccion('ciclos').then((listaDeCiclos) => {
      setListaDeCiclos(listaDeCiclos)
    })
  }, [selectedCiclo])

  // console.log(selectedCiclo)

  const datosCiclo = listaDeCiclos.find((c) => {
    return c.nombre === selectedCiclo
  })

  useEffect(() => {
    const datosCiclo = listaDeCiclos.find((c) => {
      return c.nombre === selectedCiclo
    })

    if (!datosCiclo) {
      return
    }

    setDescuentosDelCiclo(datosCiclo.descuentos)
    console.log(tipoDePagoSeleccionado)

    if (tipoDePagoSeleccionado === undefined || tipoDePagoSeleccionado === '') {
      setMontoSimulacroCarnet('')
    } else setMontoSimulacroCarnet(datosCiclo.simulacroCarnet)

    // console.log(datosCiclo.simulacroCarnet)
  }, [listaDeCiclos, tipoDePagoSeleccionado])

  useEffect(() => {
  //   console.log(descuentosDelCiclo.exAlumno)
  //   if (descuentosDelCiclo.exAlumno !== 0) {
  //     setDescuentosDisponibles({ ...descuentosDisponibles, exAlumno: descuentosDelCiclo.exAlumno })
  //   }

    //   console.log(descuentosDelCiclo.excelencia)
    //   if (descuentosDelCiclo.excelencia !== 0) {
    //     setDescuentosDisponibles({ ...descuentosDisponibles, excelencia: descuentosDelCiclo.excelencia })
    //   }
    // }, [descuentosDelCiclo])

    if (descuentosDelCiclo.exAlumno !== 0 && descuentosDelCiclo.excelencia !== 0) {
      setDescuentosDisponibles('ambos')
    }

    if (descuentosDelCiclo.exAlumno !== 0 && descuentosDelCiclo.excelencia === 0) {
      setDescuentosDisponibles('exAlumno')
    }

    if (descuentosDelCiclo.exAlumno === 0 && descuentosDelCiclo.excelencia !== 0) {
      setDescuentosDisponibles('excelencia')
    }

    if (descuentosDelCiclo.exAlumno === 0 && descuentosDelCiclo.excelencia === 0) {
      setDescuentosDisponibles('nada')
    }

    if (descuentosDelCiclo.exAlumno === undefined && descuentosDelCiclo.excelencia === undefined) {
      setDescuentosDisponibles('')
    }
    // console.log(descuentosDelCiclo
  }, [descuentosDelCiclo, selectedCiclo])
  // console.log(datosCiclo)

  useEffect(() => {
    console.log(descuentosDisponibles)
    console.log(relevanteDelAlumno)

    if (descuentosDisponibles === 'ambos') {
      if (relevanteDelAlumno === 'excelencia') {
        setDescuentoQueSeAplicara('excelencia')
      } else if (relevanteDelAlumno === 'exAlumno') {
        setDescuentoQueSeAplicara('exAlumno')
      }
    }

    if (descuentosDisponibles === 'exAlumno') {
      if (relevanteDelAlumno === 'exAlumno') {
        setDescuentoQueSeAplicara('exAlumno')
      } else {
        setDescuentoQueSeAplicara('nada')
      }
    }

    if (descuentosDisponibles === 'excelencia') {
      if (relevanteDelAlumno === 'excelencia') {
        setDescuentoQueSeAplicara('excelencia')
      } else {
        setDescuentoQueSeAplicara('nada')
      }
    }

    if (descuentosDisponibles === 'nada') {
      setDescuentoQueSeAplicara('nada')
    }
  }, [descuentosDisponibles, relevanteDelAlumno])

  useEffect(() => {
    console.log(descuentoQueSeAplicara)
  }, [descuentoQueSeAplicara])

  useEffect(() => {
    const montos = datosCiclo && Array.isArray(datosCiclo.precios) ? datosCiclo.precios : null
    setMontosOriginales(montos)
  }, [selectedCiclo, datosCiclo])

  // const descuentos = datosCiclo ? datosCiclo.descuentos : null

  // console.log(montos)
  // console.log(descuentos)

  const identificarAlumno = () => {
    recuperarColeccion('alumnos')
      .then(res => setAlumnos(res))
      .catch(err => console.log(err))
  }

  const seleccionDeTipoDePago = (e) => {
    setTipoDePagoSeleccionado(e.target.value)
  }

  useEffect(() => {
    console.log(montoFinal)
    console.log(montoSimulacroCarnet)
    console.log(montoFinal + montoSimulacroCarnet)
    if (montoFinal === undefined || montoSimulacroCarnet === undefined) {
      setMontoTotal('')
    } else {
      setMontoTotal(montoFinal + montoSimulacroCarnet)
    }
  }, [montoFinal, montoSimulacroCarnet])

  useEffect(() => {
    console.log(descuentosDisponibles)
    console.log(descuentosDelCiclo)
    console.log(descuentoQueSeAplicara)
    console.log(tipoDePagoSeleccionado)
    const montosOriginales = datosCiclo && Array.isArray(datosCiclo.precios) ? datosCiclo.precios : null

    if (montosOriginales) {
      const montoEncontrado = montosOriginales.find((m) => m.nombre === tipoDePagoSeleccionado)

      if (montoEncontrado) {
        setMontoOriginal(montoEncontrado.total)
      } else {
        setMontoOriginal('')
      }

      if (tipoDePagoSeleccionado === undefined || tipoDePagoSeleccionado === '') {
        setMontoFinal('')
      } else {
        if (descuentoQueSeAplicara === 'exAlumno') {
          if (tipoDePagoSeleccionado === 'Contado') {
            setMontoFinal(descuentosDelCiclo.exAlumno.contado)
          } else if (tipoDePagoSeleccionado === 'Credito') {
            if (descuentosDelCiclo.exAlumno.credito) {
              setMontoFinal(descuentosDelCiclo.exAlumno.credito.total)
            }
          }
        }

        if (descuentoQueSeAplicara === 'excelencia') {
          if (tipoDePagoSeleccionado === 'Contado') {
            if (descuentosDelCiclo.excelencia.contado) {
              setMontoFinal(descuentosDelCiclo.excelencia.contado)
            }
          } else if (tipoDePagoSeleccionado === 'Credito') {
            if (descuentosDelCiclo.excelencia.credito) {
              setMontoFinal(descuentosDelCiclo.excelencia.credito.total)
            }
          }
        }

        if (descuentoQueSeAplicara === 'nada') {
          if (tipoDePagoSeleccionado === 'Contado') {
            setMontoFinal(montoEncontrado.total)
          } else if (tipoDePagoSeleccionado === 'Credito') {
            setMontoFinal(montoEncontrado.total)
          }
        }
      }

      console.log(montoEncontrado)
    }
  }, [tipoDePagoSeleccionado, selectedCiclo, montosOriginales, descuentosDisponibles, descuentosDelCiclo, descuentoQueSeAplicara, descuentoExAlumno, descuentoExcelencia])

  useEffect(() => {
    console.log(montoFinal)
  }, [montoFinal])

  // useEffect(() => {
  //   if (RelevanteDelAlumno === 'Excelencia') {
  //     setMontoFinal('xd')
  //   } else if (RelevanteDelAlumno === 'Ex-alumno') {
  //     setMontoFinal('xd')
  //   } else {
  //     setMontoFinal('xd')
  //   }
  // }, [RelevanteDelAlumno])

  useEffect(() => {
    // console.log('alumnos: ', alumnos)
    setCoincidencia(alumnos.filter(alumno => alumno.dni === dni))
    // console.log(coincidencia)
  }, [alumnos])

  useEffect(() => {
    setCodigo(coincidencia[0].codigo)
    // if (coincidencia.matriculas.length > 0) {
    //   console.log(coincidencia.matriculas.length)
    // }

    // console.log('cambio en coincidencia')
    // console.log(coincidencia)

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

  useEffect(() => {
    console.log(codigo)
  }, [codigo])

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
            <label>Datos del alumno Relevantes para la matrícula</label>
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
            <label>Descuentos Diponibles</label>
            <span>{descuentosDisponibles === 'ambos' ? 'Ex-alumno y Excelencia' : descuentosDisponibles === 'exalumno' ? 'Ex-alumno' : descuentosDisponibles === 'excelencia' ? 'Excelencia' : descuentosDisponibles === 'nada' ? 'Ninguno' : ''}</span>
          </div>
          <div className='input-seccion'>
            <label>Descuentos a los que califica</label>
            <span>
              {descuentosDisponibles === 'ambos'
                ? (
                    descuentoExAlumno && descuentoExcelencia
                      ? 'Ex-alumno y Excelencia'
                      : descuentoExAlumno
                        ? 'Ex-alumno'
                        : descuentoExcelencia
                          ? 'Excelencia'
                          : 'Ninguno'
                  )
                : (
                    descuentosDisponibles === 'exAlumno'
                      ? descuentoExAlumno
                        ? 'Ex-alumno'
                        : 'Ninguno'
                      : (
                          descuentosDisponibles === 'excelencia'
                            ? descuentoExcelencia
                              ? 'Excelencia'
                              : 'Ninguno'
                            : 'Ninguno'
                        )
                  )}
            </span>
          </div>

          <div className='input-seccion'>
            <label>Descueto que se aplicará</label>
            <span>
              {descuentoQueSeAplicara === 'exAlumno' ? 'Ex-alumno' : descuentoQueSeAplicara === 'excelencia' ? 'Excelencia' : descuentoQueSeAplicara === 'nada' ? 'Ninguno' : ''}
            </span>
          </div>

          <div className='input-seccion'>
            <div>
              <label>Descuento Adicional</label>
            </div>
            <input
              name='descuentoAdicional'
              id='descuentoAdicional'
              onChange={handleChangeDescuentoAdicional}
              placeholder='' required
              value={descuentoAdicional}
            />
            <div>
              <label>Observación</label>
            </div>
            <input
              name='observacionDescuentoAdicional'
              id='observacionDescuentoAdicional'
              onChange={handleChangeObservacionDescuentoAdicional}
              placeholder='' required
              value={observacionDescuentoAdicional}
            />
          </div>

          <div className='input-seccion'>
            <div>
              <label>Forma de Pago</label>
            </div>
            <div className='main-dropdwon'>
              <div className='select-container'>
                <Select onSelectChange={seleccionDeTipoDePago} arrayDeObjetos={montosOriginales} />
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
          <div className='input-seccion'>
            <label>Precio Matricula: </label>
            {montoOriginal && <span>{montoOriginal}</span>}
          </div>

          <div className='input-seccion'>
            <label>Precio Matricula con Descuento: </label>
            {montoFinal && <span>{montoFinal}</span>}
          </div>
          <div className='input-seccion'>
            <label>Derecho a simulacros y carnet: </label>
            {montoSimulacroCarnet && <span>{montoSimulacroCarnet}</span>}
          </div>
          <div className='input-seccion'>
            <label>Monto TOTAL:  </label>
            {montoTotal && <span>{montoTotal}</span>}
          </div>
          <div className='input-seccion'>
            <button onClick={registrarMatricula}>Registrar matrícula</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistroMatricula
