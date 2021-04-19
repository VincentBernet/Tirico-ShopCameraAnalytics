const {PythonShell} = require('python-shell');


// Appel Python du code de détection, génère un fichier Csv
let pyshell = new PythonShell('code_python/DrawZone/drawShopZones.py');

pyshell.send(JSON.stringify(['\n-----------------------------------------------------\nAppel du script de Selection de Zone "drawShopZones.py"']))

pyshell.on('message', function(message) {
  console.log(message);
})

pyshell.end(function (err) {
  if (err){
    throw err;
  };
  console.log('Fin du script Python : "drawShopZones.py"');
  console.log("-----------------------------------------------------");
});