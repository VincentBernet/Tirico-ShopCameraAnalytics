var counterStart = "0000000"; 
var counterValue = 0;  
const {PythonShell} = require('python-shell');
var compteur;

  // Appel Python du Compteur 
  let pyshell2 = new PythonShell('code_python/Counter/AffluenceCounter.py');

  pyshell2.send(JSON.stringify([" "]))

  pyshell2.on('message', function(message) {
    compteur= parseInt(message);
    console.log("Compteur du nombre de personne total comptabilise dans le magasin : "+compteur);
  })

  pyshell2.end(function (err) {
    if (err){
      throw err;
    };
    console.log('Fin du script Python : "AffluenceCounter.py"');
  });


 function counterGradient(id, level)
{
	
	var digit = document.getElementById("counter");
	digit.style.opacity = level;
	digit.style.MozOpacity = level;
	digit.style.KhtmlOpacity = level;
	digit.style.filter = "alpha(opacity=" + level * 100 + ")";
	return;
}



function counterEffect(id, nd)
{
	digit.innerHTML = nd;	
}


function digitUpdate(rank)
{
	var id = "digit" + new String(rank);
	var ret = false;
	digit = document.getElementById(id);
	var od = new Number(digit.innerHTML);
	var nd = od + 1;

	if (counterValue > compteur)
	{
		return;
	}
		
	if(nd > 9)
	{
		ret = true;
		nd = 0;
	}

	counterEffect(id, nd);
	return ret;
}

function buildDisplay(rank)
{
	var id = "digit" + new String(rank);

	var digit = counterStart + new String(counterValue);
	digit = digit.charAt(digit.length - rank); 

	var d = "<div class='digit' id=\"" + id + "\">" + digit + "</div>";
	return d;
}

function counterUpdate()
{
   counterValue += 1;
  
   var size = counterStart.length;  
   var flag = digitUpdate(1); 	

   for(i = 2; i <= size; i++)
   {
	  if(flag)
	  	flag = digitUpdate(i);
   }
}

function counterInit()
{
   counterValue = 0;
  
   var size = counterStart.length;  
   var theString = "";

   for(i = 1; i <= size; i++)
   {
	  theString = buildDisplay(i) + theString;
   }

   var counter = document.getElementById("counter");
   
   counter.innerHTML = theString;
}



window.onload=counterInit;