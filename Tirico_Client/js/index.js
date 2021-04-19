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
const Account_Name = urlParams.get('Name');


new customTitlebar.Titlebar({
	backgroundColor: customTitlebar.Color.fromHex('#1D1F27'),
    //icon: "../ressource/image/logo.png",
});


// Redirection Index ou Inscript
document.getElementById("redirect_Dashboard").addEventListener("click", function() {
    window.location.href="index.html?Name="+Account_Name+"&ID="+Account_ID+"";
});
document.getElementById("redirect_Analyse").addEventListener("click", function() {
    window.location.href="analyse.html?Name="+Account_Name+"&ID="+Account_ID+"";
});
document.getElementById("redirect_Parameter").addEventListener("click", function() {
    window.location.href="parametre.html?Name="+Account_Name+"&ID="+Account_ID+"";
});
document.getElementById("redirect_Disconnection").addEventListener("click", function() {
    window.location.href="connexion.html";
});
var white = 0;
document.getElementById("whiteblack").addEventListener("click", function() {
    if (white == 0)
    {
        document.documentElement.style.setProperty('--main-bg-color', '#fff');
        document.documentElement.style.setProperty('--main-bg-workspacecolor', '#fff');
        document.documentElement.style.setProperty('--textColor', '#000000');
        document.documentElement.style.setProperty('--color-button', '#00abe9');
        document.documentElement.style.setProperty('--opposite-color', '#000000');
        gt = '#000000';
        white = 1;
    }
    else
    {
        document.documentElement.style.setProperty('--main-bg-color', '#191925');
        document.documentElement.style.setProperty('--main-bg-workspacecolor', '#15161a');
        document.documentElement.style.setProperty('--textColor', '#fff');
        document.documentElement.style.setProperty('--color-button', '#313141');
        document.documentElement.style.setProperty('--opposite-color', '#fff');
        gt = '#fff';
        white = 0;
    }
    console.log('es');
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



var mysql = require('mysql');

var con = mysql.createConnection({
    host: "mysql-pa8.alwaysdata.net",
    user: "pa8_acc",
    password: "5wtE3Cx8W",
    database: "pa8_bddv2"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the DB: From Analyse.js");
});


var num = -99;
var numId = [];
var sql0 = "SELECT IdLoc FROM AccToLoc WHERE IdAcc='"+Account_ID+"'";
con.query(sql0, function (err0, result0) {
    if (err0) alert(err0);
    else
    {
        // 30 Loc for each account Max
        for (i=0;i<=30;i++)
        {
            if (typeof result0[i] === 'undefined') 
            {
                console.log("No more Local associate to Account, we get out of the loop");
                i = 31;
            }
            else
            {   
                var sql1 = "SELECT Nom, ID FROM Local WHERE ID='"+result0[i].IdLoc+"'";
                con.query(sql1, function (err1, result1) {
                    if (err1) alert(err1);
                    else
                    {
                        var x = document.getElementById("magasinSelect");
                        var option = document.createElement("option");
                        option.text = result1[0].Nom;
                        option.id = result1[0].ID;
                        numId.push(option.id);
                        console.log(numId[i]);
                        x.add(option);
                    }
                });
            }
        }
    }});
