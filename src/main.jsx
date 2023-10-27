import "./style/index.css";
import MenuDePruebas from "./components/MenuDePruebas";
import RegistroAlumno from "./components/RegistroAlumno";
import RecuperarAlumnos from "./components/RecuperarAlumnos";

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuDePruebas />,
  },

  {
    path: "/registro",
    element: <RegistroAlumno />,
  },

  {
    path: "/recuperar",
    element: <RecuperarAlumnos />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
