In this tutorial we will create an hybrid event app with Cobalt. 

Basically it will present:

- a list of events on the master page
- a page to create new events.

In this tutorial we will use: 

- cobalt native bars
- cobalt native navigation
- cobalt.storage for the data layer
- a cobalt plugin for user feedback
- create a real hybrid view with a map

Download this tutorial :
```
git clone --recursive https://github.com/cobaltians/cobalt-tutorial.git
```

To checkout the solution for each step: 

- clean your local changes with `git stash && git stash drop`
- checkout tag `step-X` where X is the number of the step. For example : `git checkout step-1`

In this tutorial you will have to touch exclusively theses files :
- For the common web : cobalt.conf, index.html and event.html
- For Android : CreateActivity.java, CreateFragment.java, 
- For iOS : CreateViewController.m

If you get lost somewhere else, you are probably doing it wrong :P

# Step 1

Time to start !

- First, checkout the step 1 code `git checkout step-1`
- Have a look around at native and web files.
- Init cobalt.js so that your webpage can discuss with the native
- Try in a web browser
- Try in the emulator or device


Documentation links: [cobalt.conf](https://github.com/cobaltians/cobalt/wiki/cobalt.conf), [cobalt.init](https://github.com/cobaltians/Cobalt/wiki/cobalt.init), [debugInBrowser](https://github.com/cobaltians/cobalt/wiki/Debugging-in-the-browser)


# Step 2

- Add a title to your master view with cobalt.conf
- Add a button to create a new event in the top bar
- Catch this button click and push the `index.html` page

Notes : 

You can use icon asset named "create" for the create button 


Documentation links: [nativeBars](https://github.com/cobaltians/cobalt/wiki/nativeBars), [navigation_push](https://github.com/cobaltians/cobalt/wiki/Navigation_Push)

# Step 3

- Send event `setPlace` with a data like this `{ place : 'Brest'}` where "Brest" is the place entered by the user in the place field.
- Catch the `setPlace` event in the native controller and update Google Map location.

Notes : 
to update the google map location on Android use code below : 
```
setPlace(place)
```
to update the google map location on iOS use code below : 
```
[self setPlace:place]
```

Documentation links: [events](https://github.com/cobaltians/cobalt/wiki/Introduction-to-Cobalt-Events), [cobalt.conf](https://github.com/cobaltians/cobalt/wiki/cobalt.conf)


# Step 4

- On the native side this time, send event `setPlace` with a data like this `{ place : 'Brest'}` when the location is changed on the native map
- Catch the `setPlace` event in the web page and update the field

Notes: 
Map location changes are already catched in the `onPlaceChanged` Just add the event to the web.

Documentation links: [events](https://github.com/cobaltians/cobalt/wiki/Introduction-to-Cobalt-Events)


# Step 5
 
 - Add title and save button to the create page
 - Catch the save button and trigger the form submit
 - Add your new event to the list of events with cobalt.storage
 - Add a toast to say "Event created" to the user
 - And pop to the previous page with navigate.pop.

 
Notes: 
The list of events is an array in key `events`of cobalt.storage.
You can use icon asset named "save" for the save button
 
Documentation links:  [cobalt.storage](https://github.com/cobaltians/cobalt/wiki/LocalStorage), [toasts](https://github.com/cobaltians/cobalt/wiki/toasts), [navigation_pop](https://github.com/cobaltians/cobalt/wiki/Navigation_Pop), [Android back event](https://github.com/cobaltians/cobalt/wiki/backEvent)

# Step 6

- Add pull to refresh feature on the master page to refresh content.
- Refresh the master page list automatically when coming back.

Documentation links : [events lifecycle](https://github.com/cobaltians/cobalt/wiki/Cobalt-Web-Lifecycle-Events), [pullToRefresh](https://github.com/cobaltians/cobalt/wiki/PullToRefresh) 


# Step 7

- Catch the clic on an event in the master view
- Push the `event.html` page with data to edit
- Catch these data in the `event.html` page and fill the form
- Update the save method to save this current event instead of adding a new one.
- Ask the user to confirm before saving

Documentation links: [navigation push](https://github.com/cobaltians/cobalt/wiki/Navigation_Push), [events lifecycle](https://github.com/cobaltians/cobalt/wiki/Cobalt-Web-Lifecycle-Events), [Alerts](https://github.com/cobaltians/Cobalt/wiki/alerts) 

# Step 8

- Use pubsub plugin to edit the event and avoid refreshing the whole list

Notes:

To update the event DOM node in the master page you can use `app.eventList.updateEvent(event);` 

Documentation links: [pubsub plugin](https://github.com/Cobaltians-Plugins/Plugins-PubSub)



