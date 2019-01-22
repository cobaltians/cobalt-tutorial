# Lab Cobalt 2h

Dans ce TP nous allons voir comment réaliser une application hybride Cobalt de liste d'événements.

Cette app sera composée de :

- une liste d'événements sur la vue principale,
- une page pour éditer/créer un évenement.

Vous utiliserez :

- Les barres natives
- la navigation native
- un plugin de communication entre les webviews
- Une page hybride Web/natif intégrant une carte interactive native

Le code source de cette application est disponnible sur la clé USB qui vous a été fournie dans le dossier `cobalt-tutorial` ou à l'url suivante :
```
git clone --recursive https://github.com/cobaltians/cobalt-tutorial.git -b step-0
```

Pour chaque étape, les liens vers la documentation Cobalt qui vous seront utiles sont indiqués. Ces pages sont aussi disponibles sur la clé USB qui vous a été fournie dans le dossier `doc` au format markdown.

Dans ce TP, vous toucherez exclusivement à ces fichiers :

- pour la partie Web commune : cobalt.conf, index.html et event.html
- pour Android : CreateFragment.java, 
- pour iOS : CreateViewController.m

Si vous touchez à d'autres fichiers, c'est que vous faites peut-être fausse route, ou que vous êtes très créatif ;)

Si vous êtes perdus, vous vouvez **vous référer aux [solutions](lab_2h_fr_soluce) qui vous ont été transmise** ou **récupérer via git les solutions de chaque étape**. Dans ce cas il faudra : 

- Supprimer toutes vos modifications locales avec `git stash && git stash drop`
- Checkout la branche correspondante à l'étape suivante. Par exemple `git checkout step-5` si vous êtes à l'étape 4.

# Étape 1 - Initialiser Cobalt

Avant toute chose, faites un `git status` et assurez vous d'être sur la branche `step-1`.

L'application dans laquelle vous débarquez contient déjà deux petites pages Web, index.html et create.html, correspondant aux deux vues. La CSS est déjà faite.

Le code Web commun est dans `Android/app/src/main/assets/common`. Le projet iOS pointe sur ce dossier également.

## Objectif

Votre but ici est d'initialiser Cobalt côté Web afin qu'il puisse communiquer avec le natif et de vérifier que le contenu de la page s'affiche quand vous lancez l'application sur votre téléphone ou votre émulateur.

Vous pouvez utiliser le mode `debugInBrowser` de Cobalt pour prévisualiser la page dans votre navigateur.

## Documentation

Documentation utile pour cette étape :

