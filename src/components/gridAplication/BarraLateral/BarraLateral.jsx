import React, { useEffect, useContext } from 'react'
import BtnBarraLateral from '../BarraLateral2/BtnBarraLateral'
import { useEstadoBarra, useSeleccion, useSeleccionToggle } from '../../EstadoBarraLateralProvider'
import './style/Barralateral.css'

import { userContext } from '../../Login'

const BarraLateral = ({ menuSeleccionado }) => {
  const { user, temporada, nivel } = useContext(userContext)
  const menuExpandido = useEstadoBarra()
  const hola = () => {
  }
  console.log(user, temporada)
  console.log(nivel)

  const seleccion = useSeleccion()

  useEffect(() => {
    menuSeleccionado(seleccion)
  }, [seleccion])

  const cambioSeleccion = useSeleccionToggle()

  return (
    <>
      <BtnBarraLateral
        name={
          <svg
            xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-list-details' width='44'
            height='44'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#00abfb'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          ><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M13 5h8' /><path d='M13 9h5' /><path d='M13 15h8' /><path d='M13 19h5' /><path d='M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z' /><path d='M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z' />
          </svg>
        }
        titulo='RegistroCarrera'
        funcion={hola}
        expandido={menuExpandido}
        seleccion={cambioSeleccion}
        tituloParaMostrar='Gestionar Carreras'
      />

      {nivel === 'admin'
        ? (
          <>      <BtnBarraLateral
            name={
              <svg
                xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-certificate-2' width='44'
                height='44'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#00abfb'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              ><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M12 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' /><path d='M10 7h4' /><path d='M10 18v4l2 -1l2 1v-4' /><path d='M10 19h-2a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-2' />
              </svg>
        }
            titulo='GestionarDocumentosExcelencia'
            funcion={hola}
            expandido={menuExpandido}
            seleccion={cambioSeleccion}
            tituloParaMostrar='Documentos Excelencia'
                  />

            <BtnBarraLateral
              name={
                <svg
                  xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-mail-question' width='44'
                  height='44'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='#00abfb'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M15 19h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4.5' /><path d='M19 22v.01' /><path d='M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483' /><path d='M3 7l9 6l9 -6' />
                </svg>
        }
              titulo='GestionarMatriculasEspeciales'
              funcion={hola}
              expandido={menuExpandido}
              seleccion={cambioSeleccion}
              tituloParaMostrar='Solicitudes'
            />
          </>
          )
        : ''}

    </>
  )
}

export default BarraLateral
