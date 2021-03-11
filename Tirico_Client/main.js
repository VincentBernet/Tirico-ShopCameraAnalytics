
const {app, BrowserWindow, Menu, MenuItem} = require('electron');

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createAuthWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});


let win = null;

function createAuthWindow() {

  console.log("Tirico Inc.");

  console.log("|--------- On cree la fenetre de connexion         ---------|");

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

  
win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
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