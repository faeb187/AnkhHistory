/*
  UI LAYOUT
  @AUTHOR faeb187
*/
module.exports = (function() {
  var $$, ui;
  // @REQUIRE local modules
  $$ = require('../helpers/dom');
  ui = {
    
    // @DESC   adds item to flexbox
    // @PARAM  itm         MAN {json}    item conf
    // @PARAM  itm.id      MAN {string}  item id
    // @PARAM  itm.tagName OPT {string}  default 'div'
    // @PARAM  $ui         MAN {node}    flexbox target
    // @RETURN {void}
    addChild: function(itm, $ui) {
      var $itm, elm, id;
      itm = itm || {};
      id = itm.id;
      if (!itm || !$ui) {
        return;
      }
      // CREATE flexbox item
      elm = itm.tagName || 'div';
      $itm = $$('<' + elm + '/>', {
        id: id
      });
      // APPEND item to flexbox
      $ui.appendChild($itm);
      // RETURN item ref
      return $itm;
    }
  };
  return {
    // @DESC   creates a flexbox layout
    // @PARAM  build new flexbox layout
    // @PARAM  opt.direction       OPT {string}  CSS flex-direction
    // @PARAM  opt.alignItems      OPT {string}  CSS align-items
    // @PARAM  opt.justifyContent  OPT {string}  CSS justify-content
    // @PARAM  opt.target          OPT {string}  target node
    // @RETURN {[ node ]}  array of child nodes

    // PUBLIC

    init: function(opt) {
      var $t, $ui, i, itm, itms, len, nt;
      opt = opt || {};
      itms = opt.items;
      $t = opt.target;
      if (!itms || !$t) {
        return;
      }
      // @DEFINE new targets collection
      nt = [];
      // @MARKUP flexbox
      $ui = $$('<div/>', {
        'class': 'ui-flexbox'
      });
      for (i = 0, len = itms.length; i < len; i++) {
        itm = itms[i];
        // @APPEND items to flexbox
        nt.push(ui.addChild(itm, $ui));
      }
      // @APPEND UI to DOM target
      $t.appendChild($ui);
      // @RETURN new targets
      return nt;
    }
  };
})();
