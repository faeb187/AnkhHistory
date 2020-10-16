#
# UI slider
#
import { $$, obs, media } from "../core"

export slider =
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
        obs.f "_ui-#{ui.ui}-init", ui

      $t.appendChild $ui

      obs.f "_ankh-ui-loaded", opt
      obs.f "ankh-ui-ready", "ui-slider"
      return

    obs.l "_ui-slider-toggle", (options) ->
      options.events.click.forEach (clickEvent) ->
        if clickEvent.name is "_ui-slider-toggle"
          ui.events.toggle clickEvent

    obs.l "_ui-slider-init", init
    return
  )()
