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