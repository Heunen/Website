# Website
Projet de groupe.



Ajout d'Oscar :
Pour ce projet, nous avons fait un jeu vidéo de style rpg (roleplay game). En arrivant sur la page d'acceuil, vous serez amené à créer votre propre personnage à l'aide d'un formulaire et vous pouvez aussi naviguer vers un autre "onglet" pour ajouter des ennemis personnalisés qui pourront apparaitre au cours de votre aventure, cette page de personnalisation d'ennemis ne sera plus accessible au lancement de la partie.
Une fois votre personnage créé, vous pourrez commencer la partie. Pour avoir plus simple et ne pas devoir refaire toute l'histoire pour aller à chaque évênement, vous avez la possiblité d'utiliser des boutons de "triche" pour accéder à certains endroits et à certaines actions qui ne seraient pas disponnibles en début de partie normalement.
Dans la partie, du texte s'affichera à l'écran, celui-ci vous donnera des informations et/ou des dialogues avec les personnages du jeu. Vous pourrez alors avancer dans l'histoire avec des boutons et à certains endroits faire des choix qui auront une influence sur la fin de votre partie (il y a 6 fins differentes).
Les combats sont aussi joués avec des boutons et fonctionnent avec un système de tour par tour. Lors de votre tour, vous pouvez soit attaquer un ennemi, utiliser votre attaque spéciale (à un temps de recharge) ou utiliser une potion pour regagner de la vie.

Pour vous parler de la partie plus technique du jeu, nous avons décidé de séparer les "lieux" en différentes instances/fonctions principales. 
Ces instances appellent elles-même d'autres sous-fonctions qui peuvent êtres des fonctions de style utilitaire ou bien des fonctions spécifiques à l'instance
Les fonctions de type utilitaire : c'est à dire une fonction conçue pour réaliser une action qui va être réutilisée dans les différentes instances (par exemple : la fonction combat [détaillée plus loin], la fonction nombreAleatoire qui crée un nombre aléatoire entre 0 et 10, ...).
Les fonctions spécifiques à l'instance : qui précisent une action ou bien une direction prise dans l'histoire (par exemple la fonction de départ introDia à plusieurs fonctions "enfants" qui peuvent être appelées en fonction du bouton cliqué.


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

