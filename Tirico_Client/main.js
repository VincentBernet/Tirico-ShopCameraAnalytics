
const {app, BrowserWindow, Menu, MenuItem} = require('electron');

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMainWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  console.log("|--------- Fermeture de l'application          ---------|");
  app.quit();
});


let win = null;

function createMainWindow() {

  console.log("Tirico Inc.");

  console.log("|--------- Creation de la fenetre de connexion ---------|");

  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false,
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false
    },
    icon: "ressource/image/logo.png",
  });

  
  //win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });

  //win.loadFile('html/connexion.html');
  win.loadFile('html/index.html');
}

  var menu = new Menu();
  menu.append(new MenuItem({
      label: 'Tirico Inc.',
      submenu: [
          {
              label: 'Equipe'
          },
          {
              type: 'separator'
          },
          {
              label: 'Efrei'
          }
      ]
  }));
  Menu.setApplicationMenu(menu);