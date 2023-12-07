const { app, BrowserWindow, ipcMain, screen } = require('electron')
const path = require('path')

let mainWindow
let loadingScreen

function createLoadingScreen () {
  loadingScreen = new BrowserWindow({
    width: 300,
    height: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  loadingScreen.loadFile(path.join(__dirname, 'loading.html'))
  loadingScreen.on('closed', () => (loadingScreen = null))
}

function createWindow () {
  createLoadingScreen()
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const minWidth = Math.floor(width / 2)
  const minHeight = Math.floor(height / 2)

  setTimeout(() => {
    mainWindow = new BrowserWindow({
      width,
      height,
      minWidth,
      minHeight,
      maxWidth: width,
      maxHeight: height,
      frame: false,
      show: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.cjs'),
        nodeIntegration: true
      }
    })
    mainWindow.loadURL('http://localhost:5173/')

    mainWindow.once('ready-to-show', () => {
      loadingScreen.close()
      mainWindow.show()
    })
  }, 3000)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// IPC event handlers
ipcMain.on('close-window', () => {
  if (mainWindow) {
    mainWindow.close()
  }
})

ipcMain.on('minimize-window', () => {
  if (mainWindow) {
    mainWindow.minimize()
  }
})

let isFirstMaximize = true

ipcMain.on('maximize-window', () => {
  if (mainWindow) {
    if (isFirstMaximize) {
      const { width, height } = screen.getPrimaryDisplay().workAreaSize
      const minWidth = Math.floor(width / 3) * 2
      const minHeight = Math.floor(height / 3) * 2
      mainWindow.setSize(minWidth, minHeight)
      mainWindow.center()
      isFirstMaximize = false
    } else {
      if (mainWindow.isMaximized()) {
        mainWindow.restore()
      } else {
        mainWindow.maximize()
      }
    }
  }
})
