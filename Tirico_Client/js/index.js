const { Console } = require('console')
const electron = require('electron')
const path = require('path');
const { createLogoutWindow } = require('../src/Authentification/auth-process');
const { logout } = require('../src/Authentification/auth-service');
const {BrowserWindow} = electron.remote

//ADDED barre des taches personnalisée
const customTitlebar = require('custom-electron-titlebar');
const { Color } = require('custom-electron-titlebar');
const { remote } = require('electron');
const { Menu, MenuItem } = remote;
const url = require('url');
new customTitlebar.Titlebar({
	backgroundColor: customTitlebar.Color.fromHex('#1D1F27'),
    //icon: "../ressource/image/logo.png",
});

const DeconnectBtn = document.getElementById('DECO')
DeconnectBtn.addEventListener('click', (event) => {
    createLogoutWindow();
})

const notification = {
    title: 'TIRICO Notification',
    body: 'Your Daily Analysis is available !',
    icon: "../ressource/image/logo.png"
}

const NotifBtn = document.getElementById('NOTIFICATION')

NotifBtn.addEventListener('click', (event) => {
    const myNotification = new window.Notification(notification.title, notification)
})



