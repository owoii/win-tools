const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('node:path')
const exec = require('child_process').exec


async function handlerOpenFile() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile']
  })

  if (!canceled) {
    return filePaths[0]
  }
}

async function openWechat(event, path, num) {
  // console.log(path, '!!!p')
  for (let i = 0; i < num; i++) {
    exec(`start "" "${path}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`执行错误: ${error}`);
        return;
      }
    })
  }
}


function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}


app.whenReady().then(() => {

  ipcMain.handle('dialog:openFile', handlerOpenFile)
  ipcMain.handle('open:wechat', openWechat)
  createWindow()
  app.on('activate', function () {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})