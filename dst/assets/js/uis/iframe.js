"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iframe = void 0;

var _core = require("../core");

// UI iframe
var iframe = function () {
  var init; // @DESC   init iframe
  // @PARAM  opt.id      MAN {string}  ui id
  // @PARAM  opt.src     MAN {string}  iframe source
  // @PARAM  opt.target  MAN {node}    target node
  // @RETURN {node}  ui

  init = function init(opt) {
    var $t, $ui, id, src;
    id = opt.id;
    src = opt.src;
    $t = opt.target;

    if (!id || !src || !$t) {
      return;
    }

    $ui = (0, _core.$$)("<iframe/>", {
      id: id,
      "class": "ui-iframe",
      src: src
    });
    $t.appendChild((0, _core.$$)("<p/>"));

    _core.obs.f("ankh-ui-ready", "ui-iframe");
  };

  _core.obs.l("_ui-iframe-init", init);
}();

exports.iframe = iframe;