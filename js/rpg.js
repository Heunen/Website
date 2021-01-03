"use strict"

// initialisation du tableau des personnages à vide
// un personnage est un tableau de cette forme [ nom, age, classe, sexe, niveau]
let personnage = [];
//Tableau d'ennemis, chaque ennemi est un objet
let ennemis = [
	{ race : "Orque", arme : "Epée", degats : 6, vie : 100},
	{ race : "Pillard", arme : "Arc", degats : 3, vie : 100},
	{ race : "Troll", arme : "Massue", degats : 8, vie : 100},
	{ race : "Géant", arme : "Hache", degats : 7, vie : 100},
	{ race : "Ours", arme :"Griffe", degats : 5, vie : 60 },
	{ race : "Renard", arme :"Griffe", degats : 3, vie : 40 },
	];

//Boss (objet) de fin de partie
let boss = {race : "Boss", arme : "Anduril", degats : 10, vie : 150};

//Sauvegarde l'endroit ou l'aventurier est avant un combat
let sauvegardeEndroit = "";
//sauvegarde l'instance en cours
let instanceEnCours="";
//argent total
let argent=0;
//dégats de l'arme du personnage
let degatsArme=1;
//compteurs pour la fin du jeu, sont incrémentés lors de l'utilisation de fonctions, lorsqu'un ennemi est vaincu, lorsde l'utilsation d'une potion et lors de l'utilisation d'une attaque spéciale. 
let compteurEnnemis = 0;
let compteurPotion = 0;
let compteurAttaqueSpeciale = 0;
//Tableau qui stocke les heures, minutes, secondes et millisecondes
let horloge = [];
/*LISTE DE TOUT LES OBJETS DANS LE JEU :
potion, hache de bûcheron, ticket d'arène, trophée d'arène, laisser passer, arbalète du chasseur, dague du voleur, baguette du sorceleur,
epée du gladiateur, armure en cuir, armure en fer, clé.
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
												//Function Creation Personnage
												
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
  // [ nom, age, classe, sexe, horloge, vie, attaque spéciale, vie max] 
  personnage.push( formulaire.name.value, formulaire.age.value,
                      formulaire.classe.value, formulaire.sexe.value, horloge, 100, attaque, 100 );
  // La classe choisit par le joueur défini l'arme qui va être proposé dans le magasin.
  for(let p in equipement){
	  if(equipement[p]==personnage[2]){
		  magasin[p]=1;
	  }
  }
  
  //on lance la première instance : intro
  instanceIntro();
  document.getElementById("liensDebut").innerHTML = "";
  
  //Date prise au début de la partie et stockée dans horloge
  var date = new Date();
  horloge[0] = date.getHours();
  horloge[1] = date.getMinutes();
  horloge[2] = date.getSeconds();
  horloge[3] = date.getMilliseconds();
	
  // Pour l'instant, on renvoie toujours false
  // Ainsi on est sûr de ne pas envoyer le formulaire (et de ne pas rafraichir la page)
  return false;
}

//Charge le formulaire dans la page, comme ça on peut utiliser le formulaire ennemi car on travaille dans le body et plus la page
function afficherFormulairePerso(){
	let texte = "<form id='formulairePersonnage' action=# onSubmit='return ajouterPersonnage(this);'>"+
                    "<fieldset>"+
                        "<legend>Création du personnage</legend>"+
                            "<div>"+
                                "<label for='name'>Nom :</label>"+
                                "<input type='text' id='name' name='pseudo' maxlength='30' required='required'>"+
                                "</div>"+
                            "<div>"+
                                "<label for='age'>Age :</label>"+
                                "<input type='number' id='age' name='age' min='16' max='99' required='required'>"+
                            "</div>"+
                            "<div>"+
                                "<label for='classe'>Classe :</label>"+
                                "<select name='classe' size='1' required='required'>"+
                                    "<option>Archer</option>"+
                                    "<option>Guerrier</option>"+
                                    "<option>Mage</option>"+
                                    "<option>Voleur</option>"+
                                "</select>"+
                            "</div>"+
                            "<div>"+
                                "<label for='sexe'>Sexe :</label><br>"+
                                    "Masculin :<input type='radio' name='sexe' value='M' required='required'><br>"+
                                    "Feminin :<input type='radio' name='sexe' value='F' required='required'><br>"+
                            "</div>"+
                            "<input type='submit' value='Créer votre personnage'>"+
                    "</fieldset>"+
                "</form>";
	articleHtml("formulaire",texte);
	document.getElementById("liensDebut").innerHTML = "<a id='liens' href='#' onClick='afficherFormulairePerso();'>Accueil</a> <a id='liens' href='#' onCLick='ouvrirFormEnnemi();'>Création d'ennemis</a>";
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                    //INSTANCE INTRO

//Instance intro : gènere qu'un seul bouton commencer l'aventure qui lance l'instance : Aventure 
// Introduction et dialogues d'introduction ! //
// Les dialogues peuvent être changés ! //
// l'objectif est de créer des possibilités de réponses pour le joueur amenant à des réponses différentes. Ici les interactions sont limitées mais dans le cas d'un site plus complet, il est bien sur possible d'aller plus loin.
function instanceIntro(){
  let nomDeInstance="intro";
  let alerte="Il suffit de recharger la page";
  let texte="Bienvenue à toi "+ personnage[0] +'!'; // première ligne
  texte+="<br> Pour lancer l'aventure appuis sur le bouton 'lancer l'aventure. ";
  texte+="<br> <button onClick='introHist()'>Lancer l'aventure</button>";
  articleHtml(nomDeInstance,texte);
}
function introHist(){
    let texte="<!--Introduction à l'histoire-->"+
        "<section>"+
            "Alors que la nuit commence à tomber, vous vous approchez d'une auberge ayant l'air bien entretenue. Vous décidez donc d'y passer la nuit. Alors que vous entrez dans le bâtiment,vous vous faites accoster par l'aubergiste qui vous accueille et vous propose de prendre place. L'auberge est bien vide, et vous vous posez la question de pourquoi. Mais avant même que vous n'ayez le temps de poser la question, l'aubergiste prend la parole :"+
            "<hr>"+
            "<button onclick='introDia()'>Continuer</button>"+
        "</section>"
    articleHtml("intro",texte);
}

function introDia(){
    let texte=
        "<section>"+
            "<b>L'aubergiste :</b>J'imagine que vous vous demandez pourquoi il fait si calme, alors que nous sommes en été et que l'établissement n'a pas l'air miteux? C'est normal de se poser la question... Et pour vous répondre, c'est dû aux brigands."+
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
            "<b>L'aubergiste : </b> Il s'agit d'un groupe assez organisé, ils se sont installé dans un fort non loin. Ils ne sont pas beaucoup mais leur chef est fort... Depuis son arrivée beaucoup sont partis en laissant leurs biens à leur merci, et je pense être le seul à leur résister... Mais c'est comme cela, buvons pour oublier. Parlons plutôt de vous. Qui êtes-vous et pourquoi êtes-vous là?"+
            "<hr>"+
            "<button onclick='introDia21()'>Lui dire ce qu'il veut savoir</button>"+
            "<button onclick='introDia22()'>Ne donner que très peu d'informations</button>"+
        "<section>"
    articleHtml("intro",texte);
}

function introDia21(){
    let texte=
        "<section>"+
            "<b>Vous : </b> Je suis un aventurier, je parcours les terres afin de gagner de l'argent et découvrir un peu plus du monde qui m'entoure... Je ne suis que de passage ici car j'essaie de rejoindre la ville la plus proche pour offrir mes services. Peut-être que je pourrais être utile dans le cadre de cette crise, si vous m'aidez en retour."+
            "<hr>"+
            "<button onclick='introDia211()'>Continuer</button>"+
        "<section>"
    articleHtml("intro",texte);
}


function introDia22(){
    let texte=
        "<section>"+
            "<b>Vous : </b> Je ne parle pas beaucoup de moi et je ne préfère pas le faire ici... Partez du principe que je suis de passage."+
            "<hr>"+
            "<button onclick='introDia221()'>Continuer</button>"+
        "<section>"
    articleHtml("intro",texte);
}

function introDia211(){
    let texte=
        "<section>"+
            "<b>L'aubergiste : </b> Un aventurier nous serait de grand secours dans cette situation. Si vous acceptez, vous recevrez un paiement à la hauteur, de ma part et de celle du maire. Vous êtes notre seul espoir, s'il vous plaît aidez-nous !"+
            "<hr>"+
            "<button onclick='introDia3()'>Accepter l'offre</button>"+
            "<button onclick='introDia222()'>Lui demander quelle récompense vous pourriez recevoir</button>"+
        "</section>"
    articleHtml("intro",texte);
}
function introDia221(){
    let texte=
        "<section>"+
            "<b>L'aubergiste : </b> Peu m'importe qui vous êtes de toute façon. Je suis prêt à vous payer pour que vous nous débarrassiez de ces malandrins et je pense que le maire du village également. Qu'en dites-vous?"+
            "<hr>"+
            "<button onclick='introDia3()'>Accepter l'offre</button>"+
            "<button onclick='introDia222()'>Lui demander quelle récompense vous pourriez recevoir</button>"+
        "</section>"
    articleHtml("intro",texte);
}

function introDia222(){
    let texte=
        "<section>"+
            "<b>Vous : </b> J'aimerais avoir plus d'informations sur cette dite récompense... Je ne travaille pas pour rien, et même si c'est un plaisir d'aider, il me faut pouvoir me nourrir, me loger et m'abreuver. Qu'en est-il cher aubergiste?"+
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
            "<b>L'aubergiste : </b> Je vous propose donc déjà mon hospitalité gratuitement pendant la durée de votre quête, et j'accompagnerai cela d'un sac bien rempli d'or. Je ne sais pas ce que le maire compte vous offrir mais je pense que cette récompense devrai déjà être suffisante pour vous rendre enthousiaste."+
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
            "Vous vous réveillez le lendemain dans votre lit de l'auberge, vous vous préparez et vous mettez en route vers le centre du village dans lequel vous espérez pouvoir obtenir plus d'informations sur les bandits."+
            "<hr>"+
            "<button onclick='seDeplacerAuberge()'>Se déplacer</button>"+
        "</section>"
    articleHtml("intro",texte);
}
// Fin de l'instance d'intro //

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                     //INSTANCE Auberge
function instanceAuberge(){
    let texte=
        "<section>"+
            "Bienvenue à l'auberge mon cher ! Qu'est-ce que je te sers?"+
            "<hr>"+
            "<button onclick='aubergeBoire()'>Prendre à Boire</button>"+
            "<button onclick='aubergeManger()'>Prendre à Manger</button>"+
            "<button onclick='aubergeDormir()'>Se reposer</button>"+
            "<hr>"+
            "<button onclick='seDeplacerAuberge()'>Se déplacer</button>"+
        "</section>"
    articleHtmlSac("auberge",texte)
}

function aubergeBoire(){
	let texte="Vous prenez une grande choppe d'hydromel pour vous rassasier !";
	aubergeAction(texte,50);
}

function aubergeManger(){
	let texte="Miam, un petit ragoût de lapin. Meilleur que celui de votre feu grand-mère.";
	aubergeAction(texte,75);
}

function aubergeDormir(){
	let texte="Vous passez la nuit à l'auberge.";
	aubergeAction(texte,100);
}
function aubergeAction(msg,nombre){
	let texte=msg;
	let fullHp="";
	personnage[5]+=nombre;
    if(personnage[5]>personnage[7]){
        personnage[5]=personnage[7];
		fullHp="<br> Vous voilà complètement requinqué !";
    }
	else{
		fullHp="<br> Vous vous êtes reposé, mais vous ne vous sentez pas encore totalement requinqué";
	}
	texte+=fullHp + "<br><button onclick='instanceAuberge()'>Ok</button>";
	articleHtmlSac("auberge",texte);	
	
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                     //INSTANCE Village
												   
let aParleAuMaireDuVillage=0;	
let	queteBois=0;									   
function instanceVillage(){     
  let texte="\"Bienvenue au village Ephec\" est afiché en toute lettre sur un panneau. Vous voilà au centre de ce petit village isolé de tout, la plupart des bâtiments sont délabrés";
  texte+="commme si tout était abandonné. Sur la grand place deux batiments se distinguent de par leur état encore partiellement intact : le Magasin, et la Mairie. ";
  texte+="<br> <button onClick='dialogueMaireDuVillage()'>Aller parler au maire du village</button>";
  texte+="<button onClick='dialogueVillageois()'>Aller parler à un villageois</button>";
  texte+="<button onClick='seDeplacerVillage()'>Se déplacer</button>";
  
  articleHtmlSac("village",texte);
  
}

function dialogueMaireDuVillage(){
	let dialogue = "";
	if(sac["trophée d'arène"]){
		retirerSac("trophée d'arène");
		dialogue = "Ah je vois que vous avez gagné le tournoi organisé dans notre arène.<br>Cela prouve que vous êtes un vrai guerrier, serriez vous d'accord de nous aider pour vaincre les brigands se trouvant de l'autre côté du pont ?"+
										"<br>Nous vous en serions tous très reconnaisant et vous donnerons notre plus grand trésor.<br>Pour vous aider dans cette dure tâche je vous offre 3 potions de vie et un  laissez passer pour traverser le pont et aller dans le camp."+
										"<br><button onClick='dialogueMaireDuVillagePassePartout()'>Accepter</button>"
	}
	else if(aParleAuMaireDuVillage == 1){
		dialogue = "Re-bonjour, malheureusement je suis assez occupé actuellement, je ne peux rien pour toi.";
	}
	else{
		 dialogue="-Salut à toi aventurier ! Je suis Sparti, le chef de ce village. Tu viens d'arriver au village n'est-ce pas ?"
			 +"<br> -J'ai bien peur que tu arrives dans des temps assez troubles, une grande menace pèse sur le village.<br>Des bandits acharnés"
			 +" nous attaque régulièrement et tendent des embusacdes aux marchands osant s'aventurer sur les routes des environs."
			 +"<br> Tiens je te donne ce tablard afin que les villageois te reconnaissent comme l'un des leurs. Sinon ils risquent de te prendre"
			 +" pour un de ces maudits bandits !";
	}
	let texte= dialogue+ "<br><button onClick='instanceVillage()'>Retour au Village</button>";
	 
	articleHtmlSac("village",texte);	
	 
	aParleAuMaireDuVillage=1;
}
function dialogueMaireDuVillagePassePartout(){
	let texte = "Merci à vous, je sais que vous ne nous décevrez pas !<br><br><button onClick='instanceVillage()'>Retour au Village</button>";
	articleHtmlSac("village",texte);
	alert("Vous avez reçu 3 potions et le laissez passer.");
	ajouterSac("potion",3);
	ajouterSac("laissez passer",1);
}

function dialogueVillageois(){
	let dialogue="";
	let texte="";
	if (queteBois==2){
		dialogue+="Merci de m'avoir apporté du bois, tenez je vous donne en prime un ticket pour participer aux combats dans l'arène. Je n'y ai aucune chance mais vous vous aurez surement toutes vos chances ! <br>";
		texte+=dialogue;
	}
	else if(queteBois==1){
		dialogue+="Alors vous m'avez coupé du bois ?";
		texte+=dialogue+ "<br><button onClick='rendreLeBois()'>Donner 30 bouts de bois</button>";
	}
	else if(aParleAuMaireDuVillage==1){
		dialogue+="Vous avez le tablard du village ? Pourtant je vois que vous ne venez pas d'ici. Vous avez l'air plutôt fort."
			+"<br>Pouriez vous m'aider en allant chercher du bois dans la forêt ? Plus personne n'ose s'y aventurer car elle est envahie de monstre et de bandits."
		texte+=dialogue + "<br><button onClick='recevoirHache();'>Confirmer la quête</button>";
		}
	else {
		dialogue+="Le villageois vous daigne du regard et s'éloigne d'un air méfiant lorsque vous l'approchez.<br>";
		texte+=dialogue +"<br>";
	}
	
	texte+= "<button onClick='instanceVillage()'>Retour au Village</button>";
	 articleHtmlSac("village",texte);	

}
function recevoirHache(){
	let msg="Vous avez reçu une hâche dans votre inventaire, utilisez la dans la forêt et veuillez récuperer 30 bouts de bois";
	alert(msg);
	ajouterSac("hache de bûcheron",1);
	queteBois=1;
	dialogueVillageois();
}

function rendreLeBois(){
	if(sac.bois>=30){
		queteBois=2;
		alert("Vous avez rempli cette quête. Vous avez reçu 30 pièces d'or et un ticket d'arène");
		ajouterSac("ticket d'arène",1);
		for(let i=0;i<30;i++){
			retirerSac("bois")
		}
		argent+=30;
		dialogueVillageois();
	}
	else{
		alert("Vous n'avez pas assez de bois pour remplir cette quête");
	}
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                         //INSTANCE Arène

//vérifie si une arène est en cours
let enArene=false;
//permet de savoir à quel stade de l'arène se trouve le joueur.
let entreeArene = -1;
//Fonction de départ de l'arène, elle donne les infos importantes de l'arène, avec un bouton lançant les combats
function instanceArene(){
let texte = "";	
texte = "Bienvenue au tournoi du roi !<br>Vous pouvez affronter des ennemis pour essayer de gagner de l'argent.<br>"
      +	"Je vous rapelle que tout les combats sont des combats à MORT !<br> Gagnez 3 combats pour finir l'arène, mériter le torphée et gagner le gros lot : 45 pièces.<br><button onClick='instanceAreneCombat();'>Entrer tournoi</button>";
articleHtmlSac("arene", texte);
}

//Fonction des combats d'arène
function instanceAreneCombat(){
	let texte = "";
	//Nombre de combats à faire
	let chiffre;
	//Vérifie si soit l'arène est en cours, soit la conditon d'entrée est remplie (il faut le ticket d'arène)
	if(enArene || retirerSac("ticket d'arène",true)){
		enArene=true;
		entreeArene++;
		chiffre=3-entreeArene;
		if(entreeArene==0)
			texte = "Voici votre premier adversaire !"
				+"<br><button onCLick='combat(true,instanceAreneCombat,aleatoire)'>Continuer</button><br>";
		else if(entreeArene < 3){
			texte = "Bien joué, vous avez battu votre adversaire, il ne vous reste plus que " + chiffre + " combats de restant !"
				+ "<br><button onCLick='combat(true,instanceAreneCombat,aleatoire)'>Continuer</button><br>";
		}
		else{
			argent += 45;
			entreeArene=-1;	
			enArene=false;
			ajouterSac("trophée d'arène",1);
			texte = "Vous avez battu le nombre requis d'adversaires et reçu le trophée de l'arène. Vous gagnez 45 pièces d'or ! <br><button onClick='instanceVillage()'>Retour au village</button>";
			}
	}
	else{texte = "Vous ne pouvez pas encore participer au tournoi de l'arène, vous n'avez pas de ticket d'entrée.<br>Avancez dans la quête principale pour pouvoir participer.";}
	texte+="<hr>"
	texte+="<button onClick='seDeplacerArene()'>Se déplacer</button>";
	articleHtmlSac("arene", texte);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
                                                      //INSTANCE Magasin
let magasin={"potion":99,"armure en cuir":1,"armure en fer":1};
let magasinPrix=[6,2,15,20];
let equipement={"arbalète du chasseur":"Archer", "dague du voleur":"Voleur", "baguette du sorceleur":"Mage","epée du gladiateur":"Guerrier"}
function instanceMagasin(){
		let texte="Vous entrez dans le seul batiment qui semble ouvert sur la place du village. Vous pouvez apercevoir quelques objet dont vous ne"
				 +" percevez pas l'utilité. Au fond de la pièce se trouve un vieil homme barbu qui vous offre son plus beau sourire edenté";
		texte+="<br><button onClick='dialogueMarchand()'>Parler au marchand.</button>";
		texte+="<button onClick='seDeplacerMagasin()'>Se déplacer</button>";
  
  articleHtmlSac("magasin",texte);	
	
}
 
function dialogueMarchand(){
	let dialogue="Que voulez-vous donc acheter dans ma modeste boutique aventurier ?";
	let texte=dialogue + "<br><button onClick='listeMagasin()'>Consulter les objets proposés.</button>";
	articleHtmlSac("magasin",texte);	
}
function listeMagasin(){
	let texte="Voici toutes mes possessions qui pourraient vous interesser aventurier !<br>";
	let compteur=0;
	for(let p in magasin){
		texte+="<button onClick='magasinAcheter(\""+p+"\","+compteur+")'>Une "+p+" pour "+magasinPrix[compteur] +" pièces d'or</button>";
		compteur++;
	}
	texte+="<br><button onClick='instanceVillage()'>Retourner au Village</button>"
	articleHtmlSac("magasin",texte);
}
function magasinAcheter(p,chiffre){
	let msg="";
	if(argent>=magasinPrix[chiffre]){
		argent-=magasinPrix[chiffre];
		ajouterSac(p,1);
		retirerMagasin(p,chiffre);
		msg="Vous avez bien acheté une "+p+". Vous avez encore "+argent+" pièces d'or.";
	}
	else{
		msg="Vous n'avez pas assez d'argent";
	}
	let texte=msg+ "<br><button onClick='stat()'>Ok</button>";
	articleHtmlSac("magasin",texte);
}
function retirerMagasin(p,chiffre){
		if(magasin[p]==1){
			delete magasin[p];
			magasinPrix=nvxTab(chiffre);
		}
		else{
			magasin[p]--;
		}
}
function nvxTab(chiffre){
	let tab=[];
	for(let i=0;i<magasinPrix.length;i++){
		if(i!=chiffre){
			tab.push(magasinPrix[i]);
		}
		
	}
	return tab;
}
function stat(){
	for(let p in equipement){
		if(p in sac){
			degatsArme=8;
		}
	}
	if("armure en cuir" in sac){
		personnage[7]=150;
	}
	if("armure en fer" in sac){
		delete sac["armure en cuir"];
		personnage[7]=200;
	}
	listeMagasin();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
                                                         //INSTANCE Foret
function instanceForet(){
	let texte="Après avoir arpenté une petite route délabrée vous arrivez dans une petite clairière où débute une grande fôret de séquoias";
		texte+="<br><button onClick='seBalader()'>Se balader dans la forêt</button>";
		texte+="<button onClick='seDeplacerForet()'>Se déplacer</button>";
  
  articleHtmlSac("foret",texte);
}
function seBalader(){
	let chiffre;
	let dialogue="";
	let texte="";
	dialogue+="Il y a plein d'arbres au alentours, mais vous sentez une présence obscure dans les parages.<br>";
	if(sac["hache de bûcheron"]==1){
		dialogue+="<button onClick='couperDuBois()'>Aller couper du bois</button>";
	}
	texte+=dialogue + "<button onClick='instanceForet()'>Retour à l'entrée de la forêt</button>";	
	articleHtmlSac("foret",texte);	
}	

function couperDuBois(){
	let chiffre;
	if(nombreAleatoire()<7){
		chiffre=parseInt(nombreAleatoire())+2;
		alert("Vous avez coupé du bois, vous avez reçu "+  chiffre +" bouts de bois");
		ajouterSac("bois",chiffre);
		seBalader();
	}
	else{	
	alert("une bête sauvage est apparue !")
		if(nombreAleatoire()<6){	
		combat(true,seBalader,'Ours');
		}
		else 
		combat(true,seBalader,'Renard');
	}
	
}	

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
                                                         //INSTANCE Pont	
function instancePont(){
	let dialogue="";
	let texte="";
	    dialogue="Devant le pont se trouve deux gardes lourdement armés qui vous bloquent le passage.";
		dialogue+="-Montrez moi votre laissez passer ou rentrez au village petit intrépide !";
		texte+=dialogue + "<br><button onClick='laissezPasser()'>Montrer votre laissez passer</button>";
	texte+="<button onClick='instanceVillage()'>Rentrer au Village </button>";
  
  articleHtmlSac("pont",texte);
}

function laissezPasser(){
	if(sac["laissez passer"]==1){
		instanceCamp(0);
	}
	else {
		let dialogue="";
		let texte="";
			dialogue="-Vous n'avez pas le laissez passer veuillez déguerpir pauvre avorton.";
			texte+=dialogue + "<br><button onClick='instanceVillage()'>Rentrer au Village </button>";
		articleHtmlSac("pont",texte);
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
                                                         //INSTANCE Camp
//Compteur du nombre de combats faits dans le camp
let nbreCombat = 0;
//fonction du camp avec entreeCamp comme paramètre, pour savoir si c'est la première fois que la fonction est utilisée
function instanceCamp(entreeCamp){
	let texte = "";
	if(entreeCamp == 0){
		entreeCamp++;
		texte = "Bonjour jeune aventurier, es-tu sûr de vouloir continuer vers le camp des brigands, tout retour sera impossible.<br>"+
							"<button onClick='instanceCamp(1)'>Entrer</button><button onClick='instancePont()'>Sortir</button>";
	}
	else{
		if(nbreCombat == 0){
			nbreCombat++;
			texte = "Tu es devant le camp des brigands,ceux-ci t'ont repéré et commencent à t'attaquer.<br><button onClick='combat(true,instanceCamp,\"Pillard\")'>Se défendre</button>"
		}
		else if(nbreCombat < 3){
			nbreCombat++;
			if (nombreAleatoire() > 5){
				texte = "Vous avez réussi à battre l'ennemi, un autre arrive ! "+
							"<button onClick='combat(true,instanceCamp,\"Pillard\")'>Ok</button>";
			}
			else{texte = "Un brigand surgit devant vous, préparez-vous à l'affronter. <button onClick='combat(true,instanceCamp,\"Pillard\")'>Ok</button>";}
		}
		else{
				texte = "Vous tuez le dernier pillard qui vous attaquait. Les autres n'osent pas s'avancer.<br> Vous ouvrez les portes du camp et vous avancez prudement jusqu'au centre du camp. Vous voyez un trône immense fait avec ce qu'il semble être des os.<br><button onClick='combatBoss(0)'>Continuer</button>";
			}
		}
	articleHtmlSac('camp',texte);
}
//Fonction de combat du boss, fonctionne avec un switch pour avoir une histoire avec des choix multiples où les boutons re-appellent la fonction combatBoss avec un paramètre avancementHist different en fonction du choix
function combatBoss(avancementHist){
	ennemiApparu = boss;
	let texte ="";
	switch(avancementHist){
		case 0 : texte = "BOSS : <br>Bonjour à toi jeune aventurier, je suis Volsung de Nichor, chef de ce camp.<br>Tu as peut-être réussi à battre mes camarades mais avec moi ce sera différent, ce n'est pas pour rien que je suis leur chef."+
											"<br><button onClick='combatBoss(1)'>Je n'ai pas peur de vous</button> <button onClick='combatBoss(1)'>Et ce n'est pas pour rien que je suis arrivé jusqu'à vous</button>";
						break;
		case 1 : texte = "BOSS : <br>Hmm je ne sais pas si je dois avoir peur ou bien rigoler haha.<br>Prépare toi à goûter de ma lame"+
											"<br><button onClick='combatBoss(2)'>Et toi à goûter de la mienne</button>";
							rechargePouvoir = 0;
							break;
		case 2 : 
			//Combat avec le boss
			if(boss.vie != 0 && personnage[5] != 0){
				texte = "Les pillards ont fait un cercle autour de vous, vous n'avez aucun moyen de vous échapper. Volsung est en face de vous et attend votre attaque."+
								"<br>Votre vie est à : "+personnage[5]+
								"<br>Vie de Volsung : "+boss.vie+"<br>"+
								"<button onClick='attaquerBoss(boss)'>Attaque simple</button>" +
								"<button onClick='attaqueSpecialeBoss(boss)'>Attaque spéciale : " + personnage[6] + " (tours restants : " + rechargePouvoir +")</button>"+
								"<button onClick='utiliserPotionBoss()'>Boire une potion (rend 30 points de vie)</button>";
			}
			else if(boss.vie == 0 && personnage[5] != 0){
				texte = "Vous avez asséné un coup fatal à Volsung. Tout le monde se tait et un silence de plomb tombe sur le camp."+
								"<br> Vous vous approchez de Volsung. Les brigands ont les yeux rivés sur vous."+
								"<br><button onClick='combatBoss(3)'>Vérifier si Volsung est mort</button> <button onClick='combatBoss(102)'>Planter votre arme dans le corps de Volsung</button>";
			}
			else{ texte = "<h1>Vous êtes mort.</h1>";}
			break;
		case 3 : texte = "Vous approchez votre arme du corps de Volsung et le tapez légèrement avec le bout. Volsung lâche alors râle, il n'est pas encore mort."+
											"<br>Vous regardez autour de vous, tout le monde vous regarde mais personne n'a entendu Volsung. Vous devez faire quelque chose avant qu'on se rende compte qu'il n'est pas mort."+
											"<br><button onClick='combatBoss(31)'>Dire : Il n'est pas mort</button> <button onClick='combatBoss(32)'>Mentir et dire : Il est mort</button> <button onClick='combatBoss(4)'>Sortir un poignard et lui trancher la gorge</button>";
						break;
		case 31 : texte = "Un brigand s'approche de vous, il semble être le sous-chef du camp. <br>Il vous dit : <br>Tu as réussi à vaincre notre chef, nous te laisserons la vie sauve car tu l'as fait dans un combat équitable."+
											"<br>Sa vie est entre tes mains. Tu dois maintenant faire un choix :"+
											"<br>Tu peux l'épargner et nous le laisser, nous promettons de ne plus aller piller les villages de cette région. <button onClick='combatBoss(100)'>L'épargner<\button>"+
											"<br>Tu peux mettre fin à ses souffrances et repartir au village, nous quitterons le camp et irons autre part. <button onClick='combatBoss(101)'>L'achever</button>"+
											"<br>Tu peux mettre fin à ses souffrances et devenir notre chef, je pense qu'avec ta direction nous pourrons devenir riches. <button onClick='combatBoss(102)'>L'achever et devenir le chef</button>";
						break;
		case 32 : texte = "Après que vous ayez dit cela tous les brigands s'agenouillent. Vous êtes devenu leur chef. Vous regardez alors le trone vide qui vous attends.<br>A ce moment là vous sentez tout à coup une forte douleur dans le ventre."+
											"<br> Vous baissez les yeux et voyez le bout d'Anduril l'épée de Volsung sortir par votre nombril. Vous tombez à genoux et juste avant de perdre connaisance vous voyez Volsung debout, marcher difficilement vers son trône."+
											"<br><button onClick='combatBoss(33)'>Mourir</button>";
							break;
		case 33 : texte = "<h1>Vous êtes mort.</h1><br>Ce n'est pas bien de mentir.<br><button onClick='resumeFin()'>The END</button>";
							break;
		case 100 : texte = "Vous décidez de l'épargner.<br>Le sous-chef sort de ses poches une bourse et vous la tend en vous disant que ce sont toutes les pièces qui ont été volées au village.<br><button onClick='instanceFin(2)'>Prendre la bourse et partir</button>";
							ajouterSac("bourse",1);
							break;
		case 101 : texte = "Vous achevez Volsung en plantant votre arme dans son coeur. Vous ramassez Anduril son épée, il n'en aura plus besoin."+
												".<br>Le sous-chef sort de ses poches une bourse et vous la tend en vous disant que ce sont toutes les pièces qui ont été volées au village.<br><button onClick='instanceFin(1)'>Prendre la bourse et partir</button>";
							ajouterSac("bourse",1);
							break;
		case 102 : texte = "Vous achevez Volsung en plantant votre arme dans son coeur. Les brigands s'agenouillent, vous êtes leur nouveau chef.<br>Vous décidez de déménager le camp et de partir vers le Sud.<br><br><br>"+
												"Vous n'aurez pas le temps de profiter de votre vie de grand banditisme, les plaies infligées par Volsung s'infèctent rapidement et vous mourrez dans d'atroces souffrances peu de temps après."+
												"<br><button onClick='resumeFin()'>The END</button>";
							break;
		case 4 : texte = "Vous tranchez la gorge de Volsung. Vous prenez Anduril, l'épée de Volsung et partez en direction du village. <br>Les brigands vous regardent le faire sans rien dire...<br><button onClick='instanceFin(3)'>Aller au village</button>";
						break;
	}
	articleHtml('boss',texte);
}
//Fonction utilisée dans le combat avec le boss pour attaquer, inflige des degats aléatoires + degatsArme
//Appelle la fonction tourEnnemi et reviens a combatBoss
function attaquerBoss(cible){
	let degats = parseInt(nombreAleatoire()) + degatsArme;
	cible.vie -= degats;
	if(cible.vie <= 0){
		cible.vie = 0;
	}
	alert("Vous avez fait " + degats + " de dégats, la vie de l'adversaire est passée à " + cible.vie);
	tourEnnemi();
	if(rechargePouvoir > 0){
		rechargePouvoir--;
	}
	combatBoss(2);
}
//Attaque la cible en lui infligeant 15 de dégats + les degats de l'arme et ensuite appelle la fonction tourEnnemi() et puis reviens à combatBoss
function attaqueSpecialeBoss(cible){
	if(rechargePouvoir <= 0){
		let degats = 15 + degatsArme;
		cible.vie -= degats;
		if(cible.vie <= 0){
			cible.vie = 0;
		}
		rechargePouvoir = 2;
		alert("Vous avez fait " + degats + " de dégats, la vie de l'adversaire est passée à " + cible.vie);
		compteurAttaqueSpeciale++;
	} else {rechargePouvoir--; alert("Vous ne pouvez pas utiliser votre pouvoir tout de suite.\n Vous devez encore attendre " + (rechargePouvoir+1) + " tours.")};
	tourEnnemi();
	combatBoss(2);
}
//Utilisation d'une potion pour ajouter 30 de vie si il y en a dans l'inventaire
function utiliserPotionBoss(){
	if(sac.potion > 0){
		if(personnage[5]<personnage[7]){
			personnage[5] += 30;
			retirerSac("potion");
			alert("Vous avez bu une potion de vie.");
			if(personnage[5]>personnage[7]){
				personnage[5]=personnage[7];
			}
			compteurPotion++;
			tourEnnemi();
			combatBoss(2);
		}
		else{
			alert("Vous êtes déjà au maximum de votre vie, vous ne pouvez pas utiliser de potion");
		}
	}
	else{alert("Vous n'avez pas de potion dans votre inventaire");}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
                                                         //INSTANCE Fin du Jeu		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//Fonction de fin de jeu, avec comme paramètre avancementHist. Celui-ci sera different en fonction des choix faits dans le combatBoss.
//fonctionne avec un switch pour faire des histoire à choix multiples, avec chaque bouton qui est la fonction instanceFin avec un paramètre différent
function instanceFin(avancementHist){
	let texte = "";
	switch(avancementHist){
		case 1 : texte = "Vous revenez au village après avoir vaincu le chef des brigands, Volsung. Tandis que vous arrivez sur la place centrale, vous remarquez que les villageois commencent à sortir de leur maison et vous observent.<br>"+
										"Alors que vous atteignez l'entrée de la mairie, une foule silencieuse s'est formée autour de vous. Vous toquez à la porte.<br>Le maire ouvre et vous dit :<br>"+
										"- Aaah je vois que vous êtes toujours en vie, vous avez donc vaincu les brigands ?<br>"+
										"<button onCLick='instanceFin(11)'>Oui, leur chef à été vaincu, il est blessé. Ils arreteront de vous embêter</button><br>"+
										"<button onClick='instanceFin(12)'>Oui, j'ai tué leur chef. (mentir)</button>";
										break;
		case 2 : texte = "Vous revenez au village après avoir vaincu le chef des brigands, Volsung. Tandis que vous arrivez sur la place centrale, vous remarquez que les villageois commencent à sortir de leur maison et vous observent.<br>"+
										"Alors que vous atteignez l'entrée de la mairie, une foule silencieuse s'est formée autour de vous. Vous toquez à la porte.<br>Le maire ouvre et vous dit :<br>"+
										"- Aaah je vois que vous êtes toujours en vie, vous avez donc vaincu les brigands ?<br>"+
										"<button onClick='instanceFin(12)'>Oui, j'ai tué leur chef.</button>";
										break;
		case 3 : texte = "Vous revenez au village après avoir vaincu le chef des brigands, Volsung. Tandis que vous arrivez sur la place centrale, vous remarquez que les villageois commencent à sortir de leur maison et vous observent.<br>"+
										"Alors que vous atteignez l'entrée de la mairie, une foule silencieuse s'est formée autour de vous. Vous toquez à la porte.<br>Le maire ouvre et vous dit :<br>"+
										"- Aaah je vois que vous êtes toujours en vie, vous avez donc vaincu les brigands ?<br>"+
										"<button onClick='instanceFin(31)'>Oui, j'ai tué leur chef.</button>";
										break;
		case 11 : texte = "Je suis entré dans leur camp et défié le chef. J'ai réussi à le battre.<br>Mais je ne l'ai pas tué, le sous-chef m'a promis qu'ils ne vous embêterons plus.<br>"+
											"<button onClick='instanceFin(111)'>Rendre la bourse</button> <button onClick='instanceFin(112)'>Garder la bourse</button>";
											break;
		case 12 : texte = "Je suis entré dans leur camp et défié le chef. J'ai réussi à le battre et je l'ai tué. Je voulais m'assurer qu'ils ne vous embêtent plus.<br>"+
											"<button onClick='instanceFin(111)'>Rendre la bourse</button> <button onClick='instanceFin(112)'>Garder la bourse</button>";
											break;
		case 31 : texte = "Je suis entré dans leur camp et défié le chef. J'ai réussi à le battre et je l'ai tué. Je voulais m'assurer qu'ils ne vous embêtent plus.<br>"+
											"<button onClick='instanceFin(11113)'>Je souhaiterai recevoir un payement maintenant que j'ai accompli ma mission.</button>";
											break;
		case 111 : texte = "J'ai pu récuperer ce que les brigands vous avaient pillé. Voici la bourse qu'ils m'ont donné.<br><button onClick='instanceFin(1111)'>Donner la bourse</button>";
								retirerSac("bourse");
								break;
		case 112 : texte = "Le maire du village vous félicite : Merci à vous étranger. Ce que vous avez fait pour ce village est digne d'un vrai chevalier.<br>Dommage que vous n'avez pas réussi à réccupérer ce qu'ils nous avaient dérobé.<br>"+
												"<button onClick='instanceFin(1121)'>Continuer</button> <button onClick='instanceFin(111)'>Rendre la bourse</button>";
		case 1111 : texte = "Le maire vous dit : Un tout grand merci, vous êtes vraiment un héros. Sans vous nous aurions continué à vivre dans la peur et la pauvreté. Nous vous sommes mille fois reconnaissant.<br>"+
												"Dites-nous ce que vous souhaitez et nous ferons tout notre possible pour le réaliser.<br>"+
												"<button onClick='instanceFin(11111)'>Je ne veux rien, voir votre bonheur à été ma récompense</button><br>"+
												"<button onClick='instanceFin(11112)'>Si vous acceptez, j'aimerai bien vivre dans votre village, il est temps que je pose racine</button><br>"+
												"<button onClick='instanceFin(11113)'>J'aimerais juste un peu d'argent comme convenu avec vous et l'aubergiste</button><br>"+
												"<button onClick='instanceFin(11114)'>Il me faudrait une lettre attestant de mes faits d'arme</button>";
												break;
		case 1121 : texte = "Malheureusement je n'ai rien pu récupérer, j'ai déjà réussi à les faire partir, ça aurait relevé du miracle de pouvoir avoir ça en plus.<br>"+
													"<button onClick='instanceFin(11113)'>Continuer</button>";
													break;
		case 11111 : texte = "Sans rien dire de plus vous reprenez chemin, tous vous observent.<br>Depuis ce jour, le village est paisible et on apprend aux enfants que c'est l'oeuvre d'un mystérieux étranger qui a disparu dans la nature.<br>"+
													"Certains disent même que c'est l'oeuvre d'un dieu...<br>"+
													"<button onClick='resumeFin()'>The END</button>";
													break;
		case 11112 : texte = "Le maire du vilage accepte directement.<br>Vous vivrez au village jusqu'à votre mort des années plus tard. Entre-temps vous fondez une famille et devenez une famille importante du village.<br>"+
													"<button onClick='resumeFin()'>The END</button>";
													break;
		case 11113 : texte = "Le maire du village vous offre 150 pièces d'or. Vous disparaissez peu de temps après la fête organisée en votre honneur. On dit de vous que vous avez continué votre vie de vagabond en allant d'auberge en auberge et en faisant des petits boulots.<br>"+
													"<button onClick='resumeFin()'>The END</button>";
													break;
		case 11114 : texte = "Le maire vous écrit alors une lettre encensant vos exploit. Vous quittez le village pour aller au chateau du roi et grâce à celle-ci, le roi vous prend dans sa cours en tant que chevalier. Vous ferez des centaines de batailles et deviendrez un des chevaliers les plus connus du royaume.<br>"+
													"<button onClick='resumeFin()'>The END</button>";
													break;
		default : texte = "oups il semblerait qu'il y ait une erreur.";
	}
	articleHtml("fin",texte);
}

//Fonction de toute fin qui affiche un résumé des statistiques de la partie
function resumeFin(){
	//Création d'une date lors de l'appel de la fonction et calcule la difference entre les heures, minutes, secondes et millisecondes avec la date prise en début de partie
	var date = new Date();
	let millisecondes = date.getMilliseconds() - horloge[3]
	let secondes = date.getSeconds() - horloge[2];
	let minutes = date.getMinutes() - horloge[1];
	let heure = date.getHours() - horloge[0];

	//Si une des différences est négative, enlève une unité à la variable supérieure et l'ajoute pour avoir une valeur positive (après mise à échelle)
	if(millisecondes < 0){
		secondes--;
		millisecondes += 1000;
	}
	if(secondes < 0){
		minutes--;
		secondes += 60;
	}
	if(minutes<0){
		heure--;
		minutes += 60;
	}
	if(heure<0){
		heure += 24;
	}

	//Crono qui affichera les paramètres en fonction du temps pris
	let chrono = "";
	if(heure==0 && minutes==0){
		chrono = secondes+", "+millisecondes+" sec";
	}
	else if(heure==0){
		chrono = minutes+" min et "+secondes+", "+millisecondes+" sec";
	}
	else{ chrono = heure+" h "+minutes+" min et "+secondes+", "+millisecondes.toFixed(2)+" sec";}
	//Texte de fin avec le résumé
	let texte = "<h1>Vous avez fini notre jeu !</h1><br>Merci d'y avoir joué, nous espérons que ça vous à plu. N'hésitez pas à le recommencer pour trouver toutes les fins possibles.<br>Voici un petit résumé de vos statistiques : <br>"+
								"Vous avez fini le jeu en : " +chrono+"<br>"+
								"Avec votre personnage : un "+personnage[2]+" nommé "+personnage[0]+", age : "+personnage[1]+" ans.<br>"+
								"Vous avez battu : " + compteurEnnemis + " ennemis.<br>"+
								"Pris " + compteurPotion + " potions.<br>"+
								"Et utilisé " + compteurAttaqueSpeciale + " attaques spéciales."
								
	articleHtml("resume",texte);
}

                                                         //function utilitaire	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	                                                     //function combat

//Sauvegarde l'ennemi apparu dans le combat
let ennemiApparu;
//Compteur pour laisser un temps avant de réutiliser le pouvoir
let rechargePouvoir = 0;

/** @function combat
*	Fonction qui indique un combat, les points de vie de chaque personnage et les actions à réaliser si les variables de vie du personnage et des ennemis sont différentes de 0. 
*	Sinon indique que l'ennmi est mort ou bien que le personnage est mort.
* @param {boolean} premiereFois - indique si c'est la première fois qu'on utilise la fonction
* @param {string} endroit - permet de sauver l'endroit ou on était avant l'appel de la fonction (ou bien ou on désire aller)
* @param {string} type - type d'ennemis à utiliser lors du combat
*
* @example - combat(true,"instanceForet","aleatoire");
*/
function combat(premiereFois,endroit,type="aleatoire"){
	if(premiereFois){
		sauvegardeEndroit = endroit.name;
		ennemiApparu = ennemis[choixEnnemi(type)];
	}
	let texte ="";
	if(ennemiApparu.vie != 0 && personnage[5] != 0){
		texte = "Vous rencontrez un "+ennemiApparu.race+" sur votre chemin !<br> Votre vie est à: "
									+ personnage[5] + "<br>Vie de l'adversaire : " + ennemiApparu.vie + "<br> Vous avez plusieurs choix : " 
									+"<br><button onClick='attaquer(ennemiApparu)'>Attaque simple</button>" +
									"<br><button onClick='attaqueSpeciale(ennemiApparu)'>Attaque spéciale : " + personnage[6] + " (tours restants : " + rechargePouvoir +")</button>"+
									"<br><button onClick='utiliserPotion()'>Boire une potion (rends 30 points de vie)</button>";;
	}
	else if(ennemiApparu.vie == 0 && personnage[5] != 0){
		texte = "<h3>Vous avez battu votre adversaire !</h3><br> Vous pouvez accéder à la suite.<button onClick='"+sauvegardeEndroit+"()'>Suite</button>";
		ennemiApparu.vie = 100;
	}
	else{
		texte = "<h1>Vous êtes mort !</h1>";
	}
	articleHtml(instanceEnCours,texte);
}
//Attaque la cible en lui infligeant des dégats entre 1 et 10 (nombreAleatoire()) et ensuite appelle la fonction tourEnnemi() et puis reviens à combat
function attaquer(cible){
	let degats = parseInt(nombreAleatoire())+degatsArme;
	cible.vie -= degats;
	if(cible.vie <= 0){
		cible.vie = 0;
	}
	alert("Vous avez fait " + degats + " de dégats, la vie de l'adversaire est passée à " + cible.vie);
	tourEnnemi();
	if(rechargePouvoir > 0){
		rechargePouvoir--;
	}
	combat(false);
}
//Attaque la cible en lui infligeant 15 de dégats et ensuite appelle la fonction tourEnnemi() et puis reviens à combat
function attaqueSpeciale(cible){
	if(rechargePouvoir <= 0){
		let degats = 15+degatsArme;
		cible.vie -= degats;
		if(cible.vie <= 0){
			cible.vie = 0;
		}
		rechargePouvoir = 2;
		alert("Vous avez fait " + degats + " de dégats, la vie de l'adversaire est passée à " + cible.vie);
		compteurAttaqueSpeciale++;
		tourEnnemi();
	} else {rechargePouvoir--; alert("Vous ne pouvez pas utiliser votre pouvoir tout de suite.\n Vous devez encore attendre " + (rechargePouvoir+1) + " tours.")};	
	combat(false);
}
//Utilisation d'une potion pour ajouter 30 de vie
function utiliserPotion(){
	if(sac.potion > 0){
		if(personnage[5]<personnage[7]){
			personnage[5] += 30;
			retirerSac("potion");
			alert("Vous avez bu une potion de vie.");
			if(personnage[5]>personnage[7]){
				personnage[5]=personnage[7];
			}
			compteurPotion++;
			tourEnnemi();
			combat(false);
		}
		else{
			alert("Vous êtes déjà au maximum de votre vie, vous ne pouvez pas utiliser de potion");
		}
	}
	else{alert("Vous n'avez pas de potion dans votre inventaire");}
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
//Fonction qui permet de choisir un ennemi aléatoire dans la liste d'ennemis via la fonction nombreAleatoire() et permet de choisir un ennemi en fonction de sa race si celle-ci a ete donnée
function choixEnnemi(type){
	let choix = 9999;
	if(type == "aleatoire"){
		choix = nombreAleatoire()*(ennemis.length-1)/10;
		return Math.round(choix);
	}
	else{
		let listeIntermediaire = [];
		for(let i in ennemis){
			let valeurEnnemis = Object.values(ennemis[i]);
			if(valeurEnnemis[0] == type){ listeIntermediaire.push(ennemis.indexOf(ennemis[i]));}
			choix = listeIntermediaire[Math.round(nombreAleatoire()*(listeIntermediaire.length-1)/10)];
		}
	return choix;
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	                                                     //function Inventaire	
														 


var sac={};
let affiche=false;
/* Fonction qui prend en paramètre l'objet que l'on doit mettre dans le sac, et le nombre de fois
contenu est un string, nombre un integer
*/
function ajouterSac(contenu,nombre){
	if(contenu in sac){
		sac[contenu]+= nombre;
	}
	else{
	sac[contenu]=nombre;
	}
}
/*function qui retire une fois un element de l'array et renvoie true si l'élément à bien pu être retiré.
*/
function retirerSac(contenu,bool){
	if(contenu in sac && sac[contenu]>0){
		sac[contenu]--;
		if(sac[contenu]==0){
			delete sac[contenu];
		}
		return true;
	}
	if(!bool){
		alert("Vous ne disposez pas de cet objet : " + contenu);
	}
	return false;
	
}
/* function pour afficher l'inventaire dans une table
*/
function afficherSac(){	
	if(!affiche){
		affiche=true;
		let texte="<table id=tableInventaire><tr>";
		let compteur=0;
		let a;
		for(let p in sac){
			a=espace(p);
			compteur++;
			texte+="<td id='"+a+"'>"+sac[p]+"</td>";
		}
		for(let i=compteur;i<8;i++){
			texte+="<td id='vide'></td>";
		}
		texte+="</tr></table>";
		texte+="<button id=fermerInventaire onClick='deAfficherSac()'>Fermer l'inventaire</button>"
		document.getElementById(instanceEnCours+'Text').innerHTML+=texte;
	} 
}
function deAfficherSac(){
	affiche=false;
	document.getElementById("tableInventaire").outerHTML="";
	document.getElementById("fermerInventaire").outerHTML="";
	
}
function espace(mot){
	let newMot="";
	for(let i=0;i<mot.length;i++){
		if(mot[i]==" " || mot[i]=="'"){
			newMot+="_";
		}
		else if (mot[i] == "é" ||mot[i] == "è" ||mot[i] == "ê"){
			newMot+= "e";
		}
		else if (mot[i] == "à"){
			newMot+= "a";
		}
		else if (mot[i] == "ç"){
			newMot+= "c";
		}
		else if (mot[i] == "ù" || mot[i]=="û"){
			newMot+= "u";
		}
		else{
			newMot+=mot[i];
		}
	}
	return newMot;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	                                                    //function Carte
// Fonction général à modifier pour diff instances.
function seDeplacer(){
    let texte= 
        "<section>"+
            "se déplacer vers : "+
            "<hr>"+
            "<button onclick='instanceVillage()'>Le village</button>"+
            "<button onclick='instanceAuberge()'>L'auberge</button>"+
            "<button onclick='instanceAuberge()'>La forêt</button>"+
            "<button onclick='instancePont()'>Le pont</button>"+                
            "<button onclick='instanceArene()'>L'arène</button>"+
        "</section>";
    articleHtml("carte",texte);
}

// Fonction par instance

function seDeplacerVillage(){
    let texte= 
        "<section>"+
            "se déplacer vers : "+
            "<hr>"+
            "<button onclick='instanceVillage()'>Le village</button>"+
            "<button onclick='instanceAuberge()'>L'auberge</button>"+
            "<button onclick='instanceForet()'>La forêt</button>"+
            "<button onclick='instancePont()'>Le pont</button>"+                
            "<button onclick='instanceArene()'>L'arène</button>"+
            "<button onclick='instanceMagasin()'>Le magasin</button>"+
        "</section>";
    articleHtml("carte",texte);
}

function seDeplacerAuberge(){
    let texte= 
        "<section>"+
            "se déplacer vers : "+
            "<hr>"+
            "<button onclick='instanceVillage()'>Le village</button>"+
            "<button onclick='instanceAuberge()'>L'auberge</button>"+
        "</section>";
    articleHtml("carte",texte);
}

function seDeplacerArene(){
    let texte= 
        "<section>"+
            "se déplacer vers : "+
            "<hr>"+
            "<button onclick='instanceVillage()'>Le village</button>"+             
            "<button onclick='instanceArene()'>L'arène</button>"+
        "</section>";
    articleHtml("carte",texte);
}

function seDeplacerForet(){
    let texte= 
        "<section>"+
            "se déplacer vers : "+
            "<hr>"+
            "<button onclick='instanceVillage()'>Le village</button>"+
            "<button onclick='instanceForet()'>La forêt</button>"+
        "</section>";
    articleHtml("carte",texte);
}

function seDeplacerPont(){
    let texte= 
        "<section>"+
            "se déplacer vers : "+
            "<hr>"+
            "<button onclick='instanceVillage()'>Le village</button>"+
            "<button onclick='instancePont()'>Le pont</button>"+
	    "<button onclick='instanceCamp()'>Le camp des brigantds</button>"+
        "</section>";
    articleHtml("carte",texte);
}

function seDeplacerMagasin(){
    let texte= 
        "<section>"+
            "se déplacer vers : "+
            "<hr>"+
            "<button onclick='instanceVillage()'>Le village</button>"+               
            "<button onclick='instanceMagasin()'>Le magasin</button>"+
        "</section>";
    articleHtml("carte",texte);
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
						//function ajouter des monstres personnalisés
//Fonction qui affiche le formulaire de création des ennemis
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
	    						"<option>Ours</option>"+
	    						"<option>Renard</option>"+
						"</select>"+
					"</div>"+
					"<div>"+
						"<dl>"+
							"<dt>Arme:</dt>"+
							"<dd>Type : <select id='nomArmeEnnemi' required='required'>"+
									"<option>Massue</option>"+
									"<option>Arc</option>"+
									"<option>Hache</option>"+
									"<option>Epée</option>"+
						"</select>"+
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
	document.getElementById("liensDebut").innerHTML = "<a id='liens' href='#' onClick='afficherFormulairePerso();'>Accueil</a> <a id='liens' href='#' onCLick='ouvrirFormEnnemi();'>Création d'ennemis</a>";
}

// Fonction qui ajoute le nouvel ennemi dans l'array si celui-ci n'est pas déjà présent
function ajouterEnnemi(formulaire){
	var ennemiIntermediaire = {race : formulaire.classeEnnemi.value, arme : formulaire.nomArmeEnnemi.value, degats : parseInt(formulaire.degatArmeEnnemi.value), vie : 100};
	for(let i in ennemis){
		if((ennemiIntermediaire.race === ennemis[i].race) && (ennemiIntermediaire.arme === ennemis[i].arme) && (ennemiIntermediaire.degats === ennemis[i].degats)){
			alert("Vous avez déjà créé ce type d'ennemi");
			return false;
		}
	}
	ennemis.push(ennemiIntermediaire);
	afficherEnnemi();
	return false;
}

// Affiche les ennemis et ajoute un bouton pour les supprimer à côté de ceux créés manuellement par l'utilisateur
function afficherEnnemi(){
	let liste = "";
	for(let i=0;i<ennemis.length;i++){
		if(i<6){
			liste += ennemis[i]["race"] + "</b> avec une " + ennemis[i]["arme"] + " qui fait " + ennemis[i]["degats"]+ " de dégats<br>";
		}
		else{
			liste+="<b>"+ennemis[i]["race"] + "</b> avec une " + ennemis[i]["arme"] + " qui fait " + ennemis[i]["degats"]+ " de dégats	<button onClick='supprimer("+i+");'>Supprimer</button><br>";
		}
	}
	document.getElementById("listeEnnemi").innerHTML = liste;
}
//Supprime l'ennemi choisit avec le paramètre aSupprimer (index de l'ennemi dans le tableau)
function supprimer(aSupprimer){
	ennemis.splice(aSupprimer,1);
	afficherEnnemi();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	
	                                                     //function sans catégorie.
														 
//paramètre : le nom de l'instance, et le texte à afficher dans l'article text
// modifie la section(id jeu) et y crée deux article tel que le premier article a comme id: image+nomDeInstance et le second texte+nomDeInstance
// et le paramètre texte est injecter dans le deuxième article. Place le nom de l'instance en cours dans la variable instanceEnCours
function articleHtml(nomDeInstance,texte){
	instanceEnCours=nomDeInstance;
    let mHtml= '<div id="'+nomDeInstance+'">'
                    + '<article id="'+nomDeInstance+'Image"></article>'
			        + '<article id="'+nomDeInstance+'Text">'
			            + texte
                    + "</article>";
               +'</div>'
	document.getElementById("jeu").innerHTML = mHtml;
}
function articleHtmlSac(nomDeInstance,texte){
	affiche=false;
	articleHtml(nomDeInstance,texte);
	let msg="<button onClick='afficherSac()'>Afficher l'inventaire</button>"
	document.getElementById(nomDeInstance+'Text').innerHTML += msg;
}
//stock le mot aléatoire
let aleatoire="aleatoire";
//Crée un nombre aléatoire entier entre 0 et 10, utile pour le choix d'ennemi et les degats d'attaque
function nombreAleatoire(){
	let nombre = (Math.random()*10).toFixed(0);
	return nombre;
}
