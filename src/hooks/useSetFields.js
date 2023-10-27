import { useState } from "react";

function useSetFileds(){
    const [name, setName] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [direccion, setDireccion] = useState("");
    const [referencia, setReferencia] = useState("");
    const [dni, setDni] = useState("");
    const [telefonoFijo, setTelefonoFijo] = useState("");
    const [telefonoCelular, setTelefonoCelular] = useState("");
    const [selectedCarrera, setSelectedCarrera] = useState("");


    function noTelefonoFijo(){
        const telefonoFijoElement = document.getElementById("telefonoFijo");
        if (telefonoFijoElement.disabled) {
          telefonoFijoElement.disabled = false;
          telefonoFijoElement.focus();
          setTelefonoFijo("");
        } else {
          telefonoFijoElement.disabled = true;
          setTelefonoFijo("No tiene");
        }
      }
      

    function noTelefonoCelular() {
        const telefonoCelularElement = document.getElementById("telefonoCelular");
        if (telefonoCelularElement.disabled) {
          telefonoCelularElement.disabled = false;
          telefonoCelularElement.focus();
          setTelefonoCelular("");
        } else {
          telefonoCelularElement.disabled = true;
          setTelefonoCelular("No tiene");
        }
    }


    function handleChange(e) {
        const newQuery = e.target.value;
        if (newQuery.startsWith(" ")) return;
        if (e.target.name === "nombre") {
          setName(newQuery);
          return;
        }
        if (e.target.name === "apellidoPaterno") {
          setApellidoPaterno(newQuery);
          return;
        }
        if (e.target.name === "apellidoMaterno") {
          setApellidoMaterno(newQuery);
          return;
        }
    
        if (e.target.name === "carrera") {
          setSelectedCarrera(newQuery);
          return;
        }

        if (e.target.name === "direccion") {
          setDireccion(newQuery);
          return;
        } 

        if (e.target.name === "referencia") {
          setReferencia(newQuery);
          return;
        }

        if (e.target.name === "dni") {
          if (/^\d+$/.test(newQuery) || newQuery === "") {
            setDni(newQuery);
            return;
          }
        }
        

        if (e.target.name === "telefonoFijo") {
          if (/^\d+$/.test(newQuery) || newQuery === "") {
            setTelefonoFijo(newQuery);
            return;
          }
        }

        if (e.target.name === "telefonoCelular") {
          if (/^\d+$/.test(newQuery) || newQuery === "") {
            setTelefonoCelular(newQuery);
            return;
          } 
        }

      }

      return {name, apellidoPaterno, apellidoMaterno, direccion, referencia, dni, telefonoFijo, telefonoCelular, selectedCarrera, handleChange, noTelefonoFijo, noTelefonoCelular};
}

export default useSetFileds;