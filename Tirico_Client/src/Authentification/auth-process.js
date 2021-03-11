// main/auth-process.js

const {BrowserWindow, Menu, MenuItem} = require('electron');
const createAppWindow = require('./app-process');
let win = null;

function createAuthWindow() {
  destroyAuthWin();

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

  
  win.on('closed', () => {
    win = null;
  });
}

function destroyAuthWin() {
  if (!win) return;
  win.close();
  win = null;
}



var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "mysql-pa8.alwaysdata.net",
    user: "pa8_acc",
    password: "5wtE3Cx8W",
    database: "pa8_bdd"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the following DB : mysql-pa8.alwaysdata.net");
  });
  var boolean;
  var sql = "SELECT First_registration,Name FROM Account WHERE ID=1";
  con.query(sql, function (err, result) {
    if (err) throw err;
    else {
      console.log("Welcome mister : "+ result[0].Name);
      if (result[0].First_registration==0)
      {
        boolean = false;
        console.log("First Registration -> Create new Local");
        win.loadFile('html/inscription_loc.html');
      }
      if (result[0].First_registration==1)
      {
        boolean = true;
        console.log("Already registrer -> Go to index.html");
        win.loadFile('html/connexion.html');
      }
    }
  });



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



module.exports = {
  createAuthWindow
};