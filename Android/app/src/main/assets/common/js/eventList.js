var eventList = {
  //will host compiled handlebars templates
  templates: {},
  init: function() {
    //init handlebars templates
    this.initTemplates();

    //get events from storage or set default
    var events = cobalt.storage.get("events");
    if (!events) {
      events = defaultData;
      cobalt.storage.set("events", events);
    }

    //use template and display the event list in page.
    this.refresh();
  },
  initTemplates: function() {
    //Handlebars sauce to init templates.
    this.templates.eventList = Handlebars.compile($("#tpl_eventList").html());
    this.templates.eventItem = Handlebars.compile($("#tpl_eventItem").html());
    //sub-templates should be registered as "partials" too.
    Handlebars.registerPartial('tpl_eventItem', this.templates.eventItem);
    //Enable date formatting
    utils.formatting.date.enable();
    //And register a template helper to format dates from templates
    Handlebars.registerHelper('formatDate', this.formatDate);
  },
  formatDate:function(timeString, arg2, arg3){
    //set a default formatString
    formatString="dd/mm/yyyy";
    if (timeString) {
      var date = new Date(timeString);
      return date.format(formatString)
    }
    return ""
  },
  refresh: function(PTR_callback) {
    //get the events from storage
    var events = cobalt.storage.get("events");
    //set HTML from template + events data
    $('#eventList').html(this.templates.eventList({ events: events }));
  },
  saveEvent: function(event) {
    if (event && event.id){
      var events = cobalt.storage.get("events");
      $.each(events, function(i, item) {
        if (item.id === event.id) {
          events[i] = event;
          cobalt.storage.set("events", events);
          return false;//break the loop.
        }
      });
    }
  },
  updateEventNode: function(event) {
    //find event in dom and replace it with new event data
    var eventItem = $('#event_'+ event.id);
    if (eventItem) {
      eventItem.replaceWith(this.templates.eventItem(event))
    }
  },
  onItemTouch:function(handler) {
    $('#eventList').on('click', '.eventItem', function(){
      var id = parseInt($(this).attr('data-id'), 10);
      var events = cobalt.storage.get("events");
      $.each(events, function(i, item){
        if (item.id === id) {
          handler(item);
          return false;//break the loop.
        }
      });
    });
  }
};
