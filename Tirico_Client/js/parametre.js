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

var Code4 = `Get_Datas("NombreDePassage").then(function(dat) {
  dat.forEach(function(item, index, array) 
  {
      datas.push(item.NombreDePassage);
      Graphe_Label.push(item.DateTime.getHours() + 'h');
  })
  titre[0] = "Affluence client par jour";
  MakeLineGraph();
  MakeBar();
}).catch((err) => setImmediate(() => { throw err; }));`;

// Appel Python du code de détection, génère un fichier Csv
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

const redirectInscriBtn = document.getElementById("redirect_InscriptionLoc")
redirectInscriBtn.addEventListener('click', (event) => {
  window.location.href="inscription_loc.html?Name="+Account_Name+"&ID="+Account_ID+"";;
})

//Script pour modifier le code source souhaiter selon le "select" sélectionner + Alert si le boutton restaurer ou valider est activé

  const AffluenceBtn = document.getElementById('RestaurerBtn')
  AffluenceBtn.addEventListener('click', (event) => {
            confirm("Attention : Vous vous apprêtez à restaurer tous les paramètres par défauts, graphes compris !\n Confirmer ?")
        })
        

        const ValidateBtn = document.getElementById('ValidateBtn')
  ValidateBtn.addEventListener('click', (event) => {
            var graphSelection = document.getElementById("Graph_Selected")
            var Graph_Selected = graphSelection.value
            alert("Le graphe d'"+Graph_Selected+" a bien été modifié")
        })


        const SelectBtn = document.getElementById('Graph_Selected')
  SelectBtn.addEventListener('click', (event) => {
            var graphSelection = document.getElementById("Graph_Selected")
            var Graph_Selected = graphSelection.value
            switch (Graph_Selected) {
              case '1':
                var Code_To_Modify = CodeHeatmap;
                break;
              case '2':
                var Code_To_Modify = CodeAffluence;
                break;
              case '3':
                var Code_To_Modify = CodeNbrVente;
                break;
              case '4':
                var Code_To_Modify = Code4;
                break;
              case '5':
                var Code_To_Modify = Code5;
                  break;
              default:
                Code_To_Modify = "Error";
            }

            document.getElementById('code_python').value = '\n' + Code_To_Modify+'\n'
        })
