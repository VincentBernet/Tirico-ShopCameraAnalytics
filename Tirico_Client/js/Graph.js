var Chart = require('chart.js');
var values = null;

var con;

function addDays(date, days) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + days,
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    );
}

var Graphe_Label = [];
var datas = [];
var datas_ventes = [];
var titre = [];
var datas_CA = [];

function Button_Time() {
    const RefreshBtn = document.getElementById('refresh_button')
    RefreshBtn.addEventListener('click', (event) => {
        Data_ForSearching();
    })

    const go_Btn = document.getElementById('go_datebutton')
    go_Btn.addEventListener('click', (event) => {
        Data_ForSearching();
    })


    const DailyBtn = document.getElementById('Daily')
    DailyBtn.addEventListener('click', (event) => {
        Data_ForToday();
    })


    const magasinBtn = document.getElementById('magasinSelect')
    magasinBtn.addEventListener('change', (event) => {
        Data_ForToday();
    })

    const BAndWBtn = document.getElementById('whiteblack')
    BAndWBtn.addEventListener('click', (event) => {
        Data_ForSearching();
    })

    const WeeklyBtn = document.getElementById('Weekly')
    WeeklyBtn.addEventListener('click', (event) => {
        Data_ForWeekly();
    })


    const MonthlyBtn = document.getElementById('Monthly')
    MonthlyBtn.addEventListener('click', (event) => {
        Data_ForMonthly();
    })
}

function set_BoxDateBefore(A_yyyy, A_mm, A_dd) {
    var dateControl = document.getElementById('start');
    dateControl.value = A_yyyy + '-' + A_mm + '-' + A_dd;
}

function set_BoxDateNow(yyyy, mm, dd) {
    var dateControl = document.getElementById('end');
    dateControl.value = yyyy + '-' + mm + '-' + dd;
}

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

// La date d'aujourd'hui
var Now;
// La date jusqu'a ce que l'on veut
var DateBefore;

// String de la date now
var Req_Now;
// String de la date d'avant
var Req_Before;

function SetNow() {
    Now = new Date(2020,10,15);
    var dd = String(Now.getDate()).padStart(2, '0');
    var mm = String (Now.getMonth() + 1).padStart(2, '0');
    var yyyy = String (Now.getFullYear());

    Req_Now = yyyy + '-' + mm + '-' + dd + ' ' + Now.getHours() + ':' + Now.getMinutes() + ':' + Now.getSeconds();
    set_BoxDateNow(yyyy, mm, dd);
}

function SetBefore(value) {
    DateBefore = Now;
    DateBefore = addDays(DateBefore, value);
    
    var A_dd = String(DateBefore.getDate()).padStart(2, '0');
    var A_mm = String(DateBefore.getMonth() + 1).padStart(2, '0');
    var A_yyyy = String(DateBefore.getFullYear());

    Req_Before = A_yyyy + '-' + A_mm + '-' + A_dd + ' ' + DateBefore.getHours() + ':' + DateBefore.getMinutes() + ':' + DateBefore.getSeconds();
    set_BoxDateBefore(A_yyyy, A_mm, A_dd);
}

function Show_Graph() {
    Affluence_LineGraph();
    CA_BarGraph();
    MakeVenteLineGraph();
    MakeBarVente();
    MakeAraignee();
    MakeCercle();
}

function Data_ForToday()
{
    SetNow();
    SetBefore(-1);

    Get_Datas("NombreDePassage, NbVente, CAh").then(function(dat) {
        dat.forEach(function(item, index, array) 
        {
            Graphe_Label.push(item.DateTime.getHours() + 'h');
            datas.push(item.NombreDePassage);
            datas_ventes.push(item.NbVente);
            datas_CA.push(item.CAh);
        })
        titre[0] = "Affluence client par jour";
        titre[1] = "Nombre de produits vendus par jour";
        titre[2] = "Chiffre d'affaires par jour";
        Show_Graph();
    }).catch((err) => setImmediate(() => { throw err; }));
}

