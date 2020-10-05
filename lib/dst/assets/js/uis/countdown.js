/*
  UI COUNTDOWN
  @AUTHOR faeb187
*/
module.exports = (function() {
  var $$, $ui, int, moment, ui;
  
  // PRIVATE

  // REQUIRE npm modules
  moment = require('moment');
  // REQUIRE local modules
  $$ = require('../helpers/dom');
  // VARIABLES
  $ui = null;
  int = 0;
  ui = {
    $tpl: $$('<div/>', {
      'class': 'ui-countdown'
    }),
    
    // @DESC   update countdown
    // @RETURN {void}
    update: function() {
      var s;
      s = parseInt($ui.innerText) - 1000;
      if (s <= 0) {
        clearInterval(int);
      } else {
        $ui.innerText = s;
      }
    }
  };
  return {
    // @DESC   init countdown
    // @PARAM  opt.id      MAN {string}  UI id
    // @PARAM  opt.time    MAN {date}    countdown end
    // @PARAM  opt.styl    OPT {json}    styles
    // @PARAM  opt.target  MAN {node}    target node
    // @RETURN {void}

    // PUBLIC

    init: function(opt) {
      var $t, id, styl, time;
      opt = opt || {};
      id = opt.id;
      time = opt.time;
      styl = opt.styl;
      $t = opt.target;
      if (!id || !time || typeof time !== 'date' || !$t) {
        return;
      }
      // MARKUP countdown
      $ui = ui.$tpl.cloneNode();
      $ui.id = id;
      int = +time - +new Date();
      if (styl) {
        $$.css($ui, styl);
      }
      // DISPLAY countdown
      setInterval(ui.update, 1000);
      // APPEND UI to target
      $t.appendChild($ui);
    }
  };
})();
