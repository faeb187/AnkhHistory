export fn =
  (->
    bps =
      xs: 400
      s: 600
      m: 800
      l: 1050
      xl: 1800

    return
      isInViewport: (media) ->
        vpW = window.innerWidth

        min = bps[media.min]
        max = bps[media.max]

        !((min and vpW <= min) or (max and vpW > max))
  )()
