import React, { useRef } from "react";
import "../style/ModalDeEdicionDeDatos.css";

const ModalDeEdicionDeDatos = ({ cerrar }) => {
  const sonidoRef = useRef(new Audio("../../src/sound/error.mp3"));

  const ejecutarSonido = () => {
    const sonido = sonidoRef.current;
    sonido.currentTime = 0;
    sonido.play();
  };

  const detenerPropagacion = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className="modal-edicion-datos-fondo-invisible"
      onClick={ejecutarSonido}
    >
      <div className="modal-edicion-datos" onClick={detenerPropagacion}>
        <div className="titlebar">
          <div className="title" />
          <div className="controls">
            <div className="close-button" onClick={cerrar}>
              &#x2715;
            </div>
          </div>
        </div>
        <div>ModalDeEdicionDeDatos</div>
      </div>
      ;
    </div>
  );
};

export default ModalDeEdicionDeDatos;
