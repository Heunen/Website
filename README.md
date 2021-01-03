# Website
Projet de groupe.



Introduction :

Pour ce projet, nous avons fait un jeu vidéo de style rpg (roleplay game). En arrivant sur la page d'accueil, vous serez amené à créer votre propre personnage à l'aide d'un formulaire et vous pouvez aussi naviguer vers un autre "onglet" pour ajouter des ennemis personnalisés qui pourront apparaitre au cours de votre aventure, cette page de personnalisation d'ennemis ne sera plus accessible au lancement de la partie. Une fois votre personnage créé, vous pourrez commencer la partie. Pour avoir plus simple et ne pas devoir refaire toute l'histoire pour aller à chaque évênement.
Dans la partie, du texte s'affichera à l'écran, celui-ci vous donnera des informations et/ou des dialogues avec les personnages du jeu. Vous pourrez alors avancer dans l'histoire avec des boutons et à certains endroits faire des choix qui auront une influence sur la fin de votre partie (il y a 6 fins differentes).
Les combats sont aussi joués avec des boutons et fonctionnent avec un système de tour par tour. Lors de votre tour, vous pouvez soit attaquer un ennemi, utiliser votre attaque spéciale (à un temps de recharge) ou utiliser une potion pour regagner de la vie.

Particularité du fonctionement du code :

Pour vous parler de la partie plus technique du jeu, nous l'expliquons ici sans rentrer dans les détails les différents codes de notre js et comment nous avons procédé pour mettre en place notre jeu.
Notre code js fonctionne principalement par appel de fonctions. C'est à dire que techniquement toutes les fonctions sont "reliées" et permettent d'en invoquer d'autres à l'aide de boutons générés dans la page html. 
Nous avons décidé de séparer les "lieux géographiques" du jeu en différentes instances. Chaque lieu correspond à une instance qui réfère à une fonction dans le js. Quand nous entrons dans un lieu sur le jeu, nous appelons dans le js la fonction correspondante. 
Et lorsque le joueur arrive dans un lieu, il a à disponibilité un ou plusieurs boutons en fonction de son avancée dans le scénario. Chaque bouton appele des fonctions dites de "sous-instances".
C'est-à-dire que ces fonctions correspondent à des actions possibles seulement dans le lieu de l'instance en cours.
Nous avons un autre type de fonctions dans le code, les fonctions utilitaires, qui ne correspondent à aucune instance précise, et qui peuvent être appelées, soit par nos fonctions d'instances ou de sous-instances, soit par des boutons.
Globalement ce sont des fonctions conçues pour réaliser une action qui peut être réutilisée dans différentes instances (par exemple : la fonction combat [détaillée plus loin], la fonction nombreAleatoire qui crée un nombre aléatoire entre 0 et 10, ...).
Etant donné que notre site web change dynamiquement en fonction des fonctions appelées. Nous avons créé une fonction qui permet, lors de l'appel de celle-ci, de générer dans la page html un article dont l'ID correspond à l'instance où on se situe. Ainsi chaque instance et chaque sous-instance correspondante, aura les mêmes règles css.


Fil rouge : 

