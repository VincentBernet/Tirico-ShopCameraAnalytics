const { app, BrowserWindow, Menu, MenuItem} = require('electron');
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
    icon: "ressource/image/logo.png",
  })
  

  console.log("|--------- Creation de la fenetre principale ---------|");
  console.log("Nom d'utilisateur +" + " ????" + " : Chargement CSV correspondant");
  console.log("-----------------------------------------------------");
  
  // Appel Python du graphe d'affluence dernière ligne du script python pour télécharger le graphe plante
  let pyshell = new PythonShell('code_python/Affluence/Affluence.py');

  pyshell.send(JSON.stringify(['Appel du script "Affluence.py"  ']))

  pyshell.on('message', function(message) {
    console.log(message);
    
  })

  pyshell.end(function (err) {
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


  // Appel Python du code de détection, génère un fichier Csv
  let pyshell3 = new PythonShell('code_python/yolov4-deepsort/run_debug.py');

  pyshell3.send(JSON.stringify(['Appel du script de detection "run_debug.py"']))

  pyshell3.on('message', function(message) {
    console.log(message);
  })

  pyshell3.end(function (err) {
    if (err){
      throw err;
    };
    console.log('Fin du script Python : "run_debug.py"');
    console.log("-----------------------------------------------------");
    console.log("")
  });
  

  //win.loadFile('html/index.html');
  win.loadFile('html/inscription.html');

  win.webContents.openDevTools();
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