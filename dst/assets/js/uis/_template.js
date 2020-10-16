"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiName = void 0;

var _core = require("../core");

// UI [uiName]
var uiName = function () {
  var init; // @DESC   inits a new [uiName]
  // @PARAM  id        MAN {string}      ui id
  // @PARAM  media     OPT {json}        viewport config
  // @PARAM  target    MAN {HTMLElement} target node

  init = function init(options) {
    var $t, $ui, id, m;
    id = options.id;
    m = options.media;
    $t = options.target;

    if (!id || !$t) {
      return;
    }

    if (m && !_core.media.isInViewport(m)) {
      return _core.obs.f("_ankh-ui-not-loaded", options);
    }

    $ui = (0, _core.$$)("<[uiRoot]/>", {
      id: id,
      "class": "ui-[uiName]"
    });
    $t.appendChild($ui);

    _core.obs.f("_ankh-ui-loaded", opt);

    _core.obs.f("ankh-ui-ready", "ui-[uiName]#".concat(id));
  };

  _core.obs.l("_ui-[uiName]-init", init);
}();

exports.uiName = uiName;