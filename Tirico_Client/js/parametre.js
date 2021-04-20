const {PythonShell} = require('python-shell');
var CodeHeatmap = `# HeatMap Script Python

import sys,json
data = sys.stdin.readlines()
data = json.loads(data[0])
print(data[0]+" : Recue")



# PA8 : Density Map
import pandas as pd
import seaborn as sb
import numpy as np
from scipy.stats.kde import gaussian_kde 
import matplotlib.pyplot as plt

## Chargement des données
df = pd.read_csv('./ressource/data/output.csv')
df.head(3)

## Pré-traitement des données
### Nettoyage
df.dropna(inplace=True)

### Matrice de données pour la carte de chaleur 
#### 2D array avec les données centrales de chaque bounding box
xpos = (df['xmax'] + df['xmin']) / 2
ypos = (df['ymax'] + df['ymin']) / 2

data = np.array([xpos, ypos])
x, y = data

## Calcul de densité
### Noyau avec filtre de Gauss
k = gaussian_kde(np.vstack([x,y]))
xi, yi = np.mgrid[x.min():x.max():x.size**0.5*1j,y.min():y.max():y.size**0.5*1j]
zi = k(np.vstack([xi.flatten(), yi.flatten()]))

## Density Map
#fig = plt.figure(figsize=(7,8))
#ax1 = fig.add_subplot(211)
fig, ax2 = plt.subplots()
#ax2 = fig.add_subplot(212)

# alpha=0.5 pour mettre les cartes semi-transparentes
#ax1.pcolormesh(xi, yi, zi.reshape(xi.shape), alpha=0.5)
ax2.contourf(xi, yi, zi.reshape(xi.shape), alpha=0.5)

# Définit les axes de la carte
#ax1.set_xlim(x.min(), x.max())
#ax1.set_ylim(y.max(), y.min())
ax2.set_xlim(x.min(), x.max())
ax2.set_ylim(y.max(), y.min())

print("Density_Map 1] Debug Creation + Supperposition HeatMap")
# Superpose la density map avec l'image du magasin
im = plt.imread('./ressource/data/Heatmap_fond.png')
#ax1.imshow(im, extent=[x.min(), x.max(), y.max(), y.min()], aspect='auto')
ax2.imshow(im, extent=[x.min(), x.max(), y.max(), y.min()], aspect='auto')

print("Density_Map 2] Debug Telechargement HeatMap = ok")
# Telechargment de la HeatMap
fig.savefig('./code_python/Density_Map/HeatMap.png')

sys.stdout.flush()`;

var CodeAffluence = `/* Affluence Graph : JavaScript Code */


// Daily
SetNow();
SetBefore(-1);
Get_Datas("NombreDePassage").then(function(dat) {
    dat.forEach(function(item, index, array) 
    {
        datas.push(item.NombreDePassage);
        Graphe_Label.push(item.DateTime.getHours() + 'h');
    })
    titre[0] = "Affluence client par jour";
    MakeLineGraph();
    MakeBar();
}).catch((err) => setImmediate(() => { throw err; }));


// Weekly
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
    MakeLineGraph();
    MakeBar();
}).catch((err) => setImmediate(() => { throw err; }));


// Monthly
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
        MakeLineGraph();
        MakeBar();
    }).catch((err) => setImmediate(() => { throw err; }));`;

var CodeNbrVente = `/* Product Quantity Graph : JavaScript Code */

// Daily
Get_Datas("NbVente").then(function(dat) {
  dat.forEach(function(item, index, array) 
  {
      datas_ventes.push(item.NbVente);
  })
  titre[1] = "nombre de produits vendus par jour";
  MakeVenteLineGraph();
  MakeBarVente();
  MakeAraignee();
  MakeCercle();
}).catch((err) => setImmediate(() => { throw err; }));


// Weekly
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
  titre[1] = 'nombre de produits vendus par semaine';
  MakeVenteLineGraph();
  MakeBarVente();
  MakeAraignee();
  MakeCercle();
}).catch((err) => setImmediate(() => { throw err; }));


// Monthly
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
  MakeVenteLineGraph();
  MakeBarVente();
  MakeAraignee();
  MakeCercle();
}).catch((err) => setImmediate(() => { throw err; }));`;

var Code4 = `var graph1;
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

}`;

var Code5 = CodeNbrVente;

