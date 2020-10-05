/*
  OBSERVER
  @DESC   observer pattern
  @AUTHOR faeb187
*/
module.exports = (function() {
  var evs;
  // @DEFINE   evs {json}  event registrations
  // @EXAMPLE  'name-of-event': [ cb1, cb2, cb3 ]
  // @PRIVATE
  evs = {};
  return {
    // @DESC   add event listener and attach a handler
    // @PARAM  ev  MAN {string}    event name
    // @PARAM  cb  MAN {function}  callback
    // @RETURN {@} chaining pattern
    // @PUBLIC
    l: function(ev, cb) {
      // MANDATORY event name & callback
      if (arguments.length !== 2 || typeof ev !== 'string' || typeof cb !== 'function') {
        return this;
      }
      if (!evs[ev]) {
        evs[ev] = [cb];
      } else {
        evs[ev].push(cb);
      }
      return this;
    },
    // @DESC   fire attached event handlers
    // @PARAM  ev    MAN {string}  event name
    // @PARAM  arg   OPT {*}       handler param
    // @RETURN {@}   chaining pattern
    // @PUBLIC
    f: function(ev, arg) {
      var cb, cbs, i, len;
      if (!ev || typeof ev !== 'string') {
        return this;
      }
      
      // NO HANDLERS attached to event
      cbs = evs[ev];
      if (!cbs || !cbs.length) {
        return this;
      }
      for (i = 0, len = cbs.length; i < len; i++) {
        cb = cbs[i];
        
        // FIRE event handlers
        cb(arg);
      }
      return this;
    },
    // @DESC   removes event listeners
    // @PARAM  ev    MAN {string}  event name
    // @RETURN {@}   chaining pattern
    // @PUBLIC
    r: function(ev) {
      if (!ev || typeof ev !== 'string') {
        return this;
      }
      
      // DELETE event registrations
      delete evs[ev];
      return this;
    }
  };
})();
