const {PythonShell} = require('python-shell');


var mysql = require('mysql');

var con = mysql.createConnection({
    host: "mysql-pa8.alwaysdata.net",
    user: "pa8_acc",
    password: "5wtE3Cx8W",
    database: "pa8_bddv2"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the DB : From Index.js");
});

// Affichage des Items dans le Select
var sql0 = "SELECT ID, Nom FROM Item";
con.query(sql0, function (err0, result0) {
    if (err0) alert(err0);
    else
    {
        // 30 Item Max
        for (i=0;i<=30;i++)
        {
            if (typeof result0[i] === 'undefined') 
            {
                console.log("No more Item associate in the table, we get out of the loop");
                i = 31;
            }
            else
            {   
                        var x = document.getElementById("Object_Selected");
                        var option = document.createElement("option");
                        option.text = result0[i].Nom;
                        option.value = result0[i].ID;
                        x.add(option);
            }
        }
    }});

// Si le select est sélectionner / modifier on lance le script de gestion de Stock
const ObjectSelectBtn = document.getElementById('Object_Selected')
ObjectSelectBtn.addEventListener('change', (event) => {
  var IdObject = ObjectSelectBtn.value;

  // Appel Python du code de génération de conseil
  let pyshell = new PythonShell('code_python/analyse.py');

  //pyshell.send(JSON.stringify(['\n-------------------------------\nAppel du script de conseil "analyse.py"']));
  pyshell.send(JSON.stringify([IdObject,'\n-----------------------------------------------------\nAppel du script de Conseil "analyse.py"']));

  pyshell.on('message', function(message) {
    document.getElementById('DailyAdviceGestion').innerHTML=message;
    console.log(message);
  })

  pyshell.end(function (err) {
    if (err){
      throw err;
    };
    console.log('Fin du script Python : "analyse.py"');
    console.log("-----------------------------------------------------");
  });
})




