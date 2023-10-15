import { useState } from "react";

function useSetFileds(){
    const [name, setName] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [selectedCarrera, setSelectedCarrera] = useState("");

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
      }

      return {name, apellidoPaterno, apellidoMaterno, selectedCarrera, handleChange};
}

export default useSetFileds;