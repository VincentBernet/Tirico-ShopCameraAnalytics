

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


var numId = [];
var magasinNom = [];
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
                        var x = document.getElementById("magasinSelect");
                        var option = document.createElement("option");
                        option.text = result1[0].Nom;
                        option.id = result1[0].ID;
                        numId.push(option.id);
                        magasinNom.push(option.text);
                        console.log(numId[i]);
                        x.add(option);
                    }
                });
            }
        }
    }});