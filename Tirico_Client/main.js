

const {app} = require('electron');

const {createAuthWindow} = require('./src/Authentification/auth-process');
const createAppWindow = require('./src/Authentification/app-process');


function showWindow() {
    console.log("Tirico Inc.");

    console.log("|--------- On cree la fenetre de connexion         ---------|");
    createAuthWindow();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', showWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});