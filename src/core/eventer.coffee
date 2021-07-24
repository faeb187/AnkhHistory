#
# CORE eventer
#
import { $$, loader, logger, observer, site } from "core"

export eventer =
  (->
    supportedTypes = ["click", "init"]
    setAttached = new Set()

    attachOne = (ankhEvent) ->
      { eventName, $target, type, handler } = ankhEvent

      if !$target or !type or !handler
        logger.warn "event skipped: [#{ankhEvent[1]}]", ankhEvent[0]
        return

      $$.listen $target, type, handler

      setAttached.add { name: eventName, $target, type, handler }
      return
    attach = (events, $target) ->
      Object.keys(events).forEach (type) =>
        if !supportedTypes.includes type
          return logger.warn "[CORE][eventer]", "unsupported type: #{type}"

        events[type].forEach (event) =>
          # @todo refactoring event types
          if type is "init"
            { l, f, args = {} } = event
            observer.l l, -> observer.f f, { args, type, $target }
            return

          { name: eventName, args = {} } = event

          handler = (e) ->
            logger.info "[CORE][eventer]", "triggered: #{eventName}"
            e.preventDefault()
            e.stopPropagation()
            observer.f eventName, event: e, args: event.args

          if !args.selector
            return attachOne { eventName, $target, type, handler }

          $$(args.selector, $target).forEach ($subTarget) =>
            attachOne { eventName, type, handler, $target: $subTarget }
            return
        return
      return

    { attach }
  )()
