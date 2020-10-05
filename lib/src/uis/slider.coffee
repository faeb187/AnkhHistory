###
  UI SLIDER
  @author faeb187
###
module.exports = (->

  # @REQUIRE local modules
  $$    = require '../helpers/dom'
  obs   = require '../helpers/obs'

  # @DEFINE   ui  {json}  UI variables/methods
  # @PRIVATE
  ui =

    # @DEFINE   $tpl  {node}  UI template
    $tpl: $$ '<div/>', 'class': 'ui-slider'

    # @DEFINE   evs   {json}  custom events
    evs:

      # @DESC   toggle slider state
      # @PARAM  opt.id  MAN {string}  slider id
      # @RETURN {void}
      toggle: ( opt ) ->
        opt = opt or {}
        id  = opt.id
        $ui = $$ '#' + id

        # MANDATORY slider node
        if !$ui then return

        # TOGGLE slider state
        $$.toggleClass $$( '#front' ), 'from-' + $ui.side
  
  return {

    # @DESC   create a new slider
    # @PARAM  opt.id      MAN {string}  UI id
    # @PARAM  opt.side    MAN {string}  top|right|bottom|left
    # @PARAM  opt.target  MAN {node}    target node
    # @RETURN {node}  target for sub UI's
    # @PUBLIC
    init: ( opt ) ->
      obs.r 'ui-slider-toggle'
      opt = opt or {}
      id  = opt.id
      side= opt.side
      $t  = opt.target

      # MANDATORY id, side & target
      if !id or !side or !$t then return

      # MARKUP slider
      $ui       = ui.$tpl.cloneNode()
      $ui.id    = id
      $ui.side  = side

      # REGISTRATE custom events
      obs.l 'ui-slider-toggle', ui.evs.toggle

      # APPEND UI to target
      $t.appendChild $ui

      # RETURN sub target
      $ui
  }
)()
