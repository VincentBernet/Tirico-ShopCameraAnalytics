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


var ctx;
var data;
var options;
var config;
var graph;


function MakeGraphGreatAgain() {

    if (graph != null)
        graph.destroy();

    ctx = document.getElementById('Vente_Graph').getContext('2d')

        data = {
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

        options = {
            title: {
                display: true,
                text: 'Ventes par produits'
            },
            animation: {
                //duration: 1000,
                easing: 'easeInQuad'
            }
        }

        config = {
            type : 'line',
            data: data,
            options: options
        }
        graph = new Chart(ctx, config)
}




function MakeBar()
{
    graph.destroy();

    ctx = document.getElementById('graph2').getContext('2d')

    data = {
        labels: ['Janvier', 'Février', 'label 3', 'label 4'],
        datasets: [{
            backgroundColor: 'rgb(110, 110, 211)',
            hoverBackgroundColor: '#000000',
            hoverBorderWidth: '#fff',
            borderColor: 'rgb(255, 99, 132)',
            data: [30, 150, 15, 40, 20]

        },
        {
            data: [60, 40, 30, 50],
            backgroundColor: 'rgb(144, 12, 63)',
            hoverBackgroundColor: '#000000',
        }]
    }

    options = {
        title: {
            display: true,
            text: 'Ventes par secteur'
        },
        animation: {
            //duration: 1000,
            easing: 'easeInQuad'
        }
    }
    graph = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}


function MakeAraignee() 
{
    graph.destroy();

    ctx = document.getElementById('graph4').getContext('2d')

    data = {
       labels: ['Red', 'Février', 'Marss'],
       datasets: [{
           backgroundColor: 'rgb(110, 205, 211)',
           data: [30, 30, 25]
       }]
   }

   options = {
        title: {
            display: true,
            text: 'Ventes par secteur'
        },
        animation: {
            //duration: 1000,
            easing: 'easeInQuad'
        },
        scale: {
            ticks: {
                suggestedMin: 15,
                suggestedMax: 50
            }
        }
    }

   graph = new Chart(ctx, {
   type: 'radar',
   data: data,
   options: options
   });

}

function MakeCercle() {
    
    graph.destroy();

    ctx = document.getElementById('graph3').getContext('2d')


    data = {
        labels: ['Red', 'Février', 'Marss'],
        datasets: [{
            backgroundColor: 'rgb(144, 12, 63)',
            borderColor: 'rgb(255, 99, 132)',
            data: [30, 150, 15, 40, 20]

        }]
    }

    options = {
        title: {
            display: true,
            text: 'Ventes par secteur'
        },
        animation: {
            //duration: 1000,
            easing: 'easeInQuad'
        }
    }

    graph = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
});
}

function updateGraph() {
    if (graph != null)
        graph.update();
}