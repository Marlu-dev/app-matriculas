import React from "react";
import { Link } from "react-router-dom";
import "../style/MenuDePruebas.css";

const MenuDePruebas = () => {
  return (
    <section className="menu-de-pruebas">
      <h1>Menu de Pruebas</h1>
      <Link to={`/registro`}>Registrar Alumnos</Link>
      <Link to={`/recuperar`}>Ver lista de alumnos</Link>
    </section>
  );
};

export default MenuDePruebas;
