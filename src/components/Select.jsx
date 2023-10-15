import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";

import db from "../services/firebase/firebase.js";

const Select = ({ coleccion, nombre, onSelectChange }) => {
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const q = query(collection(db, coleccion));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaDeOpciones = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
      }));
      setOpciones(listaDeOpciones);
    });
  }, []);

  return (
    <div>
      <select name={nombre} id="opcion" onChange={onSelectChange}>
        <option value="">Seleccione una opcion</option>
        {opciones.map((opcion) => (
          <option key={opcion.id} value={opcion.nombre}>
            {opcion.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
