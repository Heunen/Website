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
let message="salut";

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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                    //INSTANCE INTRO

//Instance intro : gènere qu'un seul bouton commencer l'aventure qui lance l'instance : Aventure 
// Introduction et dialogues d'introduction ! //
// Les dialogues peuvent être changés ! //
function instanceIntro(){
  let nomDeInstance="intro";	
  let texte="Bienvenue à toi "+ personnage[0] +'!'; // première ligne
  texte+="<br> Pour lancer l'aventure appuis sur le bouton 'lancer l'aventure. ";
  texte+="<br> <button onClick='introHist()'>Lancer l'aventure</button>";
  texte+="<button onClick=alert(\'Il suffit de recharger la page.\')>modifier votre personnage</button>";
  texte+="<button onClick='instanceArene()'>Arene</button>";
  texte+="<button onClick='instanceVillage()'>Village</button>";
  articleHtml(nomDeInstance,texte);
}
function introHist(){
    let texte="<!--Introduction à l'histoire-->"+
        "<section>"+
            "Alors que la nuit commence à tomber, vous vous approchez d'une auberge ayant l'air bien entretenue. Vous décidez donc d'y passer la nuit. Alors que vous rentrez dans le bâtiment,vous vous faites accoster par l'aubergiste qui vous accueille et vous propose de prendre place.L'auberge est bien vide, et vous vous posez la question de pourquoi. Mais avant même que vous n'ayez le temps de poser la question, l'aubergiste prend la parole :"+
            "<hr>"+
            "<button onclick='introDia()'>Continuer</button>"+
        "</section>"
    articleHtml("intro",texte);
}

function introDia(){
    let texte=
        "<section>"+
            "<b>L'aubergiste :</b>J'imagine que vous vous demandez pourquoi il fait si calme, alors que nous sommes en été et que l'établissement n'a pas l'air miteux? C'est normal de se poser la question... Et pour vous répondre, c'est du aux brigands."+
            "<hr>"+
            "<button onclick='introDia11()'>Lui demander qui sont ces brigands</button>"+
            "<button onclick='introDia12()'>Le laisser continuer</button>"+
        "</section>"
    articleHtml("intro",texte)
}

function introDia11(){
    let texte=
        "<section>"+
            "<b>Vous :</b> Des brigands? Dans cette region? D'où viennent-ils et qui sont-ils?"+
            "<hr>"+
            "<button onclick='introDia2()'>Attendre la réponse de l'aubergiste</button>"+
        "</section>"
    articleHtml("intro",texte)
}

function introDia12(){
    let texte=
        "<section>"+
            "<b>Vous :</b> ..."+
            "<hr>"+
            "<button onclick='introDia2()'>Laissez l'aubergiste expliquer la situation</button>"+
        "</section>"
    articleHtml("intro",texte)
}

function introDia2(){
    let texte=
        "<section>"+
            "<b>L'aubergiste : </b> Il s'agit d'un groupe assez organisé, ils se sont organisés dans une fort non loin. Ils ne sont pas beaucoup mais leur chef est fort... Depuis son arrivée beaucoup sont partis en laissant leurs biens à leur merci, et je pense être le seul à leur résister... Mais c'est comme cela, buvons pour oublier. Parlons plutôt de vous. Qui êtes-vous et pourquoi êtes-vous là?"+
            "<hr>"+
            "<button onclick='introDia21()'>Lui dire ce qu'il veut savoir</button>"+
            "<button onclick='introDia22()'>Ne donner que très peu d'informations</button>"+
        "<section>"
    articleHtml("intro",texte);
}

function introDia21(){
    let texte=
        "<section>"+
            "<b>Vous : </b> Je suis un aventurier, je parcours les terres afin de gagner de l'argent et découvrir un peu plus du monde qui m'entoure... Je ne suis que de passage ici car j'essaie de rejoindre la ville la plus proche pour offrir mes services. Peut être que je pourrais être utile dans le cadre de cette crise, si vous m'aidez en retour."+
            "<hr>"+
            "<button onclick='introDia211()'>Continuer</button>"+
        "<section>"
    articleHtml("intro",texte);
}


function introDia22(){
    let texte=
        "<section>"+
            "<b>Vous : </b> Je ne parle pas beaucoup de moi, et je ne préfère pas le faire ici... Partez du principe que je suis de passage."+
            "<hr>"+
            "<button onclick='introDia221()'>Continuer</button>"+
        "<section>"
    articleHtml("intro",texte);
}

