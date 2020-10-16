"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html = void 0;

var _core = require("../core");

// UI html
var html = function () {
  var init; // @REQUIRE local modules
  // @PRIVATE
  // @DESC   builds new html node
  // @PARAM  classNames  OPT {string}  css class names
  // @PARAM  id          MAN {string}  ui id
  // @PARAM  lang        OPT {string}  lang id (i18n)
  // @PARAM  src         OPT {string}  path to image
  // @PARAM  target      MAN {node}    target node
  // @PARAM  text        OPT {string}  innerText (bypass i18n)

  init = function init(opt) {
    var $t, $ui, className, classNames, id, ids, lang, m, src, tag, text;
    var _opt$classNames = opt.classNames;
    classNames = _opt$classNames === void 0 ? "" : _opt$classNames;
    id = opt.id;
    var _opt$ids = opt.ids;
    ids = _opt$ids === void 0 ? [] : _opt$ids;
    lang = opt.lang;
    m = opt.media;
    src = opt.src;
    var _opt$tag = opt.tag;
    tag = _opt$tag === void 0 ? "div" : _opt$tag;
    text = opt.text;
    $t = opt.target;

    if (!id || !$t) {
      return;
    }

    if (m && !_core.media.isInViewport(m)) {
      return _core.obs.f("_ankh-ui-not-loaded", opt);
    }

    className = "ui-html ".concat(classNames);
    $ui = (0, _core.$$)("<".concat(tag, "/>"), {
      id: id,
      "class": classNames
    });

    if (src) {
      $ui.setAttribute("src", src);
      $ui.setAttribute("data-lang", lang);
    } else if (lang) {
      $ui.setAttribute("data-lang", lang);
    } else if (text) {
      $ui.innerText = text;
    }

    ids.forEach(function (ui) {
      ui.target = $ui;
      return _core.obs.f("_ui-".concat(ui.ui, "-init"), ui);
    });
    $t.appendChild($ui);

    _core.obs.f("_ankh-ui-loaded", opt);

    _core.obs.f("ankh-ui-ready", "ui-html#".concat(id));
  };

  _core.obs.l("_ui-html-init", init);
}();

exports.html = html;