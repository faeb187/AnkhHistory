"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countdown = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _core = require("../core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//  UI countdown
var countdown = function () {
  var $ui, _int, ui;

  $ui = null;
  _int = 0;
  ui = {
    $tpl: $$("<div/>", {
      "class": "ui-countdown"
    }),
    // @DESC   update countdown
    update: function update() {
      var s;
      s = parseInt($ui.innerText) - 1000;

      if (s <= 0) {
        clearInterval(_int);
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
    init: function init(opt) {
      var $t, id, styl, time;
      opt = opt || {};
      id = opt.id;
      time = opt.time;
      styl = opt.styl;
      $t = opt.target;

      if (!id || !time || typeof time !== "date" || !$t) {
        return;
      } // MARKUP countdown


      $ui = ui.$tpl.cloneNode();
      $ui.id = id;
      _int = +time - +new Date();

      if (styl) {
        $$.css($ui, styl);
      } // DISPLAY countdown


      setInterval(ui.update, 1000); // APPEND UI to target

      $t.appendChild($ui);
    }
  };
}();

exports.countdown = countdown;