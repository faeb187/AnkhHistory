"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carousel = void 0;

var _core = require("../core");

// UI carousel
var carousel = function () {
  var init; // @DESC   build new carousel
  // @PARAM  opt.id        MAN {string}  UI id
  // @PARAM  opt.data      MAN {json[]}  carousel contents
  // @PARAM  opt.target    MAN {string}  target node

  init = function init(opt) {
    var $carousel, $t, $ui, data, deg, id, len, ratio, z;
    id = opt.id;
    data = opt.data;
    $t = opt.target;

    if (!id || !(data != null ? data.length : void 0) || !$t) {
      return;
    }

    $ui = (0, _core.$$)("<section/>", {
      id: id,
      "class": "ui-carousel"
    });
    $carousel = (0, _core.$$)("<div/>");
    len = data.length;
    deg = 0;
    ratio = 360 / len;
    z = Math.round(210 / 2) / Math.tan(Math.PI / len);
    data.forEach(function (dta) {
      var $cnt, trf;
      trf = "transform:rotateY(" + deg + "deg) translateZ(" + z + "px)";
      deg += ratio;
      $cnt = (0, _core.$$)("<div/>", {
        "class": "ui-carousel-item",
        style: trf
      });
      Object.keys(dta).forEach(function (key) {
        var $p;
        $p = (0, _core.$$)("<p/>", {
          innerText: dta[key]
        });
        $cnt.appendChild((0, _core.$$)("<h4/>", {
          "data-lang": key
        }));
        return $cnt.appendChild($p);
      });
      return $carousel.appendChild($cnt);
    });
    $ui.appendChild($carousel);
    $t.appendChild($ui);

    _core.obs.f("ankh-ui-ready", "ui-carousel#".concat(id));
  };

  _core.obs.l("_ui-carousel-init", init);
}();

exports.carousel = carousel;