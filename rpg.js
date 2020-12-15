"use strict"

// initialisation du tableau des personnages Ã  vide
// un personnage est un tableau de cette forme [ nom, age, classe, sexe, niveau]
var personnage = [];

//Tableau d'ennemis
var ennemis = [
	{ race : "Orque", arme : "Epée", degats : 6, vie : 100},
	{ race : "Pillard", arme : "Arc", degats : 12, vie : 100},
	{ race : "Troll", arme : "Massue", degats : 8, vie : 100}
	];
//Sauvegarde l'ennemi apparu dans le combat
let ennemiApparu;
//Fonctionne comme une 'horloge' pour laisser un temps avant de réutiliser le pouvoir
let rechargePouvoir = 0;
//Sauvegarde l'endroit ou l'aventurier est avant un combat
let sauvegardeEndroit = "";
//Permet de vérifier si un aventurier a déjà fait l'arene
let entreeArene = -1;
//argent gagné dans l'arene
let argentGagne = 0;


//paramètre : les données du formulaire
//rempli le tableau personnage de ses données.
function ajouterPersonnage(formulaire) {  
  //Ajoute une attaque spéciale en fonction de la classe
	let attaque = "";
	switch(formulaire.classe.value){
		case "Archer": attaque = "Arc enflammé"; break;
		case "Guerrier": attaque = "Ruée"; break;
		case "Mage": attaque = "Sort"; break;
		case "Voleur": attaque = "Attaque sournoise"; break;
	}
  // enregistrer le personnage dans le tableau
  // [ nom, age, classe, sexe, niveau, vie, attaque spéciale] 
  personnage.push( formulaire.name.value, formulaire.age.value,
                      formulaire.classe.value, formulaire.sexe.value, 1, 100, attaque );
  
  //on lance la première instance : intro
  instanceIntro();
  
  // Pour l'instant, on renvoie toujours false
  // Ainsi on est sûr de ne pas envoyer le formulaire (et de ne pas rafraichir la page)
  return false;
}


//Instance intro : gènere qu'un seul bouton commencer l'aventure qui lance l'instance : Aventure 
function instanceIntro(){
  let nomDeInstance="intro";	
  let texte="Bienvenue à toi "+ personnage[0] +'!'; // première ligne
  texte+="<br> Pour lancer l'aventure appuis sur le bouton 'lancer l'aventure. "
  texte+="<br> <button onClick='instanceAventure()'>Lancer l'aventure</button>";
  texte+="<button onClick='console.log(personnage)'>affficher le personnage dans la console</button>";
  articleHtml(nomDeInstance,texte);
  
}

//function test
function instanceAventure(){     
  let texte="Bienvenue à toi "+ personnage[0] +'!'; // première ligne
  texte+="<br>AVENTURE "
  texte+="<br> <button onClick='instanceAventure'>rien</button>";
  articleHtml("intro",texte);
  
}

//Ajout Oscar du 14/12/20 à 21h
//paramètre : le nom de l'instance, et le texte à afficher dans l'article text
// modifie la section(id jeu) et y crée deux article tel que le premier article a comme id: image+nomDeInstance et le second texte+nomDeInstance
// et le paramètre texte est injecter dans le deuxième article.
function articleHtml(nomDeInstance,texte){
	let mHtml= '<article id="'+nomDeInstance+'Image"></article>'
			   + '<article id="'+nomDeInstance+'Text">'
			   + texte
               + "</article>";
	document.getElementById("jeu").innerHTML = mHtml;
}

