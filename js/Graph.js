var Chart = require('chart.js');
var values = null;

function ConnectToDatabase() {
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "mysql-pa8.alwaysdata.net",
        user: "pa8_acc",
        password: "5wtE3Cx8W",
        database: "pa8_bdd"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to the following DB : mysql-pa8.alwaysdata.net");
    });
    
    var sql = "SELECT AccID, LocID FROM AccToLoc";
    con.query(sql, function (err, result) {
        
        if (err) throw err;
        else {
            console.log("Welcome mister : "+result[0].Name);
            values = result;
            MakeGraphGreatAgain();
        }
    });
}




function MakeGraphGreatAgain() {
    var ctx = document.getElementById('Vente_Graph').getContext('2d')

        var data = {
            labels: ['Janvier', 'Février', 'Mars', 'Avril'],
            datasets: [{
                backgroundColor: 'rgb(144, 12, 63)',
                borderColor: '#00000',
                data: [10, 20, 30, 40, 20],
                label: "Technologique"
            },
            {
                backgroundColor: 'rgb(110, 110, 211)',
                data: [values[0].AccID, values[0].LocID, values[1].AccID, values[1].LocID],
                label: "Alimentaire"
            }]
        }

        var options = {
            title: {
                display: true,
                text: 'Ventes par produits'
            },
            animation: {
                duration: 1000,
                easing: 'easeInQuad'
            }
        }

        var config = {
            type : 'line',
            data: data,
            options: options
        }
        var graph1 = new Chart(ctx, config)
}