- [cobalt.init](https://github.com/cobaltians/Cobalt/wiki/cobalt.init)


# Étape 2 - Configuration de la barre native et naviguation

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

Le contrôlleur natif qui affiche la carte native en bas de l'écran est déjà fait. Son nom est `event` dans le cobalt.conf.


# Étape 3 - Mettre à jour la carte de la page event


Votre but ici est de mettre à jour la carte de la page événement en fonction du texte que l'utilisateur va rentrer dans le champ `#place` du formulaire Web.

Il vous faudra envoyer un événement au natif depuis le Web et mettre la carte à jour en fonction de ce que le Web aura envoyé.


## Documentation

Documentation utile pour cette étape :

- [Introduction-to-Cobalt-Events](https://github.com/cobaltians/cobalt/wiki/Introduction-to-Cobalt-Events)

Plus précisément :

- [Sending-events#sending-events-from-web-to-native](https://github.com/cobaltians/cobalt/wiki/Sending-events#sending-events-from-web-to-native)
- [Receiving-events#receive-events-from-the-web-on-android](https://github.com/cobaltians/cobalt/wiki/Receiving-events#receive-events-from-the-web-on-android)
- [Receiving-events#receive-events-from-the-web-on-ios](https://github.com/cobaltians/cobalt/wiki/Receiving-events#receive-events-from-the-web-on-ios)

**Notes :**

Cette app utilise [Zepto.js](http://zeptojs.com/), un jQuery simplifié pour le mobile. Pour ajouter un événement sur la modification d'un champ, faites simplement ceci un peu en dessous de l'appel de cobalt.init() : 

```
$('#place').on('change', function(){
    cobalt.log('Le champs a changé et vaut', $(this).val());
});
```

Nous avons déjà codé la partie native qui permet de mettre à jour le marqueur sur la carte. 

Pour l'utiliser, appelez ce code sous Android : 

```
setPlace(place)
```

et celui-ci si vous êtes sous iOS : 

```
[self setPlace:place]
```

`place` étant la string du lieu envoyée par le web.

# Étape 4 - Dans l'autre sens maintenant

Votre but maintenant est de mettre à jour le contenu du champ Web `#place` si l'utilisateur fait un clic long sur un endroit de la carte native.

Il vous faudra envoyer un événement depuis le natif vers le Web et mettre le champ à jour en fonction de ce qu'aura envoyé le natif.

## Documentation

Documentation utile pour cette étape :

- [Introduction-to-Cobalt-Events](https://github.com/cobaltians/cobalt/wiki/Introduction-to-Cobalt-Events)

Plus précisément :

- [Sending-events#sending-events-from-ios-to-the-web](https://github.com/cobaltians/cobalt/wiki/Sending-events#sending-events-from-ios-to-the-web)
- [Sending-events#sending-events-from-android-to-the-web](https://github.com/cobaltians/cobalt/wiki/Sending-events#sending-events-from-android-to-the-web)
- [Receiving-events#receiving-events-on-the-web-side](https://github.com/cobaltians/cobalt/wiki/Receiving-events#receiving-events-on-the-web-side)

**Notes :**

Nous avons déjà codé la partie native qui permet de savoir quand un clic long à été fait sur la carte. Une fonction `onPlaceChanged` est disponnible avec un TODO dans le `CreateFragment` Android et le `CreateController` iOS.

Cette fonction reçoit en paramètre `place`, la nouvelle string à mettre dans le champ web.

Pour mettre le champ Web à jour avec Zepto, utilisez `val()` comme ceci : 

```
$('#place').val("nouvelle valeur du champ");
```

# Étape 5 - un petit coup d'accélérateur
 
Dans cette étape nous aurions normalement ajouté un titre et un bouton sur la page d'événement pour sauvegarder notre nouvel évenement.

Puis nous aurions ajouté cet événement à la liste des évenements dans `cobalt.storage`.

Nous allons sauter cette étape.

Faites donc un `git stash && git stash drop && git checkout step-6` pour passer directement à l'étape 6.

Observez les changements dans `events.html` et `cobalt.conf`.

Plusieurs choses à voir :

- l'utilisation de cobalt.storage
- l'utilisation de [FontAwesome](http://fontawesome.io/icons/) pour l'icône du bouton sauvegarder
- l'utilisation de cobalt.toast

# Étape 6 - Rafraîchir la vue précédente

Votre objectif ici est de rafraîchir la vue précédente avec les nouvelles données.

Cobalt fourni plusieurs options pour ça :

- un événement reçu quand la page précédente revient au premier plan
- le pull-to-refresh
- un plugin de PubSub qu'on va voir au step-8

## Documentation

Documentation utile pour cette étape :

- [Introduction-to-Cobalt-Events](https://github.com/cobaltians/cobalt/wiki/Cobalt-Web-Lifecycle-Events) 
- [PullToRefresh](https://github.com/cobaltians/Cobalt/wiki/PullToRefresh)

**Notes :**

Pour mettre à jour la liste courante des événements, vous pouvez utiliser ceci : `eventList.refresh();` depuis la page index.html.

# Étape 7 - Deuxième coup d'accelerateur

Dans cette étape, nous nous serions occupé de la modification d'un événement. Pour cela, nous aurions : 

- catché le clic sur un élément de la liste
- envoyé l'id de l'événement à la vue suivante
- initialisé la vue suivante en fonction de ces données
- modifié la fonction de sauvegarde pour modifier l'événement dans le cobalt.storage.

Nous allons sauter cette étape.

Faites donc un `git stash && git stash drop && git checkout step-8` pour passer directement à l'étape 8.

Observez les changements dans `index.html` et `event.html`.

Plusieurs choses à voir : 

- le passage des données lors du push
- la récupération des données dans la vue `event.html`
- l'utilisation de l'alert Cobalt lors de la sauvegarde


# Étape 8 - Utilisation de PubSub

Rafraîchir toute la liste d'événements quand on ajoute ou modifie un événement n'est pas optimal.

Dans cette étape, vous devrez utiliser le plugin Cobalt PubSub pour mettre à jour l'événement modifié sans rafraîchir toute la liste.

Pour l'ajout d'un événement, utilisez PubSub également mais rafraîchissez la liste complète.

## Documentation

Documentation utile pour cette étape :

- [Plugins-PubSub](https://github.com/Cobaltians-Plugins/Plugins-PubSub)

Normalement cette documentation n'est pas dans le wiki Cobalt mais sur le repository du plugin. Nous avons copié pour vous cette doc dans le dossier `doc` sur la clé USB.

**Notes :**

Pour mettre à jour un node DOM à partir d'un événement, vous pouvez utiliser ceci : `eventList.updateEventNode(newEvent);` depuis la page `index.html`.

Pour rafraîchir la liste courante avec les dernières données, c'est toujours `eventList.refresh();` dans la page `index.html`

