###
  STALKER
  @AUTHOR faeb187
###
module.exports = (->

  # @DEFINE variables
  d     = document
  log   = []
  state = 'visibilityChange'

  # EVENT handler
  onLine      = -> log.push [ 'online' 	, +new Date()]
  offLine     = -> log.push [ 'offline'	, +new Date()]
  stateChange = -> log.push [ d[ state ], +new Date()]

  # @DESC get event name of page visibility API
  getVisEvent = ->
    if typeof d.hidden isnt 'undefined'
      hidden		= 'hidden'
      visChange = 'visibilitychange'

    else if typeof d.mozHidden isnt 'undefined'
      hidden		= 'mozHidden'
      visChange = 'mozvisibilitychange'
      state			= 'mozVisibilityState'
		
    else if typeof d.msHidden isnt 'undefined'
      hidden		= 'msHidden'
      visChange	= 'msvisibilitychange'
      state			= 'msVisibilityState'
		
    else if typeof d.webkitHidden isnt 'undefined'
      hidden		= 'webkitHidden'
      visChange = 'webkitvisibilitychange'
      state			= 'webkitVisibilityState'
		
    d.addEventListener visChange, stateChange
    log.push [ d[ state ], +new Date()]
  
  return {
    
    # @DESC   start stalking
    # @RETURN {void}
    # @PUBLIC
    init: ->
      # ATTACH events
      window.addEventListener 'online'  , onLine
      window.addEventListener 'offline' , offLine

      log.push [( if navigator.onLine then 'online' else 'offline' ), +new Date()]
      return
  }
)()