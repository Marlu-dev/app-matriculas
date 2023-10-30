import React, { useState, useEffect, useRef } from "react";
import useValidationApoderado from "../hooks/useValidationApoderado";

const RegistroApoderado = ({
  registroNombreApoderado,
  handleApoderadoValido,
}) => {
  const banderaTelefonoCelular = useRef();
  const [bandera, setBandera] = useState(false);
  const [banderaApoderadoValido, setBanderaApoderadoValido] = useState(false);

  const [apoderado, setApoderado] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    dni: "",
    telefonoCelular: "",
  });

  function noTelefonoCelular() {
    setBandera(banderaTelefonoCelular.current.checked);
  }

  useEffect(() => {
    if (bandera) {
      setApoderado({ ...apoderado, telefonoCelular: "No tiene" });
    } else {
      setApoderado({ ...apoderado, telefonoCelular: "" });
    }
  }, [bandera]);

  function handleChange(e) {
    const { name, value } = e.target;
    const newQuery = value;
    console.log(newQuery);
    console.log(e.target.name);
    if (e.target.name === "dni") {
      if (/^\d+$/.test(newQuery) || newQuery === "") {
        setApoderado({ ...apoderado, [name]: value });
        return;
      }
    }
    if (e.target.name === "telefonoCelular") {
      if (/^\d+$/.test(newQuery) || newQuery === "") {
        setApoderado({ ...apoderado, [name]: value });
        return;
      }
    }

    if (e.target.name === "nombre") {
      setApoderado({ ...apoderado, [name]: value });
      return;
    }

    if (e.target.name === "apellidoPaterno") {
      setApoderado({ ...apoderado, [name]: value });
      return;
    }

    if (e.target.name === "apellidoMaterno") {
      setApoderado({ ...apoderado, [name]: value });
      return;
    }

    if (e.target.name === "dni") {
      if (/^\d+$/.test(newQuery) || newQuery === "") {
        setApoderado({ ...apoderado, [name]: value });
        return;
      }
    }
  }

  console.log(apoderado);
  const {
    errorName,
    errorApellidoPaterno,
    errorApellidoMaterno,
    errorDni,
    errorTelefonoCelular,
    apoderadoValido,
    handleBlur,
  } = useValidationApoderado(
    apoderado.nombre,
    apoderado.apellidoPaterno,
    apoderado.apellidoMaterno,
    apoderado.dni,
    apoderado.telefonoCelular,
    bandera
  );

  useEffect(() => {
    registroNombreApoderado(apoderado);
  }, [apoderado]);

  console.log(apoderadoValido);
  useEffect(() => {
    handleApoderadoValido(apoderadoValido);
  }, [apoderadoValido]);

  return (
    <>
      <h1>Apoderado</h1>
      <fieldset className="seccion-form">
        <div>
          <label>Nombre</label>
          <label>{errorName}</label>
        </div>
        <input
          name="nombre"
          id="nombre"
          value={apoderado.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </fieldset>

      <fieldset className="seccion-form">
        <div>
          <label>Apellido Paterno</label>
          <label>{errorApellidoPaterno}</label>
        </div>
        <input
          name="apellidoPaterno"
          id="apellidoPaterno"
          value={apoderado.apellidoPaterno}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </fieldset>

      <fieldset className="seccion-form">
        <div>
          <label>Apellido Materno</label>
          <label>{errorApellidoMaterno}</label>
        </div>
        <input
          name="apellidoMaterno"
          id="apellidoMaterno"
          value={apoderado.apellidoMaterno}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </fieldset>

      <fieldset className="seccion-form">
        <div>
          <label>DNI</label>
          <label>{errorDni}</label>
        </div>
        <input
          name="dni"
          id="dni"
          value={apoderado.dni}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={8}
        />
      </fieldset>

      <fieldset className="seccion-form">
        <div>
          <label>Celular</label>
          <label>{errorTelefonoCelular}</label>
        </div>
        <input
          name="telefonoCelular"
          id="telefonoCelular"
          value={apoderado.telefonoCelular}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={9}
        />

        <div>
          <label>No tiene</label>
          <input
            type="checkbox"
            name=""
            ref={banderaTelefonoCelular}
            onChange={noTelefonoCelular}
          />
        </div>
      </fieldset>
    </>
  );
};

export default RegistroApoderado;
