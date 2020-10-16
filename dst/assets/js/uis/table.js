"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.table = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _core = require("../core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var table = function () {
  var adjust, adjustWidths, d, get$Td, getDynamicThs, getFixedThs, getPdg, getRequiredTdWidths, getRequiredThWidths, getRequiredWidths, init, isTooSmall;
  d = document;

  getPdg = function getPdg($ths) {
    return $ths.map(function ($th) {
      return parseInt(_core.$$.css($th, "paddingLeft")) + parseInt(_core.$$.css($th, "paddingRight"));
    }).reduce(function (a, b) {
      return a + b;
    });
  };

  get$Td = function get$Td(innerTexts) {
    return innerTexts.forEach(function (innerText) {
      return $tr.appendChild((0, _core.$$)("<td/>", {
        "data-lang": true,
        "data-lang-rendered": true,
        innerText: innerText
      }));
    });
  };

  getDynamicThs = function getDynamicThs($ths) {
    return $ths.filter(function ($th) {
      return !!!$th.getAttribute("data-width");
    });
  };

  getFixedThs = function getFixedThs($ths) {
    return $ths.filter(function ($th) {
      return !!$th.getAttribute("data-width");
    });
  };

  getRequiredWidths = function getRequiredWidths($ths, $ui) {
    var reqTdW, reqThW;
    reqTdW = getRequiredTdWidths($ths, $ui);
    reqThW = getRequiredThWidths($ths);
    return reqTdW.map(function (w, index) {
      return Math.max(w, reqThW[index]);
    });
  };

  getRequiredThWidths = function getRequiredThWidths($ths) {
    var $dynamicThs, fs;
    $dynamicThs = getDynamicThs($ths);
    fs = parseInt(_core.$$.css($dynamicThs[0], "fontSize"));
    return $dynamicThs.map(function ($th) {
      return _core.$$.measure($th.innerText, fs).w;
    });
  };

  getRequiredTdWidths = function getRequiredTdWidths($ths, $ui) {
    var $firstTd, fs;
    $firstTd = (0, _core.$$)("td[data-col-index]", $ui)[0];
    fs = parseInt(_core.$$.css($firstTd, "fontSize"));
    return getDynamicThs($ths).map(function ($th) {
      var $td, currency, index, toMeasure;
      index = parseInt($th.getAttribute("data-col-index"));
      $td = (0, _core.$$)("td[data-col-index='".concat(index, "']"), $ui)[0];
      currency = $td.getAttribute("data-currency");
      toMeasure = currency ? "".concat(currency.toUpperCase(), " ").concat($td.innerText) : $td.innerText;
      return _core.$$.measure(toMeasure, fs).w;
    });
  };

  adjustWidths = function adjustWidths(adjustedWidths, delta, threshold) {
    var _adjust, adjW;

    adjW = _toConsumableArray(adjustedWidths);

    _adjust = function _adjust(delta) {
      var maxIndex, maxReqW, minComp, minIndex, minReqW, newMin;
      minReqW = Math.min.apply(Math, _toConsumableArray(adjW));
      maxReqW = Math.max.apply(Math, _toConsumableArray(adjW));
      newMin = threshold - delta;
      minComp = newMin - minReqW;
      maxIndex = adjW.indexOf(Math.max.apply(Math, _toConsumableArray(adjW)));
      minIndex = adjW.indexOf(Math.min.apply(Math, _toConsumableArray(adjW)));
      adjW[maxIndex] = maxReqW - minComp;
      adjW[minIndex] = newMin;
    };

    while (isTooSmall(adjustedWidths, delta, threshold)) {
      _adjust(delta);
    }

    return adjW;
  };

  isTooSmall = function isTooSmall(adjustedWidths, delta, threshold) {
    var tooSmall;
    tooSmall = Math.min.apply(Math, _toConsumableArray(adjustedWidths)) + delta < threshold;
    return tooSmall > threshold;
  };

  adjust = function adjust(opt) {
    var $dynamicThs, $fixedThs, $parent, $target, $thead, $ths, adjustedWidths, delta, fixedWSum, maxW, ref, reqWSum, threshold, totalAdj;
    var _opt$threshold = opt.threshold;
    threshold = _opt$threshold === void 0 ? 80 : _opt$threshold;
    $target = opt.$target;
    $parent = _core.$$.parent($target);
    $thead = (0, _core.$$)("thead", $target);
    $ths = Array.from((0, _core.$$)("th", $target));
    $dynamicThs = getDynamicThs($ths);
    $fixedThs = getFixedThs($ths);
    adjustedWidths = ((ref = _core.state.get({
      id: $target.id
    })) != null ? ref.adjustedWidths : void 0) || getRequiredWidths($ths); // mobile viewport

    if (_core.$$.css($thead, "position") === "absolute") {
      return;
    }

    $fixedThs.forEach(function ($th) {
      var index;
      index = parseInt($th.getAttribute("data-col-index"));
      return _core.$$.css("[data-col-index='".concat(index, "']"), {
        width: "".concat($th.getAttribute("data-width"), "px")
      });
    }); // exclude td's with fixed width

    fixedWSum = $fixedThs.map(function ($th) {
      return parseInt($th.getAttribute("data-width"));
    }).reduce(function (a, b) {
      return a + b;
    });
    maxW = $parent.clientWidth - fixedWSum;
    totalAdj = adjustedWidths.reduce(function (a, b) {
      return a + b;
    });
    reqWSum = totalAdj + getPdg($ths);
    delta = (maxW - reqWSum) / $dynamicThs.length;

    if (delta < 0) {
      adjustedWidths = adjustWidths(adjustedWidths, delta, threshold);

      _core.state.set({
        id: $target.id,
        state: {
          adjustedWidths: adjustedWidths
        }
      });
    }

    return $dynamicThs.forEach(function ($th, index) {
      var colIndex;
      colIndex = parseInt($th.getAttribute("data-col-index"));
      return _core.$$.css("[data-col-index='".concat(colIndex, "']"), {
        width: "".concat(adjustedWidths[index] + delta, "px")
      });
    });
  }; // @PARAM    id      MAN {string}      ui id
  // @PARAM    cols    MAN {json}        column config
  // @PARAM    data    MAN {json[]}      array with data objects
  // @PARAM    media   OPT {json}        viewport config
  // @PARAM    target  MAN {HTMLElement} target node


  init = function init(opt) {
    var $img, $t, $tbody, $thead, $theadTr, $ths, $trs, $ui, adjustEvent, cols, data, fireAdjustEvent, id, m, pagination;
    id = opt.id;
    cols = opt.cols;
    data = opt.data;
    m = opt.media;
    pagination = opt.pagination;
    $t = opt.target;

    if (!id || !cols || !(data != null ? data.length : void 0) || !$t) {
      return;
    }

    if (m && !_core.media.isInViewport(m)) {
      return _core.obs.f("_ankh-ui-not-loaded", opt);
    }

    $ui = (0, _core.$$)("<table/>", {
      "class": "ui-table",
      id: id
    });
    $thead = (0, _core.$$)("<thead/>");
    $theadTr = (0, _core.$$)("<tr/>");
    $tbody = (0, _core.$$)("<tbody/>");
    $img = (0, _core.$$)("<img/>"); // build all <th>'s

    $ths = cols.map(function (col, index) {
      var $th;
      $th = (0, _core.$$)("<th/>", {
        "data-col-index": index
      });

      if (col.lang) {
        $th.setAttribute("data-lang", col.lang);
      }

      if (col.svg) {
        $th.setAttribute("data-svg", true);
      }

      if (col.date) {
        $th.setAttribute("data-date", true);
      }

      if (col.currency) {
        $th.setAttribute("data-currency", col.currency);
      }

      if (col.right) {
        _core.$$.addClass($th, "right");
      }

      if (col.width) {
        $th.setAttribute("data-width", col.width);
      }

      return $th;
    }); // build all <tr>'s with data

    $trs = data.map(function (tr) {
      var $tr;
      $tr = (0, _core.$$)("<tr/>");
      cols.forEach(function (col, index) {
        var $svg, $td, v;
        $td = (0, _core.$$)("<td/>");
        $td.setAttribute("data-col-index", index); // type: svg

        if (col.svg) {
          $svg = (0, _core.$$)("<img/>", {
            src: "/assets/svg/".concat(col.svg, ".svg")
          });
          $td.appendChild($svg); // type: text
        } else if (col.lang) {
          $td.setAttribute("data-lang-rendered", true);
          $td.setAttribute("data-lang", col.lang);
          v = tr[col.lang];

          if (col.date) {
            v = (0, _moment["default"])(v).format("DD/YY");
            $td.setAttribute("data-date", true);
          } else if (col.currency) {
            v = v.toLocaleString("de");
            $td.setAttribute("data-currency", col.currency);
          }

          $td.innerText = v;
        }

        if (col.right) {
          _core.$$.addClass($td, "right");
        }

        return $tr.appendChild($td);
      });
      return $tr;
    });

    _core.$$.append($ths, $theadTr);

    $thead.appendChild($theadTr);

    _core.$$.append($trs, $tbody);

    $ui.appendChild($thead);
    $ui.appendChild($tbody);
    $t.appendChild($ui);

    if (!opt.events) {
      opt.events = {};
    }

    adjustEvent = {
      name: "ui-table-adjust",
      target: id
    };
    opt.events.resize = [adjustEvent];

    fireAdjustEvent = function fireAdjustEvent() {
      return _core.obs.f("_ankh-ui-fire", adjustEvent);
    };

    _core.obs.l("ui-table-adjust", function (options) {
      return options.events.resize.forEach(function (resizeEvent) {
        return adjust(resizeEvent);
      });
    });

    _core.obs.l("_ankh-resize", fireAdjustEvent);

    _core.obs.l("ui-lang-updated", fireAdjustEvent);

    _core.obs.f("_ankh-ui-loaded", opt);

    _core.obs.f("ankh-ui-ready", "ui-table#".concat(id));
  };

  _core.obs.l("_ui-table-init", init);
}();

exports.table = table;