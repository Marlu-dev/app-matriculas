const { app, BrowserWindow, ipcMain, screen } = require('electron')
const path = require('path')

let mainWindow

function createWindow () {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const minWidth = Math.floor(width / 2)
  const minHeight = Math.floor(height / 2)

  mainWindow = new BrowserWindow({
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
  // mainWindow.loadURL('http://localhost:5174/')
  mainWindow.loadFile('dist/index.html')
  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Manejadores de eventos IPC
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

ipcMain.on('maximize-window', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.restore()
    } else {
      mainWindow.maximize()
    }
  }
})
