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

const notification = {
  title: 'TIRICO Notification',
  body: 'Your Daily Analysis is available !',
  icon: "../ressource/image/logo.png"
}

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
  var inter = 1;
  // Sucession de querry à exécuter
  //var sql1 = "SELECT * FROM 'Account' WHERE Email='"+Account_Email+"' AND Pass='"+Account_Password+"'"; 
  var sql0 = "SELECT ID,Name, First_registration FROM `Account` WHERE Email='"+Account_Email+"' AND Pass='"+Account_Password+"'";
  con.query(sql0, function (err0, result0) {
    if (err0) alert(err0);
    else {
        try {
            result0[0].Name;
            alert("Connexion Validé");
            var boolean;
            if (result0[0].First_registration==0)
                {
                  boolean = false;
                  console.log("First Registration -> Create new Local");
                  window.location.href="inscription_loc.html?Name="+result0[0].Name+"&ID="+result0[0].ID+"";
                }
            if (result0[0].First_registration==1)
                {
                  boolean = true;
                  console.log("Already registrer -> Go to index.html");
                  window.location.href="index.html?Name="+result0[0].Name+"&ID="+result0[0].ID+"";
                }
        }
        catch {
            alert("Connexion Refusé");
            window.location.href="connexion.html";
        }
    }
  });
}

    

