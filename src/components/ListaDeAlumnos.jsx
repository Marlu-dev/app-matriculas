import React from "react";
import SeleccionadorAlumno from "./SeleccionadorAlumno";

const ListaDeAlumnos = ({ alumnos }) => {
  return (
    <div>
      {alumnos.map((opcion) => (
        <SeleccionadorAlumno
          key={opcion.numero}
          codigo={opcion.codigo}
          name={opcion.nombre}
          apellidoPaterno={opcion.apellidoPaterno}
          apellidoMaterno={opcion.apellidoMaterno}
          carrera={opcion.carrera}
        />
      ))}
    </div>
  );
};

export default ListaDeAlumnos;
