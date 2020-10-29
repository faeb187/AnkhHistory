#
# UI button
#
import { $$, observer } from "core"

export button =
  (->
    ui =
      evs:
        click: (e) ->
          $elm = e.target
          if $elm.tagName is "I" then $elm = $elm.parentNode

          # FIND custom 'click' events
          evs = $elm.events or {}
          evs = evs.click

          # NO custom 'click' events
          if !evs or !evs.length
            return

            # FIRE custom 'click' events
          observer.f ev.ev, ev.arg for ev in evs when ev
          return

        # @DESC   inits a new button
        # @PARAM  classNames    OPT {string}      additional classes
        # @PARAM  id            MAN {string}      ui id
        # @PARAM  lang          OPT {string}      lang ref
        # @PARAM  icon          OPT {string}      ion name
        # @PARAM  events        OPT {json}        custom events to bind
        # @PARAM  events.click  OPT {[string]}    list of custom 'click' events
        # @PARAM  $target       MAN {HTMLElement} target node
    init: (options) ->
      { classNames = "", events: evs, id, lang, icon, $target } = options

      if (!icon and !lang) or !id or !$target then return

      $ui = $$ "<button/>", id: id, class: "ui-button #{classNames}"

      if evs?.click
        evs.click.forEach (clickEvent) ->
          { name: eventName } = clickEvent
          $ui.onclick = (event) ->
            event.preventDefault()
            observer.f eventName, clickEvent

      if lang
        $ui.setAttribute "data-lang", lang
      else
        $ui.appendChild $$ "<i/>", class: icon
      $ui
  )()
