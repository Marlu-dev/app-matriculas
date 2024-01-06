import './style/index.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import CargarAplicacion from './components/CargarAplicacion'
import { SnackbarProvider } from 'notistack'
// import ComponenteParaPruebas from './components/ComponenteParaPruebas'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <CargarAplicacion />
    </SnackbarProvider>
    {/* <ComponenteParaPruebas /> */}
  </React.StrictMode>
)
