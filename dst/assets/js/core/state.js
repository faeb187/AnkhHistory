"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = void 0;

// CORE state
var state = function () {
  var ls, prefix;
  exports.state = state = {};
  prefix = location.host + "-";
  ls = {
    // @DESC   set/update item in localStorage
    // @PARAM  id    MAN {string}  id of UI
    // @PARAM  state MAN {object}  current state
    // @RETURN {void}
    set: function set(id, state) {
      if (!id || !state) {
        return;
      }

      if (typeof state !== "string") {
        state = JSON.stringify(state);
      }

      localStorage.setItem(prefix + id, state);
    },
    // @DESC   get item from localStorage
    // @PARAM  id  MAN {string}  id of UI
    // @RETURN {json|null}       current UI state or null
    get: function get(id) {
      var s;

      if (!id) {
        return;
      }

      s = localStorage.getItem(prefix + id);

      if (s && s.slice(0, 1) === "{") {
        return JSON.parse(s);
      } else {
        return s;
      }
    },
    // @DESC   remove item from localStorage
    // @PARAM  id    MAN {string}  id of UI
    // @RETURN {void}
    rm: function rm(id) {
      if (!id) {
        return;
      }

      localStorage.removeItem(prefix + id);
    }
  };
  return {
    // @DESC   set/update UI state
    // @PARAM  opt.id    MAN {string}  id of UI
    // @PARAM  opt.state MAN {string}  current state
    // @RETURN {void}
    set: function set(opt) {
      var id;
      opt = opt || {};
      id = opt.id;
      exports.state = state = opt.state;

      if (!id || !state) {
        return;
      } // SET state in localStorage


      return ls.set(id, state);
    },
    // @DESC   get current UI state
    // @PARAM  opt.id  MAN {string}  id of UI
    // @RETURN {json}  current UI state or {}
    get: function get(opt) {
      var id;
      opt = opt || {};
      id = opt.id;

      if (!id) {
        return;
      } // GET state from localStorage


      return ls.get(id);
    },
    // @DESC   remove UI state
    // @PARAM  opt.id  MAN {string} id of UI
    // @RETURN {void}
    rm: function rm(opt) {
      var id;
      opt = opt || {};
      id = opt.id;

      if (!id) {
        return;
      }

      return ls.rm(id);
    }
  };
}();

exports.state = state;