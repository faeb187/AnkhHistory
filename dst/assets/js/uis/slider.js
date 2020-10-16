"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slider = void 0;

var _core = require("../core");

// UI slider
var slider = function () {
  var init, ui;
  ui = {
    events: {
      toggle: function toggle(opt) {
        var $target, side;
        var _opt$side = opt.side;
        side = _opt$side === void 0 ? "left" : _opt$side;
        $target = opt.$target;
        return _core.$$.toggleClass((0, _core.$$)("#front"), "from-".concat(side));
      }
    }
  }; // @DESC   create a new slider
  // @PARAM  opt.id      MAN {string}  UI id
  // @PARAM  opt.ids     OPT {any[]}   children ui configs
  // @PARAM  media       OPT {json}    viewport config
  // @PARAM  opt.target  MAN {node}    target node

  init = function init(opt) {
    var $t, $ui, id, ids, m;
    id = opt.id;
    m = opt.media;
    $t = opt.target;
    var _opt$ids = opt.ids;
    ids = _opt$ids === void 0 ? [] : _opt$ids;

    if (!id || !$t) {
      return;
    }

    if (m && !_core.media.isInViewport(m)) {
      return _core.obs.f("_ankh-ui-not-loaded", opt);
    }

    $ui = (0, _core.$$)("<div/>", {
      id: id,
      "class": "ui-slider"
    });
    ids.forEach(function (ui) {
      ui.target = $ui;
      return _core.obs.f("_ui-".concat(ui.ui, "-init"), ui);
    });
    $t.appendChild($ui);

    _core.obs.f("_ankh-ui-loaded", opt);

    _core.obs.f("ankh-ui-ready", "ui-slider");
  };

  _core.obs.l("_ui-slider-toggle", function (options) {
    return options.events.click.forEach(function (clickEvent) {
      if (clickEvent.name === "_ui-slider-toggle") {
        return ui.events.toggle(clickEvent);
      }
    });
  });

  _core.obs.l("_ui-slider-init", init);
}();

exports.slider = slider;