#
# CORE eventer
# @todo don't try to attach to 'notLoaded' uis
#
import { $$ } from "./dom"
import { obs } from "./obs"
import { debug, info, warn, title } from "./logger"
import { site } from "./site"
import { getAllLoaded } from "./loader"

export eventer =
  (->
    supportedTypes = ["click"]
    setAttached = new Set()

    attachOne = (ankhEvent) =>
      { $target, type, handler } = ankhEvent

      if !$target or !type or !handler
        # warn "[CORE][eventer] event skipped: [#{ankhEvent[1]}]", ankhEvent[0]
        return

      $$.listen $target, type, handler

      setAttached.add { $target, type, handler }

      info "[CORE][eventer] attached event: [#{type}] to:", $target
      return

    #@desc  attach events
    #@param events  MAN {AnkhEvent} events to attach
    attach = (events, $target) =>
      title "[CORE][eventer]", "received events:"

      Object.keys(events).forEach (type) =>
        if !supportedTypes.includes type
          return warn "[CORE][eventer]", "unsupported type: #{type}"

        events[type].forEach (event) =>
          { selector, name: eventName } = event

          handler = (e) ->
            debug "[CORE][eventer]", "triggered: #{eventName}"
            e.preventDefault()
            e.stopPropagation()
            obs.f eventName, e

          if !selector then return attachOne { $target, type, handler }

          $$(selector, $target).forEach ($subTarget) =>
            attachOne { type, handler, $target: $subTarget }
            return
        return
      return

    init: ->
      getAllLoaded().forEach (loadedUi) =>
        { $ui, uiOptions } = loadedUi
        { events } = uiOptions
        if !events then return

        attach events, $ui
        return

    init_bak: ->
      loopIt = (ui) ->
        { id, events, ids } = ui

        if events
          attach events, $$ "##{id}"
        if ids then ids.forEach (subUi) => loopIt subUi

      site
        .getAll()
        .forEach (s) =>
          s.ids.forEach (ui) => loopIt ui
  )()
