import React, { useEffect, useState } from "react";
import "../style/GridAplication.css";
import BarraTitulo from "./gridAplication/BarraTitulo";
import BarraLateral2 from "./gridAplication/BarraLateral2/BarraLateral2";
import Centro from "./gridAplication/Main/Centro";
import BarraDeHerramientas from "./gridAplication/BarraDeHerramientas/BarraDeHerramientas";

const GridAplicacion = () => {
  const [menuSeleccionadoBarraLateral2, setMenuSeleccionadoBarraLateral2] =
    useState("");

  const recuperarMenuSeleccionadoBarraLateral2 = (menu) => {
    setMenuSeleccionadoBarraLateral2(menu);
  };

  return (
    <>
      <div className="barraTitulo">
        <BarraTitulo />
      </div>
      <div className="barraLateral1">Barra Lateral 1</div>
      <div className="barraLateral2 barraLateral2Expandido" id="barraLateral2">
        <BarraLateral2
          menuSeleccionado={recuperarMenuSeleccionadoBarraLateral2}
        />
      </div>

      <div className="header_principal">
        <BarraDeHerramientas />
      </div>

      <div className="main">
        <Centro menuSeleccionadoBarraLateral2={menuSeleccionadoBarraLateral2} />
      </div>
      {/* <div className="aside" id="aside">
        Aside
      </div> */}
    </>
  );
};

export default GridAplicacion;
