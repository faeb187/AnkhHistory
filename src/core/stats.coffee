import { logger } from "./logger"

export measure =
  (->
    mapMeasures = new Map()
    capture = {}

    start: (label) ->
      capture.label = label
      capture.start = new Date()

    stop: ->
      capture.stop = new Date()
      result = Math.abs measure.stop - measure.start
      logger.info "[CORE][stats]", "#{measure.label} loaded in #{result}ms"
      result
  )()
