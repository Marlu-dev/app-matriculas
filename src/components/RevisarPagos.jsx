import React, { useEffect, useState } from 'react'
import { recuperarColeccion } from '../../librerias/manipularDatos'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es'
import { db } from '../../public/services/firebase/firebase'
import { updateDoc, doc } from 'firebase/firestore'
import ComprobanteDePago from './ComprobanteDePago'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useSnackbar } from 'notistack'
registerLocale('es', es)

const RevisarPagos = ({ datos }) => {
  const [id, setId] = useState('')
  const [dni, setDni] = useState('')
  const [ciclo, setciclo] = useState('')
  const [descuentoQueSeAplicara, setDescuentoQueSeAplicara] = useState('')
  const [tipoDePago, setTipoDePago] = useState('')
  const [estadoPago, setEstadoPago] = useState('')
  const [descuentoAdicional, setDescuentoAdicional] = useState('')
  const [estado, setEstado] = useState('')
  const [montoTotal, setMontoTotal] = useState('')
  const [listaDeCiclos, setListaDeCiclos] = useState([])
  const [precios, setPrecios] = useState([])
  const [activarSeccionPagos, setActivarSeccionPagos] = useState(false)
  const [cuotas, setCuotas] = useState([])
  const [diaActual, setDiaActual] = useState(new Date())
  const [cuota1Recuperada, setCuota1Recuperada] = useState(0)
  const [cuota2Recuperada, setCuota2Recuperada] = useState(0)
  const [cuota3Recuperada, setCuota3Recuperada] = useState(0)
  const [cuota1, setCuota1] = useState(0)
  const [cuota2, setCuota2] = useState(0)
  const [cuota3, setCuota3] = useState(0)
  const [estadoCuota1, setEstadoCuota1] = useState('')
  const [estadoCuota2, setEstadoCuota2] = useState('')
  const [estadoCuota3, setEstadoCuota3] = useState('')
  const [fechaPrimeraCuota, setFechaPrimeraCuota] = useState(new Date())
  const [fechaSegundaCuota, setFechaSegundaCuota] = useState(new Date())
  const [fechaTerceraCuota, setFechaTerceraCuota] = useState(new Date())
  const [fechaPrimeraCuotaRecuperada, setFechaPrimeraCuotaRecuperada] =
    useState('')
  const [fechaSegundaCuotaRecuperada, setFechaSegundaCuotaRecuperada] =
    useState('')
  const [fechaTerceraCuotaRecuperada, setFechaTerceraCuotaRecuperada] =
    useState('')
  const [montoSimulacroCarnet, setMontoSimulacroCarnet] = useState(0)
  const { enqueueSnackbar } = useSnackbar()
  const [simulacroCarnet, setSimulacroCarnet] = useState('')
  const [estadoSimulacroCarnet, setEstadoSimulacroCarnet] = useState('')
  const [montoOriginal, setMontoOriginal] = useState('')
  const [montoMatriculaConDescuento, setMontoMatriculaConDescuento] =
    useState('')
  const [estadoPagoMontoContado, setEstadoPagoMontoContado] = useState('')

  const pagarSimulacroCarnet = async () => {
    try {
      await updateDoc(doc(db, 'matriculas', datos[0].id), {
        estadoSimulacroCarnet: 'pagado'
      })

      enqueueSnackbar('Se registró el pago', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    } catch (error) {
      enqueueSnackbar('No se pudo registrar el pago', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    }
  }

  const cambiarEstadoDePago = async () => {
    await updateDoc(doc(db, 'matriculas', datos[0].id), {
      estadoPago: 'cancelado'
    })
  }

  const registrarFechasDeCuotas = async () => {
    if (
      parseInt(cuota1Recuperada) +
        parseInt(cuota2Recuperada) +
        parseInt(cuota3Recuperada) ===
      parseInt(datos[0].montonTotal) - parseInt(montoSimulacroCarnet)
    ) {
      try {
        await updateDoc(doc(db, 'matriculas', datos[0].id), {
          cuotas: {
            1: cuota1Recuperada,
            2: cuota2Recuperada,
            3: cuota3Recuperada
          },
          fechaCuotas: {
            1: fechaPrimeraCuota,
            2: fechaSegundaCuota,
            3: fechaTerceraCuota
          }
        })

        enqueueSnackbar('Se registraron las cuotas', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
          },
          autoHideDuration: 2000
        })
      } catch (error) {
        enqueueSnackbar('No se pudo registrar las cuotas', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
          },
          autoHideDuration: 2000
        })
      }
    } else {
      enqueueSnackbar('La suma de las cuotas no coincide con el monto total', {
        variant: 'warning',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    }
  }

  const realizarPagoContado = async () => {
    try {
      await updateDoc(doc(db, 'matriculas', datos[0].id), {
        fechaDePago: diaActual,
        estadoPagoMontoContado: 'pagado'
      })

      enqueueSnackbar('Se registró el pago', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    } catch (error) {
      enqueueSnackbar('No se pudo registrar el pago', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    }
  }

  useEffect(() => {
    console.log(estadoSimulacroCarnet)
    console.log(estadoPagoMontoContado)

    if (estadoSimulacroCarnet === 'pagado' && estadoPagoMontoContado === 'pagado') {
      cambiarEstadoDePago()
    }
  }, [estadoSimulacroCarnet, estadoPagoMontoContado])

  useEffect(() => {
    console.log(montoSimulacroCarnet)
  }, [montoSimulacroCarnet])

  useEffect(() => {
    console.log(estadoCuota1)
    console.log(estadoCuota2)
    console.log(estadoCuota3)
    console.log(estadoSimulacroCarnet)
    console.log(estadoPago)

    if (estadoCuota1 === 'pagado' && estadoCuota2 === 'pagado' && estadoCuota3 === 'pagado' && estadoSimulacroCarnet === 'pagado') {
      cambiarEstadoDePago()
    }
  }, [
    estadoCuota1,
    estadoCuota2,
    estadoCuota3,
    estadoSimulacroCarnet,
    estadoPago
  ])

  useEffect(() => {
    console.log(cuota1)
    console.log(cuota2)
    console.log(cuota3)
  }, [cuota1, cuota2, cuota3])

  useEffect(() => {
    console.log(fechaPrimeraCuotaRecuperada)
    console.log(fechaSegundaCuotaRecuperada)
    console.log(fechaTerceraCuotaRecuperada)
  }, [
    fechaPrimeraCuotaRecuperada,
    fechaSegundaCuotaRecuperada,
    fechaTerceraCuotaRecuperada
  ])

  const handleChange = (e) => {
    const newQuery = e.target.value
    if (/^\d+$/.test(newQuery) || newQuery === '') {
      if (e.target.name === 'cuota1') setCuota1(newQuery)
      if (e.target.name === 'cuota2') setCuota2(newQuery)
      if (e.target.name === 'cuota3') setCuota3(newQuery)
      if (e.target.name === 'cuota1Recuperada') setCuota1Recuperada(newQuery)
      if (e.target.name === 'cuota2Recuperada') setCuota2Recuperada(newQuery)
      if (e.target.name === 'cuota3Recuperada') setCuota3Recuperada(newQuery)
    }
  }

  useEffect(() => {
    console.log(cuota1Recuperada)
    console.log(cuota2Recuperada)
    console.log(cuota3Recuperada)
  }, [cuota1Recuperada, cuota2Recuperada, cuota3Recuperada])

  const pagarCuota = async (numero) => {
    try {
      await updateDoc(doc(db, 'matriculas', datos[0].id), {
        estadoCuotas: {
          ...datos[0].estadoCuotas,
          [numero]: 'pagado'
        }
      })

      enqueueSnackbar(`Se registró el pago de la cuota ${numero}`, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    } catch (error) {
      enqueueSnackbar('No se pudo registrar el pago', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000
      })
    }
  }

  //   const registrarCoutas = async () => {
  //     if (parseInt(cuota1) + parseInt(cuota2) + parseInt(cuota3) === parseInt(datos[0].montonTotal)) {
  //       try {
  //         await updateDoc(doc(db, 'matriculas', datos[0].id), {
  //           cuotas: {
  //             1: cuota1,
  //             2: cuota2,
  //             3: cuota3
  //           }
  //         })

  //         enqueueSnackbar('Se registraron las cuotas', {
  //           variant: 'success',
  //           anchorOrigin: {
  //             vertical: 'bottom',
  //             horizontal: 'right'
  //           },
  //           autoHideDuration: 2000
  //         })
  //       } catch (error) {
  //         enqueueSnackbar('No se pudo registrar las cuotas', {
  //           variant: 'error',
  //           anchorOrigin: {
  //             vertical: 'bottom',
  //             horizontal: 'right'
  //           },
  //           autoHideDuration: 2000
  //         })
  //       }
  //     } else {
  //       enqueueSnackbar('La suma de las cuotas no coincide con el monto total', {
  //         variant: 'warning',
  //         anchorOrigin: {
  //           vertical: 'bottom',
  //           horizontal: 'right'
  //         },
  //         autoHideDuration: 2000
  //       })
  //     }
  //   }

  useEffect(() => {
    recuperarColeccion('ciclos')
      .then((res) => setListaDeCiclos(res))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    setPrecios(
      listaDeCiclos.filter((ciclo) => ciclo.nombre === datos[0].ciclo)
    )
  }, [listaDeCiclos])

  useEffect(() => {
    console.log(precios)
  }, [precios])

  useEffect(() => {
    setId(datos[0].id)
    setciclo(datos[0].ciclo)
    setDescuentoQueSeAplicara(datos[0].descuentoQueSeAplicara)
    setTipoDePago(datos[0].tipoDePago)
    setEstadoPago(datos[0].estadoPago)
    setDescuentoAdicional(datos[0].descuentoAdicional)
    setEstado(datos[0].estado)
    setMontoTotal(datos[0].montonTotal)
    setDni(datos[0].dni)
    setSimulacroCarnet(datos[0].montoSimulacroCarnet)
    setEstadoSimulacroCarnet(datos[0].estadoSimulacroCarnet)
    setMontoOriginal(datos[0].montoOriginal)
    setMontoMatriculaConDescuento(datos[0].montoMatriculaConDescuento)
    setFechaPrimeraCuota(new Date())
    setFechaSegundaCuota(new Date())
    setFechaTerceraCuota(new Date())
    setEstadoPagoMontoContado(datos[0].estadoPagoMontoContado)

    if (datos[0].tipoDePago === 'Credito') {
      setCuotas(datos[0].cuotas)
      if (datos[0].cuotas.length !== 0) {
        setCuota1Recuperada(datos[0].cuotas['1'])
        setCuota2Recuperada(datos[0].cuotas['2'])
        setCuota3Recuperada(datos[0].cuotas['3'])
      }

      if (datos[0].cuotas.length === 0) {
        setCuota1Recuperada(0)
        setCuota2Recuperada(0)
        setCuota3Recuperada(0)
      }

      setEstadoCuota1(datos[0].estadoCuotas['1'])
      setEstadoCuota2(datos[0].estadoCuotas['2'])
      setEstadoCuota3(datos[0].estadoCuotas['3'])
      setMontoSimulacroCarnet(datos[0].montoSimulacroCarnet)
      setFechaPrimeraCuotaRecuperada(datos[0].fechaCuotas['1'])
      setFechaSegundaCuotaRecuperada(datos[0].fechaCuotas['2'])
      setFechaTerceraCuotaRecuperada(datos[0].fechaCuotas['3'])
    } else {
      setCuotas([])
    }
  }, [datos])

  useEffect(() => {
    console.log(fechaPrimeraCuotaRecuperada)
    console.log(fechaSegundaCuotaRecuperada)
    console.log(fechaTerceraCuotaRecuperada)
  }, [
    fechaPrimeraCuotaRecuperada,
    fechaSegundaCuotaRecuperada,
    fechaTerceraCuotaRecuperada
  ])

  useEffect(() => {
    console.log(fechaPrimeraCuota)
    console.log(fechaSegundaCuota)
    console.log(fechaTerceraCuota)
  }, [fechaPrimeraCuota, fechaSegundaCuota, fechaTerceraCuota])

  useEffect(() => {
    console.log(datos)
  }, [datos])

  useEffect(() => {
    console.log(cuotas)
  }, [cuotas])

  useEffect(() => {
    console.log(montoTotal)
  }, [montoTotal])

  useEffect(() => {
    console.log(id)
  }, [id])

  useEffect(() => {
    const nuevaActivacion =
      estado === 'validado' &&
      (estadoPago === 'activo' || estadoPago === 'retrasado' || estadoPago === 'cancelado')

    if (activarSeccionPagos !== nuevaActivacion) {
      setActivarSeccionPagos(nuevaActivacion)
    }
  }, [estado, estadoPago])

  return (
    <>

      <div className='contenerdor-datos-recuperados-matricula'>
        {/* CONTAINER recuperados-matricula */}
          <h2 className='header-register'>
            Datos de la Matrícula
          </h2>
          <div className='datos-container'>
            {/* DATOS ALUMNO */}
            <div className='container-dato'>
              <label className='title-dato'>
                ID: 
              </label>
              <span className='content-dato'>
                {id}
              </span>
            </div>

            <div className='container-dato'>
              <label className='title-dato'>
                Ciclo: 
              </label>
              <span className='content-dato'>
                {ciclo}
              </span>
            </div>

            <div className='container-dato'>
              <label className='title-dato'>
                Descuento Especial: 
              </label>
              <span className='content-dato'>
                {descuentoQueSeAplicara}
              </span>
            </div>

            <div className='container-dato'>
              <label className='title-dato'>
                Tipo de Pago: 
              </label>
              <span className='content-dato'>
                {tipoDePago}
              </span>
            </div>

            <div className='container-dato'>
              <label className='title-dato'>
                Estado del Pago: 
              </label>
              <span className='content-dato'>
                {estadoPago}
              </span>
            </div>

            <div className='container-dato'>
              <label className='title-dato'>
                Descuento Adicional: 
              </label>
              <span className='content-dato'>
                {descuentoAdicional}
              </span>
            </div>

            <div className='container-dato'>
              <label className='title-dato'>
                Estado de la matrícula: 
              </label>
              <span className='content-dato'>
                {estado}
              </span>
            </div>
          </div>
          

      </div>{/* CONTAINER recuperados-matricula */}


      <div className='contenedor-de-gestion-de-pagos'>
        <h2 className='header-register'>
          Gestión de pagos
        </h2> 
          <div className='datos-container'>
            {estado === 'pendiente'
            ? (
                'No se pueden asignar pagos hasta que la matrícula sea validada por un administrador'
              )
            : estado === 'rechazado'
              ? (
                  'La matrícula fue rechazada por el administrador, por favor revisa las observaciones antes de generar una nueva matrícula'
                )
              : estado === 'validado'
                ? (
                  <div className='title-dato'>
                    <div >
                      {estadoPago === 'cancelado'
                        ? 'No se registra deuda pendiente'
                        : estadoPago === 'retrasado'
                          ? 'Se registra pagos atrasados pendientes'
                          : estadoPago === 'activo'
                            ? 'El alumno tiene pagos pendientes'
                            : ''}
                    </div>
                  </div>
                  )
                : (
                    ''
                  )}
          </div>
        
      </div>

      <div>
        {activarSeccionPagos && tipoDePago === 'Contado'
          ? (
            <div> {/* TOTALL */}
              <h2 className='header-register'>
                Contado
              </h2>
              <div className="datos-container">
                {descuentoQueSeAplicara !== 'nada'
                  ? (
                    <div>
                      <label>
                        <del>Costo de Matrícula: </del>
                      </label>
                      <span>
                        <del>{montoOriginal}</del>
                      </span>
                    </div>
                    )
                  : (
                    <div>
                      <label>Costo de Matrícula: </label>
                      <span>{montoOriginal}</span>
                    </div>
                    )}

                <div>
                  {descuentoQueSeAplicara !== 'nada'
                    ? (
                      <>
                        <label>
                          Costo de Matrícula con descuento especial (
                          {descuentoQueSeAplicara.toUpperCase()}):{' '}
                        </label>
                        <span>{montoMatriculaConDescuento}</span>
                      </>
                      )
                    : (
                        ''
                      )}
                </div>
                <div>
                  {descuentoAdicional !== 0
                    ? (
                      <>
                        <label>Descuento Adicional: </label>
                        <span>{descuentoAdicional}</span>
                      </>
                      )
                    : (
                        ''
                      )}
                </div>
                <div>
                  <label>Costo de Simulacro y Carnet: </label>
                  <span>{simulacroCarnet}</span>
                  {estadoSimulacroCarnet === 'pendiente'
                    ? (
                      <button onClick={() => pagarSimulacroCarnet()}>Pagar</button>
                      )
                    : (
                        ' (Cancelado)'
                      )}
                </div>
                <div>
                  <label>Costo Matrícula Final: </label>
                  <span>{montoMatriculaConDescuento - descuentoAdicional} ({estadoPagoMontoContado === 'pagado' ? 'Cancelado' : ''})</span>
                  {
                      estadoPagoMontoContado === 'sin pagar'
                        ? (
                          <div>
                            <DatePicker
                              showIcon
                              locale='es'
                              dateFormat='dd/MM/yyyy'
                              selected={diaActual}
                              onChange={(date) => setDiaActual(date)}
                            />
                            <button onClick={realizarPagoContado}>Realizar pago</button>
                          </div>
                          )
                        : ''
                  }
                </div>
                <div>
                  <label>Costo TOTAL: </label>
                  <span>{montoTotal}</span>
                </div>
                <PDFDownloadLink
                  document={<ComprobanteDePago matriculaId={id} />}
                  fileName={id + '_' + dni + '.pdf'}
                >
                  {({ loading }) =>
                    loading ? 'Loading document...' : 'Descargar PDF'}
                </PDFDownloadLink>
              </div>
              
            </div> /* FIN TOTAL */
            )
          : activarSeccionPagos && tipoDePago === 'Credito'
            ? (
              <div>
                {Object.keys(cuotas).length > 0
                  ? (
                    <>
                      <div >
                        <h2 className='header-register' >
                          Crédito
                        </h2>
                        {descuentoQueSeAplicara !== 'nada'
                          ? (
                            <div>
                              <label>
                                <del>Costo de Matrícula</del>
                              </label>
                              <span>
                                <del>{montoOriginal}</del>
                              </span>
                            </div>
                            )
                          : (
                            <div>
                              <label>Costo de Matrícula</label>
                              <span>{montoOriginal}</span>
                            </div>
                            )}

                        <div>
                          {descuentoQueSeAplicara !== 'nada'
                            ? (
                              <>
                                <label>
                                  Costo de Matrícula con descuento especial (
                                  {descuentoQueSeAplicara.toUpperCase()}):{' '}
                                </label>
                                <span>{montoMatriculaConDescuento}</span>
                              </>
                              )
                            : (
                                ''
                              )}
                        </div>
                        <div>
                          {descuentoAdicional !== 0
                            ? (
                              <>
                                <label>Descuento Adicional: </label>
                                <span>{descuentoAdicional}</span>
                              </>
                              )
                            : (
                                ''
                              )}
                        </div>
                        <div>
                          <label>Costo de Simulacro y Carnet: </label>
                          <span>{simulacroCarnet}</span>
                          {estadoSimulacroCarnet === 'pendiente'
                            ? (
                              <button onClick={() => pagarSimulacroCarnet()}>
                                Pagar
                              </button>
                              )
                            : (
                                ' (Cancelado)'
                              )}
                        </div>
                        <div>
                          <label>Costo Matrícula Final: </label>
                          <span>
                            {montoMatriculaConDescuento - descuentoAdicional}
                          </span>
                        </div>
                      </div>
                      <div >
                        Cuota 1
                        <input
                          name='cuota1Recuperada'
                          type=''
                          value={cuota1Recuperada}
                          onChange={handleChange}
                          disabled={estadoCuota1 === 'pagado'}
                        />
                        {estadoCuota1 === 'sin pagar' &&
                  fechaPrimeraCuotaRecuperada === 'sin determinar'
                          ? (
                              ''
                            )
                          : estadoCuota1 === 'sin pagar' &&
                    fechaPrimeraCuotaRecuperada !== 'sin determinar'
                            ? (
                              <button onClick={() => pagarCuota(1)}>Pagar</button>
                              )
                            : (
                                'Cuota Cancelada'
                              )}
                        {fechaPrimeraCuotaRecuperada === 'sin determinar'
                          ? (
                            <DatePicker
                              showIcon
                              locale='es'
                              dateFormat='dd/MM/yyyy'
                              selected={fechaPrimeraCuota}
                              onChange={(date) => setFechaPrimeraCuota(date)}
                            />
                            )
                          : (
                            <span>
                              Fecha de pago:
                              {fechaPrimeraCuotaRecuperada
                                ? fechaPrimeraCuotaRecuperada
                                  .toDate()
                                  .toLocaleDateString()
                                : ''}
                            </span>
                            )}
                      </div>
                      <div>
                        Cuota 2
                        <input
                          name='cuota2Recuperada'
                          type=''
                          value={cuota2Recuperada}
                          onChange={handleChange}
                          disabled={estadoCuota2 === 'pagado'}
                        />
                        {estadoCuota2 === 'sin pagar' &&
                  fechaSegundaCuotaRecuperada === 'sin determinar'
                          ? (
                              ''
                            )
                          : estadoCuota2 === 'sin pagar' &&
                    fechaSegundaCuotaRecuperada !== 'sin determinar'
                            ? (
                              <button onClick={() => pagarCuota(2)}>Pagar</button>
                              )
                            : (
                                'Cuota Cancelada'
                              )}
                        {fechaSegundaCuotaRecuperada === 'sin determinar'
                          ? (
                            <DatePicker
                              showIcon
                              locale='es'
                              dateFormat='dd/MM/yyyy'
                              selected={fechaSegundaCuota}
                              onChange={(date) => setFechaSegundaCuota(date)}
                            />
                            )
                          : (
                            <span>
                              Fecha de pago:
                              {fechaSegundaCuotaRecuperada
                                ? fechaSegundaCuotaRecuperada
                                  .toDate()
                                  .toLocaleDateString()
                                : ''}
                            </span>
                            )}
                      </div>
                      <div>

                        Cuota 3
                        <input
                          name='cuota3Recuperada'
                          type=''
                          value={cuota3Recuperada}
                          onChange={handleChange}
                          disabled={estadoCuota3 === 'pagado'}
                        />

                        {estadoCuota3 === 'sin pagar' &&
                  fechaTerceraCuotaRecuperada === 'sin determinar'
                          ? (
                              ''
                            )
                          : estadoCuota3 === 'sin pagar' &&
                    fechaTerceraCuotaRecuperada !== 'sin determinar'
                            ? (
                              <button onClick={() => pagarCuota(3)}>Pagar</button>
                              )
                            : (
                                'Cuota Cancelada'
                              )}
                        {fechaTerceraCuotaRecuperada === 'sin determinar'
                          ? (
                            <DatePicker
                              showIcon
                              locale='es'
                              dateFormat='dd/MM/yyyy'
                              selected={fechaTerceraCuota}
                              onChange={(date) => setFechaTerceraCuota(date)}
                            />
                            )
                          : (
                            <span>
                              Fecha de pago:{' '}
                              {fechaTerceraCuotaRecuperada
                                ? fechaTerceraCuotaRecuperada
                                  .toDate()
                                  .toLocaleDateString()
                                : ''}
                            </span>
                            )}
                      </div>

                      <div>
                        {fechaPrimeraCuotaRecuperada !== 'sin determinar' &&
                  fechaSegundaCuotaRecuperada !== 'sin determinar' &&
                  fechaTerceraCuotaRecuperada !== 'sin determinar'
                          ? (
                            <PDFDownloadLink
                              document={<ComprobanteDePago matriculaId={id} />}
                              fileName={id + '_' + dni + '.pdf'}
                            >
                              {({ loading }) =>
                                loading ? 'Loading document...' : 'Descargar PDF'}
                            </PDFDownloadLink>
                            )
                          : (
                            <button onClick={() => registrarFechasDeCuotas()}>
                              Registrar Cuotas
                            </button>
                            )}
                      </div>
                      <div>
                        <label>Costo TOTAL: </label>
                        <span>{montoTotal}</span>
                      </div>
                    </>
                    )
                  : (
                    <>
                      <div>
                        <h2>Crédito</h2>
                        {descuentoQueSeAplicara !== 'nada'
                          ? (
                            <div>
                              <label>
                                <del>Costo de Matrícula</del>
                              </label>
                              <span>
                                <del>{montoOriginal}</del>
                              </span>
                            </div>
                            )
                          : (
                            <div>
                              <label>Costo de Matrícula</label>
                              <span>{montoOriginal}</span>
                            </div>
                            )}

                        <div>
                          {descuentoQueSeAplicara !== 'nada'
                            ? (
                              <>
                                <label>
                                  Costo de Matrícula con descuento especial (
                                  {descuentoQueSeAplicara.toUpperCase()}):{' '}
                                </label>
                                <span>{montoMatriculaConDescuento}</span>
                              </>
                              )
                            : (
                                ''
                              )}
                        </div>
                        <div>
                          {descuentoAdicional !== 0
                            ? (
                              <>
                                <label>Descuento Adicional: </label>
                                <span>{descuentoAdicional}</span>
                              </>
                              )
                            : (
                                ''
                              )}
                        </div>
                        <div>
                          <label>Costo de Simulacro y Carnet: </label>
                          <span>{simulacroCarnet}</span>
                          {estadoSimulacroCarnet === 'pendiente'
                            ? (
                              <button onClick={() => pagarSimulacroCarnet()}>
                                Pagar
                              </button>
                              )
                            : (
                                ' (Cancelado)'
                              )}
                        </div>
                        <div>
                          <label>Costo Matrícula Final: </label>
                          <span>
                            {montoMatriculaConDescuento - descuentoAdicional}
                          </span>
                        </div>
                      </div>
                      <div>
                        Cuota 1
                        <input
                          name='cuota1Recuperada'
                          type=''
                          value={cuota1Recuperada}
                          onChange={handleChange}
                          disabled={estadoCuota1 === 'pagado'}
                        />
                        {estadoCuota1 === 'sin pagar' &&
                  fechaPrimeraCuotaRecuperada === 'sin determinar'
                          ? (
                              ''
                            )
                          : estadoCuota1 === 'sin pagar' &&
                    fechaPrimeraCuotaRecuperada !== 'sin determinar'
                            ? (
                              <button onClick={() => pagarCuota(1)}>Pagar</button>
                              )
                            : (
                                'Cuota Cancelada'
                              )}
                        {fechaPrimeraCuotaRecuperada === 'sin determinar'
                          ? (
                            <DatePicker
                              showIcon
                              locale='es'
                              dateFormat='dd/MM/yyyy'
                              selected={fechaPrimeraCuota}
                              onChange={(date) => setFechaPrimeraCuota(date)}
                            />
                            )
                          : (
                            <span>
                              Fecha de pago:
                              {fechaPrimeraCuotaRecuperada
                                ? fechaPrimeraCuotaRecuperada
                                  .toDate()
                                  .toLocaleDateString()
                                : ''}
                            </span>
                            )}
                      </div>
                      <div>
                        Cuota 2
                        <input
                          name='cuota2Recuperada'
                          type=''
                          value={cuota2Recuperada}
                          onChange={handleChange}
                          disabled={estadoCuota2 === 'pagado'}
                        />
                        {estadoCuota2 === 'sin pagar' &&
                  fechaSegundaCuotaRecuperada === 'sin determinar'
                          ? (
                              ''
                            )
                          : estadoCuota2 === 'sin pagar' &&
                    fechaSegundaCuotaRecuperada !== 'sin determinar'
                            ? (
                              <button onClick={() => pagarCuota(2)}>Pagar</button>
                              )
                            : (
                                'Cuota Cancelada'
                              )}
                        {fechaSegundaCuotaRecuperada === 'sin determinar'
                          ? (
                            <DatePicker
                              showIcon
                              locale='es'
                              dateFormat='dd/MM/yyyy'
                              selected={fechaSegundaCuota}
                              onChange={(date) => setFechaSegundaCuota(date)}
                            />
                            )
                          : (
                            <span>
                              Fecha de pago:
                              {fechaSegundaCuotaRecuperada
                                ? fechaSegundaCuotaRecuperada
                                  .toDate()
                                  .toLocaleDateString()
                                : ''}
                            </span>
                            )}
                      </div>
                      <div>
                        <>
                          Cuota 3
                          <input
                            name='cuota3Recuperada'
                            type=''
                            value={cuota3Recuperada}
                            onChange={handleChange}
                            disabled={estadoCuota3 === 'pagado'}
                          />

                          {estadoCuota3 === 'sin pagar' &&
                    fechaTerceraCuotaRecuperada === 'sin determinar'
                            ? (
                                ''
                              )
                            : estadoCuota3 === 'sin pagar' &&
                      fechaTerceraCuotaRecuperada !== 'sin determinar'
                              ? (
                                <button onClick={() => pagarCuota(3)}>Pagar</button>
                                )
                              : (
                                  'Cuota Cancelada'
                                )}
                          {fechaTerceraCuotaRecuperada === 'sin determinar'
                            ? (
                              <DatePicker
                                showIcon
                                locale='es'
                                dateFormat='dd/MM/yyyy'
                                selected={fechaTerceraCuota}
                                onChange={(date) => setFechaTerceraCuota(date)}
                              />
                              )
                            : (
                              <span>
                                Fecha de pago:{' '}
                                {fechaTerceraCuotaRecuperada
                                  ? fechaTerceraCuotaRecuperada
                                    .toDate()
                                    .toLocaleDateString()
                                  : ''}
                              </span>
                              )}
                        </>
                      </div>

                      <div>
                        {fechaPrimeraCuotaRecuperada !== 'sin determinar' &&
                  fechaSegundaCuotaRecuperada !== 'sin determinar' &&
                  fechaTerceraCuotaRecuperada !== 'sin determinar'
                          ? (
                            <PDFDownloadLink
                              document={<ComprobanteDePago matriculaId={id} />}
                              fileName={id + '_' + dni + '.pdf'}
                            >
                              {({ loading }) =>
                                loading ? 'Loading document...' : 'Descargar PDF'}
                            </PDFDownloadLink>
                            )
                          : (
                            <button onClick={() => registrarFechasDeCuotas()}>
                              Registrar Cuotas
                            </button>
                            )}
                      </div>
                      <div>
                        <label>Costo TOTAL: </label>
                        <span>{montoTotal}</span>
                      </div>
                    </>
                    )}
              </div>
              )
            : ''}
      </div>

    </>
  )
}

export default RevisarPagos
