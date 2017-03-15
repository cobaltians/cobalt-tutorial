In this tutorial we will create an hybrid event app with Cobalt. 

Basically it will present :
- a list of events on the master page
- a page to create new events.

In this tutorial we will use : 
- cobalt native bars
- cobalt native navigation
- cobalt.storage for the data layer
- a cobalt plugin for user feedback
- create a real hybrid view with a map

To checkout the solution for each step : 
- clean your local changes with `git stash && git stash drop`
- checkout tag `step-X` where X is the number of the step. For example : `git checkout step-1`

# Step 1

- Init cobalt.js so that your webpage can discuss with the native
- Create the cobalt.conf
- Try in a web browser
- Try in the emulator or device
Documentation links : [cobalt.conf](https://github.com/cobaltians/cobalt/wiki/cobalt.conf), [cobalt.init](https://github.com/cobaltians/Cobalt/wiki/cobalt.init), [debugInBrowser](https://github.com/cobaltians/cobalt/wiki/Debugging-in-the-browser)



# Step 2

- Add a title to your master view with cobalt.conf
- Add a button to create a new event in the top bar
- Catch this button click and push the `event.html` page

Notes : 

You can use icon asset named "create" for the create button 


Documentation links : [nativeBars](https://github.com/cobaltians/cobalt/wiki/nativeBars), [navigation_push](https://github.com/cobaltians/cobalt/wiki/Navigation_Push)

# Step 3
 
 - Add title and save button to the create page
 - Catch the save button and trigger the form submit
 - Add your new event to the list of events with cobalt.storage
 - Add a toast to say "hooray" to the user
 - And pop to the previous page with navigate.pop.

 
Notes : 
The list of events is an array in key `events`of cobalt.storage.
You can use icon asset named "save" for the save button
 
Documentation links :  [cobalt.storage](https://github.com/cobaltians/cobalt/wiki/LocalStorage), [toasts](https://github.com/cobaltians/cobalt/wiki/toasts), [navigation_pop](https://github.com/cobaltians/cobalt/wiki/Navigation_Pop), [Android back event](https://github.com/cobaltians/cobalt/wiki/backEvent)

# Step 4

- Add pull to refresh feature on the master page to refresh content.
- Refresh the master page list automatically when coming back.

Documentation links : [events lifecycle](https://github.com/cobaltians/cobalt/wiki/Cobalt-Web-Lifecycle-Events), [pullToRefresh](https://github.com/cobaltians/cobalt/wiki/PullToRefresh) 


# Step 5

- Catch the clic on an event in the master view
- Push the `event.html` page with data to edit
- Catch these data in the `event.html` page and fill the form
- Update the save method to save this current event instead of adding a new one.

Documentation links : [navigation push](https://github.com/cobaltians/cobalt/wiki/Navigation_Push), [events lifecycle](https://github.com/cobaltians/cobalt/wiki/Cobalt-Web-Lifecycle-Events) 

# Step 6

- Use pubsub plugin to edit the event and avoid refreshing the whole list

Documentation links : [pubsub plugin](https://github.com/Cobaltians-Plugins/Plugins-PubSub)

# Step 7

- Add a "Place" field in the event form. 
- Send event `focusMapOn` with a data like this `{ place : 'Brest'}` where "Brest" is the place entered by the user in the place field.
- Change the event controller to be the `withMap` native controller
- Catch the `focusMapOn` event in this controller and update Google Map location.

Notes : 
to update the google map location on Android use code below : 
```
Google.myAss.focusOnThisFuckingPlace(place)
```
to update the google map location on iOS use code below : 
```
Google.myAss.focusOnThisFuckingPlace(place)
```

Documentation links : [events](https://github.com/cobaltians/cobalt/wiki/Introduction-to-Cobalt-Events), [cobalt.conf](https://github.com/cobaltians/cobalt/wiki/cobalt.conf)

