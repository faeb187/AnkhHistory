import { $$ } from "./dom"
import { obs } from "./obs"

export media =
  (->
    # breakpoints
    # (!) in sync with rupture
    bps =
      xs: 0
      s: 400
      m: 500
      l: 800
      xl: 1050
      hd: 1800

    # throttling resize event
    throttle =
      delay: 100
      active: false

    # loaded / not loaded UIs
    uis =
      loaded: []
      notLoaded: []

    # fires custom and UI events
    fireEvent = (event) ->
      { name: eventName, target: eventTarget } = event
      uis.loaded.forEach (uiLoaded) ->
        { events = {} } = uiLoaded
        Object.keys(events).forEach (eventType) ->
          events[eventType].forEach (ev) ->
            if ev.name isnt eventName then return
            if !ev.$target then ev.$target = $$ "##{ev.target}"
            obs.f eventName, uiLoaded

    handleResize = ->
      obs.f "_ankh-resize"

      notLoaded = [...uis.notLoaded]
      uis.notLoaded = []

      # all not loaded UIs have to try again on this viewport
      notLoaded.forEach (opt) ->
        obs.f "_ui-#{opt.ui}-init", opt

      # the loaded ones ned a shown/hidden update
      uis.loaded.forEach (opt) ->
        if !opt.media then return
        $$("##{opt.id}").setAttribute "data-fx",
          if isInViewport opt.media then "in" else "out"
        return
      return

    isInViewport = (media = {}) ->
      vpW = window.innerWidth
      min = bps[media.min]
      max = bps[media.max]

      if min and vpW <= min then return false
      if max and vpW > max then return false
      return true

    obs.l "_ankh-ui-fire", fireEvent
    obs.l "_ankh-ui-loaded", (opt) ->
      uis.loaded.push opt
      setTimeout -> obs.f "ui-lang-update"
    obs.l "_ankh-ui-not-loaded", (opt) -> uis.notLoaded.push opt

    $$.listen window, "resize", (e) ->
      if !throttle.active
        handleResize()
        throttle.active = true

        setTimeout(
          ->
            throttle.active = false
        ,
          throttle.delay
        )
      clearTimeout lastResize
      lastResize = setTimeout(
        ->
          handleResize
      ,
        throttle.delay
      )

    return isInViewport: isInViewport
  )()
