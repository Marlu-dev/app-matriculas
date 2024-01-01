import './style/index.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import CargarAplicacion from './components/CargarAplicacion'
// import ComponenteParaPruebas from './components/ComponenteParaPruebas'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CargarAplicacion />
    {/* <ComponenteParaPruebas /> */}
  </React.StrictMode>
)
