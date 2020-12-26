"use strict"

// initialisation du tableau des personnages Ã  vide
// un personnage est un tableau de cette forme [ nom, age, classe, sexe, niveau]
let personnage = [];
//Tableau d'ennemis
let ennemis = [
	{ race : "Orque", arme : "Epée", degats : 6, vie : 100},
	{ race : "Pillard", arme : "Arc", degats : 3, vie : 100},
	{ race : "Troll", arme : "Massue", degats : 8, vie : 100},
	{ race : "Géant", arme : "Hache", degats : 7, vie : 100}
	];
//Boss  de fin de game
let boss = {race : "Boss", arme : "Anduril", degats : 10, vie : 150};
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
//sauvegarde l'instance en cours
let instanceEnCours="";
//argent total
let argent=0;
//stock le mot aléatoire
let aleatoire="aleatoire";
//dégats de l'arme
let degatsArme=100;

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
                      formulaire.classe.value, formulaire.sexe.value, argent, 100, attaque );
  
  //on lance la première instance : intro
  instanceIntro();
  
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
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                    //INSTANCE INTRO

//Instance intro : gènere qu'un seul bouton commencer l'aventure qui lance l'instance : Aventure 
// Introduction et dialogues d'introduction ! //
// Les dialogues peuvent être changés ! //
function instanceIntro(){
  let nomDeInstance="intro";
  let alerte="Il suffit de recharger la page";
  let texte="Bienvenue à toi "+ personnage[0] +'!'; // première ligne
  texte+="<br> Pour lancer l'aventure appuis sur le bouton 'lancer l'aventure. ";
  texte+="<br> <button onClick='introHist()'>Lancer l'aventure</button>";
  texte+="<button onClick=alert'(alerte)'>modifier votre personnage</button>";
  texte+="<button onClick='instanceArene()'>Arene</button>";
  texte+="<button onClick='instanceVillage()'>Village</button>";
  texte+="<button onClick='instanceCamp(0)'>Camp</button>";
  texte+="<button onClick='combatBoss(0)'>Boss</button>";
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
            "<button onclick='seDeplacerAuberge()'>Se déplacer</button>"+
        "</section>"
    articleHtml("intro",texte);
}
// Fin de l'instance d'intro //

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                     //INSTANCE Auberge
function instanceAuberge(){
    texte=
        "<section>"+
            "Bienvenue à l'auberge mon cher ! Qu'est-ce que je te sers?"+
            "<hr>"+
            "<button onclick='aubergeBoire()'>Prendre à Boire</button>"+
            "<button onclick='aubergeManger()'>Prendre à Manger</button>"+
            "<button onclick='aubergeDormir()'>Se reposer</button>"+
            "<hr>"+
            "<button onclick='seDeplacerAuberge()'>Se déplacer</button>"+
        "</section>"
    articleHtml("auberge",texte)
}

function aubergeBoire(){
    personnage[5]+=50
    if(personnage[5]>100){
        personnage[5]=100
    }
}

function aubergeManger(){
    personnage[5]+=75
    if(personnage[5]>100){
        personnage[5]=100
    }

}

