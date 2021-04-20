var Chart = require('chart.js');

var Graphe_Label = [];
var datas = [];
var datas_ventes = [];
var titre = [];
var datas_CA = [];

var lastFunction;

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
        if (colorTitre === '#fff') 
            colorTitre = '#000000';
        else
            colorTitre = '#fff';
        
        lastFunction();
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


ConnectToDatabase();






function Data_ForToday()
{
    SetNow();
    SetBefore(-1);
    lastFunction = Data_ForToday;

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
    lastFunction = Data_ForWeekly;

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
        titre[1] = 'Nombre de produits vendus par semaine';
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
    lastFunction = Data_ForMonthly;

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
        titre[1] = 'Nombre de produits vendus par mois';
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
    lastFunction = Data_ForSearching;

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
        titre[1] = 'Nombre de produits vendus';
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
