###
  OBSERVER
  @DESC   observer pattern
  @AUTHOR faeb187
###
module.exports = (->

  # @DEFINE   evs {json}  event registrations
  # @EXAMPLE  'name-of-event': [ cb1, cb2, cb3 ]
  # @PRIVATE
  evs = {}

  return {

    # @DESC   add event listener and attach a handler
    # @PARAM  ev  MAN {string}    event name
    # @PARAM  cb  MAN {function}  callback
    # @RETURN {@} chaining pattern
    # @PUBLIC
    l: ( ev, cb ) ->

      # MANDATORY event name & callback
      if arguments.length isnt 2  or
        typeof ev isnt 'string'   or
        typeof cb isnt 'function' then return @
      
      # REGISTER event
      if !evs[ ev ] then evs[ ev ] = [ cb ] else evs[ ev ].push cb

      @

    # @DESC   fire attached event handlers
    # @PARAM  ev    MAN {string}  event name
    # @PARAM  arg   OPT {*}       handler param
    # @RETURN {@}   chaining pattern
    # @PUBLIC
    f: ( ev, arg ) ->

      # MANDATORY event name
      if !ev or typeof ev isnt 'string' then return @
      
      # NO HANDLERS attached to event
      cbs = evs[ ev ]
      if !cbs or !cbs.length then return @
      
      # FIRE event handlers
      cb arg for cb in cbs

      @

    # @DESC   removes event listeners
    # @PARAM  ev    MAN {string}  event name
    # @RETURN {@}   chaining pattern
    # @PUBLIC
    r: ( ev ) ->
      if !ev or typeof ev isnt 'string' then return @
      
      # DELETE event registrations
      delete evs[ ev ]

      @
  }
)()
