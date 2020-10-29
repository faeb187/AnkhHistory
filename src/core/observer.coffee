#
# CORE observer
#
export observer =
  (->
    evs = {}
    # @DESC   add event listener and attach a handler
    # @PARAM  ev  MAN {string}    event name
    # @PARAM  cb  MAN {function}  callback
    # @RETURN {@} chaining pattern

    l: (ev, cb) ->
      # MANDATORY event name & callback
      if (
        arguments.length isnt 2 or
        typeof ev isnt "string" or
        typeof cb isnt "function"
      )
        return @

        # REGISTER event
      if !evs[ev] then evs[ev] = [cb] else evs[ev] = evs[ev].concat [cb]

      @

    # @DESC   fire attached event handlers
    # @PARAM  ev    MAN {string}  event name
    # @PARAM  arg   OPT {*}       handler param
    # @RETURN {@}   chaining pattern
    f: (ev, arg) ->
      cbs = evs[ev]
      if !cbs?.length then return @

      cb arg for cb in cbs
      @

    # @DESC   removes event listeners by name
    # @DESC   without args all will be removed
    # @DESC   events starting with _ are protected
    # @PARAM  ev    OPT {string}  event name
    # @RETURN {@}   chaining pattern
    r: (ev) ->
      if ev then return delete evs[ev]

      Object.keys(evs).forEach (name) ->
        if name[0] isnt "_" then delete evs[name]
      @
  )()
