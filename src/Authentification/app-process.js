const { app, BrowserWindow, Menu, MenuItem} = require('electron');
const { maxHeaderSize } = require('http');
const {PythonShell} = require('python-shell');

function createWindow () {
  let win = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
    },
    icon: "ressource/image/Logo_Tirico.png",
  })

  console.log("------ Creation de la fenetre principale ------");

  // Appel Python du graphe d'affluence dernière ligne du script python plante
  let pyshell = new PythonShell('code_python/Affluence/ex.py');

  pyshell.send(JSON.stringify(["Nom d'utilisateur Inconnu "]))

  pyshell.on('message', function(message) {
    console.log(message);
  })

  pyshell.end(function (err) {
    if (err){
      throw err;
    };
    console.log('Fin du script Python : "ex.py"');
  });


    // Appel Python du Compteur 
    let pyshell2 = new PythonShell('code_python/Counter/AffluenceCounter.py');

    pyshell2.send(JSON.stringify([" "]))
  
    pyshell2.on('message', function(message) {
      console.log("Compteur du nombre de personne total comptabilise dans le magasin : "+message);
      //A renvoyer vers le fichier counter.js
      //compteur= parseInt(message);
    })
  
    pyshell2.end(function (err) {
      if (err){
        throw err;
      };
      console.log('Fin du script Python : "AffluenceCounter.py"');
    });




  /*
  var python = require('child_process').spawn('python', ['./code_python/ex.py']);
  python.stdout.on('data',function(data){
      console.log("From Python: ", data.toString('utf8'));
  });*/
  

  win.loadFile('html/index.html');
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