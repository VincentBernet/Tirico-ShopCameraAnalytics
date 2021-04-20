

var IdObject = 1;

const {PythonShell} = require('python-shell');

// Appel Python du code de génération de conseil
let pyshell = new PythonShell('code_python/analyse.py');

//pyshell.send(JSON.stringify(['\n-------------------------------\nAppel du script de conseil "analyse.py"']));
pyshell.send(JSON.stringify([IdObject,'\n-----------------------------------------------------\nAppel du script de Conseil "analyse.py"']));

pyshell.on('message', function(message) {
  console.log(message);
})

pyshell.end(function (err) {
  if (err){
    throw err;
  };
  console.log('Fin du script Python : "analyse.py"');
  console.log("-----------------------------------------------------");
});