function introDia211(){
    let texte=
        "<section>"+
            "<b>L'aubergiste : </b> Un aventurier nous serait de grand secours dans cette situation. Si vous accepter, vous recevriez un paiement à la hauteur, de ma part et de celle du maire. Vous êtes notre seul espoir, s'il vous plaît aidez-nous !"+
            "<hr>"+
            "<button onclick='introDia3()'>Accepter l'offre</button>"+
            "<button onclick='introDia222()'>Lui demander quelle récompense vous pourriez recevoir</button>"+
        "</section>"
    articleHtml("intro",texte);
}
function introDia221(){
    let texte=
        "<section>"+
            "<b>L'aubergiste : </b> Peu m'importe qui vous êtes de toute façon. Je suis prêt à vous payer pour que vous nous débarrassiez de ces malandrins, et je pense que le maire du village également. Qu'en dites-vous?"+
            "<hr>"+
            "<button onclick='introDia3()'>Accepter l'offre</button>"+
            "<button onclick='introDia222()'>Lui demander quelle récompense vous pourriez recevoir</button>"+
        "</section>"
    articleHtml("intro",texte);
}

function introDia222(){
    let texte=
        "<section>"+
            "<b>Vous : </b> J'aimerais avoir plus d'informations sur cette dite récompense... Je ne travaille pas pour rien, et même si c'est un plaisir d'aider, il me faut pouvoir me nourrir, me loger, et m'abreuver. Qu'en est-il cher aubergiste?"+
            "<hr>"+
            "<button onclick='introDia4()'>Continuer</button>"+
        "</section>"
    articleHtml("intro",texte)
}

function introDia3(){
    let texte=
        "<section>"+
            "<b>L'aubergiste : </b> Merci pour votre aide, nous ferons de notre mieux pour subvenir à vos besoins, en esperant que votre simple présence suffise à faire fuir ces couards de brigands !"+
            "<hr>"+
            "<button onclick='introDia31()'>Demander à l'aubergiste si vous pouvez loger ici pendant la durée de votre quête</button>"+
        "</section>"
    articleHtml("intro",texte);
}

function introDia31(){
    let texte=
        "<section>"+
            "<b>Vous : </b> C'est normal de venir en aide aux petits gens mon cher. Par contre, je ne pense pas pouvoir dormir sous tente pendant toute la durée de ce travail. Votre auberge a l'air bien vide. Est-il possible de me libérer une chambre pour que je puisse me reposer de mon long voyage?"+
            "<hr>"+
            "<button onclick='introDia32()'>Continuer</button>"+
        "</section>"
    articleHtml("intro",texte);
}

function introDia32(){
    let texte=
        "<section>"+
            "<b>L'aubergiste : </b> Bien sûr mon brave ! Et cela à mes propres frais, je vous l'assure. Ce n'est pas tous les jours qu'un aventurier de votre trempe accepte de nous aider!"+
            "<hr>"+
            "<button onclick='introDia4()'>Demander à l'aubergiste ce qu'il en est de la récompense</button>"+
        "<section>"
    articleHtml("intro",texte);
}

function introDia4(){
    let texte=
        "<section>"+
            "<b>Vous : </b> Et qu'en est-il de la récompense? Puis-je avoir plus d'informations là-dessus, mon brave aubergiste?"+
            "<hr>"+
            "<button onclick='introDia5()'>Continuer</button>"+
        "</section>"
    articleHtml("intro",texte);
}

function introDia5(){
    let texte=
        "<section>"+
            "<b>L'aubergiste : </b> Je vous propose donc déjà mon hospitalité gratuitement pendant la durée de votre quête, et j'accompagnerait cela d'un sac bien rempli d'or. Je ne sais pas ce que le maire compte vous offrir mais je pense que cette récompense devrait déjà être suffisante pour vous rendre enthousiaste."+
            "<hr>"+
            "<button onclick='introDia6()'>Continuer</button>"+
        "</section>"
    articleHtml("intro",texte);
}

function introDia6(){
    let texte=
        "<section>"+
            "<b>Vous : </b> Cela me semble être un bonne offre. J'accepte. Il me faut me préparer pour cette nouvelle aventure donc je m'en vais me reposer, si vous pouviez me montrer mon logis temporaire ce ne serait pas de refus."+
            "<hr>"+
            "<button onclick='introDia7()'>Continuer</button>"+
        "</section>"
    articleHtml("intro",texte);
}

