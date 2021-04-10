
var mysql = require('mysql');

// Redirection Index ou Inscript

document.getElementById("redirect_Index").addEventListener("click", function() {
    window.location.href="index.html?Name="+Account_Name+"&ID="+Account_ID+"";
});
document.getElementById("redirect_Parameter").addEventListener("click", function() {
    window.location.href="parametre.html?Name="+Account_Name+"&ID="+Account_ID+"";
});
document.getElementById("redirect_Disconnection").addEventListener("click", function() {
    window.location.href="connexion.html";
}); 


var con = mysql.createConnection({
    host: "mysql-pa8.alwaysdata.net",
    user: "pa8_acc",
    password: "5wtE3Cx8W",
    database: "pa8_bddv2"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the DB: From Analyse.js");
});


var sql0 = "SELECT IdLoc FROM AccToLoc WHERE IdAcc='"+Account_ID+"'";
con.query(sql0, function (err0, result0) {
    if (err0) alert(err0);
    else
    {
        // 30 Loc for each account Max
        for (i=0;i<=30;i++)
        {
            if (typeof result0[i] === 'undefined') 
            {
                console.log("No more Local associate to Account, we get out of the loop");
                i = 31;
            }
            else
            {   
                var sql1 = "SELECT Nom, ID FROM Local WHERE ID='"+result0[i].IdLoc+"'";
                con.query(sql1, function (err1, result1) {
                    if (err1) alert(err1);
                    else
                    {
                        document.getElementById("radioButton").innerHTML += '<input type="radio" id="Local'+result1[0].ID+'" name="local" value="local'+result1[0].ID+'"><label for="Local">'+result1[0].Nom+'</label><br>';
                    }
                });
            }
        }
    }});


// Call the script of analyse made by Jean
/*
const {PythonShell} = require('python-shell');
let pyshell = new PythonShell('code_python/analyse.py');

pyshell.send(JSON.stringify(['\n-----------------------------------------------------\nAppel du script de generation de conseil "analyse.py"']))

pyshell.on('message', function(message) {
  console.log(message);
})

pyshell.end(function (err) {
  if (err){
    throw err;
  };
  console.log('Fin du script Python : "analyse.py"');
  console.log("-----------------------------------------------------");
});*/