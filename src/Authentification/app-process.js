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
  
  // Appel Python du graphe d'affluence dernière ligne du script python plante
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

 
  // Appel Python du graphe d'affluence dernière ligne du script python plante
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


  /*
  var python = require('child_process').spawn('python', ['./code_python/ex.py']);
  python.stdout.on('data',function(data){
      console.log("From Python: ", data.toString('utf8'));
  });*/
  

  win.loadFile('html/index.html');
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