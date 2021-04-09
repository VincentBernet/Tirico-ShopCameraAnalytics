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


// Code for the Form
const checkbox = document.querySelector('.my-form input[type="checkbox"]');
const btns = document.querySelectorAll(".my-form button");
 
checkbox.addEventListener("change", function() {
  const checked = this.checked;
  for (const btn of btns) {
    checked ? (btn.disabled = false) : (btn.disabled = true);
  }
});

// Connection to the DB
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "mysql-pa8.alwaysdata.net",
  user: "pa8_acc",
  password: "5wtE3Cx8W",
  database: "pa8_bdd"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


// Form has been submit, time to insert
function form_submited() {
  var Account_Email = document.getElementById("account_email").value;
  var Account_Password = document.getElementById("account_password").value;
  
  // Sucession de querry à exécuter
  //var sql1 = "SELECT * FROM 'Account' WHERE Email='"+Account_Email+"' AND Pass='"+Account_Password+"'"; 
  var sql0 = "SELECT Name, First_Server_Use, ID FROM `Account` WHERE Email='"+Account_Email+"' AND Pass='"+Account_Password+"'";
  con.query(sql0, function (err0, result0) {
    if (err0) alert(err0);
    else {
        try {
            result0[0].Name;
            alert("Connexion Validé");
            if (result0[0].First_Server_Use==0)
            {
              alert("Installation de l'environnement nécessaire à la détection, cela peut prendre quelque minutes")
              var sql1 = "UPDATE Account SET First_Server_Use=1 WHERE ID='"+result0[0].ID+"';";
                con.query(sql1, function (err1, result1) {
                  if (err1) alert(err1);
                  else {
                    installation();
                    setTimeout(() => { 
                    alert("L'installation est terminé, elle ne seras plus nécessaire à votre prochaine utilisation ");
                    window.location.href="server.html";}, 10000);
                  }
                });
            }
            else window.location.href="server.html";
        }
        catch {
            alert("Connexion Refusé");
            window.location.href="index.html";
        }
    }
  });
}

function installation() {
const {PythonShell} = require('python-shell');


// Appel Python du code d'installation d'environnement'
let pyshell0 = new PythonShell('code_python/yolov4-deepsort/first_run_debug.py');

pyshell0.send(JSON.stringify(['\n-----------------------------------------------------\nAppel du script d\'installation "first_run_debug.py"']))

pyshell0.on('message', function(message) {
  console.log(message);
})

pyshell0.end(function (err) {
  if (err){
    throw err;
  };
  console.log('Fin du script Python : "first_run_debug.py"');
  console.log("-----------------------------------------------------");
});
}
    

