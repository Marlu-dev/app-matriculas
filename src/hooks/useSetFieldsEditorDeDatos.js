import { useEffect, useState } from 'react'

function useSetFiledsEditorDeDatos (nombreInicial, apellidoPaternoInicial, apellidoMaternoInicial, direccionInicial, referenciaInicial, dniInicial, edadInicial, telefonoFijoInicial, telefonoCelularInicial, carreraInicial, grupoInicial) {
  const [selectedGrupo, setSelectedGrupo] = useState('')
  const [name, setName] = useState('')
  const [apellidoPaterno, setApellidoPaterno] = useState('')
  const [apellidoMaterno, setApellidoMaterno] = useState('')
  const [direccion, setDireccion] = useState('')
  const [referencia, setReferencia] = useState('')
  const [copiaReferencia, setCopiaReferencia] = useState('')
  const [dni, setDni] = useState('')
  const [edad, setEdad] = useState()
  const [telefonoFijo, setTelefonoFijo] = useState('')
  const [copiaTelefonoFijo, setCopiaTelefonoFijo] = useState('')
  const [telefonoCelular, setTelefonoCelular] = useState('')
  const [copiadoTelefonoCelular, setCopiadoTelefonoCelular] = useState('')
  const [selectedCarrera, setSelectedCarrera] = useState('')
  const [estadoBotonReferencia, setEstadoBotonReferencia] = useState(false)
  const [estadoBotonTelefonoFijo, setEstadoBotonTelefonoFijo] = useState(false)
  const [estadoBotonTelefonoCelular, setEstadoBotonTelefonoCelular] =
    useState(false)

  // console.log('nombreInicial', nombreInicial)
  // console.log('apellidoPaternoInicial', apellidoPaternoInicial)
  // console.log('apellidoMaternoInicial', apellidoMaternoInicial)
  // console.log('direccionInicial', direccionInicial)
  // console.log('referenciaInicial', referenciaInicial)
  // console.log('dniInicial', dniInicial)
  // console.log('edadInicial', edadInicial)
  // console.log('telefonoFijoInicial', telefonoFijoInicial)
  // console.log('telefonoCelularInicial', telefonoCelularInicial)
  // console.log('carreraInicial', carreraInicial)
  // console.log('grupoInicial', grupoInicial)

  useEffect(() => {
    setName(nombreInicial)
  }, [nombreInicial])

  useEffect(() => {
    setApellidoPaterno(apellidoPaternoInicial)
  }, [apellidoPaternoInicial])

  useEffect(() => {
    setApellidoMaterno(apellidoMaternoInicial)
  }, [apellidoMaternoInicial])

  useEffect(() => {
    setDireccion(direccionInicial)
  }, [direccionInicial])

  useEffect(() => {
    setReferencia(referenciaInicial)
  }, [referenciaInicial])

  useEffect(() => {
    if (referenciaInicial === 'No tiene') {
      setCopiaReferencia('')
    } else {
      setCopiaReferencia(referenciaInicial)
    }
  }, [referenciaInicial])

  useEffect(() => {
    setDni(dniInicial)
  }, [dniInicial])

  useEffect(() => {
    setEdad(edadInicial)
  }, [edadInicial])

  useEffect(() => {
    setTelefonoFijo(telefonoFijoInicial)
  }, [telefonoFijoInicial])

  useEffect(() => {
    if (telefonoFijoInicial === 'No tiene') {
      setCopiaTelefonoFijo('')
    } else {
      setCopiaTelefonoFijo(telefonoFijoInicial)
    }
  }, [telefonoFijoInicial])

  useEffect(() => {
    setTelefonoCelular(telefonoCelularInicial)
  }, [telefonoCelularInicial])

  useEffect(() => {
    if (telefonoCelularInicial === 'No tiene') {
      setCopiadoTelefonoCelular('')
    } else {
      setCopiadoTelefonoCelular(telefonoCelularInicial)
    }
  }, [telefonoCelularInicial])

  useEffect(() => {
    setSelectedCarrera(carreraInicial)
  }, [carreraInicial])

  useEffect(() => {
    setSelectedGrupo(grupoInicial)
  }, [grupoInicial])

  function noReferencia () {
    const referenciaElement = document.getElementById('referencia')
    if (referenciaElement.disabled) {
      referenciaElement.disabled = false
      setReferencia(copiaReferencia)
      referenciaElement.focus()
      setEstadoBotonReferencia(false)
    } else {
      referenciaElement.disabled = true
      setReferencia('No tiene')
      setEstadoBotonReferencia(true)
    }
  }

  function noTelefonoFijo () {
    const telefonoFijoElement = document.getElementById('telefonoFijo')
    if (telefonoFijoElement.disabled) {
      telefonoFijoElement.disabled = false
      telefonoFijoElement.focus()
      setTelefonoFijo(copiaTelefonoFijo)
      setEstadoBotonTelefonoFijo(false)
    } else {
      telefonoFijoElement.disabled = true
      setTelefonoFijo('No tiene')
      setEstadoBotonTelefonoFijo(true)
    }
  }

  function noTelefonoCelular () {
    const telefonoCelularElement = document.getElementById('telefonoCelular')
    if (telefonoCelularElement.disabled) {
      telefonoCelularElement.disabled = false
      telefonoCelularElement.focus()
      setTelefonoCelular(copiadoTelefonoCelular)
      setEstadoBotonTelefonoCelular(false)
    } else {
      telefonoCelularElement.disabled = true
      setTelefonoCelular('No tiene')
      setEstadoBotonTelefonoCelular(true)
    }
  }

  function handleChange (e) {
    const newQuery = e.target.value
    if (newQuery.startsWith(' ')) return

    if (e.target.name === 'grupo') {
      setSelectedGrupo(newQuery)
      return
    }

    if (e.target.name === 'name') {
      setName(newQuery)
      return
    }
    if (e.target.name === 'apellidoPaterno') {
      setApellidoPaterno(newQuery)
      return
    }
    if (e.target.name === 'apellidoMaterno') {
      setApellidoMaterno(newQuery)
      return
    }

    if (e.target.name === 'direccion') {
      setDireccion(newQuery)
      return
    }

    if (e.target.name === 'referencia') {
      setReferencia(newQuery)
      return
    }

    if (e.target.name === 'dni') {
      if (/^\d+$/.test(newQuery) || newQuery === '') {
        setDni(newQuery)
        return
      }
    }

    if (e.target.name === 'edad') {
      if (/^\d+$/.test(newQuery) || newQuery === '') {
        setEdad(newQuery)
        return
      }
    }

    if (e.target.name === 'telefonoFijo') {
      if (/^\d+$/.test(newQuery) || newQuery === '') {
        setTelefonoFijo(newQuery)
        return
      }
    }

    if (e.target.name === 'telefonoCelular') {
      if (/^\d+$/.test(newQuery) || newQuery === '') {
        setTelefonoCelular(newQuery)
        return
      }
    }

    if (e.target.name === 'carrera') {
      setSelectedCarrera(newQuery)
    }
  }

  return {
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
  }
}

export default useSetFiledsEditorDeDatos
