import "../style/registroAlumno.css";
import React from "react";
import db from "../services/firebase/firebase.js";
import { addDoc, collection } from "firebase/firestore";
import useValidation from "../hooks/useValidation";
import useSetFileds from "../hooks/useSetFields";

import Select from "./Select";

function RegistroAlumno() {
  //campos del formulario
  const {
    name,
    apellidoPaterno,
    apellidoMaterno,
    selectedCarrera,
    handleChange,
  } = useSetFileds();
  //errores
  const {
    errorName,
    errorApellidoPaterno,
    errorApellidoMaterno,
    isButtonDisabled,
    handleBlur,
  } = useValidation(name, apellidoPaterno, apellidoMaterno, selectedCarrera);

  async function registrarAlumno(e) {
    e.preventDefault();
    const fields = Object.fromEntries(new window.FormData(e.target));
    await addDoc(collection(db, "alumnos"), fields);
  }

  return (
    <main className="formulario-principal">
      <h1>Registro de Alumnos</h1>
      <form className="form-registro" onSubmit={registrarAlumno}>
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
            <label>Carrera</label>
            <label>Error</label>
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
    </main>
  );
}

export default RegistroAlumno;
