class Mot {
  constructor(fr, ru) {
  	this.fr = fr;
	this.ru = ru;
	
  }
}

var sections = new Array(3);
for (var i = 0; i < 3; i++)
{
	sections[i] = new Array();
}


function construireListes(){
	sections[0].push(new Mot("antérieurement","Раньше"));
	sections[0].push(new Mot("assez (suffisament)","Достаточно"));
	sections[0].push(new Mot("attentivement","внимательно"));
	sections[0].push(new Mot("complètement","полностью"));
	sections[0].push(new Mot("compliqué","сложно"));
	sections[0].push(new Mot("confortablement","удобно"));
	sections[0].push(new Mot("correctement","правильно"));
	sections[0].push(new Mot("difficilement","трудно"));
	sections[0].push(new Mot("exactement","точно"));
	sections[0].push(new Mot("facilement","легко"));
	sections[0].push(new Mot("finalement","наконец"));
	sections[0].push(new Mot("généralement","обычно"));
	sections[0].push(new Mot("immédiatement","сразу же"));
	sections[0].push(new Mot("justement","вот именно"));
	sections[0].push(new Mot("lentement","медленно"));
	sections[1].push(new Mot("non sans raison","Недаром"));
	sections[1].push(new Mot("obligatoirement","обязательно"));
	sections[1].push(new Mot("particulièrement","особенно"));
	sections[1].push(new Mot("probablement","вероятно"));
	sections[1].push(new Mot("rarement","редко"));
	sections[1].push(new Mot("réciproquement","обоюдно"));
	sections[1].push(new Mot("simultanément","одновременно"));
	sections[1].push(new Mot("sûrement","наверное"));
	sections[1].push(new Mot("aussi","тоже"));
	sections[1].push(new Mot("autre","другой"));
	sections[1].push(new Mot("de (from)","из"));
	sections[1].push(new Mot("aussi loin que","насколько"));
	sections[1].push(new Mot("également","также"));
	sections[1].push(new Mot("en ce moment","сейчас"));
	sections[1].push(new Mot("en fin de compte","в конце концов"));
	sections[2].push(new Mot("encore une fois","Ещë раз"));
	sections[2].push(new Mot("récemment","недавно"));
	sections[2].push(new Mot("seulement","только"));
	sections[2].push(new Mot("simplement","просто"));
	sections[2].push(new Mot("à moitié","наполовину"));
	sections[2].push(new Mot("autrement, sinon","иначе"));
	sections[2].push(new Mot("Avec plaisir"," C удoвóльcтвиeм"));
	sections[2].push(new Mot("hélas","Увы"));
	sections[2].push(new Mot("heureusement","к счастью"));
	sections[2].push(new Mot("normalement","нормально"));
	sections[2].push(new Mot("rapidement","быстро"));
	sections[2].push(new Mot("tout droit","прямой"));
	sections[2].push(new Mot("malheureusement","к сожалению"));	
}

construireListes()



//afficher(mots);
var ops = new Array(sections.length);
var opInner = ["section 1", "section 2", "section 3"];            

for (var i=0; i<ops.length; i++){
	ops[i] = document.createElement("option");
    ops[i].value = i;
    ops[i].innerHTML  = opInner[i];
    document.getElementById("sections").appendChild(ops[i]);
}

var ops2 = new Array(2);
var op2Inner = ["Français", "Russe"];           

for (var i=0; i<ops2.length; i++){
    ops2[i] = document.createElement("option");
    ops2[i].value = i+1;
    ops2[i].innerHTML  = op2Inner[i];
    document.getElementById("mode").appendChild(ops2[i]);
}



function nbAlea(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min +1)) + min;
  }

function condition(tableau){
	var result = 1;
	for(var i=0; i<tableau.length; i++){
		for(var j=0; j<tableau.length; j++){
			if(i != j){
				if(tableau[i] == tableau[j]){
					result = 0;
				}
			}	
		}
	}
	return result;
}

