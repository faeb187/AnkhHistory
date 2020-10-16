"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.button = void 0;

var _core = require("../core");

// UI button
var button = function () {
  var init, ui;
  ui = {
    evs: {
      click: function click(e) {
        var $elm, ev, evs, i, len;
        $elm = e.target;

        if ($elm.tagName === "I") {
          $elm = $elm.parentNode;
        } // FIND custom 'click' events


        evs = $elm.events || {};
        evs = evs.click;

        if (!evs || !evs.length) {
          return;
        }

        for (i = 0, len = evs.length; i < len; i++) {
          ev = evs[i];

          if (ev) {
            // FIRE custom 'click' events
            _core.obs.f(ev.ev, ev.arg);
          }
        }
      }
    }
  }; // @DESC   inits a new button
  // @PARAM  classNames        OPT {string}    class names
  // @PARAM  opt.id            MAN {string}    UI id
  // @PARAM  opt.lang          OPT {string}    lang ref
  // @PARAM  opt.icon          OPT {string}    ion name
  // @PARAM  opt.events        OPT {json}      custom events to bind
  // @PARAM  opt.events.click  OPT {[string]}  list of custom 'click' events
  // @PARAM  opt.target        MAN {node}      target node
  // @RETURN {void}
  // @PUBLIC

  init = function init(opt) {
    var $t, $ui, classNames, evs, icon, id, lang, m;
    var _opt$classNames = opt.classNames;
    classNames = _opt$classNames === void 0 ? "" : _opt$classNames;
    evs = opt.events;
    id = opt.id;
    lang = opt.lang;
    m = opt.media;
    icon = opt.icon;
    $t = opt.target;

    if (!icon && !lang || !id || !$t) {
      return;
    }

    if (_core.media && !_core.media.isInViewport(m)) {
      return _core.obs.f("_ankh-ui-not-loaded", opt);
    }

    $ui = (0, _core.$$)("<button/>", {
      id: id,
      "class": "ui-button ".concat(classNames)
    });

    if (evs) {
      $ui.events = evs;
    } //if evs.click  then $$.listen $ui, 'click', ui.evs.click

    /*if evs.click
      hand = new Hammer.Manager $ui
      hand.add new Hammer.Tap()
      hand.on "tap", ui.evs.click
    */
    // SET caption/icon


    if (lang) {
      $ui.setAttribute("data-lang", lang);
    } else {
      $ui.appendChild((0, _core.$$)("<i/>", {
        "class": icon
      }));
    } // APPEND UI to target


    $t.appendChild($ui);

    _core.obs.f("_ankh-ui-loaded", opt);

    _core.obs.f("ankh-ui-ready", "ui-button#".concat(id));
  };

  _core.obs.l("_ui-button-init", init);
}();

exports.button = button;