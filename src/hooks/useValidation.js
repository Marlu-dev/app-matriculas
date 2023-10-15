import { useState, useEffect } from 'react';

const useValidation = (name, apellidoPaterno, apellidoMaterno, selectedCarrera) => {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,30}$/,
    [errorName, setErrorName] = useState(null),
    [errorApellidoPaterno, setErrorApellidoPaterno] = useState(null),
    [errorApellidoMaterno, setErrorApellidoMaterno] = useState(null),
    [isButtonDisabled, setIsButtonDisabled] = useState(true);

    function handleBlur(e) {
        const newQuery = e.target.value;
        const name = e.target.name;
        if (newQuery === "") {
          if (name === "nombre") {
            setErrorName("Se requiere el ingreso de un nombre válido");
            return;
          }
    
          if (name === "apellidoPaterno") {
            setErrorApellidoPaterno("Se requiere el ingreso de un apellido válido");
            return;
          }
    
          if (name === "apellidoMaterno") {
            setErrorApellidoMaterno("Se requiere el ingreso de un apellido válido");
            return;
          }
        }
      }

  useEffect(() => {
    setErrorName(null);
    if (name && !nameRegex.test(name)) {
      setErrorName("El nombre no puede contener números ni caracteres especiales");
    }
  }, [name]);

  useEffect(() => {
    setErrorApellidoPaterno(null);
    if (apellidoPaterno && !nameRegex.test(apellidoPaterno)) {
      setErrorApellidoPaterno("El apellido paterno no puede contener números ni caracteres especiales");
    }
  }, [apellidoPaterno]);

  useEffect(() => {
    setErrorApellidoMaterno(null);
    if (apellidoMaterno && !nameRegex.test(apellidoMaterno)) {
      setErrorApellidoMaterno("El apellido materno no puede contener números ni caracteres especiales");
    }
  }, [apellidoMaterno]);

  useEffect(() => {
    if (
      selectedCarrera === "" ||
      errorName !== null ||
      errorApellidoPaterno !== null ||
      errorApellidoMaterno !== null
    ) {
      setIsButtonDisabled(true);
      return;
    }

    if (
      errorName === null &&
      errorApellidoPaterno === null &&
      errorApellidoMaterno === null &&
      name !== "" &&
      apellidoPaterno !== "" &&
      apellidoMaterno !== "" &&
      selectedCarrera !== ""
    ) {
      setIsButtonDisabled(false);
    }
  }, [errorName, errorApellidoPaterno, errorApellidoMaterno, selectedCarrera]);

  return { errorName, errorApellidoPaterno, errorApellidoMaterno, isButtonDisabled, handleBlur};
};

export default useValidation;
