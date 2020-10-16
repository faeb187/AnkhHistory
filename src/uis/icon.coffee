#
# UI icon (ion-icon)
#
import { $$, obs, media } from "../core"

export icon =
  (->
    ui =
      events:
        toggleIcon: (opt) ->
          { icons, $target } = opt

          $icon = $$ "ion-icon", $target
          [icon] = icons.filter (icon) ->
            $icon.getAttribute("name") isnt icon
          $icon.setAttribute "name", icon
          return

    # @DESC   displays icon
    # @PARAM  opt.id      MAN {string}  ui id
    # @PARAM  opt.icon    MAN {string}  ion icon name
    # @PARAM  opt.events  OPT {json}    custom events
    # @PARAM  media       OPT {json}    viewport config
    # @PARAM  opt.target  MAN {node}    target node
    # @RETURN {node}  ui
    init = (opt) ->
      { id, icon, events, media: m, target: $t } = opt
      if !id or !$t then return
      if m and !media.isInViewport m
        return obs.f "_ankh-ui-not-loaded", opt

      $icon = $$ "<ion-icon/>", name: icon
      $icon.style.pointerEvents = "none"

      if events
        if events.click
          $ui = $$ "<a/>"
          $ui.append $icon
          $ui.onclick = ->
            events.click.forEach (clickEvent) ->
              obs.f "_ankh-ui-fire", clickEvent

      if !$ui then $ui = $icon

      $ui.id = id
      $ui.className = "ui-icon"
      $ui.events = events

      $t.appendChild $ui

      obs.f "_ankh-ui-loaded", opt
      obs.f "ankh-ui-ready", "ui-icon"
      return

    obs.l "_ui-icon-toggle", (options) ->
      options.events.click.forEach (clickEvent) ->
        if clickEvent.name is "_ui-icon-toggle"
          ui.events.toggleIcon clickEvent

    obs.l "_ui-icon-init", init
    return
  )()
