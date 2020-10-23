#
# CORE eventer
#
import { $$ } from "./dom"
import { obs } from "./obs"
import { logger } from "./logger"
import { site } from "./site"
import { loader } from "./loader"

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

    #@desc  attach events
    #@param events  MAN {AnkhEvent} events to attach
    attach = (events, $target) ->
      Object.keys(events).forEach (type) =>
        if !supportedTypes.includes type
          return logger.warn "[CORE][eventer]", "unsupported type: #{type}"

        events[type].forEach (event) =>
          # @todo refactoring event types
          if type is "init"
            { l, f, args = {} } = event
            obs.l l, -> obs.f f, { args, type, $target }
            return

          { name: eventName, args = {} } = event

          handler = (e) ->
            logger.info "[CORE][eventer]", "triggered: #{eventName}"
            e.preventDefault()
            e.stopPropagation()
            obs.f eventName, event: e, args: event.args

          if !args.selector
            return attachOne { eventName, $target, type, handler }

          $$(args.selector, $target).forEach ($subTarget) =>
            attachOne { eventName, type, handler, $target: $subTarget }
            return
        return
      return

    init: ->
      logger.groupCollapsed "Eventer"
      loader
        .getAllLoaded()
        .forEach (loadedUi) =>
          { $ui, uiOptions } = loadedUi
          { events } = uiOptions
          if !events then return

          attach events, $ui
          return
      logger.info "events: ", setAttached
      logger.groupEnd()
      return
  )()
