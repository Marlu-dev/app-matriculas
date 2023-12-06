import './style/index.css'
import GridAplicacion from './components/GridAplicacion'
import Filtro from './components/Filtro'

import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GridAplicacion />
  </React.StrictMode>
)
