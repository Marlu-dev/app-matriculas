import React from "react";
import "../style/SeleccionadorAlumno.css";

const SeleccionadorAlumno = ({
  codigo,
  name,
  apellidoPaterno,
  apellidoMaterno,
  carrera,
}) => {
  return (
    <div className="container">
      <main className="datos">
        <span className="codigo">{codigo}</span>
        <span className="name">{name}</span>
        <span className="apelldoPaterno">{apellidoPaterno}</span>
        <span className="apellidoMaterno">{apellidoMaterno}</span>
        <span className="carrera">{carrera}</span>
      </main>

      <button className="editar">ojito</button>
    </div>
  );
};

export default SeleccionadorAlumno;
