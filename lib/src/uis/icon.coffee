#
# UI icon (ion-icon)
#
import { $$ } from "../helpers/dom"
import { obs } from "../helpers/obs"
import { fn } from "../helpers/fn"

module.exports =
  (->
    ui =
      events:
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
      { id, icon, events, media, target: $t } = opt
      if !id or !$t then return
      if media and !fn.isInViewport media then return

      $ui = $$ "<ion-icon/>", id: id, name: icon, class: "ui-icon"

      if events
        $ui.events = events
        if events.click then $ui.onclick = ui.events.click

      $t.appendChild $ui
      obs.f "ankh-ui-ready", "ui-icon"
      return

    obs.l "_ui-icon-init", init
    return
  )()
