var app = {
  debug: true,
  //debugInBrowser:true,
  //debugInDiv:true,

  /* This code below, combined with the touch module of zepto helps in resolving issues
   with fastclick on android devices : some devices receive "tap" event before "click" and
   some don't. ensure only one event is fired in all cases.
   */
  touchTimer: null,
  touch: function(selector, touchHandler, allowDefault) {
    var preventDefault = allowDefault ? false : true;
    var elem = $(selector);
    var touchup = function() {
      elem.removeClass('touched');
    };
    var touching = function(e) {
      if (!$(this).hasClass('touched')) {
        $(this).addClass('touched');
        clearTimeout(app.touchTimer);
        app.touchTimer = setTimeout(touchup, 500);
        touchHandler.apply([this, e]);

      }
      if (preventDefault)
        return false;
    };
    elem.unbind('tap').on('tap', touching);
    elem.unbind('click').on('click', touching);
  }
};