var ks = new Array();
function unicite(k, ks){
	var retour = 0;
	var indic = 0;
	for (var i = 0; i<ks.length; i++){
		if (k == ks[i]){
			indic++;
		}
	}
	if(indic > 0){
		retour = 1;
	}
	return retour;
}

var marche = 0
function commencer(){
	if (marche == 0){
		// récupère données
		var section = document.getElementById('sections').value;
		var mode = document.getElementById('mode').value;

		// nb aleatoire
		do{
			var k = nbAlea(0, sections[section].length-1);
		}while(unicite(k, ks)&&(ks.length<13));
		if(ks.length>12){
			ks=[];
		}
		ks.push(k);
		

		document.getElementById('reponse').innerHTML = k;
		// ajout "mot"
		var mot = (mode == 1)?  sections[section][k].fr :  sections[section][k].ru;
		document.getElementById("mot").innerHTML = mot;

		radioboxes(section, mode, k);

		// empêcher de rajouter des radiobox
		marche = 1;
	}else{
		var start = document.getElementById("start");
		var suppr = document.getElementById("coeur");
		start.removeChild(suppr); 

		// ajout <coeur>
		var coeur = document.createElement("ul");
		coeur.setAttribute("id", "coeur");
		document.getElementById("start").appendChild(coeur);

		// récupère données
		var section = document.getElementById('sections').value;
		var mode = document.getElementById('mode').value;

		// nb aleatoire
		do{
			var k = nbAlea(0, sections[section].length-1);
		}while(unicite(k, ks)&&(ks.length<13));
		if(ks.length>12){
			ks=[];
		}
		ks.push(k);
		
		document.getElementById('reponse').innerHTML = k;
		// ajout "mot"
		var mot = (mode == 1)?  sections[section][k].fr :  sections[section][k].ru;
		
		document.getElementById("mot").innerHTML = mot;

		radioboxes(section, mode, k);

	}
}


function rootCommencer(){
	// ajout <p>
	var p = document.getElementById('consignes')
	p.innerHTML  = "<i> Selectionnez la bonne traduction et changez de section après 20 bonnes réponses.</i>";

	document.getElementById('sol').innerHTML = "";
	document.getElementById('score').innerHTML = "";
	document.getElementById('reponse').innerHTML = "";
	document.getElementById('points').innerHTML = 0;
	document.getElementById('tour').innerHTML = 0;

	commencer();
}


function radioboxes(section, mode, k){

	// récupération mot
	var mot = (mode == 1)?  sections[section][k].fr :  sections[section][k].ru;

	// 5 nb aleatoires entre 1 et 5
	var radioValue = new Array(5);

	//defini la place de la trad correcte
	var bonneRep = nbAlea(0, 4);
	radioValue[bonneRep] = k;
	
	do{
		for(var i=0; i<radioValue.length; i++){
			if(i != bonneRep){
				radioValue[i] = nbAlea(0, sections[section].length-1);
			}
		}
		
	}while (condition(radioValue) == 0);
		// ajout <radio>
		var radios = new Array(5);
		var radioId = ["a", "b", "c", "d", "e"];  
		var radioLabel = new Array(5); 

		for(var i=0; i<radioLabel.length; i++){
			radioLabel[i] = (mode == 1)?  sections[section][radioValue[i]].ru : sections[section][radioValue[i]].fr;
		}


		
		var divs = new Array(5);

		for (var i=0; i<radios.length; i++){
			radios[i] = document.createElement("button");
			radios[i].setAttribute("class", "styled");
			radios[i].setAttribute("onclick", "verifier(this.id)");

			radios[i].setAttribute("id", radioId[i]);
			radios[i].setAttribute("value", radioValue[i]);
			radios[i].setAttribute("name", "selection");

			
			radios[i].innerHTML  = radioLabel[i];

			divs[i] = document.createElement("div");
			divs[i].setAttribute("class", "formu");
			divs[i].appendChild(radios[i]);
			

			document.getElementById("coeur").appendChild(divs[i]);
		}

		// ajout <button>
		arreter= document.createElement("button");
		arreter.setAttribute("onclick", "document.location.reload(false)");
		arreter.setAttribute("class", "styledArret");
		arreter.innerHTML  = "Arrêter";
		document.getElementById("coeur").appendChild(arreter);

}


