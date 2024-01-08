import React, { useEffect, useState, useContext } from 'react'
import RegistroAlumno from '../../RegistroAlumno'
import RecuperarAlumnos from '../../RecuperarAlumnos'
import './style/Centro.css'
import RegistroMatricula from '../../RegistroMatricula'
import GestionPagos from '../../GestionPagos'
import RegistroCarrera from '../../RegistroCarrera'
import GestionarDocumentosExcelencia from '../../GestionarDocumentosExcelencia'
import GestionarMatriculasEspeciales from '../../GestionarMatriculasEspeciales'
import MenuInicial from '../../MenuInicial'

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

    case 'RegistroMatricula':
      menu = <RegistroMatricula />
      break

    case 'GestionPagos':
      menu = <GestionPagos />
      break

    case 'RegistroCarrera':
      menu = <RegistroCarrera />
      break

    case 'GestionarDocumentosExcelencia':
      menu = <GestionarDocumentosExcelencia />
      break

    case 'GestionarMatriculasEspeciales':
      menu = <GestionarMatriculasEspeciales />
      break

    case 'MenuInicial':
      menu = <MenuInicial />
      break

    default: menu = <MenuInicial />
  }

  // console.log(menu);

  return <>{menu}</>
}

export default Centro
