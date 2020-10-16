"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.details = void 0;

var _core = require("../core");

// UI details
var details = function () {
  var init; // @DESC   build new details view
  // @PARAM  opt.id            MAN {string}      ui id
  // @PARAM  opt.ids           OPT {json[]}      children ui configs
  // @PARAM  opt.open          OPT {boolean}     details expanded
  // @PARAM  opt.summary       OPT {json}        summary data
  // @PARAM  opt.summary.lang  MAN {string}      summary lang id
  // @PARAM  opt.target        MAN {HTMLElement} ui target

  init = function init(opt) {
    var $summary, $t, $ui, id, ids, lang, open, summary;
    id = opt.id;
    var _opt$ids = opt.ids;
    ids = _opt$ids === void 0 ? [] : _opt$ids;
    var _opt$open = opt.open;
    open = _opt$open === void 0 ? false : _opt$open;
    var _opt$summary = opt.summary;
    summary = _opt$summary === void 0 ? {} : _opt$summary;
    $t = opt.target;
    lang = summary.lang;

    if (!id || !$t || !lang) {
      return;
    }

    $ui = (0, _core.$$)("<details/>", {
      "class": "ui-details",
      open: open
    });
    $summary = (0, _core.$$)("<summary/>", {
      "data-lang": lang
    });
    $ui.appendChild($summary);
    ids.map(function (ui) {
      ui.target = $ui;
      return _core.obs.f("_ui-".concat(ui.ui, "-init"), ui);
    });
    $t.appendChild($ui);

    _core.obs.f("ankh-ui-ready", "ui-details");
  };

  _core.obs.l("_ui-details-init", init);
}();

exports.details = details;