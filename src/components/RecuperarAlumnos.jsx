import React from "react";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import db from "../services/firebase/firebase.js";
import "../style/SeleccionadorAlumno.css";
import ListaDeAlumnos from "./ListaDeAlumnos.jsx";

const RecuperarAlumnos = () => {
  const [alumnosListaCompleta, setAlumnosListaCompleta] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const q = query(collection(db, "alumnos"), orderBy("numero", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaDeAlumnos = querySnapshot.docs.map((doc) => doc.data());
      setAlumnosListaCompleta(listaDeAlumnos);
    });
  }, []);

  const filtrarAlumnos = (alumnosListaCompleta) => {
    return alumnosListaCompleta.filter((alumno) => {
      const busquedaLowerCase = busqueda.toLowerCase().trim();

      const nombreCompletoSinEspacios = `${alumno.nombre
        .toLowerCase()
        .replace(
          /\s/g,
          ""
        )}${alumno.apellidoPaterno.toLowerCase()}${alumno.apellidoMaterno.toLowerCase()}`;

      const nombreCompletoConEspacios = `${alumno.nombre.toLowerCase()} ${alumno.apellidoPaterno.toLowerCase()} ${alumno.apellidoMaterno.toLowerCase()}`;

      // Crear una expresión regular a partir de la búsqueda
      const regex = new RegExp(
        busquedaLowerCase
          .split(" ")
          .map((word) => `(?=.*\\b${word})`)
          .join(""),
        "i"
      );

      return (
        regex.test(nombreCompletoSinEspacios) ||
        regex.test(nombreCompletoConEspacios)
      );
    });
  };

  console.log(alumnosListaCompleta);
  console.log(busqueda);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  return (
    <>
      <div>
        <input onChange={handleChange} value={busqueda} type="text" />
        <ListaDeAlumnos alumnos={filtrarAlumnos(alumnosListaCompleta)} />
      </div>
    </>
  );
};

export default RecuperarAlumnos;