function introDia7(){
    let texte=
        "<section>"+
            "<b>L'aubergiste : </b> Suivez-moi donc mon brave, je vais vous faire visiter !"+
            "<hr>"+
            "Vous décidez après la visite de cette auberge vide de monde, d'aller vous reposer afin de pouvoir commencer vos opérations le lendemain. Vous vous endormez assez rapidement."+
            "<hr>"+
            "<button onclick='introDiaFin()'>Continuer</button>"+
        "</section>"
    articleHtml("intro",texte);
}
function introDiaFin(){
    let texte=
        "<section>"+
            "Vous vous réveillez le lendemain dans votre lit de l'auberge, vous préparer, et vous mettez en route vers le centre du village, dans lequel vous espérez pouvoir obtenir plus d'informations sur les bandits."+
            "<hr>"+
            "<button onclick='instanceArene'>Se déplacer</button>"+
        "</section>"
    articleHtml("intro",texte);
}
// Fin de l'instance d'intro //

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                     //INSTANCE Auberge
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                     //INSTANCE Village
												   
var aParleAuMaireDuVillage=0;												   
function instanceVillage(){     
  let texte="bvn au village ";
  texte+="<br> <button onClick='dialogueMaireDuVillage()'>Aller parler au maire du village</button>";
  texte+="<button onClick='dialogueVillageois()'>Aller parler à un villageois</button>";
  texte+="<button onClick='instanceAventure'>Se déplacer</button>";
  
  articleHtml("Village",texte);
  
}

function dialogueMaireDuVillage(){
   let dialogue="-Salut à toi aventurier ! Je suis Sparti, le chef de ce village. Tu viens d'arriver au village n'est-ce pas ?";
   dialogue +="<br> -J'ai bien peur que tu arrives dans des temps assez troubles, une grande menace pèse sur le village, des bandits acharnés";
   dialogue+="nous attaque régulièrement et tende des embusacdes aux marchands ossant s'aventurer sur les routes des environs.";
   dialogue+="<br> Tiens je te donne ce tablard afin que les villageois te reconnaisse comme l'un des leurs. Sinon il risque de te prendre"
   dialogue+="pour un de ses maudits bandits !";
   
   let texte= dialogue+ "<br><button onClick='instanceVillage()'>Retour au Village</button>";
   
   articleHtml("Village",texte);	
   
   aParleAuMaireDuVillage=1;
}

function dialogueVillageois(){
	let dialogue="";
	let texte="";
	if(aParleAuMaireDuVillage==1){
		dialogue+="Vous avez le tablard du village ? Pourtant je vois que vous venez pas d'ici. Vous avez l'air plutôt fort.";
		dialogue+="pouriez m'aider en allant chercher du bois dans la forêt ? Plus personne n'ose s'aventurer dans la forêt, elle est envahie";
		dialogue+="de monstre et de bandits."
		texte+=dialogue + "<br><button onClick='alert(\'fonction à créer\')'>Confirmer la quête</button>";
		
		}
	else {
		dialogue+="Le villageois vous daigne du regard et s'éloigne d'un air méfiant lorsque vous l'approcher.<br>";
		texte+=dialogue +"<br>";
	}
	
	texte+= "<button onClick='instanceVillage()'>Retour au Village</button>";
	 articleHtml("Village",texte);	

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                         //INSTANCE Arène
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
                                                         //INSTANCE Magasin
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
                                                         //INSTANCE Foret	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
                                                         //INSTANCE Pont	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
                                                         //INSTANCE Camp	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
                                                         //INSTANCE Fin du Jeu		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	



                                                         //function utilitaire	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	                                                     //function combat
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	                                                     //function Inventaire	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	                                                     //function Shop
// (p-e juste à mettre dans l'instance magasin si il suffit d'ajouter les items dans l'inventaire)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	                                                     //function Carte
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
														//function ajouter des monstres personnalisés
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	
	                                                     //function sans catégorie.
														 
														
												
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
		choix = nombreAleatoire();
	}while(choix > (ennemis.length-1))
		return choix;
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
function instanceArene(){
	let texte = "";
	entreeArene++;
	if(entreeArene == 0){
		texte = "Bienvenue au tournoi du roi<br>Vous pouvez affronter des ennemis pour essayer de gagner de l'argent"+
								"Vous gagnez 2 pièces si vous battez votre premier adversaire, ensuite 4, 6, 8 et ainsi de suite<br><button onClick='combat(0,instanceArene);'>Entrer tournoi</button>";
	}
	else if(entreeArene == 1){
		argentGagne += 2;
		texte = "Bien joué, vous avez battu votre adversaire, vous gagnez " + argentGagne + "pièces d'or"+
								"Voulez vous continuer ? <button onCLick='combat(0,instanceArene);'>Continuer</button><br>"+
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


