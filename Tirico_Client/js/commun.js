const { Console } = require('console')
const electron = require('electron')
const customTitlebar = require('custom-electron-titlebar');
const { Color } = require('custom-electron-titlebar');
const path = require('path');
const {BrowserWindow} = electron.remote;

//ADDED barre des taches personnalisée

const { remote } = require('electron');
const { Menu, MenuItem } = remote;
const url = require('url');

// We take back the paramater of the ID, we parse it cleany first
// We take back the paramater of the ID, we parse it cleany first
const urlData = window.location.search;
const urlParams = new URLSearchParams(urlData);
const Account_ID = urlParams.get('ID');
var Color_Mode = urlParams.get('Color_Mode');
const Account_Name = urlParams.get('Name');


new customTitlebar.Titlebar({
	backgroundColor: customTitlebar.Color.fromHex('#1D1F27'),
    //icon: "../ressource/image/logo.png",
});


document.getElementById("whiteblack").addEventListener("click", function() {
    if (Color_Mode == 0)
    {
        document.documentElement.style.setProperty('--main-bg-color', '#191925');
        document.documentElement.style.setProperty('--main-bg-workspacecolor', '#15161a');
        document.documentElement.style.setProperty('--textColor', '#fff');
        document.documentElement.style.setProperty('--color-button', '#313141');
        document.documentElement.style.setProperty('--opposite-color', '#fff')
        Color_Mode = 1;
        console.log('Toogling to Dark Mode');
    }
    else
    {
        /*document.documentElement.style.setProperty('--main-bg-color', '#191925');
        document.documentElement.style.setProperty('--main-bg-workspacecolor', '#15161a');
        document.documentElement.style.setProperty('--textColor', '#fff');
        document.documentElement.style.setProperty('--color-button', '#313141');
        document.documentElement.style.setProperty('--opposite-color', '#fff');*/

        document.documentElement.style.setProperty('--main-bg-color', '#fff');
        document.documentElement.style.setProperty('--main-bg-workspacecolor', '#fff');
        document.documentElement.style.setProperty('--textColor', '#000000');
        document.documentElement.style.setProperty('--color-button', '#00abe9');
        document.documentElement.style.setProperty('--opposite-color', '#000000');
        Color_Mode = 0;
        console.log('Toogling to White Mode');
    }
    
});

// Redirection Index ou Inscript
document.getElementById("redirect_Dashboard").addEventListener("click", function() {
    window.location.href="index.html?Name="+Account_Name+"&ID="+Account_ID+"&Color_Mode="+Color_Mode+"";
});
document.getElementById("redirect_Heatmap").addEventListener("click", function() {
    window.location.href="heatmap.html?Name="+Account_Name+"&ID="+Account_ID+"&Color_Mode="+Color_Mode+""
});
document.getElementById("redirect_Analyse").addEventListener("click", function() {
    window.location.href="analyse.html?Name="+Account_Name+"&ID="+Account_ID+"&Color_Mode="+Color_Mode+""
});
document.getElementById("redirect_Parameter").addEventListener("click", function() {
    window.location.href="parametre.html?Name="+Account_Name+"&ID="+Account_ID+"&Color_Mode="+Color_Mode+""
});
document.getElementById("redirect_Disconnection").addEventListener("click", function() {
    window.location.href="connexion.html";
});
/*
const messageAccueil= {
    title: 'TIRICO Notification',
    body: 'Bienvenu sur votre compte : '+Account_Name+ '!',
    icon: "../ressource/image/logo.png"
}



const myNotification = new window.Notification(messageAccueil.title, messageAccueil)
*/


const notification = {
    title: 'TIRICO Notification',
    body: 'Analyse journalière disponible !',
    icon: "../ressource/image/logo.png"
}


const NotifBtn = document.getElementById('NOTIFICATION')

/*NotifBtn.addEventListener('click', (event) => {
    const myNotification = new window.Notification(notification.title, notification);
})*/


if (Color_Mode == 0)
    {
        document.documentElement.style.setProperty('--main-bg-color', '#fff');
        document.documentElement.style.setProperty('--main-bg-workspacecolor', '#fff');
        document.documentElement.style.setProperty('--textColor', '#000000');
        document.documentElement.style.setProperty('--color-button', '#00abe9');
        document.documentElement.style.setProperty('--opposite-color', '#000000');
        console.log('Currently set to White Mode');
    }
else
    {
        document.documentElement.style.setProperty('--main-bg-color', '#191925');
        document.documentElement.style.setProperty('--main-bg-workspacecolor', '#15161a');
        document.documentElement.style.setProperty('--textColor', '#fff');
        document.documentElement.style.setProperty('--color-button', '#313141');
        document.documentElement.style.setProperty('--opposite-color', '#fff');
        console.log('Currently set to Dark Mode');
    }