//ADDED barre des taches personnalisée
const customTitlebar = require('custom-electron-titlebar');
const { Color } = require('custom-electron-titlebar');
const { remote } = require('electron');
const { Menu, MenuItem } = remote;
const url = require('url');
new customTitlebar.Titlebar({
	backgroundColor: customTitlebar.Color.fromHex('#1D1F27'),
    //icon: "../ressource/image/logo.png",
});

const {PythonShell} = require('python-shell');


// Appel Python du code de détection, génère un fichier Csv
let pyshell3 = new PythonShell('code_python/yolov4-deepsort/run_debug.py');

pyshell3.send(JSON.stringify(['\n-----------------------------------------------------\nAppel du script de detection "run_debug.py"']))

pyshell3.on('message', function(message) {
  console.log(message);
})

pyshell3.end(function (err) {
  if (err){
    throw err;
  };
  console.log('Fin du script Python : "run_debug.py"');
  console.log("-----------------------------------------------------");
});