function verifier(id) {
		var bouton = document.getElementById(id);
		var tour = document.getElementById('tour').innerHTML;
		var points = document.getElementById('points').innerHTML;
		var k = document.getElementById('reponse').innerHTML;
		var section = document.getElementById('sections').value;
		var mode = document.getElementById('mode').value;
		var valeur = bouton.value;
		
		var motFr = sections[section][k].fr;
		var motRu = sections[section][k].ru;

		tour++;
		document.getElementById('tour').innerHTML = tour;
		document.getElementById('sol').innerHTML = (mode == 1)? `${motFr} = ${motRu}.` : `${motRu} = ${motFr}.`;
		if(k == valeur){
			document.getElementById('sol').setAttribute("class", "vert");
			points++;
			document.getElementById('points').innerHTML = points;
		}else{
			document.getElementById('sol').setAttribute("class", "rouge");
		}
		document.getElementById('score').innerHTML = `${points} / ${tour} essais`;

		if(points > 19){
			if(points == tour){
				document.getElementById('score').innerHTML = `${points} / ${tour} essais <br><br>Félicitation! Vous avez le<br>score parfait!`;
			}else{
				document.getElementById('score').innerHTML = `${points} / ${tour} essais <br><br>Bravo! Votre score est <br>supérieur à 20.`;
			}
		}
		
		commencer();
}

var voir = 0;
function voirMots(){
	if(voir%2 == 0){
		var section = document.getElementById('sections').value;
		var mode = document.getElementById('mode').value;
		var tableauFr = new Array(sections[section].length+1);
		var tableauRu = new Array(sections[section].length+1);

		tableauFr[0]="Français";
		tableauRu[0]="Russe";
		for(var i=1; i<sections[section].length+1; i++){
			tableauFr[i]=sections[section][i-1].fr;
			tableauRu[i]=sections[section][i-1].ru;
		}
		
		var table = document.createElement("table");
		table.setAttribute("id", "tb");

		for (var i = 0; i<sections[section].length+1; i++){
			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			var td2 = document.createElement("td");

			construireTab();
			
			tr.appendChild(td1);
			
			tr.appendChild(td2);

			table.appendChild(tr);
		}
		document.getElementById("table").appendChild(table);

		var v = document.getElementById("voir");
		v.innerHTML = "Cacher";

	}else{
		var tb = document.getElementById("tb");
		document.getElementById("table").removeChild(tb);

		var v = document.getElementById("voir");
		v.innerHTML = "Voir mots";
	}
	voir++;

	function construireTab() {
		if (i == 0) {
			if (mode == 1) {
				td1.innerHTML = tableauFr[i];
				td1.setAttribute("class", "francaisTitre");
				td2.innerHTML = tableauRu[i];
				td2.setAttribute("class", "russeTitre");
			}
			else {
				td1.innerHTML = tableauRu[i];
				td1.setAttribute("class", "russeTitre");
				td2.innerHTML = tableauFr[i];
				td2.setAttribute("class", "francaisTitre");
			}
		}
		else if (mode == 1) {
			td1.innerHTML = tableauFr[i];
			td1.setAttribute("class", "francais");
			td2.innerHTML = tableauRu[i];
			td2.setAttribute("class", "russe");
		}
		else {
			td1.innerHTML = tableauRu[i];
			td1.setAttribute("class", "russe");
			td2.innerHTML = tableauFr[i];
			td2.setAttribute("class", "francais");
		}
	}
}





