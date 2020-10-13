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

    # avoid overlapping resize events
    isResizing = false
    resizeBuffer = false

    # viewport width
    vpW = window.innerWidth

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
      oldVpW = vpW
      oldVp = getVpName oldVpW

      vpW = window.innerWidth
      newVp = getVpName vpW

      obs.f "_ankh-resize", vpW - oldVpW

      # viewport has changed
      if oldVp isnt newVp
        notLoaded = [...uis.notLoaded]
        uis.notLoaded = []

        # all not loaded UIs have to try again on this viewport
        notLoaded.forEach (opt) ->
          obs.f "_ui-#{opt.name}-init", opt

        # the loaded ones ned a shown/hidden update
        uis.loaded.forEach (opt) ->
          if !opt.media then return
          $$("##{opt.id}").setAttribute "data-fx",
            if isInViewport opt.media then "in" else "out"

        obs.f "_ankh-viewport-changed", newVp
      return

    isInViewport = (media = {}) ->
      min = bps[media.min]
      max = bps[media.max]

      if min and vpW <= min then return false
      if max and vpW > max then return false
      return true

    getVpName = (width) ->
      if width >= bps.xs and width < bps.s then return "xs"
      if width >= bps.s and width < bps.m then return "s"
      if width >= bps.m and width < bps.l then return "m"
      if width >= bps.l and width < bps.xl then return "l"
      if width >= bps.xl and width < bps.hd then return "xl"
      return "hd"

    obs.l "_ankh-ui-fire", fireEvent
    obs.l "_ankh-ui-loaded", (opt) -> uis.loaded.push opt
    obs.l "_ankh-ui-not-loaded", (opt) -> uis.notLoaded.push opt

    $$.listen window, "resize", (e) ->
      e.preventDefault()

      if isResizing then return (resizeBuffer = true)
      isResizing = true
      handleResize()
      if resizeBuffer then handleResize()
      isResizing = false

    return isInViewport: isInViewport
  )()
