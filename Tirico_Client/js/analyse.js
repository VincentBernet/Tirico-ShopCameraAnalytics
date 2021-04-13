
var mysql = require('mysql');

// Redirection Index ou Inscript

document.getElementById("redirect_Dashboard").addEventListener("click", function() {
    window.location.href="index.html?Name="+Account_Name+"&ID="+Account_ID+"";
});
document.getElementById("redirect_Parameter").addEventListener("click", function() {
    window.location.href="parametre.html?Name="+Account_Name+"&ID="+Account_ID+"";
});
document.getElementById("redirect_Disconnection").addEventListener("click", function() {
    window.location.href="connexion.html";
}); 