function aubergeDormir(){
    personnage[5]=100
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                     //INSTANCE Village
												   
let aParleAuMaireDuVillage=0;	
let	queteBois=0;									   
function instanceVillage(){     
  let texte="Bienvenue au village ";
  texte+="<br> <button onClick='dialogueMaireDuVillage()'>Aller parler au maire du village</button>";
  texte+="<button onClick='dialogueVillageois()'>Aller parler à un villageois</button>";
  texte+="<button onClick='seDeplacerVillage()'>Se déplacer</button>";
  
  articleHtmlSac("village",texte);
  
}

function dialogueMaireDuVillage(){
   let dialogue="-Salut à toi aventurier ! Je suis Sparti, le chef de ce village. Tu viens d'arriver au village n'est-ce pas ?"
   	 +"<br> -J'ai bien peur que tu arrives dans des temps assez troubles, une grande menace pèse sur le village, des bandits acharnés"
   	 +" nous attaque régulièrement et tendent des embusacdes aux marchands osant s'aventurer sur les routes des environs."
   	 +"<br> Tiens je te donne ce tablard afin que les villageois te reconnaissent comme l'un des leurs. Sinon ils risquent de te prendre"
  	 +" pour un de ces maudits bandits !";
   
   let texte= dialogue+ "<br><button onClick='instanceVillage()'>Retour au Village</button>";
   
   articleHtmlSac("village",texte);	
   
   aParleAuMaireDuVillage=1;
}

function dialogueVillageois(){
	let dialogue="";
	let texte="";
	if (queteBois==2){
		dialogue+="Merci de m'avoir apporté du bois, tenez je vous donne en prime un ticket pour participer aux combats dans l'arène. Je n'y ai aucune chance"
				+ " mais vous vous auriez surement toutes vos chances ! <br>";
		texte+=dialogue;
	}
	else if(queteBois==1){
		dialogue+="Alors vous m'avez coupé du bois ?";
		texte+=dialogue+ "<br><button onClick='rendreLeBois()'>Donner 30 bouts de bois</button>";
	}
	else if(aParleAuMaireDuVillage==1){
		dialogue+="Vous avez le tablard du village ? Pourtant je vois que vous ne venez pas d'ici. Vous avez l'air plutôt fort."
			+"<br>Pouriez vous m'aider en allant chercher du bois dans la forêt ? Plus personne n'ose s'y aventurer car elle est envahie"
			+" de monstre et de bandits."
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
	ajouterSac("Hache de bûcheron",1);
	queteBois=1;
	instanceVillage();
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
		instanceVillage();
		dialogueVillageois();
	}
	else{
		alert("Vous n'avez pas assez de bois pour remplir cette quête");
	}
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                         //INSTANCE Arène
//Arene ou l'aventurier peut combattre des ennemis en boucle pour gagner de l'argent (incrément de 2 pour chaque ennemi battu), s'il a deja combattu il ne peut plus participer
function instanceArene(){
	let texte = "";
	if(sac["ticket d'arène"]){
		entreeArene++;
		if(entreeArene == 0){
			texte = "Bienvenue au tournoi du roi<br>Vous pouvez affronter des ennemis pour essayer de gagner de l'argent<br>"+
									"Vous gagnez 2 pièces si vous battez votre premier adversaire et 4 au deuxième.<br> Gagnez 3 combats pour finir l'arène, mériter le torphée et gagner le gros lot, 15 pièces.<br><button onClick='combat(0,instanceArene,\"aleatoire\");'>Entrer tournoi</button>";
		}
		else if(entreeArene < 3){
			argent+=argentGagne;
			argentGagne += 2;
			texte = "Bien joué, vous avez battu votre adversaire, vous gagnez " + argentGagne + " pièces d'or !"
						+	"<br><button onCLick='combat(0,instanceArene,aleatoire)'>Continuer</button><br>";
		}
		else if(entreeArene == 3){
				argent += 15;
				texte = "Vous avez battu le nombre requis d'adversaires et reçu le trophée de l'arène. Vous gagnez 15 pièces d'or ! <br><button onClick='instanceVillage()'>Retour au village</button>";
			}
		else{
			texte = "Vous avez déjà participé au tournoi, vous ne pouvez plus participer";
		}
	}
	else{texte = "Vous ne pouvez pas encore participer au tournoi de l'arène, vous n'avez pas encore de ticket d'entrée.<br>Avancez dans la quête principale pour pouvoir participer.";}
	texte+="<hr>"
	texte+="<button onClick='seDeplacerArene()'>Se déplacer</button>";
	articleHtmlSac("arene", texte);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
                                                      //INSTANCE Magasin
/*let magasin={};
let equipement={}
function instanceMagasin(){
		let texte="Vous entrez dans le seul batiment qui semble ouvert sur la place du village. Vous pouvez apercevoir quelques objet dont vous ne"
				 +" percevez pas l'utilité. Au fond de la pièce se trouve un vieil homme barbu qui vous offre son plus beau sourire edenté";
		texte+="<br><button onClick='dialogueMarchand()'>Parler au marchand.</button>";
		texte+="<button onClick='seDeplacerMagasin()'>Se déplacer</button>";
  
  articleHtmlSac("magasin",texte);	
	
}

function dialogueMarchand(){
	let dialogue="Que voulez-vous donc acheter dans ma modeste boutique aventurier ?";
	let texte="<br><button onClick='listeMagasin()'>Consulter les objets proposés.</button>";
	articleHtmlSac("magasin",texte);	
}
function listeMagasin(){
	for(let p in magasin){
		console.log(p);
	}
	for(equipement.sort)
}
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
                                                         //INSTANCE Foret
function instanceForet(){
	let texte="Après avoir arpenté une petite route délabrée vous arrivez dans une petite clairière où débute une grande fôret de sequoia";
		texte+="<br><button onClick='seBalader()'>Se balader dans la forêt</button>";
		texte+="<button onClick='seDeplacerForet()'>Se déplacer</button>";
  
  articleHtmlSac("foret",texte);
}
function seBalader(){
	let chiffre;
	let dialogue="";
	let texte="";
	dialogue+="Il y a plein d'arbres au alentours, mais vous sentez une présence obscure dans les parages.<br>";
	if(sac["Hache de bûcheron"]==1){
		dialogue+="<button onClick='couperDuBois()'>Aller couper du bois</button>";
	}
	texte+=dialogue + "<button onClick='instanceForet()'>Retour à l'entrée de la forêt</button>";	
	articleHtmlSac("foret",texte);	
}	

function couperDuBois(){
	let chiffre;
	if(Math.random()<0.7){
		chiffre=Math.floor(Math.random()*4.1)+1;
		alert("Vous avez coupé du bois, vous avez reçu "+  chiffre +" bouts de bois");
		ajouterSac("bois",chiffre);
		seBalader();
	}
	else{	
	alert("une bête sauvage est apparu !")
	combat(0,couperDuBois,'aleatoire');
	}
	
}	

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
                                                         //INSTANCE Pont														 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
                                                         //INSTANCE Camp
let nbreCombat = 0;
function instanceCamp(entreeSortie){
	let texte = "";
	if(entreeSortie == 0){
		entreeSortie++;
		texte = "Bonjour jeune aventurier, es-tu sûr de vouloir continuer vers le camp des brigants, tout retour sera impossible.<br>"+
							"<button onClick='instanceCamp(1)'>Entrer</button><button onClick='instanceCamp(-1)'>Sortir</button>";
	}
	else if(entreeSortie == -1){
		//instancePont();
	} 
	else{
		if(nbreCombat == 0){
			nbreCombat++;
			texte = "Tu es devant le camp des brigants,ceux-ci t'ont repéré et commencent à t'attaquer.<br><button onClick='combat(0,instanceCamp,\"Pillard\")'>Se défendre</button>"
		}
		else if(nbreCombat < 3){
			nbreCombat++;
			texte = "Vous avez réussi à battre l'ennemi, un autre arrive !"+		//On pourrait faire des phrase différentes à chaque fois, celles-ci sont choisies parmis un liste en aléatoire
							"<button onClick='combat(0,instanceCamp,\"Pillard\")'>Ok</button>";
		}
		else{
			if(cle){
				texte = "Vous tuez le dernier pillard qui vous attaquait. Les autres n'osent pas s'avancer.<br> Vous ouvrez les portes du camp et vous avancez prudement jusqu'au centre du camp. Vous voyez un trône immense fait avec ce qu'il semble être des os.<br><button onClick='combatBoss(0)'>Continuer</button>";
			}
			else{ texte = "Devant vous se dresse la palissade du camp. Vous ne savez pas entrer, il vous manque la clé pour ouvrir les portes.<button onClick='instanceVillage()'>Retourner au village</button>";}
		}
	}
	articleHtmlSac('camp',texte);
}
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
			if(boss.vie != 0 && personnage[5] != 0){
				texte = "Les pillards ont fait un cercle autour de vous, vous n'avez aucun moyen de vous échapper. Volsung est en face de vous et attend votre attaque."+
								"<br>Votre vie est à : "+personnage[5]+
								"<br>Vie de Volsung : "+boss.vie+"<br>"+
								"<button onClick='attaquerBoss(boss)'>Attaque simple</button>" +
								"<button onClick='attaqueSpecialeBoss(boss)'>Attaque spéciale : " + personnage[6] + " (tours restants : " + rechargePouvoir +")</button>" ;
			}
			else if(boss.vie == 0 && personnage[5] != 0){
				texte = "Vous avez asséné un coup fatal à Volsung. Tout le monde se tait et un silence de plomb tombe sur le camp."+
								"<br> Vous vous approchez de Volsung. Les brigants ont les yeux rivés sur vous."+
								"<br><button onClick='combatBoss(3)'>Vérifier si Volsung est mort</button> <button onClick='combatBoss(103)'>Planter votre arme dans le corps de Volsung</button>";
			}
			else{ texte = "Vous êtes mort";}
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
											"<br> Vous baissez les yeux et voyez le bout d'Anduril l'épée de Volsung sortir de votre ventre. Vous tombez à genoux et juste avant de perdre connaisance vous voyez Volsung debout, marcher difficilement vers son trône."+
											"<br><button onClick='combatBoss(2)'>Mourir</button>";
							personnage[5] = 0;
							break;
		case 100 : texte = "Vous décidez de l'épargner.<br>Le sous-chef sort de ses poches une bourse et vous la tend en vous disant que ce sont toutes les pièces qui ont été volées au village.<br><button onClick='instanceFin()'>Prendre la bourse et partir</button>";
							break;
		case 101 : texte = "Vous achevez Volsung en plantant votre arme dans son coeur. Vous ramassez Anduril son épée, il n'en aura plus besoin."+
												".<br>Le sous-chef sort de ses poches une bourse et vous la tend en vous disant que ce sont toutes les pièces qui ont été volées au village.<br><button onClick='instanceFin()'>Prendre la bourse et partir</button>";
							break;
		case 102 : texte = "Vous achevez Volsung en plantant votre arme dans son coeur. Les brigands s'agenouillent, vous êtes leur nouveau chef.<br>Vous décidez de déménager le camp et de partir vers le Sud.<br><br><br>"+
												"Vous ne pourrez pas profiter de votre vie de grand banditisme, les plaies infligées par Volsung s'infèctent rapidement et vous mourrez dans d'attroces souffrances peu de temps après.";
							break;
		case 4 : texte = "Vous tranchez la gorge de Volsung. Vous prenez Anduril, l'épée de Volsung et partez en direction du village. <br>Les brigands vous regardent le faire sans rien dire...<br><button onClick='instanceFin()'>Aller au village</button>";
						break;
	}
	articleHtml('boss',texte);
}
function attaquerBoss(cible){
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
	combatBoss(2);
}
//Attaque la cible en lui infligeant 15 de dégats et ensuite appelle la fonction tourEnnemi() et puis reviens à combat
function attaqueSpecialeBoss(cible){
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
	combatBoss(2);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
                                                         //INSTANCE Fin du Jeu		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	



                                                         //function utilitaire	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	                                                     //function combat
/*Fonction qui indique un combat, les points de vie de chaque personnage et les actions à réaliser.
* @param premiereFois : Si 0, indique que c'est la premiere fois du combat que la fonction est appelée. 
* 											Si 1, indique que la fonction a deja ete appelée et donc il ne faut pas changer d'ennemi.
*												Si 2, (Pas encore implémenté) indique que la fonction est appelée dans le cadre du boss et donc il faut selectionner celui-ci.
*				 endroit : permet de faire une sauvegarde de l'endroit la premiere fois que le combat est appelé ou on doit aller pour pouvoir y aller si le combat est gagné
*/
function combat(premiereFois,endroit,type){
	if(premiereFois == 0){
		sauvegardeEndroit = endroit.name;
		ennemiApparu = ennemis[choixEnnemi(type)];
	}
/*else if(premiereFois == 2){
		ennemiApparu = boss;				Boss encore a faire
	}
*/
	let texte ="";
	if(ennemiApparu.vie != 0 && personnage[5] != 0){
		texte = "Vous rencontrez un "+ennemiApparu.race+" sur votre chemin !<br> Votre vie est à: "
									+ personnage[5] + "<br>Vie de l'adversaire : " + ennemiApparu.vie + "<br> Vous avez plusieurs choix : " 
									+"<br><button onClick='attaquer(ennemiApparu)'>Attaque simple</button>" +
									"<br><button onClick='attaqueSpeciale(ennemiApparu)'>Attaque spéciale : " + personnage[6] + " (tours restants : " + rechargePouvoir +")</button>"+
									"<br><button onClick='utiliserPotion()'>Utiliser une potion (rends de la vie)</button>";;
	}
	else if(ennemiApparu.vie == 0 && personnage[5] != 0){
		texte = "<h3>Vous avez battu votre adversaire !</h3><br> Vous pouvez acceder à la suite.<button onClick='"+sauvegardeEndroit+"()'>Suite</button>";
		ennemiApparu.vie = 100;
	}
	else{
		texte = "Vous êtes mort !";
	}
	articleHtml("combat",texte);
}
//Attaque la cible en lui infligeant des dégats entre 1 et 10 (nombreAleatoire()) et ensuite appelle la fonction tourEnnemi() et puis reviens à combat
function attaquer(cible){
	let degats = nombreAleatoire()+degatsArme;  //Mettre parseInt pour avoir une attaque "normale"
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
		let degats = 15+degatsArme;
		cible.vie -= degats;
		if(cible.vie <= 0){
			cible.vie = 0;
		}
		rechargePouvoir = 2;
		alert("Vous avez fait " + degats + " de dégats, la vie de l'adversaire est passée à " + cible.vie);
		tourEnnemi();
	} else {rechargePouvoir--; alert("Vous ne pouvez pas utiliser votre pouvoir tout de suite.\n Vous devez encore attendre " + (rechargePouvoir+1) + " tours.")};	
	combat(1);
}
//Utilisation d'une potion pour ajouter 20 de vie
function utiliserPotion(){
	if(sac[potion]){
		sac[potion]--;
		personnage[5] += 20;
	}
	else{ alert("Vous n'avez pas de potion");}
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
function retirerSac(contenu){
	if(contenu in sac && sac[contenu]>0){
		sac[contenu]--;
		return true;
	}
	alert("Vous ne disposez pas de cet objet : " + contenu);
	return false;
	
}
/* function pour afficher l'inventaire dans une table
*/
function afficherSac(){	
	let texte="<table id=tableInventaire><tr>";
	let compteur=0;
	for(let p in sac){
		compteur++;
		texte+="<td id='"+p+"'>"+p+" : "+sac[p]+"</td>";
	}
	for(let i=compteur;i<8;i++){
		texte+="<td id='vide'></td>";
	}
	texte+="</tr></table>";
	texte+="<button id=fermerInventaire onClick='deAfficherSac()'>Fermer l'inventaire</button>"
	document.getElementById(instanceEnCours+'Text').innerHTML+=texte;
} 
function deAfficherSac(){
	document.getElementById("tableInventaire").outerHTML="";
	document.getElementById("fermerInventaire").outerHTML="";
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	                                                     //function Shop
// (p-e juste à mettre dans l'instance magasin si il suffit d'ajouter les items dans l'inventaire)

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
							"<dd>Type : <select id='nomArmeEnnemi' required='required'>"+
									"<option>Massue</option>"+
									"<option>Arc</option>"+
									"<option>Hache</option>"+
									"<option>Epee</option>"+
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
}


// Fonction pour créer un nouvel objet ennemi
function nouveauEnnemi(classeEnnemi, nomArmeEnnemi, degatArmeEnnemi){
	this.race = classeEnnemi;
	this.arme = nomArmeEnnemi;
	this.degats = degatArmeEnnemi;
}

// Fonction qui ajoute le nouvel ennemi dans l'array
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

// Affiche les ennemis
function afficherEnnemi(){
	let liste = "";
	for(let i=0;i<ennemis.length;i++){
		if(i<4){
			liste += ennemis[i]["race"] + "</b> avec une " + ennemis[i]["arme"] + " qui fait " + ennemis[i]["degats"]+ " de dégats<br>";
		}
		else{
			liste+="<b>"+ennemis[i]["race"] + "</b> avec une " + ennemis[i]["arme"] + " qui fait " + ennemis[i]["degats"]+ " de dégats	<button onClick='supprimer("+i+");'>Supprimer</button><br>";
		}
	}
	document.getElementById("listeEnnemi").innerHTML = liste;
}

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
	articleHtml(nomDeInstance,texte);
	let msg="<button onClick='afficherSac()'>Afficher l'inventaire</button>"
	document.getElementById(nomDeInstance+'Text').innerHTML += msg;
}

//Crée un nombre aléatoire entier entre 0 et 10, utile pour le choix d'ennemi et les degats d'attaque
function nombreAleatoire(){
	let nombre = (Math.random()*10).toFixed(0);
	return nombre;
}
