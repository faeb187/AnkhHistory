#
# UI button
#
import { $$, obs } from "../core"

export button =
  (->
    ui =
      $tpl: $$ "<a/>", class: "ui-button"

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

    return (
      # @DESC   inits a new button
      # @PARAM  opt.id            MAN {string}    UI id
      # @PARAM  opt.lang          OPT {string}    lang ref
      # @PARAM  opt.icon          OPT {string}    ion name
      # @PARAM  opt.events        OPT {json}      custom events to bind
      # @PARAM  opt.events.click  OPT {[string]}  list of custom 'click' events
      # @PARAM  opt.target        MAN {node}      target node
      # @RETURN {void}
      # @PUBLIC


        init: (opt) ->
          opt = opt or {}
          evs = opt.events
          id = opt.id
          lang = opt.lang
          icon = opt.icon
          $t = opt.target

          # MANDATORY (lang ref or icon), id, target
          if (!icon and !lang) or !id or !$t then return

          # CREATE node
          $ui = ui.$tpl.cloneNode()
          $ui.id = id

          # BIND custom events
          if evs then $ui.events = evs
          #if evs.click  then $$.listen $ui, 'click', ui.evs.click
          if evs.click
            hand = new Hammer.Manager $ui
            hand.add new Hammer.Tap()
            hand.on "tap", ui.evs.click

          # SET caption/icon
          if lang
            $ui.setAttribute "data-lang", lang
          else
            $ui.appendChild $$ "<i/>", class: icon

          # TMP append UI styles from conf
          $$.css $ui, opt.styl

          # APPEND UI to target
          $t.appendChild $ui

          return
    )
  )()
