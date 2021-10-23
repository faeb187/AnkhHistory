#
# UI slider
#
import { $$, observer } from "core"

export slider =
  (->
    ui =
      events:
        toggle: (opt) ->
          { side = "left", $target } = opt
          twoDollars.toggleClass $$("#front"), "from-#{side}"

    # @DESC   create a new slider
    # @PARAM  id      MAN {string}  UI id
    # @PARAM  $target MAN {node}    target node
    init: (options) ->
      { id, $target } = options

      if !id or !$target then return

      $ui = $$ "<div/>", id: id, class: "ui-slider"

      observer.l "_ui-slider-toggle", (opts) ->
        opts.events.click.forEach (clickEvent) ->
          if clickEvent.name is "_ui-slider-toggle"
            ui.events.toggle clickEvent

      $ui
  )()
