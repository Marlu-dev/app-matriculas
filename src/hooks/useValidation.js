import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import db from "../services/firebase/firebase.js";

const useValidation = (
  name,
  apellidoPaterno,
  apellidoMaterno,
  direction,
  referencia,
  dni,
  telefonoFijo,
  telefonoCelular,
  selectedCarrera
) => {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,30}$/,
    [errorName, setErrorName] = useState(null),
    [errorApellidoPaterno, setErrorApellidoPaterno] = useState(null),
    [errorApellidoMaterno, setErrorApellidoMaterno] = useState(null),
    [errorDirection, setErrorDirection] = useState(null),
    [errorReferencia, setErrorReferencia] = useState(null),
    [errorDni, setErrorDni] = useState(null),
    [errorTelefonoFijo, setErrorTelefonoFijo] = useState(null),
    [errorTelefonoCelular, setErrorTelefonoCelular] = useState(null),
    [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [codigoNuevo, setCodigoNuevo] = useState("");
  const [numeroNuevo, setNumeroNuevo] = useState(0);

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

      if (name === "direccion") {
        setErrorDirection("Se requiere el ingreso de una dirección válida");
        return;
      }

      if (name === "referencia") {
        setErrorReferencia("Se requiere el ingreso de una referencia válida");
        return;
      }

      if (name === "dni") {
        setErrorDni("Se requiere el ingreso de un dni válido");
        return;
      }

      if (name === "telefonoFijo") {
        setErrorTelefonoFijo(
          "Se requiere el ingreso de un teléfono fijo válido"
        );
        return;
      }

      if (name === "telefonoCelular") {
        setErrorTelefonoCelular(
          "Se requiere el ingreso de un teléfono celular válido"
        );
        return;
      }
    }

    if (name === "dni") {
      if (errorDni === null) {
        if (newQuery.length !== 8) {
          setErrorDni("El dni debe contener 8 dígitos");
          return;
        }
      }
    }

    if (name === "telefonoFijo") {
      if (errorTelefonoFijo === null) {
        if (newQuery.length !== 7) {
          setErrorTelefonoFijo("El teléfono fijo debe contener 7 dígitos");
          return;
        }
      }
    }
  }

  useEffect(() => {
    const q = query(
      collection(db, "alumnos"),
      orderBy("numero", "desc"),
      limit(1)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaDeOpciones = querySnapshot.docs.map((doc) => ({
        id: "A" + (parseInt(doc.data().codigo.slice(1), 10) + 1),
      }));
      setCodigoNuevo(listaDeOpciones[0].id);
      setNumeroNuevo(parseInt(listaDeOpciones[0].id.slice(1), 10));
    });
  }, []);

  useEffect(() => {
    setErrorName(null);
    if (name && !nameRegex.test(name)) {
      setErrorName(
        "El nombre no puede contener números ni caracteres especiales"
      );
    }
  }, [name]);

  useEffect(() => {
    setErrorApellidoPaterno(null);
    if (apellidoPaterno && !nameRegex.test(apellidoPaterno)) {
      setErrorApellidoPaterno(
        "El apellido paterno no puede contener números ni caracteres especiales"
      );
    }
  }, [apellidoPaterno]);

  useEffect(() => {
    setErrorApellidoMaterno(null);
    if (apellidoMaterno && !nameRegex.test(apellidoMaterno)) {
      setErrorApellidoMaterno(
        "El apellido materno no puede contener números ni caracteres especiales"
      );
    }
  }, [apellidoMaterno]);

  useEffect(() => {
    if(telefonoFijo === "No tiene") {
      setErrorTelefonoFijo(null);
      return;
    }
  }, [telefonoFijo]);

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
  }, [
    errorName,
    errorApellidoPaterno,
    errorApellidoMaterno,
    errorDirection,
    errorReferencia,
    errorDni,
    errorTelefonoFijo,
    errorTelefonoCelular,
    selectedCarrera,
  ]);

  return {
    errorName,
    errorApellidoPaterno,
    errorApellidoMaterno,
    errorDirection,
    errorReferencia,
    errorDni,
    errorTelefonoFijo,
    errorTelefonoCelular,
    isButtonDisabled,
    codigoNuevo,
    numeroNuevo,
    handleBlur,
  };
};

export default useValidation;
