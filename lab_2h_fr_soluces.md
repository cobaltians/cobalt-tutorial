# Solutions du Lab Cobalt 2h

# Étape 1 - Initialiser Cobalt


- Ouvrez `Android/app/src/main/assets/common/index.html`
- Ajoutez le code suivant dans index.html L42 :

```
cobalt.init({
    debug:true,
    //debugInBrowser:true
});
```

- Ouvrez le projet Android/iOS et cliquez sur Play.



# Étape 2 - Configuration de la barre native et naviguation


- Ouvrez `Android/app/src/main/assets/common/cobalt.conf`
- Ajoutez le code suivant dans la configuration de la vue "default" L5 :

```
"bars": {
	"title": "Events",
	"actions": [{
	    "name": "create",
	    "title": "Create",
	    "iosPosition": "topRight",
	    "androidPosition": "top",
	    "androidIcon": "ic_action_add",
	    "iosIcon": "add.png"
	}]
}
```

- Vérifiez que l'icône apparaît bien en lançant l'application.
- Maintenant, il faut catcher le clic sur ce bouton, ouvrez index.html et ajouter ce code sous l'appel de cobalt.init :

```
cobalt.nativeBars.setEventListener(function(itemName){
    switch (itemName) {
        case "create":
          cobalt.log('On a cliqué sur create')
        break;
    }
});
```

- Vous pouvez vérifier que le log s'affiche bien.
- Maintenant il faut naviguer vers la page `event.html` , modifiez votre code comme ceci :

```
case "create":
  cobalt.navigate.push({page: "event.html"});
break;
```

- Si vous testez à cette étape là, la page event va bien s'afficher mais pas la carte native en bas de l'écran. Pour cela modifiez votre push comme ceci : 

```
cobalt.navigate.push({page: "event.html", controller: "event"});
```


# Étape 3 - Mettre à jour la carte de la page event


- Ouvrez la page `event.html` et ajoutez après le cobalt.init()

```
$('#place').on('change', function(){
    cobalt.sendEvent('setPlace', { place : $(this).val() });
});
```

- Vous pouvez vérifiez que ça marche dans votre browser
- Ouvrez maintnenant `Android/app/src/main/java/org/cobaltians/tutorial/CreateFragment.java` et ajoutez ceci dans `onUnhandledEvent` avant le `return false` : 

```
if ("setPlace".equals(event)) {
    try {
        setPlace(data.getString("place"));
    }
    catch (JSONException e) {
        Log.w(TAG, "setPlace: no 'place' received in data");
        e.printStackTrace();
    }
    return true;
}
```

- Pour ceux qui sont sous iOS, ouvrez `iOS/Cobalt Tutorial/Cobalt Tutorial/CreateViewController.m` et ajoutez ceci dans `onUnhandledEvent` avant le `return NO` : 

```
if ([@"setPlace" isEqualToString:event]) {
    if (data != nil) {
        NSString *place = [data objectForKey:@"place"];
        if (place != nil) {
            [self setPlace:place];
        }
        else {
            NSLog(@"setPlace: no 'place' received in data");
        }
    }
    else {
         NSLog(@"setPlace: no data received");
    }
    return YES;
}
```

# Étape 4 - Dans l'autre sens maintenant

- Dans `CreateFragment.java`, dans la fonction `onPlaceChanged`, ajoutez ceci :

```
JSONObject data = new JSONObject();
try {
    data.put("place", place);
} catch (JSONException e) {
    e.printStackTrace();
}
sendEvent("setPlace",data, null);
```

- Sous iOS dans `CreateViewController.m`, dans la fonction `onPlaceChanged`, ajoutez ceci :

```
[self sendEvent:@"setPlace" withData:@{@"place": place} andCallback:nil];
```

- Côté Web maintenant, catchons l'événement dans `event.html` en modifiant l'init comme ceci :

```
cobalt.init({
  debug: true,
  //debugInBrowser: true,
  events:{
    "setPlace":function(data, callback){
        cobalt.log('le natif a envoyé un nouveau lieu :', data.place);
    }
  }
});
```

- Vous pouvez déjà tester si vous recevez bien ce lieu...
- Il ne reste plus qu'à mettre à jour le champ avec la donnée reçue : 

```
cobalt.init({
  debug: true,
  //debugInBrowser: true,
  events:{
    "setPlace":function(data, callback){
        cobalt.log('le natif a envoyé un nouveau lieu :', data.place);
        $('#place').val(data.place);
    }
  }
});
```

# Étape 5 - Étape sautée :)

# Étape 6 - Rafraîchir la vue précédente

Pour l'option avec l'événement quand on revient sur la page précédente :

- modifiez l'init de cobalt dans `index.html` comme ceci :

```
cobalt.init({
  debug: true,
  //debugInBrowser: true,
  events: {
    "onPageShown":function(){
        cobalt.log('received onPageShown')
        eventList.refresh();
    }
  }
});
```

Pour l'option avec le pull-to-refresh :

- ajoutez `"pullToRefresh" : true,` dans la configuration de la vue `default` du fichier `cobalt.conf` comme ceci :

```
"default": {
    "ios": "ViewController",
    "android": "org.cobaltians.tutorial.MainActivity",
    "pullToRefresh" : true,
    "bars": {
        "title": "Events",
        "actions": [{
            "name": "create",
            "title": "Create",
            "iosPosition": "topRight",
            "androidPosition": "top",
            "androidIcon": "ic_action_add",
            "iosIcon": "add.png"
        }]
    }
},
```
- Puis catchez l'event `pullToRefresh` dans index.html comme ceci :

```
cobalt.init({
  debug: true,
  //debugInBrowser: true,
  events: {
    "pullToRefresh":function(data, callback){
        cobalt.log('received onPullToRefresh')
        eventList.refresh();
        cobalt.sendCallback(callback);
    }
  }
});
```

Ces deux méthodes ne sont bien sûr pas incompatibles.

# Étape 7 - Étape sautée :)

# Étape 8 - Utilisation de PubSub

Pour la modification d'un événement : 

- Dans `index.html`, supprimez la gestion de `onPageShown` dans `cobalt.init` pour qu'elle n'induise pas d'erreur : 

```
cobalt.init({
  debug: true,
  //debugInBrowser: true,
  events: {
    "pullToRefresh": function(data, callback) {
      eventList.refresh();
      cobalt.sendCallback(callback);
    },
  }
});
```

- Dans `event.html` L102 juste après l'appel de `eventList.saveEvent(newEvent);` ajoutez ceci : 

```
cobalt.publish('eventModified', newEvent);
```

- La modification de cet évenement est maintenant envoyée à toutes les pages qui se seront inscrites au channel `eventModified`.
- Souscrivez donc à ce channel dans `index.html`. Quelque part, sous le `cobalt.init()`, dans `index.html`, ajoutez ceci : 

```
cobalt.subscribe('eventModified', function(newEvent){
    cobalt.log('index.html received new event', newEvent);
});
```

- Il ne vous reste plus qu'à modifier le noeud DOM comme indiqué :

```
cobalt.subscribe('eventModified', function(newEvent){
    cobalt.log('index.html received new event', newEvent);
	 eventList.updateEventNode(newEvent);
});
```

Pour l'ajout d'un événement : 

- Dans `event.html`, L112, juste après `cobalt.storage.set("events", events);`, ajoutez ceci : 

```
cobalt.publish('eventCreated', newEvent);
```
- Dans `index.html`, rafraîchissez la liste à la réception de cet évenement :

```
cobalt.subscribe('eventCreated', function(newEvent){
	eventList.refresh();
});
```
