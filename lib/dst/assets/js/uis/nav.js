/*
  UI NAV
  @desc   list wrapped in <nav> element
  @author faeb187
*/
module.exports = (function() {
  var $$, uiList;
  
  // PRIVATE

  $$ = require('../helpers/dom');
  uiList = require('./list');
  return {
    // @DESC   init slider
    // @PARAM  opt.id      MAN {string}  UI id
    // @PARAM  opt.type    OPT {string}  only 'sitemap' atm
    // @PARAM  opt.items   MAN {array}   menu items
    // @PARAM  opt.events  OPT {json}    events fallback from item events
    // @PARAM  opt.target  MAN {node}    target node

    // PUBLIC

    init: function(opt) {
      var $t, $ui, evs, id, itms, type;
      opt = opt || {};
      id = opt.id;
      evs = opt.events;
      itms = opt.items;
      $t = opt.target;
      type = opt.type;
      if (!id || !$t || !itms || !itms.length) {
        return;
      }
      // PREVENT popstate behaviour
      window.addEventListener('popstate', function(e) {
        return e.preventDefault();
      });
      
      // UI markup
      $ui = $$('<nav/>', {
        id: id,
        class: 'ui-nav'
      });
      // APPEND nav items
      uiList.init({
        events: evs,
        id: id,
        items: itms,
        target: $ui
      });
      // append UI to target
      $t.appendChild($ui);
    }
  };
})();
