import React from "react";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import db from "../services/firebase/firebase.js";
import "../style/SeleccionadorAlumno.css";
import SeleccionadorAlumno from "./SeleccionadorAlumno.jsx";

const RecuperarAlumnos = () => {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "alumnos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaDeAlumnos = querySnapshot.docs.map((doc) => doc.data());
      setAlumnos(listaDeAlumnos);
    });
  }, []);

  console.log(alumnos);

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

export default RecuperarAlumnos;
