
const { app, BrowserWindow, Menu, MenuItem} = require('electron');
const {PythonShell} = require('python-shell');

function createWindow () {
  let win = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: true,
    title: "Tirico Inc.", 
    titleBarStyle: "",
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
      
    },
    icon: "ressource/image/ml.png"
  })
  win.webContents.openDevTools();

  win.loadFile('html/index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

var menu = new Menu();
  menu.append(new MenuItem({
      label: 'Tirico Inc.',
      submenu: [
          {
              label: 'Server'
          },
          {
              type: 'separator'
          },
          {
              label: 'DataBase'
          }
      ]
  }));
  Menu.setApplicationMenu(menu);

