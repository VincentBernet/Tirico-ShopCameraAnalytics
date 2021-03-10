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
  
  var Account_ID = 1;
  var LocID = 0; 

  // Sucession de querry à exécuter
  var sql1 = "INSERT INTO Account (Name, Email, Pass) VALUES ('"+Account_Email+"','"+Account_Email+"', '"+Account_Password+"')";
  con.query(sql1, function (err1, result1) {
    if (err1) alert(err1);
    else {
        alert("Compte créé !");
        window.location.href="index.html";
    }
  });
}

    

