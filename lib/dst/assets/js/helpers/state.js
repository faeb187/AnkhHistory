/*
  STATE OF MINED
  @author faeb187
*/
module.exports = (function() {
  var ls, prefix, state;
  
  // PRIVATE

  // DEFINE variables
  state = {};
  prefix = location.host + '-';
  ls = {
    // @DESC   set/update item in localStorage
    // @PARAM  id    MAN {string}  id of UI
    // @PARAM  state MAN {object}  current state
    // @RETURN {void}
    set: function(id, state) {
      if (!id || !state) {
        return;
      }
      if (typeof state !== 'string') {
        state = JSON.stringify(state);
      }
      localStorage.setItem(prefix + id, state);
    },
    // @DESC   get item from localStorage
    // @PARAM  id  MAN {string}  id of UI
    // @RETURN {json|null}       current UI state or null
    get: function(id) {
      var s;
      if (!id) {
        return;
      }
      s = localStorage.getItem(prefix + id);
      if (s && s.slice(0, 1) === '{') {
        return JSON.parse(s);
      } else {
        return s;
      }
    },
    // @DESC   remove item from localStorage
    // @PARAM  id    MAN {string}  id of UI
    // @RETURN {void}
    rm: function(id) {
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

    // PUBLIC

    set: function(opt) {
      var id;
      opt = opt || {};
      id = opt.id;
      state = opt.state;
      if (!id || !state) {
        return;
      }
      
      // SET state in localStorage
      return ls.set(id, state);
    },
    // @DESC   get current UI state
    // @PARAM  opt.id  MAN {string}  id of UI
    // @RETURN {json}  current UI state or {}
    get: function(opt) {
      var id;
      opt = opt || {};
      id = opt.id;
      if (!id) {
        return;
      }
      
      // GET state from localStorage
      return ls.get(id);
    },
    // @DESC   remove UI state
    // @PARAM  opt.id  MAN {string} id of UI
    // @RETURN {void}
    rm: function(opt) {
      var id;
      opt = opt || {};
      id = opt.id;
      if (!id) {
        return;
      }
      return ls.rm(id);
    }
  };
})();
