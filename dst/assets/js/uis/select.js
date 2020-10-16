"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.select = void 0;

var _core = require("../core");

// UI select
var select = function () {
  var init, ui;
  ui = {
    get$Option: function get$Option(option) {
      var $option, attrs, lang;
      var _option$attrs = option.attrs;
      attrs = _option$attrs === void 0 ? {} : _option$attrs;
      lang = option.lang;
      $option = (0, _core.$$)("<option/>", {
        "data-lang": lang
      });
      Object.keys(attrs).map(function (attrKey) {
        return $option.setAttribute(attrKey, attrs[attrKey]);
      });
      return $option;
    }
  }; // @DESC   creates a <select> element
  // @PARAM  id        MAN {string}      ui id
  // @PARAM  options   MAN {json[]}      select options
  // @PARAM  target    MAN {HTMLElement} ui target

  init = function init(opt) {
    var $options, $t, $ui, id, options;
    id = opt.id;
    options = opt.options;
    $t = opt.target;

    if (!id || !(options != null ? options.length : void 0) || !$t) {
      return;
    }

    $ui = (0, _core.$$)("<select/>", {
      "class": "ui-select",
      id: id
    });
    $options = options.map(function (option) {
      var $option;
      return $option = ui.get$Option(option);
    });

    _core.$$.append($options, $ui);

    $t.appendChild($ui);

    _core.obs.f("ankh-ui-ready", "ui-select#".concat(id));
  };

  _core.obs.l("_ui-select-init", init);
}();

exports.select = select;