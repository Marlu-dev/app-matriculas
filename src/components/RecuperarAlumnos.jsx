import React from "react";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import db from "../services/firebase/firebase.js";
import "../style/SeleccionadorAlumno.css";
import ListaDeAlumnos from "./ListaDeAlumnos.jsx";
import BotonAtras from "./BotonAtras.jsx";

const RecuperarAlumnos = () => {
  const [alumnosListaCompleta, setAlumnosListaCompleta] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("numero");

  useEffect(() => {
    const q = query(collection(db, "alumnos"), orderBy(ordenarPor, "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaDeAlumnos = querySnapshot.docs.map((doc) => doc.data());
      setAlumnosListaCompleta(listaDeAlumnos);
    });
  }, [ordenarPor]);

  const filtrarBusqueda = (alumnosListaCompleta, carreraFiltrada) => {
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

      // Verificar si la carrera coincide con la carrera filtrada
      const carreraAlumno = alumno.carrera.toLowerCase();
      if (carreraFiltrada && carreraFiltrada.toLowerCase() !== carreraAlumno) {
        return false;
      }

      return (
        (regex.test(nombreCompletoSinEspacios) ||
          regex.test(nombreCompletoConEspacios)) &&
        (!carreraFiltrada || carreraFiltrada.toLowerCase() === carreraAlumno)
      );
    });
  };

  // console.log(alumnosListaCompleta);
  // console.log(busqueda);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleChangeSelect = (e) => {
    setOrdenarPor(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <input
        onChange={handleChange}
        value={busqueda}
        type="text"
        placeholder="Buscar..."
      />
      <label>Ordenar por</label>
      <select name="" id="" onChange={handleChangeSelect}>
        <option value="numero">Codigo</option>
        <option value="nombre">Nombre</option>
        <option value="apellidoPaterno">Apellido Paterno</option>
        <option value="apellidoMaterno">Apellido Materno</option>
        <option value="carrera">Carrera</option>
      </select>

      <section>
        <button>Filtrar</button>
        <div className="Grupos">
          <section>
            <label htmlFor="">Grupo</label>
            {/* <input placeholder="Buscar..." type="text" name="" id="" /> */}
            <div>
              <input type="checkbox" />
              <label htmlFor="">Ingenierías</label>
            </div>
            <div>
              <input type="checkbox" />
              <label htmlFor="">Letras</label>
            </div>
            <div>
              <input type="checkbox" />
              <label htmlFor="">Médicas</label>
            </div>
          </section>
          <section>
            <label htmlFor="">Carrera</label>
            <input placeholder="Buscar..." type="text" name="" id="" />
          </section>
        </div>

        <div className="Campo">
          <label htmlFor="">Tipo Aula</label>
          <input placeholder="Buscar..." type="text" name="" id="" />
          <div>
            <input type="checkbox" />
            <label htmlFor="">Tarde</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Apellido Paterno</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Apellido Materno</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Carrera</label>
          </div>
        </div>

        <div className="Campo">
          <label htmlFor="">Tipo de descuento</label>
          <input placeholder="Buscar..." type="text" name="" id="" />
          <div>
            <input type="checkbox" />
            <label htmlFor="">Regular</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Apellido Paterno</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Apellido Materno</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Carrera</label>
          </div>
        </div>
      </section>

      {/* <ListaDeAlumnos alumnos={filtrarBusqueda(alumnosListaCompleta, "")} /> */}
      <BotonAtras />
    </div>
  );
};

export default RecuperarAlumnos;
