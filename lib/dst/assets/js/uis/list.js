/*
  UI list
  @AUTHOR faeb187
*/
module.exports = (function() {
  var $$, hammer, obs, state, ui;
  // @REQUIRE local modules
  // @PRIVATE
  $$ = require('../helpers/dom');
  obs = require('../helpers/obs');
  state = require('../helpers/state');
  hammer = require('hammerjs');
  // @DEFINE ui  {json}  UI variables/methods
  // @PRIVATE
  ui = {
    // @DESC   adds list item to list
    // @PARAM  itm                   MAN {json}    list item
    // @PARAM  itm.lang              MAN {string}  lang ref (text or img alt)
    // @PARAM  itm.path              MAN {string}  href
    // @PARAM  itm.type              OPT {string}  adds data-[ type ] = true
    // @PARAM  itm.active            OPT {boolean} default active item
    // @PARAM  itm.src               OPT {string}  image src attribute
    // @PARAM  itm.icon              OPT {string}  icon class name
    // @PARAM  itm.events            OPT {json}    custom events
    // @PARAM  itm.events.click      OPT {[json]}  list of 'click' events
    // @PARAM  itm.events.click.ev   OPT {string}  custom event name
    // @PARAM  itm.events.click.arg  OPT {*}       event handler param
    // @PARAM  itms                  OPT {todo}    sub items
    // @PARAM  $ui                   MAN {node}    list node
    // @TODO   only <a> when click event
    addListItem: function(itm, $ul) {
      var $itm, $li, $subUl, act, evs, href, i, icon, id, lang, len, src, subItm, subItms, type;
      act = itm.active;
      id = itm.id;
      itm = itm || {};
      evs = itm.events;
      lang = itm.lang;
      act = itm.active;
      src = itm.src;
      icon = itm.icon;
      href = itm.path;
      type = itm.type;
      subItms = itm.items;
      if (!lang) {
        return;
      }
      // MARKUP list item
      $li = $$('<li/>');
      if (src) {
        $itm = $$('<img/>', {
          src: src
        });
      } else {
        $itm = $$('<a/>', {
          id: id
        });
      }
      if (href) {
        $itm.setAttribute("href", href);
      }
      $itm.setAttribute('data-lang', lang);
      if (act) {
        $$.addClass($itm, 'active');
      }
      if (type) {
        $itm.setAttribute('data-' + type, true);
      }
      if (icon) {
        $itm.appendChild($$('<i/>', {
          'class': icon
        }));
      }
      // BIND custom events
      if (evs) {
        $itm.events = evs;
        if (evs.click) {
          $itm.onclick = ui.evs.click;
        }
      }
      // hand      = hammer $itm
      // hand.add  new hammer.Tap
      // hand.on   'tap', ui.evs.click

      // HANDLE sub items
      if (subItms) {
        $subUl = $$('<ul/>');
        for (i = 0, len = subItms.length; i < len; i++) {
          subItm = subItms[i];
          ui.addListItem(subItm, $subUl);
        }
        $li.appendChild($subUl);
      }
      // APPEND list item to list
      $li.prepend($itm);
      $ul.appendChild($li);
    },
    // @DEFINE evs {json}  UI events
    evs: {
      // @DESC   fire custom 'click' events
      // @PARAM  e   MAN {event} 'click' event
      // @RETURN {void}
      click: function(e) {
        var $elm, ev, evs, i, len;
        e.preventDefault();
        // GET current & next active item
        $elm = e.target;
        if ($elm.tagName === 'I') {
          $elm = $$.parent($elm);
        }
        
        // FIND custom 'click' events
        evs = $elm.events || {};
        evs = evs.click;
        if (!evs || !evs.length) {
          return;
        }
        // SET active list item
        if ($elm.getAttribute('data-toggle')) {
          $$.toggleClass($elm, 'active');
        } else {
          state.set({
            id: $$.parent($elm, '.ui-list').id,
            state: {
              active: $elm.id
            }
          });
        }
        for (i = 0, len = evs.length; i < len; i++) {
          ev = evs[i];
          if (ev) {
            
            // FIRE custom 'click' events
            obs.f(ev.ev, ev.arg || e);
          }
        }
      }
    }
  };
  return {
    // @DESC   inits a new list
    // @PARAM  opt.events        OPT {json}      events
    // @PARAM  opt.id            MAN {string}    UI id
    // @PARAM  opt.items         MAN {[json]}    array containing list items
    // @PARAM  opt.target        MAN {node}      target node
    // @RETURN {void}
    // @PUBLIC
    init: function(opt) {
      var $t, $ui, act, evs, fx, i, id, itm, itms, len, st;
      opt = opt || {};
      evs = opt.events || {};
      id = opt.id;
      itms = opt.items || [];
      fx = opt.fx || {};
      $t = opt.target;
      if (!id || !itms.length || !$t) {
        return;
      }
      id = "ui-list-" + id;
      // HANDLE active state
      st = state.get({
        id: id
      }) || {};
      act = st.active || itms[0].id;
      // CREATE node
      $ui = $$('<ul/>', {
        id: id,
        class: 'ui-list'
      });
// APPEND list items
      for (i = 0, len = itms.length; i < len; i++) {
        itm = itms[i];
        if (act === itm.id) {
          itm.active = true;
        }
        itm.events = itm.events || evs;
        ui.addListItem(itm, $ui);
      }
      // TMP append UI styles from conf
      $$.css($ui, opt.styl);
      // APPEND UI to target
      $t.appendChild($ui);
      setTimeout(function() {
        return $$.addClass($ui, 'ui-fx-show');
      }, fx.delay || 0);
    }
  };
})();
