#
# UI button
#
import { $$, obs, media } from "../core"

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
          obs.f ev.ev, ev.arg for ev in evs when ev
          return

        # @DESC   inits a new button
        # @PARAM  classNames        OPT {string}    class names
        # @PARAM  opt.id            MAN {string}    UI id
        # @PARAM  opt.lang          OPT {string}    lang ref
        # @PARAM  opt.icon          OPT {string}    ion name
        # @PARAM  opt.events        OPT {json}      custom events to bind
        # @PARAM  opt.events.click  OPT {[string]}  list of custom 'click' events
        # @PARAM  opt.target        MAN {node}      target node
        # @RETURN {void}
        # @PUBLIC

    init = (opt) ->
      {
        classNames = ""
        events: evs
        id
        lang
        media: m
        icon
        target: $t
      } = opt

      if (!icon and !lang) or !id or !$t then return
      if media and !media.isInViewport m
        return obs.f "_ankh-ui-not-loaded", opt

      $ui = $$ "<button/>", id: id, class: "ui-button #{classNames}"

      if evs then $ui.events = evs
      #if evs.click  then $$.listen $ui, 'click', ui.evs.click
      ###if evs.click
        hand = new Hammer.Manager $ui
        hand.add new Hammer.Tap()
        hand.on "tap", ui.evs.click
      ###

      # SET caption/icon
      if lang
        $ui.setAttribute "data-lang", lang
      else
        $ui.appendChild $$ "<i/>", class: icon

      # APPEND UI to target
      $t.appendChild $ui

      obs.f "_ankh-ui-loaded", opt
      obs.f "ankh-ui-ready", "ui-button##{id}"
      return

    obs.l "_ui-button-init", init
    return
  )()