Vous êtes un aventurier parcourant la terre. Un soir, alors que vous voyagez vous voyez une auberge sur le bord de la route. En observant celle-ci vous voyez qu'elle semble bien entretenue et décidez d'y passer la nuit.
En retrant dedans vous observez quelque chose d'anormal. L'auberge est vide, il n'y a que le tenant. Celui-ci vous explique que plus personne ne vient car une troupe de brigands s'est installée pas loin et terrorise et pille les voyageurs et villageois de la région.
Vous décidez alors d'aider ces pauvres gens à vaincre ce mal. Pour cela vous devrez aller au village et parler au maire. Il vous donnera un objet vous permettant de vous faire accepter par la population qui est méfiante des inconnus.
Ensuite vous devez aller parler à un villageois, celui-ci vous donnera une quête à réaliser pour recevoir un ticket vous permettant de participer à des combats dans l'arène du village. Grâce à cette arène vous pourrez gagner de l'argent et aller acheter de l'équipement au magasin du village pour avoir plus de chances de vaincre les brigands et leur chef (boss). Gagner dans l'arène vous permettera aussi de recevoir le trophée de celle-ci, il vous sera utile quand vous retournerez voir le maire du village. Voyant que vous avez réussi à vaincre l'arène, il vous donnera un passe partout vous permattant de passer le pont en direction du camp de brigand. Une fois le pont passé vous pourrez entrer dans le camp et essayer de vaincre le boss (attention il n'y à pas de retour en arrière et toute mort est finale, il faudra relancer le jeu pour recommencer une partie).
En résumé, l'ordre des étapes est :
	- Arrivée à l'auberge
	- Parler au maire
	- Parler au villageois et accepter sa quête
	- Faire la quête du villageois et retourner le voir
	- Combattre dans l'arène
	- Aller voir le maire et aller acheter de l'équipement au magasin
	- Aller au pont et ensuite au camp
	- Vaincre le boss
(Vous pouvez toujours aller à l'auberge pour regagner de la vie gratuitement lorsque vous êtes au village)

Une fois arrivé à une des fins du jeu, vous pouvez voir un récapitulatif des statistiques de votre partie, les infos de votre personnage, le temps pris pour finir une partie, le nombre d'ennemis vaincus, le nombre de potions bues et le nombre d'attaques spéciales utilisées.

Instance intro :

Le but d'instance d'introduction est d'introduire l'histoire via un dialogue. Le dialogue est fait de façon à ce que les réponses varient selon ce que le joueur choisit en cliquant sur le bouton, et donc en changeant de réponse, une réponse différente est chargée. Il n'y a actuellement pas beaucoup de réponses initialisées, mais il est possible d'en paramétrer plus pour rendre le dialogue encore plus interactif.

Instance auberge :

L'instance auberge est une instance divisée en 3 boutons. Ces boutons ont pour but de soigner le joueur d'un certain nombre de points de vie, afin de lui permettre de continuer l'aventure sans acheter des potions de soin. Les 3 fonctions associées fonctionnent sur un principe simple, elles augmentent les points de vie du joueur d'un nombre prédéfini (50-75-100), en prenant en compte les points de vie maximum du joueur étant donné que ceux-ci varient dans le courant de l'aventure via l'armure. Les points de vie ne peuvent donc pas dépasser le maximum donné.

Instance Village :

l'instace village est divisée en 3 fonctions principales :

La première, instanceVillage, est utilisée pour l'arrivée dans le village, deux options sont possibles parler au maire du villageois ou a un villageois.

Lorsqu'on appele la fonction dialogueMaireDuVillage, la toute première fois un dialogue s'affiche et il offre au joueur un tablard se qui change la varialbe global aParleAuMaireDuVillage en lui affectant la valeur 1. Si on rappelle la fonction dialogeMaireDuVillage on vérifie si le joueur lui a déja parlé à l'aide la variable global précèdement dites, et un dialogue en conséquance s'affiche. Si le joueur dispose de l'objet : trophée d'arène, alors un autre dialogue s'affiche et le joueur reçoit l'objet : Laissez passer.

Lorsque qu'on appelle la fonction dialogueVillageois, ici il y a 4 dialogues différents possible : 
1) Si le joueur n'avez pas encore parlé au maire du village, il n'y a qu'un simple dialogue
2) Après avoir parlé au maire du village le villageois va quémander de l'aide, le joueur peut accepter via un boutton. Si le joueur accepte la quete, il reçoit une hache, et la variable globale queteBois change en conséquence.
3) Si le joueur a accepter la quete un dialogue est affiché et un boutton propose de remmettre 30 bois. Si le joueur clic sur le bouton et qu'il dispode de 30 bois la fonction dialogueVillageois est réinvoqué et la variable globale queteBois change de valeur, sinon le joueur reçoit un alert disant qu'il ne dispose pas de 30 bois.
Lors de la validation de la quête le joueur reçoit aussi 30 pièces d'argent et un ticket d'arène.
4) Si le joueur a finit la quête, un dialogue le remerciant s'affiche.

