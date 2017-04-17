# Lab Cobalt 2h

Dans ce TP nous allons voir comment réaliser une application hybride Cobalt de liste d'événements.

Cette app sera composée de :

- Une liste d'événements sur la vue principale,
- Une page pour editer/créer un évenement.

Vous utiliserez :

- Les barres natives Cobalt
- La navigation native
- Un plugin Cobalt de communication entre les webviews.
- Une page hybride web/natif intégrant une carte interractive native.

Le code source de cette application est disponnible sur la clé USB qui vous a été fournie dans le dossier `cobalt-tutorial` ou à l'url suivante :
```
git clone --recursive https://github.com/cobaltians/cobalt-tutorial.git
```

Pour chaque étape, Les liens vers la documentation Cobalt qui vous seront utile sont indiqués. Ces pages sont aussi disponnibles sur la clé USB qui vous a été fournie dans le dossier `doc` au format wiki markdown.

Dans ce TP vous toucherez exclusivement à ces fichiers :
- Pour la partie web commune : cobalt.conf, index.html et event.html
- Pour Android : CreateFragment.java, 
- Pour iOS : CreateViewController.m

Si vous touchez à d'autres fichiers c'est que vous faites peut être fausse route. Ou que vous êtes très créatif ;)

Si vous êtes perdus vous vouvez **vous référer aux [solutions](lab_2h_fr_soluce) qui vous ont été transmise** ou **récuprérer via git les solutions de chaque étape**. Dans ce cas il faudra : 

- Supprimer toutes vos modifications locales avec `git stash && git stash drop`
- Checkout la branche correspondante au step indiqué. Par exemple `git checkout step-5`


# Etape 1 - initialiser Cobalt

Avant toute chose, faites un `git status` et assurez vous d'être sur la branche `step-1`.

L'application dans laquelle vous débarquez contient déjà deux petites pages web, index.html et create.html correspondant aux deux vues. La CSS est déjà faite.

Le code web commun est dans `Android/app/src/main/assets/common`. Le projet iOS pointe sur ce dossier également.

## Objectif

Votre but ici est d'initialiser Cobalt coté web afin qu'il puisse communiquer avec le natif. Et de vérifier que le contenu de la page s'affiche quand vous lancez l'application sur votre téléphone.

Vous pouvez utiliser son mode `debugInBrowser` de Cobalt pour prévisualiser la page dans votre navigateur.

## Documentation

Documentation utile pour cette étape :

