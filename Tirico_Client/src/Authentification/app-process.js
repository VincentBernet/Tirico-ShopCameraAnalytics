const { app, BrowserWindow, Menu, MenuItem, Tray} = require('electron');
const { maxHeaderSize } = require('http');
const {PythonShell} = require('python-shell');


function createWindow () {
  let win = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false,
    title: "Tirico Inc.", 
    titleBarStyle: "hidden",
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
      
    },
    icon: "ressource/image/ml.png"
  })
  win.webContents.openDevTools();

  // Mettre a false pour l'avoir dans le tray
  let ForceQuit = true;

  let tray = null;
win.on('close', function (event) {
  if (ForceQuit == false)
  {
    event.preventDefault();
    win.hide();
    tray = createTray();
    console.log("Minimized with the tray");
  }
  else
  {
  win = null;
  }
});


function createTray() {
  let appIcon = new Tray("ressource/image/logo.png");
  const contextMenu = Menu.buildFromTemplate([
      {
          label: 'Show', click: function () {
            
              win.show();
              tray.destroy();
          }
      },
      {
          label: 'Exit', click: function () {
              ForceQuit = true;
              app.isQuiting = true;
              app.quit();
          }
      }
  ]);
  appIcon.on('double-click', function (event) {
      win.show();
      tray.destroy();
  });
  appIcon.setToolTip('Tray Tutorial');
  appIcon.setContextMenu(contextMenu);
  return appIcon;
}

  var contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click:  function(){
        win.show();
        tray.destroy();
    } },
    { label: 'Quit', click:  function(){
        ForceQuit = true;
        application.isQuiting = true;
        application.quit();
    } }
]);







  // Connection to the DB
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
      console.log("Welcome mister : "+result[0].Name);
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


  

  // Appel Python du graphe d'affluence dernière ligne du script python pour télécharger le graphe plante
  let pyshell1 = new PythonShell('code_python/Affluence/Affluence.py');

  pyshell1.send(JSON.stringify(['Appel du script "Affluence.py"']))

  pyshell1.on('message', function(message) {
    console.log(message);
    
  })

  pyshell1.end(function (err) {
    if (err){
      throw err;
    };
    console.log('Fin du script Python : "Affluence.py"');
    console.log("-----------------------------------------------------");
  });

 
  // Appel Python : Code de la HeatMap, fonctionnel 
  let pyshell2 = new PythonShell('code_python/Density_Map/Density_Map.py');

  pyshell2.send(JSON.stringify(['Appel du script "Density_Map.py"']))

  pyshell2.on('message', function(message) {
    console.log(message);
  })

  pyshell2.end(function (err) {
    if (err){
      throw err;
    };
    console.log('Fin du script Python : "Density_Map.py"');
    console.log("-----------------------------------------------------");
    console.log("")
  });

  //win.webContents.openDevTools();
  //win.removeMenu();
  win.on("closed", () => {
      win = null;
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



}





module.exports = createWindow;