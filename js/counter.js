// Petit compteur aléatoire, juste pour test un peu de js


var counterStart = "0000000"; 
var counterValue = 0;  
var VariableGlobal = 0;

function counterGradient(id, level)
{
	var digit = document.getElementById(id);
	digit.style.opacity = level;
	digit.style.MozOpacity = level;
	digit.style.KhtmlOpacity = level;
	digit.style.filter = "alpha(opacity=" + level * 100 + ")";
	return;
}

function counterFadeIn(id) 
{
	var level = 0;
	while(level <= 1)
	{
		setTimeout( "counterGradient('" + id + "'," + level + ")", (level*1000)+10);
		level += 0.01;
	}
}

function counterFadeOut(id) 
{
	var level = 1;
	while(level >= 0)
	{
		setTimeout( "counterGradient('" + id + "'," + level + ")", (level*1000)+10);	
		level -= 0.01;
	}
}

function counterEffect(id, nd)
{
	counterFadeOut(id);
	digit.innerHTML = nd;
	counterFadeIn(id);	
}


function digitUpdate(rank)
{
	var id = "digit" + new String(rank);
	var ret = false;
	digit = document.getElementById(id);

	var od = new Number(digit.innerHTML);
	var nd = od + 1;
	VariableGlobal = VariableGlobal + 1;

	if (VariableGlobal > 113)
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

