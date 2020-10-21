mapMeasures = new Map()

export measure =
  (=>
    measure = {}

    return
      start: (label) =>
        measure.label = label
        measure.start = new Date()

      stop: =>
        measure.stop = new Date()
        lib[measures] = lib[measures].concat [...measure]
        Math.abs measure.stop - measure.start
  )()
