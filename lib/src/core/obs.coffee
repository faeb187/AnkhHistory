#
# CORE observer
#
export obs =
  (->
    # @DEFINE   evs {json}  event registrations
    # @EXAMPLE  'name-of-event': [ cb1, cb2, cb3 ]
    # @PRIVATE
    evs = {}

    return (
      # @DESC   add event listener and attach a handler
      # @PARAM  ev  MAN {string}    event name
      # @PARAM  cb  MAN {function}  callback
      # @RETURN {@} chaining pattern
      # @PUBLIC


        l: (ev, cb) ->
          # MANDATORY event name & callback
          if (
            arguments.length isnt 2 or
            typeof ev isnt "string" or
            typeof cb isnt "function"
          )
            return @

            # REGISTER event
          if !evs[ev] then evs[ev] = [cb] else evs[ev].push cb

          @

        # @DESC   fire attached event handlers
        # @PARAM  ev    MAN {string}  event name
        # @PARAM  arg   OPT {*}       handler param
        # @RETURN {@}   chaining pattern
        # @PUBLIC
        f: (ev, arg) ->
          # MANDATORY event name
          if !ev or typeof ev isnt "string"
            return @

            # NO HANDLERS attached to event
          cbs = evs[ev]
          if !cbs or !cbs.length
            return @

            # FIRE event handlers
          cb arg for cb in cbs
          @

        # @DESC   removes event listeners by name
        # @DESC   without args all will be removed
        # @DESC   events starting with _ are protected
        # @PARAM  ev    OPT {string}  event name
        r: (ev) ->
          if ev
            delete evs[ev]
          else
            Object.keys(evs).forEach (name) ->
              if name[0] isnt "_" then delete evs[name]
          @
    )
  )()
