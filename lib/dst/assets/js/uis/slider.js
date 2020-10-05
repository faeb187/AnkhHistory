/*
  UI SLIDER
  @author faeb187
*/
module.exports = (function() {
  var $$, obs, ui;
  // @REQUIRE local modules
  $$ = require('../helpers/dom');
  obs = require('../helpers/obs');
  // @DEFINE   ui  {json}  UI variables/methods
  // @PRIVATE
  ui = {
    // @DEFINE   $tpl  {node}  UI template
    $tpl: $$('<div/>', {
      'class': 'ui-slider'
    }),
    // @DEFINE   evs   {json}  custom events
    evs: {
      // @DESC   toggle slider state
      // @PARAM  opt.id  MAN {string}  slider id
      // @RETURN {void}
      toggle: function(opt) {
        var $ui, id;
        opt = opt || {};
        id = opt.id;
        $ui = $$('#' + id);
        if (!$ui) {
          return;
        }
        // TOGGLE slider state
        return $$.toggleClass($$('#front'), 'from-' + $ui.side);
      }
    }
  };
  return {
    // @DESC   create a new slider
    // @PARAM  opt.id      MAN {string}  UI id
    // @PARAM  opt.side    MAN {string}  top|right|bottom|left
    // @PARAM  opt.target  MAN {node}    target node
    // @RETURN {node}  target for sub UI's
    // @PUBLIC
    init: function(opt) {
      var $t, $ui, id, side;
      obs.r('ui-slider-toggle');
      opt = opt || {};
      id = opt.id;
      side = opt.side;
      $t = opt.target;
      if (!id || !side || !$t) {
        return;
      }
      // MARKUP slider
      $ui = ui.$tpl.cloneNode();
      $ui.id = id;
      $ui.side = side;
      // REGISTRATE custom events
      obs.l('ui-slider-toggle', ui.evs.toggle);
      // APPEND UI to target
      $t.appendChild($ui);
      // RETURN sub target
      return $ui;
    }
  };
})();
