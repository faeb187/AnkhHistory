/*
  UI FAB
  @AUTHOR faeb187
*/
module.exports = (function() {
  var $$;
  
  // @REQUIRE local modules
  $$ = require('../helpers/dom');
  return {
    // @DESC   build new FAB
    // @PARAM  opt.items             MAN {[json]}  buttons
    // @PARAM  opt.items.$.tooltip   OPT {string}  lang reference
    // @PARAM  opt.action            MAN {?}
    // @PARAM  opt.target            MAN {string}  target node
    // @RETURN {void}
    // @PUBLIC
    init: function(opt) {
      var $btn, $t, $ui, actn, i, icons, itm, itms, j, len;
      // DEFINE variables
      opt = opt || {};
      itms = opt.items;
      actn = opt.action;
      $t = opt.target;
      if (!itms || !$t) {
        return;
      }
      // button wrapper
      $ui = $$('<nav/>', {
        'class': 'ui-fab',
        draggable: 'draggable'
      });
      
      // create the main button
      itms.push({
        tooltip: actn
      });
      // test
      icons = ['ion-social-facebook', 'ion-social-twitter', 'ion-social-googleplus', 'ion-android-share-alt'];

      // ADD buttons
      for (i = j = 0, len = itms.length; j < len; i = ++j) {
        itm = itms[i];
        $btn = $$('<a/>', {
          href: '#',
          'class': 'btn',
          tooltip: item.tooltip
        });
        $btn.appendChild($$('<i/>', {
          'class': icons[i]
        }));
        $ui.appendChild($btn);
      }
      // APPEND UI to DOM
      $t.appendChild($ui);
    }
  };
})();