/*Fonction qui indique un combat, les points de vie de chaque personnage et les actions à réaliser.
* @param premiereFois : Si 0, indique que c'est la premiere fois du combat que la fonction est appelée. 
* 											Si 1, indique que la fonction a deja ete appelée et donc il ne faut pas changer d'ennemi.
*												Si 2, (Pas encore implémenté) indique que la fonction est appelée dans le cadre du boss et donc il faut selectionner celui-ci.
*				 endroit : permet de faire une sauvegarde de l'endroit la premiere fois que le combat est appelé ou on doit aller pour pouvoir y aller si le combat est gagné
*/
function combat(premiereFois,endroit){
	if(premiereFois == 0){
		ennemiApparu = ennemis[choixEnnemi()];
		sauvegardeEndroit = endroit.name;
	}
/*else if(premiereFois == 2){
		ennemiApparu = boss;				Boss encore a faire
	}
*/
	let texte ="";
	if(ennemiApparu.vie != 0 && personnage[5] != 0){
		texte = "Vous rencontrez un "+ennemiApparu.race+" sur votre chemin !<br> Votre vie est à: "
									+ personnage[5] + "<br>Vie de l'adversaire : " + ennemiApparu.vie + "<br> Vous avez plusieurs choix : " 
									+ "<button onClick='attaquer(ennemiApparu)'>Attaque simple</button>" +
									"<button onClick='attaqueSpeciale(ennemiApparu)'>Attaque spéciale : " + personnage[6] + " (tours restants : " + rechargePouvoir +")</button>" ;
	}
	else if(ennemiApparu.vie == 0 && personnage[5] != 0){
		texte = "<h3>Vous avez battu votre adversaire !</h3><br> Vous pouvez acceder à la suite.<button onClick='"+sauvegardeEndroit+"()'>Suite</button>";
		ennemiApparu.vie = 100;
	}
	else{
		texte = "Vous êtes mort !";
	}
	articleHtml("Combat",texte);
}
//Crée un nombre aléatoire entier entre 0 et 10, utile pour le choix d'ennemi et les degats d'attaque
function nombreAleatoire(){
	let nombre = (Math.random()*10).toFixed(0);
	return nombre;
}
//Fonction qui permet de choisir un ennemi aléatoire dans la liste d'ennemis via la fonction nombreAleatoire()
function choixEnnemi(){
	let choix = 9999;
	do{
		choix = nombreAleatoire()-1;
	}while(choix >= ennemis.length)
	return (choix-1);
}

//Attaque la cible en lui infligeant des dégats entre 1 et 10 (nombreAleatoire()) et ensuite appelle la fonction tourEnnemi() et puis reviens à combat
function attaquer(cible){
	let degats = nombreAleatoire();
	cible.vie -= degats;
	if(cible.vie <= 0){
		cible.vie = 0;
	}
	alert("Vous avez fait " + degats + " de dégats, la vie de l'adversaire est passée à " + cible.vie);
	tourEnnemi();
	if(rechargePouvoir > 0){
		rechargePouvoir--;
	}
	combat(1);
}
//Attaque la cible en lui infligeant 15 de dégats et ensuite appelle la fonction tourEnnemi() et puis reviens à combat
function attaqueSpeciale(cible){
	if(rechargePouvoir <= 0){
		let degats = 15;
		cible.vie -= degats;
		if(cible.vie <= 0){
			cible.vie = 0;
		}
		rechargePouvoir = 2;
		alert("Vous avez fait " + degats + " de dégats, la vie de l'adversaire est passée à " + cible.vie);
	} else {rechargePouvoir--; alert("Vous ne pouvez pas utiliser votre pouvoir tout de suite.\n Vous devez encore attendre " + (rechargePouvoir+1) + " tours.")};
	tourEnnemi();
	combat(1);
}
//Tour de l'ennemi où il peut attquer normalement, rater ou faire un coup critique
function tourEnnemi(){
	let force = nombreAleatoire();
	switch(true){
		case(force <= 2):
			alert("L'adversaire vous a raté !");
			break;
		case(2 < force && force < 10):
			personnage[5] -= ennemiApparu.degats;
			if(personnage[5] <= 0){
				personnage[5] = 0;
			}
			alert("L'adversaire vous a infligé " + ennemiApparu.degats + " degats ");
			break;
		default:
			personnage[5] -= (ennemiApparu.degats + 10);
			if(personnage[5] <= 0){
				personnage[5] = 0;
			}
			alert("L'adversaire vous a infligé un coup critique !\n Vous perdez " + (ennemiApparu.degats + 10) +" points de vie.");
	}
}

