###
  UI slider
###
import { $$ } from "../helpers/dom"
import { obs } from "../helpers/obs"

module.exports =
  (->
    ui =
      evs:
        # @DESC   toggle slider state
        # @PARAM  opt.id  MAN {string}  slider id
        # @RETURN {void}
        toggle: (opt) ->
          { id } = opt

          $ui = $$ "#" + id
          if !$ui then return

          $$.toggleClass $$("#front"), "from-" + $ui.side

    # @DESC   create a new slider
    # @PARAM  opt.id      MAN {string}  UI id
    # @PARAM  opt.ids     OPT {any[]}   children ui configs
    # @PARAM  opt.side    OPT {string}  top|right|bottom|left
    # @PARAM  opt.target  MAN {node}    target node
    # @RETURN {node}  target for sub UI's
    # @PUBLIC
    init = (opt) ->
      { id, side = "left", target: $t, ids = [] } = opt
      if !id or !side or !$t then return

      $ui = $$ "<div/>", class: "ui-slider"
      $ui.id = id
      $ui.side = side

      for child in ids
        child.target = $ui
        obs.f "_ui-#{child.name}-init", child

      $t.appendChild $ui

      obs.l "ui-slider-toggle", ui.evs.toggle
      obs.l "ui-slider-out", ui.evs.out
      obs.f "ankh-ui-ready", "ui-slider"
      return

    obs.l "_ui-slider-init", init
    return
  )()
