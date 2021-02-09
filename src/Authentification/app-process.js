const { app, BrowserWindow } = require('electron');
const { maxHeaderSize } = require('http');


function createWindow () {
  let win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false
    }
  })
  console.log("------ Creation de la fenetre principale ------");


  var python = require('child_process').spawn('python', ['./code_python/graph.py']);
  python.stdout.on('data',function(data){
      console.log("data: ", data.toString('utf8'));
  });
  

  win.loadFile('html/index.html');

  win.on("closed", () => {
      win = null;
  });

}


module.exports = createWindow;