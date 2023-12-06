import React, { useEffect, useState } from 'react'
import RegistroAlumno from '../../RegistroAlumno'
import RecuperarAlumnos from '../../RecuperarAlumnos'
import './style/Centro.css'

const Centro = ({ menuSeleccionadoBarraLateral2 }) => {
  let menu

  const [menuAnterior, setMenuAnterior] = useState('')

  // console.log(menuSeleccionadoBarraLateral2);

  useEffect(() => {
    // console.log(menuSeleccionadoBarraLateral2);
    setMenuAnterior(menu)
  }, [menuSeleccionadoBarraLateral2])

  // console.log(menuAnterior);

  switch (menuSeleccionadoBarraLateral2) {
    case 'RegistroAlumno':
      menu = <RegistroAlumno />
      break

    case 'RecuperarAlumnos':
      menu = <RecuperarAlumnos />
      break

    case 'Contraer':
      menu = menuAnterior
      break
  }

  // console.log(menu);

  return <>{menu}</>
}

export default Centro
