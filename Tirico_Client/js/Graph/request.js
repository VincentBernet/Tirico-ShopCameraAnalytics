function ConnectToDatabase() {
    var mysql = require('mysql');

    con = mysql.createConnection({
        host: "mysql-pa8.alwaysdata.net",
        user: "pa8_acc",
        password: "5wtE3Cx8W",
        database: "pa8_bddv2"
    });

    con.connect(function(err) {
        if (err) throw err;
        else console.log("Connected to the DB : From Graph.js");

    });
    
    var sql = "SELECT IdAcc, IdLoc FROM AccToLoc";
    con.query(sql, function (err, result) {
        
        if (err) throw err;
        else {
            values = result;
            window.setTimeout(Data_ForToday, 250);
        }
    });
}



function Get_Datas(Data) 
{
    datas = [];
    Graphe_Label = [];
    datas_ventes = [];
    datas_CA = [];

    return new Promise(function(resolve, reject) {
        //var req = "SELECT " + Data + ", DateTime FROM Stats JOIN StatsToLoc on Stats.ID = StatsToLoc.IDStats WHERE IDLoc = 1 AND DateTime BETWEEN '" + Req_Before + "' AND '" + Req_Now + "'";
        console.log(document.getElementById("magasinSelect").selectedIndex);
        var req = "SELECT " + Data + ", DateTime FROM Stats JOIN StatsToLoc on Stats.ID = StatsToLoc.IDStats WHERE IDLoc = " + numId[document.getElementById("magasinSelect").selectedIndex] + " AND DateTime BETWEEN '" + Req_Before + "' AND '" + Req_Now + "'";
        //var sql = "SELECT NombreDePassage FROM Stats JOIN StatsToLoc on Stats.ID = StatsToLoc.IDStats WHERE IDLoc = 1 AND DateTime BETWEEN '2020-06-29 00:00:00' AND '2020-06-29 10:00:00'";
        con.query(req, function (err, result) {
            if (err) return reject(err);
            else {
                values = result;
                resolve(values);
            }
        });
    })
    
}
