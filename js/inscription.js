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
  /*
  var Magasin_Name = document.getElementById("magasin").value;   
  var sql = "INSERT INTO Local (Adresse, Nom, Taille, CapMax, NbCam,CAjour) VALUES ('Company Inc', '"+Magasin_Name+"','5','4','3','1')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      alert("1 record inserted");
});*/
});




    

