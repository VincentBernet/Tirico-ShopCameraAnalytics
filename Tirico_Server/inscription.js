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
  var Magasin_Name = document.getElementById("magasin_name").value;
  var Magasin_Adresse = document.getElementById("magasin_adresse").value;
  var Magasin_Taille = document.getElementById("magasin_taille").value;
  var Magasin_Type = document.getElementById("magasin_type").value;     
  var Chiffre_Affaire = document.getElementById("chiffre_affaire").value;
  var Account_ID = 1;
  var LocID = 0; 

  // Sucession de querry à exécuter
  var sql1 = "INSERT INTO Local (Adresse, Nom, Type, Taille, CapMax, NbCam,CAjour) VALUES ('"+Magasin_Adresse+"','"+Magasin_Name+"', '"+Magasin_Type+"','"+Magasin_Taille+"','"+Magasin_Taille/10+"','"+Magasin_Taille/200+"','"+Chiffre_Affaire+"')";
  con.query(sql1, function (err1, result1) {
    if (err1) alert(err1);
    else {
        alert("Requete Valide : Insert Effectué");
        var sql2 = "SELECT ID FROM Local WHERE Adresse='"+Magasin_Adresse+"' AND Nom='"+Magasin_Name+"' AND Type='"+Magasin_Type+"' AND Taille='"+Magasin_Taille+"' AND CAjour='"+Chiffre_Affaire+"';";
        con.query(sql2, function (err2, result2) {
          if (err2) alert(err2);
          else {
            LocID = result2[0].ID;
            alert("Select ID effectué : "+LocID);
            var sql3 = "INSERT INTO AccToLoc(AccID,LocID) VALUES ('"+Account_ID+"','"+LocID+"');";
            con.query(sql3, function (err3, result3) {
              if (err3) alert(err3);
              else {
                alert("Le magasin "+Magasin_Name+" a été créée !");
                var sql4 = "UPDATE Account SET First_registration=1 WHERE ID=1;";
                con.query(sql4, function (err4, result4) {
                  if (err4) alert(err4);
                  else {
                    alert("Requete Valide : Update Validate");
                  }
                });
              }
            });
          }
        });
    }
  });
  
  
  
  
  document.getElementById("container").style.display ="none";
  document.getElementById("container2").style.display ="block";
}

    

