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

Documentation links : cobalt.conf, cobal.init, debugInBrowser


# Step 2

- Add a title to your master view with cobalt.conf
- Add a button to create a new event in the top bar
- Catch this button click and push the `event.html` page

Documentation links : nativeBars, navigation_push

# Step 3
 
 - Add title and save button to the create page
 - Catch the save button and trigger the form submit
 - Add your new event to the list of events with cobalt.storage
 - Add a toast to say "hooray" to the user
 - And pop to the previous page with navigate.pop.
 
Notes : the list of events is an array in key `events`of cobalt.storage.
 
Documentation links : nativeBars, cobalt.storage, toasts, navigation_pop

# Step 4

- Add pull to refresh feature on the master page to refresh content.
- Refresh the master page list automatically when coming back.

Documentation links : events lifecycle, pullToRefresh 


# Step X

- Catch the clic on an event in the master view
- Push the `event.html` page with data to edit
- Catch these data in the `event.html` page and fill the form
- Update the save method to save this current event instead of adding a new one.

Documentation links : navigation, events lifecycle 

# Step X

- Use pubsub plugin to edit the event and avoid refreshing the whole list

Documentation links : pubsub plugin

# Step X

- Add a "Place" field in the event form. 
- Send event `focusMapOn` with a data like this `{ place : 'Brest'}` where "Brest" is the place entered by the user in the place field.
- Change the event controller to be the `withMap` native controller
- Catch the `focusMapOn` event in this controller and update Google Map location.

Note : 
to update the google map location on Android use code below : 
```
Google.myAss.focusOnThisFuckingPlace(place)
```
to update the google map location on iOS use code below : 
```
Google.myAss.focusOnThisFuckingPlace(place)
```

Documentation links : events, cobalt.conf



