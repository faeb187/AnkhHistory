"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.icon = void 0;

var _core = require("../core");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var icon = function () {
  var init, ui;
  ui = {
    events: {
      toggleIcon: function toggleIcon(opt) {
        var $icon, $target, icons;
        icons = opt.icons;
        $target = opt.$target;
        $icon = (0, _core.$$)("ion-icon", $target);

        var _icons$filter = icons.filter(function (icon) {
          return $icon.getAttribute("name") !== icon;
        });

        var _icons$filter2 = _slicedToArray(_icons$filter, 1);

        exports.icon = icon = _icons$filter2[0];
        $icon.setAttribute("name", icon);
      }
    }
  }; // @DESC   displays icon
  // @PARAM  opt.id      MAN {string}  ui id
  // @PARAM  opt.icon    MAN {string}  ion icon name
  // @PARAM  opt.events  OPT {json}    custom events
  // @PARAM  media       OPT {json}    viewport config
  // @PARAM  opt.target  MAN {node}    target node
  // @RETURN {node}  ui

  init = function init(opt) {
    var $icon, $t, $ui, events, id, m;
    id = opt.id;
    exports.icon = icon = opt.icon;
    events = opt.events;
    m = opt.media;
    $t = opt.target;

    if (!id || !$t) {
      return;
    }

    if (m && !_core.media.isInViewport(m)) {
      return _core.obs.f("_ankh-ui-not-loaded", opt);
    }

    $icon = (0, _core.$$)("<ion-icon/>", {
      name: icon
    });
    $icon.style.pointerEvents = "none";

    if (events) {
      if (events.click) {
        $ui = (0, _core.$$)("<a/>");
        $ui.append($icon);

        $ui.onclick = function () {
          return events.click.forEach(function (clickEvent) {
            return _core.obs.f("_ankh-ui-fire", clickEvent);
          });
        };
      }
    }

    if (!$ui) {
      $ui = $icon;
    }

    $ui.id = id;
    $ui.className = "ui-icon";
    $ui.events = events;
    $t.appendChild($ui);

    _core.obs.f("_ankh-ui-loaded", opt);

    _core.obs.f("ankh-ui-ready", "ui-icon");
  };

  _core.obs.l("_ui-icon-toggle", function (options) {
    return options.events.click.forEach(function (clickEvent) {
      if (clickEvent.name === "_ui-icon-toggle") {
        return ui.events.toggleIcon(clickEvent);
      }
    });
  });

  _core.obs.l("_ui-icon-init", init);
}();

exports.icon = icon;