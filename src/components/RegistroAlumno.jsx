import "../style/registroAlumno.css";
import React, { useEffect } from "react";
import db from "../services/firebase/firebase.js";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import useValidation from "../hooks/useValidation";
import useSetFileds from "../hooks/useSetFields";
import BotonAtras from "./BotonAtras";

import Select from "./Select";

import RegistroApoderado from "./RegistroApoderado";
import RegistroInversion from "./RegistroInversion";

function RegistroAlumno() {
  //campos del formulario

  const [nombreApoderado, setNombreApoderado] = React.useState({});
  const [apoderadoValido, setApoderadoValido] = React.useState(false);

  const handleNombreApoderado = (e) => {
    setNombreApoderado(e);
  };

  const handleApoderadoValido = (e) => {
    setApoderadoValido(e);
  };

  console.log(nombreApoderado);
  console.log(apoderadoValido);

  const {
    selectedGrupo,
    name,
    apellidoPaterno,
    apellidoMaterno,
    direccion,
    referencia,
    dni,
    telefonoFijo,
    telefonoCelular,
    selectedCarrera,
    handleChange,
    noReferencia,
    noTelefonoFijo,
    noTelefonoCelular,
    estadoBotonReferencia,
    estadoBotonTelefonoFijo,
    estadoBotonTelefonoCelular,
  } = useSetFileds();
  //errores
  const {
    errorName,
    errorApellidoPaterno,
    errorApellidoMaterno,
    errorDireccion,
    errorReferencia,
    errorDni,
    errorTelefonoFijo,
    errorTelefonoCelular,
    isButtonDisabled,
    codigoNuevo,
    numeroNuevo,
    handleBlur,
  } = useValidation(
    selectedGrupo,
    name,
    apellidoPaterno,
    apellidoMaterno,
    direccion,
    referencia,
    dni,
    telefonoFijo,
    telefonoCelular,
    selectedCarrera,
    estadoBotonReferencia,
    estadoBotonTelefonoFijo,
    estadoBotonTelefonoCelular,
    apoderadoValido
  );

  useEffect(() => {
    console.log(selectedGrupo);
  }, [selectedGrupo]);

  async function registrarAlumno(e) {
    e.preventDefault();
    const fields = Object.fromEntries(new window.FormData(e.target));
    fields.numero = numeroNuevo;
    fields.codigo = codigoNuevo;
    fields.apoderado = nombreApoderado;
    console.log(fields);
    await addDoc(collection(db, "alumnos"), fields);
    // await setDoc(doc(db, "alumnos", "A7"), fields);
  }

  return (
    <main className="formulario-principal">
      <h1>Registro de Alumnos</h1>
      <form className="form-registro" onSubmit={registrarAlumno}>
        <fieldset className="seccion-form">
          <div>
            <label>Codigo</label>
          </div>
          <input
            name="codigo"
            id="codigo"
            value={codigoNuevo}
            readOnly
            disabled
          />
        </fieldset>

        <fieldset className="seccion-form">
          <div>
            <label>Grupo</label>
          </div>
          <Select
            coleccion="grupos"
            nombre="grupo"
            onSelectChange={handleChange}
          />
        </fieldset>

        <fieldset className="seccion-form">
          <div>
            <label>Nombre</label>
            <label>{errorName}</label>
          </div>
          <input
            name="nombre"
            id="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={name}
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
            onChange={handleChange}
            onBlur={handleBlur}
            value={apellidoPaterno}
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
            onChange={handleChange}
            onBlur={handleBlur}
            value={apellidoMaterno}
          />
        </fieldset>

        <fieldset className="seccion-form">
          <div>
            <label>Direccion</label>
            <label>{errorDireccion}</label>
          </div>
          <input
            name="direccion"
            id="direccion"
            onChange={handleChange}
            onBlur={handleBlur}
            value={direccion}
          />
        </fieldset>

        <fieldset className="seccion-form">
          <div>
            <label>Referencia</label>
            <label>{errorReferencia}</label>
          </div>
          <input
            name="referencia"
            id="referencia"
            onChange={handleChange}
            onBlur={handleBlur}
            value={referencia}
          />

          <div>
            <label>No tiene</label>
            <input type="checkbox" name="" onClick={noReferencia} />
          </div>
        </fieldset>

        <fieldset className="seccion-form">
          <div>
            <label>DNI</label>
            <label>{errorDni}</label>
          </div>
          <input
            name="dni"
            id="dni"
            onChange={handleChange}
            onBlur={handleBlur}
            value={dni}
            maxLength={8}
          />
        </fieldset>

        <fieldset className="seccion-form">
          <div>
            <label>Telefono Fijo</label>
            <label>{errorTelefonoFijo}</label>
          </div>
          <input
            name="telefonoFijo"
            id="telefonoFijo"
            onChange={handleChange}
            onBlur={handleBlur}
            value={telefonoFijo}
            maxLength={9}
          />
          <div>
            <label>No tiene</label>
            <input type="checkbox" name="" onClick={noTelefonoFijo} />
          </div>
        </fieldset>

        <fieldset className="seccion-form">
          <div>
            <label>Telefono Celular</label>
            <label>{errorTelefonoCelular}</label>
          </div>
          <input
            name="telefonoCelular"
            id="telefonoCelular"
            onChange={handleChange}
            onBlur={handleBlur}
            value={telefonoCelular}
            maxLength={9}
          />
          <div>
            <label>No tiene</label>
            <input type="checkbox" name="" onClick={noTelefonoCelular} />
          </div>
        </fieldset>

        <fieldset className="seccion-form">
          <div>
            <label>Carrera</label>
          </div>
          <Select
            coleccion={selectedGrupo}
            nombre="carrera"
            onSelectChange={handleChange}
          />
        </fieldset>

        <RegistroApoderado
          registroNombreApoderado={handleNombreApoderado}
          handleApoderadoValido={handleApoderadoValido}
        />

        <RegistroInversion />

        <button type="submit" disabled={isButtonDisabled} id="btn-submit">
          Registrar
        </button>
      </form>
      <BotonAtras />
    </main>
  );
}

export default RegistroAlumno;