- [cobalt.init](https://github.com/cobaltians/Cobalt/wiki/cobalt.init)


## Solution

Voir le document de solutions ou via git : 

```
git stash && git stash drop && git checkout step-2
```



# Etape 2 - Configuration de la barre native et naviguation

Votre objectif est de :

- Ajouter un titre à la page principale de l'application
- Ajouter un bouton "+" en haut à droite dans cette barre
- Naviguer vers la vue `event.html` quand on clique sur ce bouton
- S'assurer que la carte native s'affiche bien en bas de la page event.


## Documentation

Documentation utile pour cette étape :

- [cobalt.conf](https://github.com/cobaltians/Cobalt/wiki/cobalt.conf)
- [nativeBars](https://github.com/cobaltians/cobalt/wiki/nativeBars)
- [navigation_push](https://github.com/cobaltians/cobalt/wiki/Navigation_Push)

**Notes :**  

Nous avons déjà inclu les images necessaires dans le projet natif pour le bouton "+". Vous pouvez utiliser `"androidIcon": "ic_action_add"` et `"iosIcon": "add.png""` dans la configuration des barres Cobalt.

Le controlleur natif qui affiche la carte native en bas de l'écran est déjà fait. Son nom est `event` dans le cobalt.conf.


## Solution

Voir le document de solutions ou via git : 

```
git stash && git stash drop && git checkout step-3
```


# Etape 3 - mettre à jour la carte de la page event.


Votre but ici est de mettre à jour la carte de la page évenement en fonction du texte que l'utilisateur va rentrer dans le champs `place` du formulaire web.

Il vous faudra envoyer un évenement au natif depuis le web et mettre le natif à jour en fonction de ce qu'à envoyé le web.


## Documentation

Documentation utile pour cette étape :

- [Introduction-to-Cobalt-Events](https://github.com/cobaltians/cobalt/wiki/Introduction-to-Cobalt-Events),

Plus précisément :

- [Sending-events#sending-events-from-web-to-native](https://github.com/cobaltians/cobalt/wiki/Sending-events#sending-events-from-web-to-native),
- [Receiving-events#receive-events-from-the-web-on-android](https://github.com/cobaltians/cobalt/wiki/Receiving-events#receive-events-from-the-web-on-android)
- [Receiving-events#receive-events-from-the-web-on-ios](https://github.com/cobaltians/cobalt/wiki/Receiving-events#receive-events-from-the-web-on-ios)

**Notes :**

Cette app utilise [Zepto.js](http://zeptojs.com/), un jQuery simplifié pour le mobile. Pour ajouter un evenement sur la modification d'un champs, faites simplement ceci un peu en dessous de l'appel de cobalt.init() : 

```
$('#place').on('change', function(){
    cobalt.log('Le champs a changé et vaut', $(this).val());
});
```

Nous avons déjà codé la partie native qui permet de mettre à jour le curseur sur la carte côté natif. 

Pour l'utiliser, appelez ce code sous Android : 

```
setPlace(place)
```

et celui-ci si vous êtes sous iOS : 

```
[self setPlace:place]
```

`place` étant la string du lieu envoyée par le web.

## Solution

Voir le document de solutions ou via git : 

```
git stash && git stash drop && git checkout step-4
```



# Etape 4 - Dans l'autre sens maintenant


Votre but maintenant est de mettre à jour le contenu du champs web `#place` si l'utilisateur fait un clic long sur un endroit de la carte native.

Il vous faudra envoyer un évenement depuis le natif vers le web et mettre le champs web à jour en fonction de ce qu'à envoyé le natif.

## Documentation

Documentation utile pour cette étape :

- [Introduction-to-Cobalt-Events](https://github.com/cobaltians/cobalt/wiki/Introduction-to-Cobalt-Events),

Plus précisément :

- [Sending-events#sending-events-from-ios-to-the-web](https://github.com/cobaltians/cobalt/wiki/Sending-events#sending-events-from-ios-to-the-web)
- [Sending-events#sending-events-from-android-to-the-web](https://github.com/cobaltians/cobalt/wiki/Sending-events#sending-events-from-android-to-the-web)
- [Receiving-events#receiving-events-on-the-web-side](https://github.com/cobaltians/cobalt/wiki/Receiving-events#receiving-events-on-the-web-side)

**Notes :**

Nous avons déjà codé la partie native qui permet de savoir quand un clic long à été fait sur la carte. Une fonction `onPlaceChanged` est disponnible avec un TODO dans le `CreateFragment` Android et le `CreateController` iOS.

Cette fonction reçoit en paramètre `place`, la nouvelle string à mettre dans le champs web.

Pour mettre le champs web à jour avec Zepto, utilisez `val()` comme ceci : 

```
$('#place').val("nouvelle valeur du champs");
```

## Solution

Voir le document de solutions ou via git : 

```
git stash && git stash drop && git checkout step-5
```



# Etape 5 - un petit coup d'accélérateur
 
Dans cette étape nous aurions normalement ajouté un titre et un bouton sur la page d'evenement pour sauvegarder notre nouvel évenement.

Puis nous aurions ajouté cet évenement à la liste des évenements dans `cobalt.storage`.

Nous allons sauter cette étape.

Faites donc un `git stash && git stash drop && git checkout step-6` pour passer directement à l'étape 6.

Observez les changements dans `events.html` et `cobalt.conf`.

Plusieurs choses à voir : 
- l'utilisation de cobalt.storage
- l'utilisation de [FontAwesome](http://fontawesome.io/icons/) pour l'icone du bouton sauvegarder
- l'utilisation de cobalt.toast


# Etape 6 - rafraichir la vue précédente

Votre objectif ici est de rafraichir la vue précédente avec les nouvelles données.

Cobalt fourni plusieures options pour ça :

- Un évenement reçu quand la page précédente revient au premier plan
- Le pull-to-refresh
- Un plugin de pubsub qu'on va voir au step-8.

## Solution

Voir le document de solutions ou via git : 

```
git stash && git stash drop && git checkout step-7
```


# Etape 7 - deuxième coup d'accelerateur


Dans cette étape nous nous serions occupé de la modification d'un évenement. Pour celà nous aurions : 

- Catché le clic sur un élément de la liste, 
- Envoyé l'id de l'évenement à la vue suivante
- Initialisé la vue suivante en fonction de ces données
- Modifié la fonction de sauvegarde pour modifier l'événement dans le cobalt.storage.

Nous allons sauter cette étape.

Faites donc un `git stash && git stash drop && git checkout step-8` pour passer directement à l'étape 8.

Observez les changements dans `index.html` et `event.html`.

Plusieurs choses à voir : 
- le passage des données lors du push.
- la récupération des données dans la vue `event.html`.
- l'utilisation de l'alert Cobalt lors de la sauvegarde.


# Etape 8 - utilisation de PubSub

Rafraichir toute la liste d'évenement quand on ajoute ou modifie un évenement n'est pas optimal.

Dans cette étape vous devrez utiliser le plugin Cobalt PubSub pour mettre à jour l'évenement modifié sans rafraichir toute la liste.

Pour l'ajout d'un évenement, utilisez PubSub également mais rafraichissez la liste complète.

## Documentation

Documentation utile pour cette étape :

- [Plugins-PubSub](https://github.com/Cobaltians-Plugins/Plugins-PubSub)

Normalement cette documentation n'est pas dans le wiki Cobalt mais sur le repository du plugin. Nous avons copié pour vous cette doc dans le dossier `doc` sur la clé USB.

**Notes :**


Pour mettre à jour une node DOM à partir d'un évenement, vous pouvez utiliser ceci : `eventList.updateEventNode(newEvent);` depuis la page `index.html`.

Pour rafraichir la liste courante avec les dernières données, c'est toutjours `eventList.refresh();` dans la page `index.html`


## Solution

Voir le document de solutions ou via git : 

```
git stash && git stash drop && git checkout master
```

