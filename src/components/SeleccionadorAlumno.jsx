import React from "react";
import "../style/SeleccionadorAlumno.css";
import ModalDeEdicionDeDatos from "./ModalDeEdicionDeDatos";
import { useState } from "react";

const SeleccionadorAlumno = ({
  codigo,
  name,
  apellidoPaterno,
  apellidoMaterno,
  dni,
  grupo,
  carrera,
}) => {
  const [modal, setModal] = useState(false);
  const activarModal = () => {
    setModal(!modal);
  };

  return (
    <div className="container-seleccionador-alumno">
      <main className="datos-seleccionador-alumno">
        <span className="codigo-seleccionador-alumno">{codigo}</span>
        <span className="name-seleccionador-alumno">{name}</span>
        <span className="apelldoPaterno-seleccionador-alumno">
          {apellidoPaterno}
        </span>
        <span className="apellidoMaterno-seleccionador-alumno">
          {apellidoMaterno}
        </span>
        <span className="grupo-seleccionador-alumno">{grupo}</span>
        <span className="carrera-seleccionador-alumno">{carrera}</span>
        <span className="dni-seleccionador-alumno">{dni}</span>
        {modal ? <ModalDeEdicionDeDatos cerrar={activarModal} /> : null}
      </main>

      <button
        className="editar-seleccionador-alumno"
        value={codigo}
        onClick={activarModal}
      >
        ojito
      </button>
    </div>
  );
};

export default SeleccionadorAlumno;
