var Chart = require('chart.js');
var values = null;

var con;


var Now;
var DateBefore;


var Req_Now;
var Req_Before;


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
var Graphe_Label_Vente = [];
var titre = [];

function Button_Time() {
    const RefreshBtn = document.getElementById('refresh_button')
    RefreshBtn.addEventListener('click', (event) => {
        updateGraph();
    })
    const go_Btn = document.getElementById('go_datebutton')
    go_Btn.addEventListener('click', (event) => {
        var dateControlStart = document.getElementById('start');
        console.log(dateControlStart.value);

        var dateControlEnd = document.getElementById('end');
        console.log(dateControlEnd.value);

        Now = new Date(dateControlEnd.value);
        console.log(Now);
        var dd = String(Now.getDate()).padStart(2, '0');
        var mm = String(Now.getMonth() + 1).padStart(2, '0');
        var yyyy = String(Now.getFullYear());

        Req_Now = yyyy + '-' + mm + '-' + dd + ' ' + Now.getHours() + ':' + Now.getMinutes() + ':' + Now.getSeconds();

        DateBefore = new Date(dateControlStart.value);
        console.log(DateBefore);

        var A_dd = String(DateBefore.getDate()).padStart(2, '0');
        var A_mm = String(DateBefore.getMonth() + 1).padStart(2, '0');
        var A_yyyy = String(DateBefore.getFullYear());

        Req_Before = A_yyyy + '-' + A_mm + '-' + A_dd + ' ' + DateBefore.getHours() + ':' + DateBefore.getMinutes() + ':' + DateBefore.getSeconds();

        set_BoxDate(A_yyyy, A_mm, A_dd, yyyy, mm, dd);


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
            titre[0] = 'Affluence par mois';
            MakeLineGraph();
            MakeBar();
        }).catch((err) => setImmediate(() => { throw err; }));


        Get_Datas("NbVente").then(function(dat) {
            console.log(dat);
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
            titre[1] = 'Vente par mois';
            MakeVenteLineGraph();
            MakeBarVente();
            MakeAraignee();
            MakeCercle();
        }).catch((err) => setImmediate(() => { throw err; }));
    })


    const DailyBtn = document.getElementById('Daily')
    DailyBtn.addEventListener('click', (event) => {
        Now = new Date(2020,10,15);
        var dd = String(Now.getDate()).padStart(2, '0');
        var mm = String (Now.getMonth() + 1).padStart(2, '0');
        var yyyy = String (Now.getFullYear());

        Req_Now = yyyy + '-' + mm + '-' + dd + ' ' + Now.getHours() + ':' + Now.getMinutes() + ':' + Now.getSeconds();

        DateBefore = Now;
        DateBefore = addDays(DateBefore, -1);
        
        var A_dd = String(DateBefore.getDate()).padStart(2, '0');
        var A_mm = String (DateBefore.getMonth() + 1).padStart(2, '0');
        var A_yyyy = String (DateBefore.getFullYear());

        Req_Before = A_yyyy + '-' + A_mm + '-' + A_dd + ' ' + DateBefore.getHours() + ':' + DateBefore.getMinutes() + ':' + DateBefore.getSeconds();

        set_BoxDate(A_yyyy, A_mm, A_dd, yyyy, mm, dd);

        Get_Datas("NombreDePassage").then(function(dat) {
            dat.forEach(function(item, index, array) 
            {
                datas.push(item.NombreDePassage);
                Graphe_Label.push(item.DateTime.getHours() + 'h');
            })
            titre[0] = "Affluence par jour";
            MakeLineGraph();
            MakeBar();
        }).catch((err) => setImmediate(() => { throw err; }));

        Get_Datas("NbVente").then(function(dat) {
            dat.forEach(function(item, index, array) 
            {
                datas_ventes.push(item.NbVente);
                Graphe_Label_Vente.push(item.DateTime.getHours() + 'h');
            })
            titre[1] = "Vente par jour";
            MakeVenteLineGraph();
            MakeBarVente();
            MakeAraignee();
            MakeCercle();
        }).catch((err) => setImmediate(() => { throw err; }));
    })

    const WeeklyBtn = document.getElementById('Weekly')
    WeeklyBtn.addEventListener('click', (event) => {
        Now = new Date(2020,10,15);
        var dd = String(Now.getDate()).padStart(2, '0');
        var mm = String (Now.getMonth() + 1).padStart(2, '0');
        var yyyy = String (Now.getFullYear());

        Req_Now = yyyy + '-' + mm + '-' + dd + ' ' + Now.getHours() + ':' + Now.getMinutes() + ':' + Now.getSeconds();

        DateBefore = Now;
        DateBefore = addDays(DateBefore, -7);

        var A_dd = String(DateBefore.getDate()).padStart(2, '0');
        var A_mm = String (DateBefore.getMonth() + 1).padStart(2, '0');
        var A_yyyy = String (DateBefore.getFullYear());

        Req_Before = A_yyyy + '-' + A_mm + '-' + A_dd + ' ' + DateBefore.getHours() + ':' + DateBefore.getMinutes() + ':' + DateBefore.getSeconds();
        
        set_BoxDate(A_yyyy, A_mm, A_dd, yyyy, mm, dd);


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
            titre[0] = 'Affluence par semaine';
            MakeLineGraph();
            MakeBar();
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
                    console.log(moyenne);
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
            Graphe_Label_Vente = semaine;
            titre[1] = 'Vente par semaine';
            MakeVenteLineGraph();
            MakeBarVente();
            MakeAraignee();
            MakeCercle();
        }).catch((err) => setImmediate(() => { throw err; }));
    })


    const MonthlyBtn = document.getElementById('Monthly')
    MonthlyBtn.addEventListener('click', (event) => {
        Now = new Date(2020,10,15);
        var dd = String(Now.getDate()).padStart(2, '0');
        var mm = String (Now.getMonth() + 1).padStart(2, '0');
        var yyyy = String (Now.getFullYear());

        Req_Now = yyyy + '-' + mm + '-' + dd + ' ' + Now.getHours() + ':' + Now.getMinutes() + ':' + Now.getSeconds();

        DateBefore = Now;
        DateBefore = addDays(DateBefore, -30);

        var A_dd = String(DateBefore.getDate()).padStart(2, '0');
        var A_mm = String(DateBefore.getMonth() + 1).padStart(2, '0');
        var A_yyyy = String(DateBefore.getFullYear());

        Req_Before = A_yyyy + '-' + A_mm + '-' + A_dd + ' ' + DateBefore.getHours() + ':' + DateBefore.getMinutes() + ':' + DateBefore.getSeconds();

        set_BoxDate(A_yyyy, A_mm, A_dd, yyyy, mm, dd);


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
            titre[0] = 'Affluence par mois';
            MakeLineGraph();
            MakeBar();
        }).catch((err) => setImmediate(() => { throw err; }));


        Get_Datas("NbVente").then(function(dat) {
            console.log(dat);
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
            Graphe_Label_Vente = semaine;
            titre[1] = 'Vente par mois';
            MakeVenteLineGraph();
            MakeBarVente();
            MakeAraignee();
            MakeCercle();
        }).catch((err) => setImmediate(() => { throw err; }));
    })
}
function set_BoxDate(A_yyyy, A_mm, A_dd, yyyy, mm, dd)
    {
        var dateControl = document.getElementById('start');
        dateControl.value = A_yyyy + '-' + A_mm + '-' + A_dd;

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
        }
    });
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
    Graphe_Label_Vente = [];

    return new Promise(function(resolve, reject) {
        var req = "SELECT " + Data + ", DateTime FROM Stats JOIN StatsToLoc on Stats.ID = StatsToLoc.IDStats WHERE IDLoc = 1 AND DateTime BETWEEN '" + Req_Before + "' AND '" + Req_Now + "'";
        console.log("Request : " + req);
        //var sql = "SELECT NombreDePassage FROM Stats JOIN StatsToLoc on Stats.ID = StatsToLoc.IDStats WHERE IDLoc = 1 AND DateTime BETWEEN '2020-06-29 00:00:00' AND '2020-06-29 10:00:00'";
        con.query(req, function (err, result) {
            if (err) return reject(err);
            else {
                values = result;
                console.log("Renvoie " + datas.length);
                resolve(values);
            }
        });
    })
    
}


