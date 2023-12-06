import React from 'react'
import './style/BarraTitulo.css'
import logo from "/src/style/img/logo.jpg"

const BarraTitulo = () => {
  const closeWindow = () => {
    window.electron.ipcRenderer.send('close-window')
  }

  const minimizeWindow = () => {
    window.electron.ipcRenderer.send('minimize-window')
  }

  const maximizeWindow = () => {
    window.electron.ipcRenderer.send('maximize-window')
  }
  return (
    <>
      <div className='titlebar'>
        <div className="logo-nav_principal">
            <img src= {logo} alt="LOGO NOBEL" />
        </div>
        <div className='name'>Centro Preuniversitario Nobel</div>
        <div className='title' />
        <div className='controls'>
          <div className='minimize-button' onClick={minimizeWindow}>
            &#x2500;
          </div>
          <div className='maximize-button' onClick={maximizeWindow}>
            &#x2750;
          </div>
          <div className='close-button' onClick={closeWindow}>
            &#x2715;
          </div>
        </div>
      </div>
    </>
  )
}

export default BarraTitulo
