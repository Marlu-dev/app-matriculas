import React from "react";
import ReactDOM from "react-dom/client";
import RegistroAlumno from "./components/RegistroAlumno";
import "./style/index.css";
import RecuperarAlumnos from "./components/RecuperarAlumnos";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecuperarAlumnos />
    {/* <RegistroAlumno /> */}
  </React.StrictMode>
);