var Code6 = `# Conseil et Prediction journalier Script Python
# coding: utf-8

# In[1]:


# This is a sample Python script.

# Press Maj+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import mysql.connector
import datetime
import sys, json
from datetime import datetime

#Code to Read data parse to this script
#Read data from stdin
lines = sys.stdin.readlines()
# Since our input would only be having one line, parse our JSON data from that
#get our data as an array from read_in()
lines = json.loads(lines[0])

print (lines[1])
IdObject = lines[0]




db = mysql.connector.connect(
  host="mysql-pa8.alwaysdata.net",
  user="pa8_acc",
  password="5wtE3Cx8W",
  database="pa8_bddv2",)


# In[2]:


def  Création_liste():
    maxi = 0
    tab_1 = []
    heure = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    h = 3600
    jour = 3600*24
    semaine = 3600*24*7
    for k in range (0,10):
        tab_1 = []
        for i in range (0,24):
            
    
            cursor = db.cursor()
            Vdate = datetime.datetime.fromtimestamp(1577836800 + (h*i) +(jour*k)+ (semaine*0))
            cursor.execute("""SELECT NombreDePassage FROM Stats JOIN StatsToLoc on Stats.ID = StatsToLoc.IDStats WHERE IDLoc = %s AND DateTime = %s""", ( 1 ,Vdate, ))
            a = cursor.fetchone()
            a = a[0]
            
            tab_1.append(a)
            
        
        maxi = tab_1[0]
        for y in tab_1:
            if y >= maxi:
                maxi = y
        
        for p in range (0,24):
            if p == tab_1.index(maxi) : heure[p] = (heure[p]+1)
                
        
    
    maximum = tab_1[0]
    for e in tab_1:
        if e >= maximum:
            maximum = e
    print("l'heure a laquelle le pic de clientèle sera observé demain",  (tab_1.index(maximum)+1))


# In[3]:


def coef_event():
    coef_event1 = 1
    p= datetime.now()
    print(p)
coef_event()


# In[4]:


def Conseil_stocks( coef_event):
    ID = 100
    
    print ("Object Sélectionner: ",IdObject)
    ID = int(IdObject)
    cursor = db.cursor()
    cursor.execute("""SELECT Nom FROM Item  WHERE ID = %s """, ( ID , ))
    objet = cursor.fetchone()
    objet = objet [0]
    
    cursor.execute("""SELECT Vente_mois FROM Item  WHERE ID = %s """, ( ID , ))
    moy_mois = cursor.fetchone()
    moy_mois = moy_mois[0]
    
    cursor.execute("""SELECT Vente_troisj FROM Item  WHERE ID = %s """, ( ID , ))
    moy_trois_jours = cursor.fetchone()
    moy_trois_jours = moy_trois_jours[0]
    
    valeur_stock = ((moy_mois)-(moy_trois_jours))*(coef_event)
    if valeur_stock<0.90 : print("Il faut augmenter le stock en prevision d'une hausse de consommation future de ",objet,".")
    elif 0.90<valeur_stock<1.10 : print("Il faut continuer d'alimenter les stocks de ", objet," de manière constante, rien ne devrait bouger pour le produit.")
    elif valeur_stock>1.10 : print ("Il faut cesser d'alimenter les stocks de ", objet ," ce produit sera en perte de vitesse sur les prochains jours.")

#Création_liste()
Conseil_stocks(1)
# In[ ]:


`;

// Appel Python du code de sélection de zone, ouvre une nouvelle Window
const SelectionZoneBtn = document.getElementById('selection_Zone')
    SelectionZoneBtn.addEventListener('click', (event) => {
    let pyshell = new PythonShell('code_python/DrawZone/drawShopZones.py');

    pyshell.send(JSON.stringify(['\n-----------------------------------------------------\nAppel du script de Selection de Zone "drawShopZones.py"']))

    pyshell.on('message', function(message) {
    console.log(message);
    })

    pyshell.end(function (err) {
        if (err){
            throw err;
    };
    console.log('Fin du script Python : "drawShopZones.py"');
    console.log("-----------------------------------------------------");
    });
});




const redirectInscriBtn = document.getElementById("redirect_InscriptionLoc")
redirectInscriBtn.addEventListener('click', (event) => {
  window.location.href="inscription_loc.html?Name="+Account_Name+"&ID="+Account_ID+"";;
});

//Script pour modifier le code source souhaiter selon le "select" sélectionner + Alert si le boutton restaurer ou valider est activé

  const AffluenceBtn = document.getElementById('RestaurerBtn')
  AffluenceBtn.addEventListener('click', (event) => {
            confirm("Attention : Vous vous apprêtez à restaurer tous les paramètres par défauts, graphes compris !\n Confirmer ?")
        })
        

        const ValidateBtn = document.getElementById('ValidateBtn')
  ValidateBtn.addEventListener('click', (event) => {
            var graphSelection = document.getElementById("Graph_Selected")
            var Graph_Selected = graphSelection.value
            alert("Le graphe '"+Graph_Selected+"' a bien été modifié")
        })


        const SelectBtn = document.getElementById('Graph_Selected')
  SelectBtn.addEventListener('click', (event) => {
            var graphSelection = document.getElementById("Graph_Selected")
            var Graph_Selected = graphSelection.value
            switch (Graph_Selected) {
              case 'HeatMap':
                var Code_To_Modify = CodeHeatmap;
                break;
              case 'Affluence Graphe':
                var Code_To_Modify = CodeAffluence;
                break;
              case 'Ventes Produit Graphe':
                var Code_To_Modify = CodeNbrVente;
                break;
              case 'Chiffre affaire Graphe':
                var Code_To_Modify = Code4;
                break;
              case 'Multi Graphe':
                var Code_To_Modify = Code5;
                  break;
              case 'Conseil Journalier':
                  var Code_To_Modify = Code6;
                    break;
              default:
                Code_To_Modify = "Error";
            }

            document.getElementById('code_python').value = '\n' + Code_To_Modify+'\n'
        })
