import React from "react";

const RegistroInversion = () => {
  return (
    <>
      <div className='from '>
        <div className="details person">
            <span className="title">
              Inversión
            </span>
            <div className="seccion-form">
              <div className="input-seccion">
                <div>
                  <label>Monto</label>
                  {/* <label>{errorName}</label> */}
                </div>
                <input
                  name="nombre"
                  id="nombre"
                  placeholder='1500' required
                  //   value={apoderado.nombre}
                  //   onChange={handleChange}
                  //   onBlur={handleBlur}
                />
              </div>
            </div>
        </div>
      </div>

    </>
  );
};

export default RegistroInversion;