Instance arène :

L'instance arène est divisée en 2 fonctions :

La première, la fonction instanceArene sert d'introduction à l'arène, elle indique avec un texte qu'il faut faire 3 combats pour finir l'arène et qu'on ne peut la quitter sans l'avoir finie ou être mort. On accède à la fonction suivante avec un bouton.

La seconde fonction est instanceAreneCombat. Dans cette fonction on vérifie dabord si les conditions pour participer à l'arène sont remplies, c'est à dire que soit on est déjà dans l'arène (enArene == true) soit on à le ticket d'arène dans l'inventaire.
Si les deux conditions ne sont pas remplies, on indique qu'on ne peut participer à l'arène.
Si elles sont remplies, on lance les combats de l'arène tout en comptant leur nombre pour pouvoir arrêter après 3. Le compteur de combat permet aussi d'afficher un texte different pour le permier combat et les autres.
Les combats sont réalisés en utilisant la fonction combat.
Une fois les 3 combats finis, on indique que l'arène est finie et on ajoute 45 dans l'argent et un trophée d'arène dans l'inventaire, c'est ce qu'on gagne pour avoir fini l'arène.

Instance Magasin :

Dans cette instance, le joueur peut cliquer sur un bouton pour parler au marchand. Le marchand propose différent objets que le joueur peut acheter.
La fonction ListeMagasin permet d'afficher la liste de tout les objets disponible et leur prix sous forme de boutton qui lorsque le joueur clique dessus lancer la fonction magasinAcheter.
La fonction magasinAcheter test si le joueur a assez de pièce. Si le joueur n'a pas assez de pièces pour un item, un texte s'affiche disant que le joueur ne dispose pas d'assez d'argent, et un boutton propose au joueur de revenir dans la boutique. Sinon si le joueur dispose assez d'argent on retire le prix de l'objet au porte-feuille du joueur et on retire au magasin un exemplaire de l'objet acheté, s'il n'y a plus d'objet de la même sort, lors du prochain appel de la fonction magasin celui-ci ne proposa plus cet objet en question.
De plus lors d'un achat d'objet réussi, le jeu appel la fonction Stat qui va modifier les statistiques du joueur selon l'achat et supprimer dans l'inventaire du joueur les objets inutiles (Lors de l'achat de l'armure en fer, si le joueur a une armure en cuir celle-ci est supprimée).
L'arme proposée dans le magasin est une amélioration de l'arme de base du joueur. En fonction de la classe que le joueur a selectionné début de l'aventure l'arme aura un nom différent.

Instance camp :

Le camp est divisé en 2 fonctions :

La première, instanceCamp, est utilisée pour l'arrivée dans le camp, il faut vaincre des ennemis à la chaine (au nombre de 3) pour avancer dans le camp et atteindre le boss.
Les combats sont réalisés en appellant la fonction combat et on utilise un nombre aléatoire pour afficher un des deux textes disponibles lorsqu'un ennemi nous attaque.
Une fois les 3 combats réalisés, on atteint le boss en appelant la fonction combatBoss.

La fonction combatBoss utilise un paramètre qui est utilsé pour une boucle switch qui permet d'afficher des textes differents en fonction du "chemin" choisi. Lors de la première utilisation de la fonction, on autilise le paramètre 0 et ensuite en fonction du bouton sur lequel on clique on utilisera un autre nombre comme paramètre.
Lorsqu'on arrive au cas 2, on fait un combat avec le boss, ce combat se fait dans la fonction en appellant les fonctions attaquerBoss, attaqueSpecialeBoss et utiliserPotionBoss pour attaquer normalement, utiliser une attaque spéciale et boire une potion de vie respectivement. Ces fonctions sont similaires aux fonctions attaquer, attaqueSpeciale et utiliserPotion qui sont utilisées dans la fonction combat, elles sont donc expliquées avec la fonction combat. Les fonctions génériques ne sont pas utilisées ici car elles sont liées à la fonction combat (!= combatBoss).
Lors du combat avec le boss, on vérifie la vie du boss et celle du personnage et on affiche un texte en fonction de cela. Une fois que la vie du boss est à zéro (et celle du personnage à plus que zéro), on fini la partie "combat" de la fonction et on utilise de nouveau les switch pour "naviguer" dans les textes.
En fonction des choix faits, on peut arriver à 2 des 6 fins du jeu, ou sinon on va à l'instance de fin du jeu.

