import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import db from "../../public/services/firebase/firebase.js";

const Filtro = ({ nombre, coleccion, funcionObtenerFiltros }) => {
  const [opciones, setOpciones] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [seleccion, setSeleccion] = useState([]);

  useEffect(() => {
    const q = query(collection(db, coleccion));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaDeOpciones = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
      }));
      setOpciones(listaDeOpciones);
      console.log(opciones);
    });

    // Desvincular el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  const buscarOpcion = (e) => {
    setBusqueda(e.target.value);
  };

  useEffect(() => {
    funcionObtenerFiltros(seleccion);
  }, [seleccion]);

  const filtrarBusqueda = (opciones, busqueda) => {
    return opciones.filter((opcion) => {
      if (opcion.nombre && typeof opcion.nombre === "string") {
        const busquedaLowerCase = busqueda.toLowerCase().trim();
        const nombreOpcion = opcion.nombre.toLowerCase().trim();
        const regex = new RegExp(
          busquedaLowerCase
            .split(" ")
            .map((word) => `(?=.*\\b${word})`)
            .join(""),
          "i"
        );

        return regex.test(nombreOpcion);
      } else {
        return false; // O maneja esto de acuerdo a tus necesidades
      }
    });
  };

  const checkboxSeleccionado = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setSeleccion([...seleccion, name]);
    } else {
      setSeleccion(seleccion.filter((item) => item !== name));
    }
  };

  //   console.log('seleccion', seleccion)

  return (
    <>
      <div>{nombre}</div>
      <div>
        <input type="text" onChange={buscarOpcion} />
        <div className="opciones" />
        {filtrarBusqueda(opciones, busqueda).map((opcion) => (
          <div key={opcion.id}>
            {opcion.nombre}
            <input
              type="checkbox"
              name={opcion.nombre}
              id={opcion.id}
              onChange={checkboxSeleccionado}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Filtro;
