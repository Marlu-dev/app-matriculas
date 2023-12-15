import { useState } from 'react'

function useSetFileds () {
  const [selectedGrupo, setSelectedGrupo] = useState('')
  const [name, setName] = useState('')
  const [apellidoPaterno, setApellidoPaterno] = useState('')
  const [apellidoMaterno, setApellidoMaterno] = useState('')
  const [direccion, setDireccion] = useState('')
  const [referencia, setReferencia] = useState('')
  const [dni, setDni] = useState('')
  const [edad, setEdad] = useState('')
  const [telefonoFijo, setTelefonoFijo] = useState('')
  const [telefonoCelular, setTelefonoCelular] = useState('')
  const [selectedCarrera, setSelectedCarrera] = useState('')
  const [estadoBotonReferencia, setEstadoBotonReferencia] = useState(false)
  const [estadoBotonTelefonoFijo, setEstadoBotonTelefonoFijo] = useState(false)
  const [estadoBotonTelefonoCelular, setEstadoBotonTelefonoCelular] =
    useState(false)

  function noReferencia () {
    const referenciaElement = document.getElementById('referencia')
    if (referenciaElement.disabled) {
      referenciaElement.disabled = false
      setReferencia('')
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
      setTelefonoFijo('')
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
      setTelefonoCelular('')
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

export default useSetFileds
