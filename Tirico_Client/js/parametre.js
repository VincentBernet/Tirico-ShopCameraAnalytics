const {PythonShell} = require('python-shell');


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
            document.getElementById('code_python').value = '# '+ Graph_Selected +' Graphe Code \n'
        })
