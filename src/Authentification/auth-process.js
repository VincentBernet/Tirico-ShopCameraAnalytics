// main/auth-process.js

const {BrowserWindow} = require('electron');
const authService = require('./auth-service');
const createAppWindow = require('./app-process');
const createWindow = require('./app-process');

let win = null;

function createAuthWindow() {
  destroyAuthWin();

  win = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
    }
  });

  win.loadURL(authService.getAuthenticationURL());
  console.log("On ouvre la page pour se connecter directemenet du site");
  const {session: {webRequest}} = win.webContents;

  const filter = {
    urls: [
      'http://localhost/callback*'
    ]
  };

  webRequest.onBeforeRequest(filter, async ({url}) => {
    await authService.loadTokens(url);
    // C'est bizarre que ça l'affiche avant de s'etre connecter
    createAppWindow();
    console.log("OnBeforeRequest");
    return destroyAuthWin();
  });

  win.on('authenticated', () => {
    console.log("On est authentifié ! ");
    console.log("On détruit la fenêtre d'authentification et on affiche l'autre");
    destroyAuthWin();
  });

  win.on('closed', () => {
    win = null;
  });
}

function destroyAuthWin() {
  if (!win) return;
  win.close();
  win = null;
}

function createLogoutWindow() {
  const logoutWindow = new electron.remote.BrowserWindow({
    width: 400,
    height: 850,
    show: true    
  })

  logoutWindow.loadURL(authService.getLogOutUrl());

  logoutWindow.on('ready-to-show', async () => {
    logoutWindow.close();
    await authService.logout();
  });
 
}

module.exports = {
  createAuthWindow,
  createLogoutWindow,
};