






// Redirection Index ou Inscript
document.getElementById("redirect_Analyse").addEventListener("click", function() {
    window.location.href="analyse.html?Name="+Account_Name+"&ID="+Account_ID+"";
});
document.getElementById("redirect_Dashboard").addEventListener("click", function() {
    window.location.href="index.html?Name="+Account_Name+"&ID="+Account_ID+"";
});
document.getElementById("redirect_Disconnection").addEventListener("click", function() {
    window.location.href="connexion.html";
}); 

document.getElementById("redirect_InscriptionLoc").addEventListener("click", function() {
    window.location.href="inscription_loc.html?Name="+Account_Name+"&ID="+Account_ID+"";
}); 



