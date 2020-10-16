"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lang = void 0;

var _core = require("../core");

var _i18n = require("../apps/dbp/i18n");

// UI lang
var lang = function () {
  var changeLang, def, init, lib, update; // @DESC   click event to switch lang # @PARAM  event {Event} click on anchor

  changeLang = function changeLang(event) {
    var $a;
    event.preventDefault();
    $a = event.target; // update lang

    _core.obs.f("ui-lang-update", {
      lang: $a.getAttribute("lang")
    }); // update 'active' class


    (0, _core.$$)(".active", $a.parentNode).className = "";
    return $a.className = "active";
  };

  def = "de";
  lib = {
    de: _i18n.de,
    en: _i18n.en
  }; // @DESC   build new language switcher
  // @PARAM  opt.id      MAN {string}  UI id
  // @PARAM  opt.target  MAN {string}  DOM target id
  // @RETURN {void}

  init = function init(opt) {
    var $a, $t, $ui, id, idx, k, self, v;
    id = opt.id;
    $t = opt.target;
    self = this;

    if (!id || !$t) {
      return;
    } // active lang by priority
    // ( localStorage > default )


    exports.lang = lang = _core.state.get({
      id: id
    }) || def; // UI markup

    $ui = (0, _core.$$)("<nav/>", {
      id: id,
      "class": "ui-lang"
    }); // iterate through language lib

    idx = 0;

    for (k in lib) {
      v = lib[k];
      $a = (0, _core.$$)("<a/>", {
        rel: "alternate",
        hreflang: k,
        lang: k
      });
      $a.innerText = k; // SET active class

      if (k === lang) {
        $a.className = "active";
      } // SWITCH lang on click


      _core.$$.listen($a, "click", changeLang); // append UI to DOM target


      $ui.appendChild($a);
    }

    $t.appendChild($ui);

    _core.obs.l("ui-lang-update", update);

    _core.obs.f("ankh-ui-ready", "ui-lang");
  }; // @DESC   update language
  // @PARAM  opt.lang  OPT {string}  language code
  // @RETURN {void}


  update = function update() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var elm, i, index, len, ref, v;
    var _opt$lang = opt.lang;
    exports.lang = lang = _opt$lang === void 0 ? "" : _opt$lang;
    // language by priority
    // ( direct change > localStorage > default )
    // !TODO language by geolocation
    exports.lang = lang = lang || _core.state.get({
      id: "lang"
    }) || def;
    ref = (0, _core.$$)("[data-lang]"); // update elements

    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      elm = ref[index];
      v = lib[lang][elm.getAttribute("data-lang")];

      if (elm.getAttribute("data-lang-rendered")) {
        elm.setAttribute("data-lang-rendered", v);
      } else if (elm.tagName === "IMG") {
        elm.setAttribute("alt", v);
      } else if (elm.tagName === "INPUT") {
        elm.setAttribute("placeholder", v);
      } else {
        elm.innerHTML = v;
      }
    }

    (0, _core.$$)("html").setAttribute("lang", lang);

    _core.state.set({
      id: "lang",
      state: lang
    });

    _core.obs.f("ui-lang-updated");
  };

  _core.obs.l("_ankh-ready", update);

  _core.obs.l("_ui-lang-init", init);

  _core.obs.l("_ankh-viewport-changed", update);
}();

exports.lang = lang;