function Data_ForWeekly() {
    SetNow();
    SetBefore(-7);

    Get_Datas("NombreDePassage").then(function(dat) {
        var dernierJour = dat[0].DateTime.getDate();
        var moyenne = 0;
        var nb = 0;
        var semaine = [];
        // Est -ce qu'on doit pas enlever cette ligne ?
        //semaine.push(dat[0].DateTime.getDate() + '/' + (dat[0].DateTime.getMonth() + 1))
        dat.forEach(function(item, index, array) 
        {
            var jour = item.DateTime.getDate();
            if (jour == dernierJour)
            {
                moyenne = moyenne + item.NombreDePassage;
                nb = nb + 1;
            }
            if (jour != dernierJour)
            {
                semaine.push(item.DateTime.getDate() + '/' + (item.DateTime.getMonth() + 1));
                datas.push(moyenne / nb);
                moyenne = 0;
                nb = 0;
            }
            dernierJour = jour;
        })
        Graphe_Label = semaine;
        titre[0] = 'Affluence client par semaine';
        Show_Graph();
    }).catch((err) => setImmediate(() => { throw err; }));

    Get_Datas("NbVente").then(function(dat) {
        
        var dernierJour = dat[0].DateTime.getDate();
        var moyenne = 0;
        var nb = 0;
        var semaine = [];
        dat.forEach(function(item, index, array) 
        {
            var jour = item.DateTime.getDate();
            if (jour == dernierJour)
            {
                moyenne = moyenne + item.NbVente;
                nb = nb + 1;
            }
            if (jour != dernierJour)
            {
                semaine.push(item.DateTime.getDate() + '/' + (item.DateTime.getMonth() + 1));
                datas_ventes.push(moyenne / nb);
                moyenne = 0;
                nb = 0;
            }
            dernierJour = jour;
        })
        titre[1] = 'nombre de produits vendus par semaine';
        Show_Graph();
    }).catch((err) => setImmediate(() => { throw err; }));

    Get_Datas("CAh").then(function(dat) {
        var dernierJour = dat[0].DateTime.getDate();
        var moyenne = 0;
        var nb = 0;
        var semaine = [];
        //semaine.push(dat[0].DateTime.getDate() + '/' + (dat[0].DateTime.getMonth() + 1))
        dat.forEach(function(item, index, array) 
        {
            var jour = item.DateTime.getDate();
            if (jour == dernierJour)
            {
                moyenne = moyenne + item.CAh;
                nb = nb + 1;
            }
            if (jour != dernierJour)
            {
                semaine.push(item.DateTime.getDate() + '/' + (item.DateTime.getMonth() + 1));
                datas_CA.push(moyenne / nb);
                moyenne = 0;
                nb = 0;
            }
            dernierJour = jour;
        })
        titre[2] = "Moyenne du chiffres d'affaires par mois";
        Show_Graph();
    }).catch((err) => setImmediate(() => { throw err; }));
}

function Data_ForMonthly() {
    SetNow();
    SetBefore(-30);

    Get_Datas("NombreDePassage").then(function(dat) {
        var dernierJour = dat[0].DateTime.getDate();
        var moyenne = 0;
        var nb = 0;
        var semaine = [];
        //semaine.push(dat[0].DateTime.getDate() + '/' + (dat[0].DateTime.getMonth() + 1))
        dat.forEach(function(item, index, array) 
        {
            var jour = item.DateTime.getDate();
            if (jour == dernierJour)
            {
                moyenne = moyenne + item.NombreDePassage;
                nb = nb + 1;
            }
            if (jour != dernierJour)
            {
                semaine.push(item.DateTime.getDate() + '/' + (item.DateTime.getMonth() + 1));
                datas.push(moyenne / nb);
                moyenne = 0;
                nb = 0;
            }
            dernierJour = jour;
        })
        Graphe_Label = semaine;
        titre[0] = 'Affluence client par mois';
        Show_Graph();
    }).catch((err) => setImmediate(() => { throw err; }));

    Get_Datas("NbVente").then(function(dat) {
        var dernierJour = dat[0].DateTime.getDate();
        var moyenne = 0;
        var nb = 0;
        var semaine = [];
        //semaine.push(dat[0].DateTime.getDate() + '/' + (dat[0].DateTime.getMonth() + 1))
        dat.forEach(function(item, index, array) 
        {
            var jour = item.DateTime.getDate();
            if (jour == dernierJour)
            {
                moyenne = moyenne + item.NbVente;
                nb = nb + 1;
            }
            if (jour != dernierJour)
            {
                semaine.push(item.DateTime.getDate() + '/' + (item.DateTime.getMonth() + 1));
                datas_ventes.push(moyenne / nb);
                moyenne = 0;
                nb = 0;
            }
            dernierJour = jour;
        })
        titre[1] = 'nombre de produits vendus par mois';
        Show_Graph();
    }).catch((err) => setImmediate(() => { throw err; }));

    Get_Datas("CAh").then(function(dat) {
        var dernierJour = dat[0].DateTime.getDate();
        var moyenne = 0;
        var nb = 0;
        var semaine = [];
        //semaine.push(dat[0].DateTime.getDate() + '/' + (dat[0].DateTime.getMonth() + 1))
        dat.forEach(function(item, index, array) 
        {
            var jour = item.DateTime.getDate();
            if (jour == dernierJour)
            {
                moyenne = moyenne + item.CAh;
                nb = nb + 1;
            }
            if (jour != dernierJour)
            {
                semaine.push(item.DateTime.getDate() + '/' + (item.DateTime.getMonth() + 1));
                datas_CA.push(moyenne / nb);
                moyenne = 0;
                nb = 0;
            }
            dernierJour = jour;
        })
        titre[2] = "Moyenne du chiffres d'affaires par mois";
        Show_Graph();
    }).catch((err) => setImmediate(() => { throw err; }));
}