function filter_list(l) {
    return l.filter(Int => typeof Int === "number");
}
console.log(filter_list([1,2,'a','b']))

var graph1;
var test = new Array(5,10,16,18,10,5);


function MakeLineGraph() {
    if (graph1 != null)
    {
        graph1.destroy();
    }

    console.log(datas.length);
    ctx = document.getElementById('Vente').getContext('2d')

    data = {
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: 'rgba(45, 154, 224, 0.35)',
            borderColor: '#2d9ae0',
            data: datas,
            label: "Personne"
        }]
    };
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
var graph2; 
function MakeBar()
{
    if (graph2 != null)
    {
        graph2.destroy();
    }
    ctx = document.getElementById('graph2').getContext('2d')
    //
    data = {
        //labels: [values[0].DateTime, values[1].DateTime, values[2].DateTime, values[3].DateTime, values[4].DateTime, values[5].DateTime, values[6].DateTime, values[7].DateTime, values[8].DateTime, values[9].DateTime, values[10].DateTime],
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: '#2d9ae0',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            borderColor: 'rgb(255, 99, 132)',
            label: "Affluence/heure",
            //data: [values[0].NombreDePassage, values[1].NombreDePassage, values[2].NombreDePassage, values[3].NombreDePassage, values[4].NombreDePassage, values[5].NombreDePassage, values[6].NombreDePassage, values[7].NombreDePassage, values[8].NombreDePassage, values[9].NombreDePassage, values[10].NombreDePassage]
            data: datas
        }]
    };
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
            text: titre[0],
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
            backgroundColor: 'rgba(45, 154, 224, 0.35)',
            borderColor: '#2d9ae0',
            data: datas_ventes,
            label: "Vente"
        }]
    };
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
    ctx = document.getElementById('graph4').getContext('2d')
    //
    data = {
        //labels: [values[0].DateTime, values[1].DateTime, values[2].DateTime, values[3].DateTime, values[4].DateTime, values[5].DateTime, values[6].DateTime, values[7].DateTime, values[8].DateTime, values[9].DateTime, values[10].DateTime],
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: '#2d9ae0',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            borderColor: 'rgb(255, 99, 132)',
            label: 'Vente Bar',
            //data: [values[0].NombreDePassage, values[1].NombreDePassage, values[2].NombreDePassage, values[3].NombreDePassage, values[4].NombreDePassage, values[5].NombreDePassage, values[6].NombreDePassage, values[7].NombreDePassage, values[8].NombreDePassage, values[9].NombreDePassage, values[10].NombreDePassage]
            data: datas_ventes
        }]
    };
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
            text: titre[1],
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
    ctx = document.getElementById('graph5').getContext('2d')

    data = {
        labels: Graphe_Label_Vente,
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

    graph5 = new Chart(ctx, {
    type: 'doughnut',
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
    ctx = document.getElementById('graph6').getContext('2d')

    data = {
        label: 'Vente',
    labels: Graphe_Label_Vente,
    datasets: [{
        label: titre[0],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        borderColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        data: datas
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
            }
        }

    graph6 = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });

}


function updateGraph() {
    if (graph != null)
        graph.update();
    if (graph1 != null)
        graph1.update();
    if (graph2 != null)
        graph2.update();
}