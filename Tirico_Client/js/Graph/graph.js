var Chart = require('chart.js');

var Graphe_Label = [];
var datas = [];
var datas_ventes = [];
var titre = [];
var datas_CA = [];

var lastFunction;

var datas_magasin = new Array(30);


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
    const CommunSelect = document.getElementById('CommunSelect')
    CommunSelect.addEventListener('change', (event) => {
        console.log(CommunSelect.options[CommunSelect.selectedIndex].value);
        typeOfGraphicsCommun = CommunSelect.options[CommunSelect.selectedIndex].value;
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

var test = [];
var test1 = [5,2,1];
var test2 = [4,2,4,6];

var section = [0,0,0];
var donneesAff = [];
var donneesVentes = [];
var donneesCA = [];

for (var i = 0; i < 20; i++) {
    test1[i] = test2;
    test[i] = test1;
}



function Data_ForToday()
{
    Erase_Datas();

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
        titre[0] = "Affluence Client Journalière";
        titre[1] = "Nombre de produits Vendus Journalier";
        titre[2] = "Chiffre d'affaires Journalier";
        //Show_Graph();
    }).catch((err) => setImmediate(() => { throw err; }));
    
    getAllShopsForToday();
}



function Data_ForWeekly() {
    Erase_Datas();

    SetNow();
    SetBefore(-7);
    lastFunction = Data_ForWeekly;

    Get_Datas("NombreDePassage").then(function(dat) {
        var dernierJour = dat[0].DateTime.getDate();
        var moyenne = 0;
        var nb = 0;
        var semaine = [];
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
        titre[0] = 'Affluence client Hebdomadaire';
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
        titre[1] = 'Nombre de produits vendus Hebdomadaire';
    }).catch((err) => setImmediate(() => { throw err; }));

    Get_Datas("CAh").then(function(dat) {
        var dernierJour = dat[0].DateTime.getDate();
        var moyenne = 0;
        var nb = 0;
        var semaine = [];
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
        titre[2] = "Moyenne du chiffres d'affaires Mensuel";
    }).catch((err) => setImmediate(() => { throw err; }));

    getAllShops();
}

function Data_ForMonthly() {
    Erase_Datas();

    SetNow();
    SetBefore(-30);
    lastFunction = Data_ForMonthly;

    Get_Datas("NombreDePassage").then(function(dat) {
        var dernierJour = dat[0].DateTime.getDate();
        var moyenne = 0;
        var nb = 0;
        var semaine = [];
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
        titre[0] = 'Affluence client Mensuel';
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
        titre[1] = 'Nombre de produits vendus Hebdomadaire';
    }).catch((err) => setImmediate(() => { throw err; }));

    Get_Datas("CAh").then(function(dat) {
        var dernierJour = dat[0].DateTime.getDate();
        var moyenne = 0;
        var nb = 0;
        var semaine = [];
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
        titre[2] = "Moyenne du chiffres d'affaires Mensuel";
        Show_Graph();
    }).catch((err) => setImmediate(() => { throw err; }));


    console.log("Pour des questions de performance, les statistiques de magasin croisées sont retirés !");
    //getAllShops();
}

function Data_ForSearching() {
    Erase_Datas();


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
                nb = 0;
                moyenne = 0;
            }
            dernierJour = jour;
        })
        Graphe_Label_Vente = semaine;
        titre[1] = 'Nombre de produits vendus';
    }).catch((err) => setImmediate(() => { throw err; }));

    Get_Datas("CAh").then(function(dat) {
        var dernierJour = dat[0].DateTime.getDate();
        var moyenne = 0;
        var nb = 0;
        var semaine = [];
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
    }).catch((err) => setImmediate(() => { throw err; }));

    getAllShops();
}

async function getAllShopsForToday() {
    
    for (var k = 0; k < numId.length - 1; k++)
    {
        await Get_DatasFromShop("NombreDePassage, NbVente, CAh", numId[k]).then(function(dat) {
            donneesAff = [];
            donneesVentes = [];
            donneesCA = [];
            section = [];
            dat.forEach(function(item, index, array) 
            {
                var dernierJour = dat[0].DateTime.getDate();
                var moyenne = [0, 0, 0];
                
                dat.forEach(function(item, index, array) 
                {
                    donneesAff.push(item.NombreDePassage);
                    donneesVentes.push(item.NbVente);
                    donneesCA.push(item.CAh);
                })
            })
            section[0] = donneesAff;
            section[1] = donneesVentes;
            section[2] = donneesCA;
            datas_magasin[k] = section;
            console.log("attention ça finit pour " + k);
        }).catch((err) => setImmediate(() => { throw err; }));
        console.log("k : " + k);
    }
    Show_Graph();
}

async function getAllShops() {
    
    for (var k = 0; k < numId.length - 1; k++)
    {
        console.log("k = " + k);
        await Get_DatasFromShop("NombreDePassage, NbVente, CAh", numId[k]).then(function(dat) {
            donneesAff = [];
            donneesVentes = [];
            donneesCA = [];
            section = [];
            dat.forEach(function(item, index, array) 
            {
                var dernierJour = dat[0].DateTime.getDate();
                var moyenne = [0, 0, 0];
                
                dat.forEach(function(item, index, array) 
                {
                    var jour = item.DateTime.getDate();
                    if (jour == dernierJour)
                    {
                        moyenne[0] = moyenne[0] + item.NombreDePassage;
                        moyenne[1] = moyenne[1] + item.NbVente;
                        moyenne[2] = moyenne[2] + item.CAh;
                    }
                    if (jour != dernierJour)
                    {
                        var total = moyenne.length * 3;
                        donneesAff.push(moyenne[0] / total);
                        donneesVentes.push(moyenne[1] / total);
                        donneesCA.push(moyenne[2] / total);
                        moyenne = [0, 0, 0];
                        total = 0;
                    }
                    dernierJour = jour;
                })
            })
            section[0] = donneesAff;
            section[1] = donneesVentes;
            section[2] = donneesCA;
            datas_magasin[k] = section;
            console.log("attention ça finit pour " + k);
        }).catch((err) => setImmediate(() => { throw err; }));
        console.log("k : " + k);
    }
    Show_Graph();
}