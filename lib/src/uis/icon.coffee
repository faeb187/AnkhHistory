###
  UI icon (ion-icon)
  @AUTHOR faeb187
###
module.exports = (->

  # @REQUIRE local modules
  # @PRIVATE
  $$ = require '../helpers/dom'
  obs = require '../helpers/obs'

  # DEFINE ui
  ui =
    evs:
      click: ( e ) ->
        e.preventDefault()

        $elm = e.target

        # FIND custom click event
        evs = $elm.events or {}
        evs = evs.click

        if !evs or !evs.length then return

        # FIRE custom events
        obs.f ev.ev, ev.arg or e for ev in evs
  
  # @PUBLIC
  return {
    
    # @DESC   displays icon
    # @PARAM  opt.id      MAN {string}  ui id
    # @PARAM  opt.icon    MAN {string}  ion icon name
    # @PARAM  opt.events  OPT {json}    custom events
    # @PARAM  opt.target  MAN {node}    target node
    # @RETURN {node}  ui
    init: ( opt ) ->

      # DEFINE variables
      opt   = opt or {}
      id    = opt.id
      name  = opt.name
      icon  = opt.icon
      evs   = opt.events or {}
      $t    = opt.target

      # MAN id, name & target
      if !id or !name or !$t then return

      # CREATE node
      $ui = $$ '<ion-icon/>', id: id, name: icon, class: 'ui-icon'

      # BIND custom events
      if evs then $ui.events = evs
      if evs.click then $ui.onclick = ui.evs.click

      # APPEND UI to target
      $t.appendChild $ui

      # RETURN UI
      $ui
  }
)()
