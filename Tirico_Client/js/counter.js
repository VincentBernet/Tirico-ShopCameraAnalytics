// We take back the paramater of the ID, we parse it cleany first

const urlDataCounter = window.location.search;
const urlParamsCounter = new URLSearchParams(urlDataCounter);
const Account_IDCounter = urlParamsCounter.get('ID');
const Account_NameCounter = urlParamsCounter.get('Name');
var mysql = require('mysql');
var CompteurAtm = "Nothing";

    con = mysql.createConnection({
        host: "mysql-pa8.alwaysdata.net",
        user: "pa8_acc",
        password: "5wtE3Cx8W",
        database: "pa8_bddv2"
    });

    con.connect(function(err) {
        if (err) throw err;
        else console.log("Connected to the DB from Counter");
    });
UpdateCompteur();

function UpdateCompteur() {
/* First SELECT IdLoc from foreign table AccToLoc WHERE IdAcc = Account_ID;
Then SELECT Ccap & Cpt FROM Local WHERE ID = IdLoc;*/

console.log("Updating ...");
var sql0 = "SELECT IdLoc FROM `AccToLoc` WHERE IdAcc = '"+Account_IDCounter+"'";
con.query(sql0, function (err0, result0) {
    if (err0) alert(err0);
    else
    {
        var LocalID = result0[0].IdLoc;
        //alert("Select working we have current LocalID: "+LocalID+"");
        var sql1 = "SELECT Ccap, Cpt FROM `Local` WHERE ID = '"+LocalID+"'";
        con.query(sql1, function (err1, result1) {
            if (err1) alert(err1);
            else
            {
                //alert("Select working we have current LocalID: "+LocalID+"");
                CompteurAtm = result1[0].Ccap;
                document.getElementById("container_Compteur").innerHTML=''+CompteurAtm+'';
                setTimeout(UpdateCompteur, 1000);
            }
        });
    }
});

}
