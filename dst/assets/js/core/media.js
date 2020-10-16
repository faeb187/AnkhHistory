"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.media = void 0;

var _dom = require("./dom");

var _obs = require("./obs");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var media = function () {
  var bps, fireEvent, handleResize, isInViewport, throttle, uis; // breakpoints
  // (!) in sync with rupture

  bps = {
    xs: 0,
    s: 400,
    m: 500,
    l: 800,
    xl: 1050,
    hd: 1800
  }; // throttling resize event

  throttle = {
    delay: 100,
    active: false
  }; // loaded / not loaded UIs

  uis = {
    loaded: [],
    notLoaded: []
  }; // fires custom and UI events

  fireEvent = function fireEvent(event) {
    var eventName, eventTarget;
    eventName = event.name;
    eventTarget = event.target;
    return uis.loaded.forEach(function (uiLoaded) {
      var events;
      var _uiLoaded$events = uiLoaded.events;
      events = _uiLoaded$events === void 0 ? {} : _uiLoaded$events;
      return Object.keys(events).forEach(function (eventType) {
        return events[eventType].forEach(function (ev) {
          if (ev.name !== eventName) {
            return;
          }

          if (!ev.$target) {
            ev.$target = (0, _dom.$$)("#".concat(ev.target));
          }

          return _obs.obs.f(eventName, uiLoaded);
        });
      });
    });
  };

  handleResize = function handleResize() {
    var notLoaded;

    _obs.obs.f("_ankh-resize");

    notLoaded = _toConsumableArray(uis.notLoaded);
    uis.notLoaded = []; // all not loaded UIs have to try again on this viewport

    notLoaded.forEach(function (opt) {
      return _obs.obs.f("_ui-".concat(opt.ui, "-init"), opt);
    }); // the loaded ones ned a shown/hidden update

    uis.loaded.forEach(function (opt) {
      if (!opt.media) {
        return;
      }

      (0, _dom.$$)("#".concat(opt.id)).setAttribute("data-fx", isInViewport(opt.media) ? "in" : "out");
    });
  };

  isInViewport = function isInViewport() {
    var media = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var max, min, vpW;
    vpW = window.innerWidth;
    min = bps[media.min];
    max = bps[media.max];

    if (min && vpW <= min) {
      return false;
    }

    if (max && vpW > max) {
      return false;
    }

    return true;
  };

  _obs.obs.l("_ankh-ui-fire", fireEvent);

  _obs.obs.l("_ankh-ui-loaded", function (opt) {
    uis.loaded.push(opt);
    return setTimeout(function () {
      return _obs.obs.f("ui-lang-update");
    });
  });

  _obs.obs.l("_ankh-ui-not-loaded", function (opt) {
    return uis.notLoaded.push(opt);
  });

  _dom.$$.listen(window, "resize", function (e) {
    var lastResize;

    if (!throttle.active) {
      handleResize();
      throttle.active = true;
      setTimeout(function () {
        return throttle.active = false;
      }, throttle.delay);
    }

    clearTimeout(lastResize);
    return lastResize = setTimeout(function () {
      return handleResize;
    }, throttle.delay);
  });

  return {
    isInViewport: isInViewport
  };
}();

exports.media = media;