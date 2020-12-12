"use strict"

// initialisation du tableau des personnages Ã  vide
// un personnage est un tableau de cette forme [ nom, age, classe, sexe, niveau]
var personnage = [];


function ajouterPersonnage(formulaire) {  
  
  // enregistrer le personnage dans le tableau
  // [ nom, age, classe, sexe, niveau] 
  personnage.push( formulaire.name.value, formulaire.age.value,
                      formulaire.classe.value, formulaire.sexe.value, 1 );
  
  
  // DÃ©terminer le titre et la race dans le message en fonction du sexe
     
  // Pour l'instant, on renvoie toujours false
  // Ainsi on est sûr de ne pas envoyer le formulaire (et de ne pas rafraichir la page)
  document.getElementById("jeu").innerHTML = "Bienvenue à toi "+ personnage[0] + " la suite de ton aventure est en préparation par nos développeurs";
  return false;
}