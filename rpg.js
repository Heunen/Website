"use strict"

// initialisation du tableau des personnages Ã  vide
// un personnage est un tableau de cette forme [ nom, age, classe, sexe, niveau]
var personnage = [];

//paramètre : les données du formulaire
//rempli le tableau personnage de ses données.
function ajouterPersonnage(formulaire) {  
  
  // enregistrer le personnage dans le tableau
  // [ nom, age, classe, sexe, niveau] 
  personnage.push( formulaire.name.value, formulaire.age.value,
                      formulaire.classe.value, formulaire.sexe.value, 1 );
  
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