Instance Fin :

Comme dans l'instance de combat, on utilise un switch dans la fonction pour créer une histoire avec plusieurs chemins.
En fonction des choix le texte sera différent. On arrive de fil en aiguille aux 4 dernières fins possibles.
Une fois les fins atteintes, on peut cliquer sur un bouton qui appele la fonction resumeFin.
Cette fonction est la dernière du jeu, elle remercie d'avoir joué au jeu et indique les "statistiques" de la partie :
Elle donne les infos basiques de notre personnage (classe, nom et age), le temps pris pour finir une partie grâce à une variable date enregistrée lors de la création du personnage et une lors du clic sur le bouton "fin", le nombre d'ennemis vaincus, les potions prises et le nombre d'attaques spéciale utilisées. Ces 3 derniers paramètre sont obtenus avec des variables incrémentées lors de chaque utilisation de la fonction réalisant l'action.

Pour redémarrer une partie il faut alors rafrichir la page pour que tout se réinitiallise.

Fonctions de déplacement:

La fonction de déplacement est une instance permettant de charger toutes les autres. Chaque instance a donc un bouton qui est relié à la fonction correspondante, afin de rejoindre l'instance souhaitée. Certaines instances ne sont pas disponibles depuis certains endroits, la fonction varie donc pour chaque endroit dans lequel le joueur se trouve.

Fonctions de combat :

La JsDoc du combat est dans le document js.
La fonction combat à 3 paramètres, premiereFois, endroit et type.
	- premiereFois : variable booléenne qui indique si c'est la première fois qu'on appele la fonction lors d'un combat.
	- endroit : on indique ici l'endroit (instance) ou on était avant la fonction combat pour pouvoir y retourner après (peut être aussi utilisée pour choisir l'endroit où on va après juste)
	- type : type d'ennemi à choisir lors du combat (choisis grâce à la fonction choixEnnemis)

La fonction commence avec un if(premiereFois).
Si premiereFois est true :
On utilise les paramètres endroit et type pour en faire une sauvegarde et choisir l'ennemi respectivement.

