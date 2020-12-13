# Website
Projet de groupe.



Js:
Fonction articleHtml :

La fonction articleHtml permet de génèrer dans l'espace "section avec l'id jeu" l'interface de notre rpg.
Elle supprime tout ce qui est dans cette section et la remplace par du nouveau code html basé en fonction de l'instance auquel on se situe
dans le jeu.
La fonction articleHtml crée deux article dont l'id correspond à l'instance auquel on se situe. Le premier artiche génèrer à en prefixe le mot "image"
et le second le mot "Text". 
Le premier article a pour but d'afficher une image. Tandis que le second à pour but de génerer le text + les interractions possibles.
Les arguments de cette fonction sont : le text et le nom de l'instance

Fonctionnement du code :
Chaque instance aura sa fonction afin de pouvoir la modifier aissement. Une fonction d'instance appelera la fonction articleHtml afin de génèrer
le code html.
