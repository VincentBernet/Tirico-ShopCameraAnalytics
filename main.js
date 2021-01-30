/*const { app, BrowserWindow, Menu } = require('electron')
const shell = require('electron').shell
function createWindow () {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
      //contextIsolation: true,
      //nodeIntegrationInWorker: true,
      //nodeIntegrationInSubFrames: true,
    }
  })
  win.loadFile('html/index.html')
}
app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
*/
/*
var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
        submenu: [
            {
                label: 'TIRICO',
                click() {
                    shell.openExternal('https://github.com/VincentBernet/Tirico-ShopCameraAnalitics')
                }
            },
            {
                label: 'Option'
            },
            {
                type: 'separator'
            },
            {
                label: 'Exit',
                click() {
                    app.quit()
                }
            }
        ]
    },
    {
        label: 'info'
    }
])
  Menu.setApplicationMenu(menu);
*/
/*
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})*/

// main.js

const {app} = require('electron');

const {createAuthWindow} = require('./src/Authentification/auth-process');
const createAppWindow = require('./src/Authentification/app-process');
const authService = require('./src/Authentification/auth-service');


async function showWindow() {
  console.log("Demarrage de l'application !");

  try {
    console.log("On essaye de se connecter avec le token de la connexion precedente");
    await authService.refreshTokens();
    return createAppWindow();
  } catch (err) {
    console.log("On a pas de token precedent donc on lance la page pour se connecter");
    createAuthWindow();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', showWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});