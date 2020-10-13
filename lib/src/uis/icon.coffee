#
# UI icon (ion-icon)
#
import { $$ } from "../helpers/dom"
import { obs } from "../helpers/obs"
import { media } from "../helpers/media"

module.exports =
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

        click: (event) ->
          event.preventDefault()
          $elm = event.target
          events = $elm.events or {}
          clickEvents = events.click or []

          if !clickEvents.length then return
          obs.f clickEvent.ev, clickEvent.arg or event for clickEvent in (
            clickEvents
          )

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
          $ui.onclick = ui.events.click

      if !$ui then $ui = $icon

      $ui.id = id
      $ui.className = "ui-icon"
      $ui.events = events

      console.log $ui, $ui.events

      $t.appendChild $ui

      obs.f "_ankh-ui-loaded", opt
      obs.f "ankh-ui-ready", "ui-icon"
      return

    obs.l "_ui-icon-toggle", (opt) ->
      obs.f "_ankh-ui-fire", fn: ui.events.toggleIcon, opt: opt
    obs.l "_ui-icon-init", init
    return
  )()
