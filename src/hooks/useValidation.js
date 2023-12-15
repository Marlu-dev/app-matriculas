import { useState, useEffect, useRef } from 'react'
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit
} from 'firebase/firestore'
import db from '../../public/services/firebase/firebase.js'

const useValidation = (
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
) => {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,30}$/
  const [errorName, setErrorName] = useState(null)
  const [errorApellidoPaterno, setErrorApellidoPaterno] = useState(null)
  const [errorApellidoMaterno, setErrorApellidoMaterno] = useState(null)
  const [errorDireccion, setErrorDireccion] = useState(null)
  const [errorReferencia, setErrorReferencia] = useState(null)
  const [errorDni, setErrorDni] = useState(null)
  const [errorEdad, setErrorEdad] = useState(null)
  const [errorTelefonoFijo, setErrorTelefonoFijo] = useState(null)
  const [errorTelefonoCelular, setErrorTelefonoCelular] = useState(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const isFirstName = useRef(true)
  const isFirstApellidoPaterno = useRef(true)
  const isFirstApellidoMaterno = useRef(true)
  const isFirstDireccion = useRef(true)
  const isFirstReferencia = useRef(true)
  const isFirstDni = useRef(true)
  const isFirstEdad = useRef(true)
  const isFirstTelefonoFijo = useRef(true)
  const isFirstTelefonoCelular = useRef(true)

  const [codigoNuevo, setCodigoNuevo] = useState('')
  const [numeroNuevo, setNumeroNuevo] = useState(0)

  const [errorVerdaderoDNI, setErrorVerdaderoDNI] = useState(null)
  const [errorVerdaderoTelefonoFijo, setErrorVerdaderoTelefonoFijo] =
    useState(null)
  const [errorVerdaderoTelefonoCelular, setErrorVerdaderoTelefonoCelular] =
    useState(null)

  const campoReferenciaValido = useRef(false)
  const campoTelefonoFijoValido = useRef(false)
  const campoTelefonoCelularValido = useRef(false)
  const campoDniValido = useRef(false)

  // // console.log(campoReferenciaValido.current);
  // // console.log(estadoBotonReferencia);
  // // console.log(estadoBotonTelefonoFijo);
  // // console.log(estadoBotonTelefonoCelular);

  // console.log(apoderadoValido);

  useEffect(() => {
    if (isFirstName.current) {
      isFirstName.current = name === ''
    }
  }, [name])

  useEffect(() => {
    if (isFirstApellidoPaterno.current) {
      isFirstApellidoPaterno.current = apellidoPaterno === ''
    }
  }, [apellidoPaterno])

  useEffect(() => {
    if (isFirstApellidoMaterno.current) {
      isFirstApellidoMaterno.current = apellidoMaterno === ''
    }
  }, [apellidoMaterno])

  useEffect(() => {
    if (isFirstDireccion.current) {
      isFirstDireccion.current = direccion === ''
    }
  }, [direccion])

  useEffect(() => {
    if (isFirstReferencia.current) {
      isFirstReferencia.current = referencia === ''
    }
  }, [referencia])

  useEffect(() => {
    isFirstDni.current = dni === ''
    campoDniValido.current = dni && dni.length === 8
  }, [dni])

  useEffect(() => {
    if (isFirstEdad.current) {
      isFirstEdad.current = edad === ''
    }
  }, [edad])

  useEffect(() => {
    if (isFirstTelefonoFijo.current) {
      isFirstTelefonoFijo.current = telefonoFijo === ''
    }
  }, [telefonoFijo])

  useEffect(() => {
    if (isFirstTelefonoCelular.current) {
      isFirstTelefonoCelular.current = telefonoCelular === ''
    }
  }, [telefonoCelular])

  useEffect(() => {
    campoReferenciaValido.current =
      (referencia === 'No tiene' && estadoBotonReferencia === true) ||
      (referencia !== '' && estadoBotonReferencia === false)
  }, [referencia, estadoBotonReferencia])

  useEffect(() => {
    campoTelefonoFijoValido.current =
      (telefonoFijo === '' && estadoBotonTelefonoFijo === false) ||
      (telefonoFijo === 'No tiene' && estadoBotonTelefonoFijo === true) ||
      (telefonoFijo !== '' && estadoBotonTelefonoFijo === false)
  }, [telefonoFijo, estadoBotonTelefonoFijo])

  useEffect(() => {
    campoTelefonoCelularValido.current =
      (telefonoCelular === '' && estadoBotonTelefonoCelular === false) ||
      (telefonoCelular === 'No tiene' && estadoBotonTelefonoCelular === true) ||
      (telefonoCelular !== '' &&
        estadoBotonTelefonoCelular === false &&
        telefonoCelular.length === 9)
  }, [telefonoCelular, estadoBotonTelefonoCelular])

  function handleBlur (e) {
    const newQuery = e.target.value
    const name = e.target.name

    const telefonoFijoElement = document.getElementById('telefonoFijo')

    if (newQuery === '') {
      if (name === 'nombre') {
        setErrorName('Se requiere el ingreso de un nombre válido')
        return
      }

      if (name === 'apellidoPaterno') {
        setErrorApellidoPaterno('Se requiere el ingreso de un apellido válido')
        return
      }

      if (name === 'apellidoMaterno') {
        setErrorApellidoMaterno('Se requiere el ingreso de un apellido válido')
        return
      }

      if (name === 'direccion') {
        setErrorDireccion('Se requiere el ingreso de una dirección válida')
        return
      }

      if (name === 'referencia') {
        setErrorReferencia('Se requiere el ingreso de una referencia válida')
        return
      }

      if (name === 'dni') {
        setErrorDni('Se requiere el ingreso de un dni válido')
        return
      }

      if (name === 'edad') {
        setErrorEdad('Se requiere el ingreso de una edad válida')
        return
      }

      if (name === 'telefonoFijo') {
        if (telefonoFijoElement.disabled === false) {
          setErrorTelefonoFijo(
            'Se requiere el ingreso de un teléfono fijo válido'
          )
          return
        }
      }

      if (name === 'telefonoCelular') {
        setErrorTelefonoCelular(
          'Se requiere el ingreso de un teléfono celular válido'
        )
      }
    }
  }

  useEffect(() => {
    const q = query(
      collection(db, 'alumnos'),
      orderBy('numero', 'desc'),
      limit(1)
    )
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaDeOpciones = querySnapshot.docs.map((doc) => ({
        id: 'A' + (parseInt(doc.data().codigo.slice(1), 10) + 1)
      }))

      if (listaDeOpciones.length === 0) {
        setCodigoNuevo('A1')
        setNumeroNuevo(1)
      } else {
        setCodigoNuevo(listaDeOpciones[0].id)
        setNumeroNuevo(parseInt(listaDeOpciones[0].id.slice(1), 10))
      }
    })
  }, [])

  useEffect(() => {
    setErrorName(null)
    if (name && !nameRegex.test(name)) {
      setErrorName(
        'El nombre no puede contener números ni caracteres especiales'
      )
    }
  }, [name])

  useEffect(() => {
    setErrorApellidoPaterno(null)
    if (apellidoPaterno && !nameRegex.test(apellidoPaterno)) {
      setErrorApellidoPaterno(
        'El apellido paterno no puede contener números ni caracteres especiales'
      )
    }
  }, [apellidoPaterno])

  useEffect(() => {
    setErrorApellidoMaterno(null)
    if (apellidoMaterno && !nameRegex.test(apellidoMaterno)) {
      setErrorApellidoMaterno(
        'El apellido materno no puede contener números ni caracteres especiales'
      )
    }
  }, [apellidoMaterno])

  useEffect(() => {
    if (dni !== '') {
      setErrorDni(null)
      const timer = setTimeout(() => {
        // console.log(dni.length);
        if (dni.length < 8) {
          setErrorDni('El DNI debe contener 8 dígitos')
        } else {
          setErrorDni(null)
        }
      }, 1500)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [dni])

  useEffect(() => {
    if (dni !== '') {
      setErrorDni(null)
      if (dni.length < 8) {
        setErrorVerdaderoDNI('El DNI debe contener 8 dígitos')
      } else {
        setErrorVerdaderoDNI(null)
      }
    }
  }, [dni])

  useEffect(() => {
    setErrorEdad(null)
    const timer = setTimeout(() => {
      if (edad !== '') {
        if (edad > 120) {
          setErrorEdad('Estás seguro que tienes mas de 120 años?')
        } else if (edad < 5) {
          setErrorEdad('Estás seguro que tienes menos de 5 años?')
        } else {
          setErrorEdad(null)
        }
      }
    }, 1500)

    return () => {
      clearTimeout(timer)
    }
  }, [edad])

  useEffect(() => {
    setErrorDireccion(null)
  }, [direccion])

  useEffect(() => {
    setErrorReferencia(null)
    if (referencia === 'No tiene') return
  }, [referencia])

  useEffect(() => {
    setErrorTelefonoFijo(null)
    if (telefonoFijo === 'No tiene') return
  }, [telefonoFijo])

  useEffect(() => {
    if (telefonoFijo !== '') {
      setErrorTelefonoFijo(null)
      const timer = setTimeout(() => {
        if (telefonoFijo.length !== 7 && telefonoFijo !== 'No tiene') {
          setErrorTelefonoFijo(
            'El número de teléfono fijo debe contener 7 dígitos'
          )
        }
      }, 1500)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [telefonoFijo])

  useEffect(() => {
    if (telefonoFijo !== '') {
      setErrorVerdaderoTelefonoFijo(null)
      if (telefonoFijo.length < 7 && telefonoFijo !== 'No tiene') {
        setErrorVerdaderoTelefonoFijo(
          'El número de teléfono fijo debe contener 7 dígitos'
        )
      }
    }
  }, [telefonoFijo])

  useEffect(() => {
    setErrorTelefonoCelular(null)
    if (telefonoCelular === 'No tiene') return
  }, [telefonoCelular])

  useEffect(() => {
    if (telefonoCelular !== '') {
      setErrorTelefonoCelular(null)
      const timer = setTimeout(() => {
        if (telefonoCelular.length !== 9 && telefonoCelular !== 'No tiene') {
          setErrorTelefonoCelular(
            'El número de celular debe contener 9 dígitos'
          )
        }
      }, 1500)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [telefonoCelular])

  useEffect(() => {
    if (telefonoCelular !== '') {
      setErrorVerdaderoTelefonoCelular(null)
      if (telefonoCelular.length < 9 && telefonoCelular !== 'No tiene') {
        setErrorVerdaderoTelefonoCelular(
          'El número de celular debe contener 9 dígitos'
        )
      }
    }
  }, [telefonoCelular])

  useEffect(() => {
    if (
      selectedGrupo === '' ||
      errorName !== null ||
      errorApellidoPaterno !== null ||
      errorApellidoMaterno !== null ||
      errorDireccion !== null ||
      errorReferencia !== null ||
      errorVerdaderoDNI !== null ||
      errorEdad !== null ||
      errorVerdaderoTelefonoFijo !== null ||
      errorVerdaderoTelefonoCelular !== null ||
      selectedCarrera === '' ||
      isFirstName.current === true ||
      isFirstApellidoPaterno.current === true ||
      isFirstApellidoMaterno.current === true ||
      isFirstDireccion.current === true ||
      isFirstReferencia.current === true ||
      isFirstDni.current === true ||
      isFirstEdad.current === true ||
      isFirstTelefonoFijo.current === true ||
      isFirstTelefonoCelular.current === true ||
      name === '' ||
      apellidoPaterno === '' ||
      apellidoMaterno === '' ||
      direccion === '' ||
      dni === '' ||
      edad === '' ||
      telefonoFijo === '' ||
      telefonoCelular === '' ||
      campoReferenciaValido.current === false ||
      campoTelefonoFijoValido.current === false ||
      campoTelefonoCelularValido.current === false ||
      campoDniValido.current === false ||
      apoderadoValido === false
    ) {
      setIsButtonDisabled(true)
    }
  }, [
    selectedGrupo,
    errorName,
    errorApellidoPaterno,
    errorApellidoMaterno,
    errorDireccion,
    errorReferencia,
    errorVerdaderoDNI,
    errorVerdaderoTelefonoFijo,
    errorVerdaderoTelefonoCelular,
    selectedCarrera,
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
  ])

  return {
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
  }
}

export default useValidation
