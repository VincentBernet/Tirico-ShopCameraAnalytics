/*
const { Console } = require('console')
const electron = require('electron')
const path = require('path');
const { createLogoutWindow } = require('../src/Authentification/auth-process');
const { logout } = require('../src/Authentification/auth-service');
const {BrowserWindow} = electron.remote
const DeconnectBtn = document.getElementById('DECO')
DeconnectBtn.addEventListener('click', (event) => {
    logout()
    console.log("deco");
    createLogoutWindow();
    electron.remote.getCurrentWindow().close();
})
const notification = {
    title: 'TIRICO Notification',
    body: 'Your Daily Analysis is available !'
}
const { Notification } = require('electron')
const NotifBtn = document.getElementById('NOTIFICATION')
NotifBtn.addEventListener('click', (event) => {
    const myNotification = new window.Notification(notification.title, notification)
})
const NotifBtn = document.getElementById('ValidateBtn')
const notification = {
    title: 'TIRICO Notification',
    body: 'Sucess !'
}
NotifBtn.addEventListener('click', (event) => {
    const myNotification2 = new window.Notification(notification.title, notification)
})*/
const { Console } = require('console')
const electron = require('electron')
const path = require('path');
const { createLogoutWindow } = require('../src/Authentification/auth-process');
const { logout } = require('../src/Authentification/auth-service');
const {BrowserWindow} = electron.remote



const newWindowBtn = document.getElementById('name')
/*
newWindowBtn.addEventListener('click', (event) => {
  let win = new BrowserWindow({ width: 400, height: 320 })
  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})*/

const DeconnectBtn = document.getElementById('DECO')

DeconnectBtn.addEventListener('click', (event) => {
    //logout()
    createLogoutWindow();
    //electron.remote.getCurrentWindow().close();
})

const notification = {
    title: 'TIRICO Notification',
    body: 'Your Daily Analysis is available !'
}

const NotifBtn = document.getElementById('NOTIFICATION')

NotifBtn.addEventListener('click', (event) => {
    const myNotification = new window.Notification(notification.title, notification)
})