function Data_ForSearching() {
    var dateControlStart = document.getElementById('start');

    var dateControlEnd = document.getElementById('end');

    Now = new Date(dateControlEnd.value);
    var dd = String(Now.getDate()).padStart(2, '0');
    var mm = String(Now.getMonth() + 1).padStart(2, '0');
    var yyyy = String(Now.getFullYear());

    Req_Now = yyyy + '-' + mm + '-' + dd + ' ' + Now.getHours() + ':' + Now.getMinutes() + ':' + Now.getSeconds();

    DateBefore = new Date(dateControlStart.value);

    var A_dd = String(DateBefore.getDate()).padStart(2, '0');
    var A_mm = String(DateBefore.getMonth() + 1).padStart(2, '0');
    var A_yyyy = String(DateBefore.getFullYear());

    Req_Before = A_yyyy + '-' + A_mm + '-' + A_dd + ' ' + DateBefore.getHours() + ':' + DateBefore.getMinutes() + ':' + DateBefore.getSeconds();

    
    Get_Datas("NombreDePassage").then(function(dat) {
        var dernierJour = dat[0].DateTime.getDate();
        var moyenne = 0;
        var nb = 0;
        var semaine = [];
        //semaine.push(dat[0].DateTime.getDate() + '/' + (dat[0].DateTime.getMonth() + 1))
        dat.forEach(function(item, index, array) 
        {
            var jour = item.DateTime.getDate();
            if (jour == dernierJour)
            {
                moyenne = moyenne + item.NombreDePassage;
                nb = nb + 1;
            }
            if (jour != dernierJour)
            {
                semaine.push(item.DateTime.getDate() + '/' + (item.DateTime.getMonth() + 1));
                datas.push(moyenne / nb);
                nb = 0;
                moyenne = 0;
            }
            dernierJour = jour;
        })
        Graphe_Label = semaine;
        titre[0] = 'Affluence client';
        Show_Graph();
    }).catch((err) => setImmediate(() => { throw err; }));


    Get_Datas("NbVente").then(function(dat) {
        var dernierJour = dat[0].DateTime.getDate();
        var moyenne = 0;
        var nb = 0;
        var semaine = [];
        //semaine.push(dat[0].DateTime.getDate() + '/' + (dat[0].DateTime.getMonth() + 1))
        dat.forEach(function(item, index, array) 
        {
            var jour = item.DateTime.getDate();
            if (jour == dernierJour)
            {
                moyenne = moyenne + item.NbVente;
                nb = nb + 1;
            }
            if (jour != dernierJour)
            {
                semaine.push(item.DateTime.getDate() + '/' + (item.DateTime.getMonth() + 1));
                datas_ventes.push(moyenne / nb);
                nb = 0;
                moyenne = 0;
            }
            dernierJour = jour;
        })
        Graphe_Label_Vente = semaine;
        titre[1] = 'nombre de produits vendus';
        Show_Graph();
    }).catch((err) => setImmediate(() => { throw err; }));

    Get_Datas("CAh").then(function(dat) {
        var dernierJour = dat[0].DateTime.getDate();
        var moyenne = 0;
        var nb = 0;
        var semaine = [];
        //semaine.push(dat[0].DateTime.getDate() + '/' + (dat[0].DateTime.getMonth() + 1))
        dat.forEach(function(item, index, array) 
        {
            var jour = item.DateTime.getDate();
            if (jour == dernierJour)
            {
                moyenne = moyenne + item.CAh;
                nb = nb + 1;
            }
            if (jour != dernierJour)
            {
                semaine.push(item.DateTime.getDate() + '/' + (item.DateTime.getMonth() + 1));
                datas_CA.push(moyenne / nb);
                moyenne = 0;
                nb = 0;
            }
            dernierJour = jour;
        })
        titre[2] = "Moyenne du chiffres d'affaires";
        Show_Graph();
    }).catch((err) => setImmediate(() => { throw err; }));
}