Si premiereFois est false :
On a un second if avec 3 cas qui on pour condition la vie du personnage et celle l'ennemi.
Si les 2 vies sont différentes de 0. On affiche un texte avec les infos pour le combat (vie du personnage et vie de l'ennemi) et 3 boutons pour combattre.
Si la vie de l'ennemi est à 0 et celle du personnage différente de 0. On indique que l'ennemi à été vaincu.
Si la vie du personnage est à 0. Indique qu'on est mort.

Fonctionnement des boutons du combat : 
Chaque bouton appelle une fonction qui lui est propre.
	- Bouton "Attaque simple" - function attaquer(cible) : la fonction attaquer à un paramètre qui est la cible de notre attaque. Les degats sont la 	  	  combinaison d'un nombre aléatoire entre 0 et 10 et les degats (constants) de l'arme utilisée et on fait simplement la vie de la cible moins les 	  degats. On vérifie ensuite si la vie est inférieure à zéro pour la remettre à 0 (car pas de vie négative). Un alert est utilisé pour indiquer les 	   	  dégats faits et la vie restante.
	  Ensuite on appelle la fonction tourEnnemi (expliquée plus loin) et on décrémente le compteur de recharge de pouvoir si celui-ci est différent de 	  0.
	  Pour finir on retourne à la fonction combat avec false comme premiereFois.
	- Bouton "Attaque spéciale" - function attaqueSpeciale(cible) : fonctionne un peu de la même manière que attaqueSimple sauf qu'avant d'infliger des 	  degats à la cible, on doit vérifier si on peut l'utiliser grâce au compteur recharge pouvoir, celui-ci est définit à 2 quand on inflige des dégats 	  avec l'attaque spéciale et est décrémenté à chaque tour. Si on ne peut pas l'utiliser, un alert nous l'indique et on doit passer le tour. Ou sinon 	  le reste fonctionne de la même manière que attaquer (les dégats ne sont plus aléatoire mais égaux à 15 + les dégats de l'arme). On a en plus la 	  variable compteurAttaqueSpeciale qui est incrémenté de 1 (utilisé dans le résumé de fin).
	- Bouton "boire une potion (rends 30 points de vie)" - function utiliserPotion : La fonction vérifie dabord si il y a des potions dans l'inventaire, 	  ensuite si la vie du personnage est différente de la vie max. Si c'est le cas, on ajoute 30 à la vie du personnage et ci celle-ci dépasse la vie 	  max autorisée, on la redescent à vie max. On incrémente le compteurPotion (pour le résumé de fin), fait appel à tourEnnemi et combat(true). Si une 	  des deux conditions n'est pas remplie, un message d'alert s'affiche.

La fonction tourEnnemi() : fonctionne avec un nombre aléatoire [0-10] et un switch. A chaque appel de la fonction, on utilise un nouveau nombre entre 0 et 10 (variable force). Il y a 3 cas possibles dans le switch en fonction de ce nombre. Si force est inférieur ou égal à 2, l'ennemi rate le personnage, si c'est entre 2 et 10 non compris, l'ennemi inflige les dégats qui lui sont associés et si c'est égal à 10, l'ennemi inflige un coup critique qui équivaut à ses dégats + 10. On vérifie à chaque fois si la vie du personnage est inférieure à 0 pour la redéfinir à 0 (pas de vie négative).

La fonction choixEnnemi(type) : est utilisé si premiereFois == true. Elle fonctionne avec 2 cas possibles, type est égal à aleatoire ou undefined, ou bien on a un type prédéfini à choisir. Si c'est aléatoire, on prend l'index d'un ennemi aléatoire dans le tableau d'ennemi.
Si un type spécifique est choisi, on crée dabord un tableau avec les index des ennemis répondant au critère et on choisit un index aléatoire dans ce nouveau tableau.
La fonction retourne l'index de l'ennemi choisi.


Fonctions d'ajout d'ennemis :

Avant de lancer une partie, on peut naviguer entre 2 "pages", la page de création de personnage et celle de création d'ennemis. Cette navigation ne se fait pas via des liens mais avec des fonctions qui réécrivent dans l'html de la page car si on utilise un lien on doit changer de page html et donc il serait beacoup plus compliqué de garder les modifications faites dans la page (les ennemis créés doivent être gardés pendant toute la partie).

La fonction ouvirFormEnnemi sert juste à écrire dans l'html lorsqu'on clique sur le "lien" pour aller sur la création d'ennemis. Le texte à écrire dans l'html est un formulaire assez simple pour créer des ennemis avec une classe, une arme et des dégats.

La fonction ajouterEnnemi ajoute l'objet ennemi dans le tableau d'ennemis. Avant cela, elle vérifie si celui-ci est différent de ceux déjà dans le tableau et refuse de l'ajouter si il y est déjà. Elle fait ensuite appel à la fonction afficherEnnemi et retourne false (car onSubmit du formulaire).

La fonction afficherEnnemi affiche la liste d'ennemis qu'on à pour la partie. Il y a au début de la liste les 6 ennemis du base du jeu et ensuite ceux qui ont été ajoutés manuellement. Ceux ajoutés peuvent être supprimés en cliquant sur le bouton supprimer qui s'affiche à coté d'eux dans la liste.

La fonction supprimer permet de supprimer l'ennemi choisi. Elle à comme a paramètre l'index de l'ennemi à supprimer et l'enlève du tableau avec un splice. Elle appelle ensuite la fonction afficherEnnemi pour mettre à jour la liste.
