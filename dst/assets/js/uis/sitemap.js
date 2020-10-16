"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sitemap = void 0;

var _core = require("../core");

// UI sitemap
var sitemap = function () {
  var Conf, Ui, ui; // PRIVATE

  Ui = {
    nav: require("./nav")
  };
  Conf = {
    nav: require("../conf/nav")
  };
  ui = {
    $tpl: (0, _core.$$)("<section/>", {
      "class": "ui-sitemap"
    })
  };
  return {
    // @DESC init sitemap
    // PUBLIC
    init: function init(opt) {
      var navC;
      opt = opt || {};
      opt.type = "sitemap";
      navC = Conf.nav;

      if (!navC) {
        return;
      } // INIT UI nav with type sitemap
      // (extend options from UI nav)


      return Ui.nav.init(_core.$$.extend(navC, opt));
    }
  };
}();

exports.sitemap = sitemap;