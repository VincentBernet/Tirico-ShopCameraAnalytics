var Chart = require('chart.js');
var values = null;



var con;



function ConnectToDatabase() {
    var mysql = require('mysql');

    con = mysql.createConnection({
        host: "mysql-pa8.alwaysdata.net",
        user: "pa8_acc",
        password: "5wtE3Cx8W",
        database: "pa8_bdd"
    });

    con.connect(function(err) {
        if (err) throw err;
        else console.log("Welcome mister : "+Account_Name);

    });
    
    var sql = "SELECT AccID, LocID FROM AccToLoc";
    con.query(sql, function (err, result) {
        
        if (err) throw err;
        else {
            //alert(result[10].AccID);
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


/*

ARCHITECTURE


*/


// Appeler cette fonction à chaque fois qu'on appuie un bouton : TODAY, WEEKLY, MONTHLY
function RetrieveDatas(lapsOfTime)
{
    switch (lapsOfTime) {
        case 'Today':
            Affluence_Today();
            Ventes_Today();
            Time_Today();
            break;
        case 'Weekly':
            Affluence_Weekly();
            Ventes_Weekly();
            Time_Weekly();
            break;
        case 'Monthly':
            Affluence_Monthly();
            Ventes_Monthly();
            Time_Monthly();
            break;
        default:
            console.log('Sorry there is an error');
    }
}

function Affluence_Today() 
{
    // SELECT DANS LA DATABASE : STRING
    // CON QUERY
    // - RESULT


    // L'ID (la fenetre ou affiché sera toujours la même donc même ID pour les 3).
    // On fait le graphe : on aura 12 parametres à mettre vu que c'est de 8h à 20h.
}
function Affluence_Weekly() 
{

}
function Affluence_Monthly() 
{

}

function Ventes_Today()
{

}
function Ventes_Weekly()
{

}
function Ventes_Monthly()
{

}

function Time_Today()
{

}
function Time_Weekly()
{

}
function Time_Monthly()
{

}

function RetrieveAllDatas() {
    // On doit récupérer toutes les données
    // results[0].DateTime.getHours() == 11h
    // results[0].NombreDePassage == 52
    // ...
    // results[12]...

    // ça fait 12 lignes à faire pour les jours de 8h à 20h
    // 4 lignes pour les semaines.
    // 12 pour les mois.
}


function MakeLineGraph() {

    var graph1;

    ctx = document.getElementById('Vente').getContext('2d')

    data = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril','Mai'],
        datasets: [{
            backgroundColor: 'rgba(45, 154, 224, 0.35)',
            borderColor: '#2d9ae0',
            data: [10, 50, 40, 25, 20],
            label: "Technologique"
        },
        {
            backgroundColor: 'rgba(114, 112, 180, 0.35)',
            borderColor: '7270b4',
            data: [40, 30, 70, 60, 54],
            label: "Alimentaire"
        }]
    };
    console.log("1");
    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '15',
            fontFamily: 'Tahoma',
            fontColor: '#FFFFFF',
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: 'Evolution Mensuel'
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        }
    };

    graph1 = new Chart(ctx, {
        type: 'line',
        data: data,
        options : options
    });
    console.log("2");
}

function RetrieveAffluence()
{
    var sql = "SELECT DateTime, NombreDePassage FROM Stats";
    con.query(sql, function (err, result) {
        
        if (err) throw err;
        else {
            //alert(result[10].AccID);
            values = result;
            MakeBar();
        }
    });
}
function MakeBar()
{
    var graph2;
    console.log("yeess");
    ctx = document.getElementById('graph2').getContext('2d')
    //
    data = {
        //labels: [values[0].DateTime, values[1].DateTime, values[2].DateTime, values[3].DateTime, values[4].DateTime, values[5].DateTime, values[6].DateTime, values[7].DateTime, values[8].DateTime, values[9].DateTime, values[10].DateTime],
        labels: ['8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h'],
        datasets: [{
            backgroundColor: '#2d9ae0',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            borderColor: 'rgb(255, 99, 132)',
            label: "Affluence/heure",
            //data: [values[0].NombreDePassage, values[1].NombreDePassage, values[2].NombreDePassage, values[3].NombreDePassage, values[4].NombreDePassage, values[5].NombreDePassage, values[6].NombreDePassage, values[7].NombreDePassage, values[8].NombreDePassage, values[9].NombreDePassage, values[10].NombreDePassage]
            data: [5, 4, 8, 15, 5, 23, 34, 56, 44, 40, 35]
        }]
    };
    console.log("ddd");
    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '15',
            fontFamily: 'Tahoma',
            fontColor: '#FFFFFF',
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: 'Affluence'
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        }
    };
    graph2 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}



function MakeCercle() {
    
    var graph3;

    ctx = document.getElementById('graph3').getContext('2d')


    data = {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [{
            backgroundColor: '#2d9ae0',
            borderColor: '#0000',
            data: [30, 40, 60, 30, 70, 120, 0]
        }]
    }

    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '15',
            fontFamily: 'Tahoma',
            fontColor: '#FFFFFF',
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: 'Affluence par Semaine : Magasin de '+''+''
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        }
    }

    graph3 = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
});
}


function MakeAraignee() 
{
    var graph4;

    ctx = document.getElementById('graph4').getContext('2d')

    data = {
        lable: 'salut',
    labels: ['Red', 'Février', 'Marss'],
    datasets: [{
        backgroundColor: '#2d9ae0',
        data: [30, 30, 25]
    }]
}

    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '15',
            fontFamily: 'Tahoma',
            fontColor: '#FFFFFF',
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: 'Ventes par mois'
        },
            animation: {
                duration: 1000,
                easing: 'easeInQuad'
            },
            scale: {
                ticks: {
                    suggestedMin: 15,
                    suggestedMax: 35
                }
            }
        }

    graph4 = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });

}


function updateGraph() {
    if (graph != null)
        graph.update();
}