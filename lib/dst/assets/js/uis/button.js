/*
  UI BUTTON
  @AUTHOR faeb187
*/
module.exports = (function() {
  var $$, obs, ui;
  // @REQUIRE local modules
  // @PRIVATE
  $$ = require('../helpers/dom');
  obs = require('../helpers/obs');
  // @DEFINE ui  {json}  UI variables/methods
  // @PRIVATE
  ui = {
    // @DEFINE ui.$tpl   {node}  UI template
    $tpl: $$('<a/>', {
      'class': 'ui-button'
    }),
    // @DEFINE evs {json}  UI events
    evs: {
      // @DESC   fire custom 'click' events
      // @PARAM  e   MAN {event} 'click' event
      // @RETURN {void}
      click: function(e) {
        var $elm, ev, evs, i, len;
        
        // GET current target
        $elm = e.target;
        if ($elm.tagName === 'I') {
          $elm = $elm.parentNode;
        }
        // FIND custom 'click' events
        evs = $elm.events || {};
        evs = evs.click;
        if (!evs || !evs.length) {
          return;
        }
        for (i = 0, len = evs.length; i < len; i++) {
          ev = evs[i];
          if (ev) {
            
            // FIRE custom 'click' events
            obs.f(ev.ev, ev.arg);
          }
        }
      }
    }
  };
  return {
    // @DESC   inits a new button
    // @PARAM  opt.id            MAN {string}    UI id
    // @PARAM  opt.lang          OPT {string}    lang ref
    // @PARAM  opt.icon          OPT {string}    ion name
    // @PARAM  opt.events        OPT {json}      custom events to bind
    // @PARAM  opt.events.click  OPT {[string]}  list of custom 'click' events
    // @PARAM  opt.target        MAN {node}      target node
    // @RETURN {void}
    // @PUBLIC

    // PUBLIC

    init: function(opt) {
      var $t, $ui, evs, hand, icon, id, lang;
      opt = opt || {};
      evs = opt.events;
      id = opt.id;
      lang = opt.lang;
      icon = opt.icon;
      $t = opt.target;
      if ((!icon && !lang) || !id || !$t) {
        return;
      }
      // CREATE node
      $ui = ui.$tpl.cloneNode();
      $ui.id = id;
      // BIND custom events
      if (evs) {
        $ui.events = evs;
      }
      //if evs.click  then $$.listen $ui, 'click', ui.evs.click
      if (evs.click) {
        hand = new Hammer.Manager($ui);
        hand.add(new Hammer.Tap());
        hand.on('tap', ui.evs.click);
      }
      // SET caption/icon
      if (lang) {
        $ui.setAttribute('data-lang', lang);
      } else {
        $ui.appendChild($$('<i/>', {
          'class': icon
        }));
      }
      
      // TMP append UI styles from conf
      $$.css($ui, opt.styl);
      // APPEND UI to target
      $t.appendChild($ui);
    }
  };
})();
