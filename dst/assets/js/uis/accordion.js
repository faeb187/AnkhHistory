"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accordion = void 0;

var _core = require("../core");

// UI accordion
var accordion = function () {
  var init; // @DESC   build new accordion
  // @PARAM  opt.id      MAN {string}      ui id
  // @PARAM  opt.ids     OPT {json}        ui-details configs
  // @PARAM  opt.target  MAN {HTMLElement} ui target

  init = function init(opt) {
    var $t, $ui, id, ids;
    id = opt.id;
    var _opt$ids = opt.ids;
    ids = _opt$ids === void 0 ? [] : _opt$ids;
    $t = opt.target;

    if (!id || !$t) {
      return;
    }

    $ui = (0, _core.$$)("<section/>", {
      "class": "ui-accordion"
    });
    ids.map(function (ui) {
      ui.target = $ui;
      return _core.obs.f("_ui-details-init", ui);
    });
    $t.appendChild($ui);

    _core.obs.f("ankh-ui-ready", "ui-accordion");
  };

  _core.obs.l("_ui-accordion-init", init);
}();

exports.accordion = accordion;