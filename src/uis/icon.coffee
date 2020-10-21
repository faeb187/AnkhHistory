#
# UI icon (ion-icon)
#
import { $$, obs } from "../core"

export icon =
  (=>
    ui =
      events:
        toggleIcon: (opt) =>
          { icons, $target } = opt

          $icon = $$ "ion-icon", $target
          [icon] = icons.filter (icon) =>
            $icon.getAttribute("name") isnt icon
          $icon.setAttribute "name", icon
          return

    # @DESC   displays icon
    # @PARAM  opt.id      MAN {string}  ui id
    # @PARAM  opt.icon    MAN {string}  ion icon name
    # @PARAM  opt.events  OPT {json}    custom events
    init: (options) =>
      { id, icon, events, $target } = options

      if !id then return

      $icon = $$ "<ion-icon/>", name: icon
      $icon.style.pointerEvents = "none"

      ###
      if events
        if events.click
          $ui = $$ "<a/>"
          $ui.append $icon
          $ui.onclick = =>
            events.click.forEach (clickEvent) =>
              obs.f "_ankh-ui-fire", clickEvent
      ###

      if !$ui then $ui = $icon

      $ui.id = id
      $ui.className = "ui-icon"
      $ui.events = events

      ###
      obs.l "ui-icon-toggle", (opts) =>
        opts.events.click.forEach (clickEvent) =>
          if clickEvent.name is "ui-icon-toggle"
            ui.events.toggleIcon clickEvent
        return
      ###
      $ui
  )()