//Arene ou l'aventurier peut combattre des ennemis en boucle pour gagner de l'argent (incrément de 2 pour chaque ennemi battu), s'il a deja combattu il ne peut plus participer
function arene(){
	let texte = "";
	entreeArene++;
	if(entreeArene == 0){
		texte = "Bienvenue au tournoi du roi<br>Vous pouvez affronter des ennemis pour essayer de gagner de l'argent"+
								"Vous gagnez 2 pièces si vous battez votre premier adversaire, ensuite 4, 6, 8 et ainsi de suite<br><button onClick='combat(0,arene);'>Entrer tournoi</button>";
	}
	else if(entreeArene == 1){
		argentGagne += 2;
		texte = "Bien joué, vous avez battu votre adversaire, vous gagnez " + argentGagne + "pièces d'or"+
								"Voulez vous continuer ? <button onCLick='combat(0,arene);'>Continuer</button><br>"+
								"Ou bien quitter ? (vous ne pourrez plus revenir)<button onclick=''>Quitter</button>";
	}
	else{
		texte = "Vous avez déjà participé au tournoi, vous ne pouvez plus participer";
	}
	articleHtml("Arene", texte);
}


//Change l'html pour avoir le formulaire d'ajout d'ennemis
function ouvrirFormEnnemi(){
	let texte =" <!---Création des ennemis--> "+
		"<section>"+
			"<form id='formulaireEnnemi' action=# onSubmit='return ajouterEnnemi(this);'>"+
				"<fieldset>"+
					"<legend>Création d'un ennemi</legend>"+
					"<div>"+
						"<label for='classeEnnemi'>Nom:</label>"+
						"<select id='classeEnnemi' required='required'>"+
							"<option>Orque</option>"+
							"<option>Pillard</option>"+
							"<option>Troll</option>"+
							"<option>Géant</option>"+
						"</select>"+
					"</div>"+
					"<div>"+
						"<dl>"+
							"<dt>Arme:</dt>"+
							"<dd>Nom : <input type='text' id='nomArmeEnnemi' required='required'></dd>"+
							"<dd>Dégats (1 à 10): <input type='number' id='degatArmeEnnemi' min='1' max='10' required='required'></dd>"+
						"</dl>"+
					"</div>"+
					"<input type='submit' value='Ajouter un ennemi'>"+
				"</fieldset>"+
			"</form>"+
		"</section>"+
		"<h3>Liste ennemis :</h3>"+
		"<section id='listeEnnemi'>"+
		"</section>";

		articleHtml("formulaireEnnemi",texte);
		afficherEnnemi();
}
//Fin ajout Oscar 14/12/20 à 21h


// Fonction pour créer un nouvel objet ennemi
function nouveauEnnemi(classeEnnemi, nomArmeEnnemi, degatArmeEnnemi){
	this.race = classeEnnemi;
	this.arme = nomArmeEnnemi;
	this.degats = degatArmeEnnemi;
}

// Fonction qui ajoute le nouvel ennemi dans l'array
function ajouterEnnemi(formulaire){
	var ennemiIntermediaire = new nouveauEnnemi(formulaire.classeEnnemi.value, formulaire.nomArmeEnnemi.value, formulaire.degatArmeEnnemi.value);
	ennemis.push(ennemiIntermediaire);
	afficherEnnemi();
	return false;
}

// Affiche les ennemis
function afficherEnnemi(){
	let liste = "";
	for(let i=0;i<ennemis.length;i++){
		liste += "<button onClick='supprimer("+i+");'>Supprimer</button> <b>" + ennemis[i]["race"] + "</b> avec une " + ennemis[i]["arme"] + " qui fait " + ennemis[i]["degats"]+ " de dégats<br>";
	}
	document.getElementById("listeEnnemi").innerHTML = liste;
}

function supprimer(aSupprimer){
	ennemis.splice(aSupprimer,1);
	afficherEnnemi();
}
