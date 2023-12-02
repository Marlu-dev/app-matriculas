const { app, BrowserWindow, ipcMain, screen } = require('electron')
const path = require('path')

let mainWindow

function createWindow () {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const minWidth = Math.floor(width / 2)
  const minHeight = Math.floor(height / 2)

  mainWindow = new BrowserWindow({
    width,
    height,
    minWidth,
    minHeight,
    maxWidth: width,
    maxHeight: height,
    frame: false,

    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: true
    }
  })

  // mainWindow.setMenu(null);

  mainWindow.loadURL('http://localhost:5173/')
  // mainWindow.loadFile(path.join(app.getAppPath(), "dist/index.html"));
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
    // console.log("Closing window");
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
