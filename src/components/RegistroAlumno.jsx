import "../style/registroAlumno.css";
import React from "react";
import db from "../services/firebase/firebase.js";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import useValidation from "../hooks/useValidation";
import useSetFileds from "../hooks/useSetFields";
import BotonAtras from "./BotonAtras";

import Select from "./Select";

function RegistroAlumno() {
  //campos del formulario
  const {
    name,
    apellidoPaterno,
    apellidoMaterno,
    direccion,
    referencia,
    dni,
    telefonoFijo,
    telefonoCelular,
    selectedCarrera,
    aactivarCasillaTelefonoFijo,
    handleChange,
    noTelefonoFijo,
    noTelefonoCelular,
  } = useSetFileds();
  //errores
  const {
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
  } = useValidation(
    name,
    apellidoPaterno,
    apellidoMaterno,
    direccion,
    referencia,
    dni,
    telefonoFijo,
    telefonoCelular,
    selectedCarrera
  );

  async function registrarAlumno(e) {
    e.preventDefault();
    const fields = Object.fromEntries(new window.FormData(e.target));
    fields.numero = numeroNuevo;
    fields.codigo = codigoNuevo;
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
            <label>{errorDirection}</label>
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
            maxLength="8"
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
            maxLength="7"
          />
          <div>
            <label>No tiene</label>
            <input
              type="checkbox"
              name="activarCasillaTelefonoFijo"
              onClick={noTelefonoFijo}
            />
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
            maxLength="9"
          />
          <div>
            <label>No tiene</label>
            <input
              type="checkbox"
              name="activarCasillaTelefonoFijo"
              onClick={noTelefonoCelular}
            />
          </div>
        </fieldset>

        <fieldset className="seccion-form">
          <div>
            <label>Carrera</label>
          </div>
          <Select
            coleccion="carreras"
            nombre="carrera"
            onSelectChange={handleChange}
          />
        </fieldset>

        <button type="submit" disabled={isButtonDisabled} id="btn-submit">
          Registrar
        </button>
      </form>
      <BotonAtras />
    </main>
  );
}

export default RegistroAlumno;
