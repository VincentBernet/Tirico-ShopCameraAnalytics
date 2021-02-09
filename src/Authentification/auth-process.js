// main/auth-process.js

const {BrowserWindow} = require('electron');
const authService = require('./auth-service');
const createAppWindow = require('./app-process');

let win = null;

function createAuthWindow() {
  destroyAuthWin();

  win = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false
    }
  });

  win.loadURL(authService.getAuthenticationURL());
  const {session: {webRequest}} = win.webContents;

  const filter = {
    urls: [
      'http://localhost/callback*'
    ]
  };

  webRequest.onBeforeRequest(filter, async ({url}) => {
    await authService.loadTokens(url);
    createAppWindow();
    return destroyAuthWin();
  });

  win.on('authenticated', () => {
    console.log("[Utilisateur deja authentifie sur cet ordinateur auparavant]");
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
  let logoutWindow = new electron.remote.BrowserWindow({
    
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }   
  })
  
  logoutWindow.loadURL(authService.getLogOutUrl());
  
  logoutWindow.on('ready-to-show', async () => {
    logoutWindow.close();
    await authService.logout();
    electron.remote.getCurrentWindow().close();
  });
 
}

module.exports = {
  createAuthWindow,
  createLogoutWindow,
};