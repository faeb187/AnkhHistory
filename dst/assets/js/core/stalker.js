"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stalker = void 0;

// HELPER stalker
var stalker = function () {
  var d, getVisEvent, log, offLine, onLine, state, stateChange; // @DEFINE variables

  d = document;
  log = [];
  state = "visibilityChange"; // EVENT handler

  onLine = function onLine() {
    return log.push(["online", +new Date()]);
  };

  offLine = function offLine() {
    return log.push(["offline", +new Date()]);
  };

  stateChange = function stateChange() {
    return log.push([d[state], +new Date()]);
  }; // @DESC get event name of page visibility API


  getVisEvent = function getVisEvent() {
    var hidden, visChange;

    if (typeof d.hidden !== "undefined") {
      hidden = "hidden";
      visChange = "visibilitychange";
    } else if (typeof d.mozHidden !== "undefined") {
      hidden = "mozHidden";
      visChange = "mozvisibilitychange";
      state = "mozVisibilityState";
    } else if (typeof d.msHidden !== "undefined") {
      hidden = "msHidden";
      visChange = "msvisibilitychange";
      state = "msVisibilityState";
    } else if (typeof d.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visChange = "webkitvisibilitychange";
      state = "webkitVisibilityState";
    }

    d.addEventListener(visChange, stateChange);
    return log.push([d[state], +new Date()]);
  };

  return {
    // @DESC   start stalking
    // @RETURN {void}
    // @PUBLIC
    init: function init() {
      // ATTACH events
      window.addEventListener("online", onLine);
      window.addEventListener("offline", offLine);
      log.push([navigator.onLine ? "online" : "offline", +new Date()]);
    }
  };
}();

exports.stalker = stalker;