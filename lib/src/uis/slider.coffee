#
# UI slider
#
import { $$ } from "../helpers/dom"
import { obs } from "../helpers/obs"
import { media } from "../helpers/media"

module.exports =
  (->
    ui =
      events:
        toggle: (opt) ->
          { side = "left", $target } = opt
          $$.toggleClass $$("#front"), "from-#{side}"

    # @DESC   create a new slider
    # @PARAM  opt.id      MAN {string}  UI id
    # @PARAM  opt.ids     OPT {any[]}   children ui configs
    # @PARAM  media       OPT {json}    viewport config
    # @PARAM  opt.target  MAN {node}    target node
    init = (opt) ->
      { id, media: m, target: $t, ids = [] } = opt
      if !id or !$t then return
      if m and !media.isInViewport m
        return obs.f "_ankh-ui-not-loaded", opt

      $ui = $$ "<div/>", id: id, class: "ui-slider"

      ids.forEach (ui) ->
        ui.target = $ui
        obs.f "_ui-#{ui.name}-init", ui

      $t.appendChild $ui

      obs.f "ankh-ui-ready", "ui-slider"
      return

    obs.l "_ui-slider-toggle", (opt) ->
      obs.f "_ankh-ui-fire", fn: ui.events.toggle, opt: opt
    obs.l "_ui-slider-init", init
    return
  )()