var ctx;
var data;
var options;
var config;
var graph;

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

var graph1;
function Affluence_LineGraph() {
    if (graph1 != null)
    {
        graph1.destroy();
    }

    console.log(datas.length);
    ctx = document.getElementById('Vente').getContext('2d')

    data = {
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: '#2d9ae0',
            borderColor: '#2d9ae0',
            data: datas,
            label: "Personne"
        }]
    };
    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '18',
            fontFamily: 'Tahoma',
            fontColor: colorTitre,
            fontStyle: 'bold',
            padding: '0',
            lineHeight: '1.5',
            text: titre[0]
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
}
var colorTitre = '#fff';
var graph2; 
function CA_BarGraph()
{
    if (graph2 != null)
    {
        graph2.destroy();
    }
    ctx = document.getElementById('graph5').getContext('2d')
    data = {
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: '#FFC300',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            borderColor: 'rgb(255, 99, 132)',
            label: "Chiffre d'affaires en euros (€)",
            data: datas_CA
        }]
    };
    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '18',
            fontFamily: 'Tahoma',
            fontColor: colorTitre,
            fontStyle: 'bold',
            padding: '0',
            lineHeight: '1.5',
            text: titre[2],
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


var graphVente;
function MakeVenteLineGraph() {
    if (graphVente != null)
    {
        graphVente.destroy();
    }
    ctx = document.getElementById('graph3').getContext('2d')

    data = {
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: '#900C3F',
            data: datas_ventes,
            label: "Vente"
        }]
    };
    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '18',
            fontFamily: 'Tahoma',
            fontColor: colorTitre,
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: titre[1]
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        }
    };

    graphVente = new Chart(ctx, {
        type: 'line',
        data: data,
        options : options
    });
}

var graphVenteBar; 
function MakeBarVente()
{
    if (graphVenteBar != null)
    {
        graphVenteBar.destroy();
    }
    ctx = document.getElementById('graph6').getContext('2d')

    data = {
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: '#2d9ae0',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            borderColor: 'rgb(255, 99, 132)',
            label: 'Nombre de personne',
            data: datas
        },
        {
            backgroundColor: '#900C3F',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            borderColor: 'rgb(255, 99, 132)',
            label: 'Nombre de produits vendus',
            data: datas_ventes
        },
        {
            backgroundColor: '#FFC300',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            borderColor: 'rgb(255, 99, 132)',
            label: "Chiffre d'affaires",
            data: datas_CA
        }
    ]
    };
    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '18',
            fontFamily: 'Tahoma',
            fontColor: colorTitre,
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: "Every  graphics together",
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        }
    };
    graphVenteBar = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

var graph5;
function MakeCercle() {

    var t = [];
    datas.forEach(function(item, index, array) {
        t.push('rgb(' + Math.random() * 255 + ', ' + Math.random() * 255 + ', ' + Math.random() * 255 + ')');
    })


    if (graph5 != null)
    {
        graph5.destroy();
    }
    ctx = document.getElementById('graph2').getContext('2d')

    data = {
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: t,
            borderColor: '#0000',
            data: datas
        }]
    }

    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '18',
            fontFamily: 'Tahoma',
            fontColor: colorTitre,
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: titre[0]
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        }
    }

    graph5 = new Chart(ctx, {
    type: 'polarArea',
    data: data,
    options: options
});
}

var graph6;
function MakeAraignee() 
{
    if (graph6 != null)
    {
        graph6.destroy();
    }
    ctx = document.getElementById('graph4').getContext('2d')

    data = {
        label: 'Vente',
    labels: Graphe_Label,
    datasets: [{
        label: titre[0],
        backgroundColor: '#900C3F',
        borderColor: '#44061E',
        fill: true,
        pointBorderColor: '#fff',
        pointBackgroundColor: '#900C3F',
        data: datas
    }]
}
    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '18',
            fontFamily: 'Tahoma',
            fontColor: colorTitre,
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: titre[1]
        },
            animation: {
                duration: 1000,
                easing: 'easeInQuad'
            },
            scale: {
            }
        }

    graph6 = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });

}
