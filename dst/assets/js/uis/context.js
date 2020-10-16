"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.context = void 0;

var _core = require("../core");

// UI context
var context = function () {
  var $ui, addContext, d, elms, ui;
  d = document;
  $ui = null;
  elms = [];
  ui = {
    evs: {
      // @DESC   contextmenu was triggered
      // @PARAM  e   MAN {event} context event
      // @RETURN {void}
      contextMenu: function contextMenu(e) {
        e.preventDefault();
        $$.css($ui, {
          left: e.clientX,
          top: e.clientY
        });
        $$.addClass($ui, "active");
      }
    }
  }; // @DESC     context menu listener
  // @PARAM    opt.id      MAN {string}
  // @PARAM    opt.$elm    MAN {node}
  // @RETURN   {void}
  // @PRIVATE

  addContext = function addContext(opt) {
    var $elm, id; // DEFINE variables

    opt = opt || {};
    id = opt.id;
    $elm = $$("#" + id); // LISTEN for right click

    if ($elm) {
      $$.listen($elm, "contextmenu", ui.evs.contextMenu);
    }
  };

  return {
    // @desc     build new context menu
    // @param    opt.id                MAN {string}  UI id
    // @param    opt.elms              MAN {array}   elements with context
    // @param    opt.elements.$.id     MAN {string}  element id
    // @param    opt.elements.$.items  MAN {array}   menu for element
    // @param    opt.elements.$.lang   MAN {string}  lang reference
    // @returns  {void}
    init: function init(opt) {
      var $a, $b, $nav, elm, elmId, i, id, itm, itms, j, len, len1; // DEFINE variables

      opt = opt || {};
      id = opt.id;
      elms = opt.elements;
      $b = $$("body");

      if (!id || !elms) {
        return;
      }

      $ui = $$("<div/>", {
        "class": "ui-context"
      });
      $nav = $$("<nav/>");

      for (i = 0, len = elms.length; i < len; i++) {
        elm = elms[i];
        elmId = elm.id;
        itms = elm.items;

        if (!elmId || !itms) {
          continue;
        }

        for (j = 0, len1 = itms.length; j < len1; j++) {
          itm = itms[j]; // create context menu entry

          $a = $$("<a/>", "data-lang", itm.lang);
          $nav.appendChild($a);
        } // collect elms


        elms.push(elmId); // add right click

        addContext({
          id: elmId
        });
      } // APPEND UI to DOM target


      $ui.appendChild($nav);
      return $b.appendChild($ui);
    }
  };
}();

exports.context = context;