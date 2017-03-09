app.events = {
    last_event_id: -1,
    templates: undefined,
    init:function() {
        var events = cobalt.storage.get("events", "json");
        if (Object.prototype.toString.call(events) === '[object Array]') {
            var eventsLength = events.length;
            for (var i = 0; i < eventsLength; i++) {
                if (Object.prototype.toString.call(events[i]) === '[object Object]'
                    && events[i].id > app.events.last_event_id) {
                    app.events.last_event_id = events[i].id;
                }
            }
        }
        else {
            cobalt.storage.set("events",
                [
                    {
                        id: 0,
                        title: "Sebastien F. birthday",
                        date: new Date(1972, 11, 26),
                        place: "Alsace",
                        notes: undefined
                    },
                   {
                        id: 1,
                        title: "Guillaume birthday",
                        date: new Date(1983, 4, 20),
                        place: "Alsace",
                        notes: undefined
                    },
                    {
                        id: 2,
                        title: "Sebastien V. birthday",
                        date: new Date(1987, 12, 22),
                        place: "Le Mans",
                        notes: undefined
                    },
                    {
                        id: 3,
                        title: "Kristal birthday",
                        date: new Date(2015, 2, 11),
                        place: "Lannion",
                        notes: undefined
                    },
                    {
                        id: 4,
                        title: "Cobalt workshop",
                        date: new Date(2015, 4, 23),
                        place: "Le Mans",
                        notes: undefined
                    },
                    {
                        id: 5,
                        title: "Hackathon",
                        date: new Date(2015, 5, 8),
                        place: "Lannion",
                        notes: undefined
                    },
                    {
                        id: 6,
                        title: "4/20 day",
                        date: new Date(2000, 04, 20),
                        place: "Everywhere",
                        notes: undefined
                    },
                   {
                        id: 7,
                        title: "Your cat's birthday",
                        date: new Date(2002, 8, 11),
                        place: "Your Home",
                        notes: undefined
                    },
                    {
                        id: 8,
                        title: "World domination by Kristal",
                        date: new Date(2026, 12, 12),
                        place: "World",
                        notes: undefined
                    },
                    {
                        id: 9,
                        title: "LCS",
                        date: new Date(2016, 2, 11),
                        place: "USA",
                        notes: undefined
                    },
                    {
                        id: 10,
                        title: "Turing birthday",
                        date: new Date(1912, 06, 23),
                        place: "London",
                        notes: undefined
                    },
                    {
                        id: 11,
                        title: "Imitation game",
                        date: new Date(2015, 1, 7),
                        place: "World",
                        notes: undefined
                    },
                    {
                        id: 12,
                        title: "Arpanet",
                        date: new Date(1971, 09, 05),
                        place: "USA",
                        notes: undefined
                    },
                   {
                        id: 13,
                        title: "Richard Stallman birthday",
                        date: new Date(1953, 3, 16),
                        place: " Manhattan",
                        notes: undefined
                    },
                    {
                        id: 14,
                        title: "Transitor invention",
                        date: new Date(1947, 12, 23),
                        place: "USA",
                        notes: undefined
                    },
                    {
                        id: 15,
                        title: "Apple fundation",
                        date: new Date(1976, 4, 1),
                        place: "California",
                        notes: undefined
                    },
                    {
                        id: 16,
                        title: "Linux",
                        date: new Date(1991, 8, 26),
                        place: "USA",
                        notes: undefined
                    }
                ],
                "json");
            app.events.last_event_id = 16;
        }
        app.events.initTemplates();
        app.events.reset();
        app.events.refresh();
    },
    getEvent:function(id) {
        if (typeof id !== 'number' || id % 1 !== 0) return undefined;

        var events = cobalt.storage.get("events", "json");
        if (Object.prototype.toString.call(events) !== '[object Array]') return [];

        var eventsLength = events.length;
        for (var i = 0; i < eventsLength; i++) {
            if (Object.prototype.toString.call(events[i]) === '[object Object]'
                && events[i].id == id) {
                return events[i];
            }
        }

        return undefined;
    },
    getEvents:function(id, count){
        if (typeof id !== 'number' || id % 1 !== 0) id = -1;
        if (typeof count !== 'number' || count % 1 !== 0) count = 12;

        var events = cobalt.storage.get("events", "json");
        if (Object.prototype.toString.call(events) !== '[object Array]') return [];

        var eventsLength = events.length;
        var startEvent = false;
        var result = [];
        for (var i = 0; i < eventsLength; i++) {
            if (Object.prototype.toString.call(events[i]) === '[object Object]') {
                if (id == -1) {
                    startEvent = true;
                }
                if (startEvent) {
                    if (count-- <= 0) {
                        break;
                    }
                    result.push(events[i]);
                }
                else if (events[i].id == id) {
                    startEvent = true;
                }
            }
        }
        return result;
    },
    addEvent:function(event){
        if (Object.prototype.toString.call(event) !== '[object Object]') return;

        var events = cobalt.storage.get("events", "json");
        if (Object.prototype.toString.call(events) !== '[object Array]') return;

        event.id = ++app.events.last_event_id;
        events.unshift(event);
        cobalt.storage.set("events", events, "json");
    },

    initTemplates:function(){
      var eventItemsource = $("#tpl_event_item").html();
      Handlebars.registerPartial('tpl_event_item', eventItemsource);

      var eventsHoldersource = $("#tpl_events_holder").html();
      var eventsHoldertemplate = Handlebars.compile(eventsHoldersource);

      var eventsPagesource = $("#tpl_events_page").html();
      var eventsPagetemplate = Handlebars.compile(eventsPagesource);

      app.events.templates = {
       'tpl_events_holder': eventsHoldertemplate,
       'tpl_events_page': eventsPagetemplate
      };
    },

    reset:function() {
      app.events.last_event_id = undefined;
      $('body').html(app.events.templates['tpl_events_holder']());
    },

    refresh:function(PTR_callback){
      var events = app.events.getEvents(app.events.last_event_id);
      app.events.last_event_id = events[events.length - 1].id;

      var page = $('<ul class="events-page"></ul>');
      page.html(app.events.templates['tpl_events_page'](events));
      page.attr('id', 'event-page_' + app.events.last_event_id);
      $('#events-list').append(page);
    },
};
