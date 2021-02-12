const { app, BrowserWindow } = require('electron');
const { maxHeaderSize } = require('http');
const {PythonShell} = require('python-shell');

function createWindow () {
  let win = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false,
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
    }
    
  })
  console.log("------ Creation de la fenetre principale ------");


  let pyshell = new PythonShell('code_python/Affluence/ex.py');

  pyshell.send(JSON.stringify(["Nom d'utilisateur Inconnu "]))

  pyshell.on('message', function(message) {
    console.log(message);
  })

  pyshell.end(function (err) {
    if (err){
      throw err;
    };
    console.log('Fin du script Python');
  });
  /*
  var python = require('child_process').spawn('python', ['./code_python/ex.py']);
  python.stdout.on('data',function(data){
      console.log("From Python: ", data.toString('utf8'));
  });*/
  

  win.loadFile('html/index.html');
  win.removeMenu();
  win.on("closed", () => {
      win = null;
  });

}


module.exports = createWindow;