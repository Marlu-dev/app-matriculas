import { useState, useEffect, useRef } from "react";

function useValidationApoderado(
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  dni,
  telefonoCelular,
banderaTelefonoCelular
) {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,30}$/;
  const [errorName, setErrorName] = useState(null);
  const [errorApellidoPaterno, setErrorApellidoPaterno] = useState(null);
  const [errorApellidoMaterno, setErrorApellidoMaterno] = useState(null);
  const [errorDni, setErrorDni] = useState(null);
  const [errorTelefonoCelular, setErrorTelefonoCelular] = useState(null);
  const [errorVerdaderoDNI, setErrorVerdaderoDNI] = useState(null);
  const apoderadoValido = useRef(false)
  const apoderadoRetorno = apoderadoValido.current
  console.log(apoderadoRetorno);


  function handleBlur(e) {
    if (e.target.value === "") {
      if (e.target.name === "nombre") {
        setErrorName("Se require el ingreso de un nombre válido");
      }
      if (e.target.name === "apellidoPaterno") {
        setErrorApellidoPaterno("Se requiere el ingreso de un apellido válido");
      }
      if (e.target.name === "apellidoMaterno") {
        setErrorApellidoMaterno("Se requiere el ingreso de un apellido válido");
      }
      if (e.target.name === "dni") {
        setErrorDni("Se require el ingreso de un DNI válido");
      }
      if (e.target.name === "telefonoCelular") {
        setErrorTelefonoCelular(
          "Se require el ingreso de un número de celular válido"
        );
      }
    }
  }

  useEffect(() => {
    if (nombre !== "") {
      setErrorName(null);
      if (!nameRegex.test(nombre)) {
        setErrorName(
          "El nombre no puede contener números ni caracteres especiales"
        );
      }
    }
  }, [nombre]);

  useEffect(() => {
    if (apellidoPaterno !== "") {
      setErrorApellidoPaterno(null);
      if (!nameRegex.test(apellidoPaterno)) {
        setErrorApellidoPaterno(
          "El apellido paterno no puede contener números ni caracteres especiales"
        );
      }
    }
  }, [apellidoPaterno]);

  useEffect(() => {
    if (apellidoMaterno !== "") {
      setErrorApellidoMaterno(null);
      if (!nameRegex.test(apellidoMaterno)) {
        setErrorApellidoMaterno(
          "El apellido materno no puede contener números ni caracteres especiales"
        );
      }
    }
  }, [apellidoMaterno]);

  useEffect(() => {
    if (dni !== "") {
        setErrorDni(null);
        const timer = setTimeout(() => {
            console.log(dni.length);
            if (dni.length < 8) {
                setErrorDni("El DNI debe contener 8 dígitos");
            }
            else{
                setErrorVerdaderoDNI(null);
            }
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }
}, [dni]);


useEffect(() => {
    if (dni !== "") {
        setErrorDni(null);
            if (dni.length < 8) {
                setErrorVerdaderoDNI("El DNI debe contener 8 dígitos");
            }            else{
                setErrorVerdaderoDNI(null);
            }
    }
}, [dni]);

console.log(errorVerdaderoDNI);
console.log(errorDni);
  
useEffect(() => {
    if (telefonoCelular !== "") {
        setErrorTelefonoCelular(null);
        const timer = setTimeout(() => {
            if ((telefonoCelular.length !== 9) && (telefonoCelular !== "No tiene")) {
                setErrorTelefonoCelular("El número de celular debe contener 9 dígitos");
            }
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }
}, [telefonoCelular]);


    useEffect(() => {
        if (
            errorName === null &&
            errorApellidoPaterno === null &&
            errorApellidoMaterno === null &&
            errorVerdaderoDNI === null &&
            errorTelefonoCelular === null &&
            nombre !== "" &&
            apellidoPaterno !== "" &&
            apellidoMaterno !== "" &&
            dni !== "" &&
            ((telefonoCelular !== "") || (banderaTelefonoCelular === false))
        ) {
            apoderadoValido.current = true
        } else {
            apoderadoValido.current = false
        }
        console.log(errorName);
        console.log(errorApellidoPaterno);
        console.log(errorApellidoMaterno);
        console.log(errorDni);
        console.log(errorVerdaderoDNI);
        console.log(errorTelefonoCelular);
        console.log(nombre);
        console.log(apellidoPaterno);
        console.log(apellidoMaterno);
        console.log(dni);
        console.log(telefonoCelular);
        console.log(apoderadoValido.current);
    }, [
        errorName,
        errorApellidoPaterno,
        errorApellidoMaterno,
        errorDni,
        errorTelefonoCelular,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        dni,
        telefonoCelular,
        banderaTelefonoCelular
    ]); 

  return {
    errorName,
    errorApellidoPaterno,
    errorApellidoMaterno,
    errorDni,
    errorTelefonoCelular,
    apoderadoRetorno,
    handleBlur,
  };
}

export default useValidationApoderado;
