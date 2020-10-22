#
# CORE loader
#
import { $$ } from "./dom"
import { obs } from "./obs"
import { logger } from "./logger"
import { media } from "./media"
import { site } from "./site"
import * as uis from "../uis"

export loader =
  (->
    $ankh = null
    mapLoaded = new Map()
    mapNotLoaded = new Map()

    updateLoaded = ->
      mapLoaded.forEach (loadedUi) =>
        { $ui, uiOptions: { media: m } } = loadedUi
        if m
          $ui.setAttribute "data-fx",
            if media.isInViewport m then "in" else "out"

    updateNotLoaded = ->
      mapNotLoaded.forEach (notLoadedUi, id) =>
        { uiOptions, uiOptions: { media: m, ui } } = notLoadedUi

        # there is no case (yet) for unloaded without viewport config
        # ...means that's the only thing to check
        if !media.isInViewport m then return

        $ui = uis[ui].init uiOptions

        if !$ui
          return logger.error "UI '#{ui}' didn't return itself"

        $uiPlaceholder = $$ "##{id}-placeholder", $ankh
        $uiPlaceholder.childNodes?.forEach (childNode) =>
          $ui.appendChild childNode
        $uiPlaceholder.replaceWith $ui

        mapLoaded.set id, { uiOptions, $ui }
        mapNotLoaded.delete id
        return

    obs.l "ankh-viewport", ->
      updateLoaded()
      updateNotLoaded()
      return

    # @desc   initializing of ui's if not yet
    # @param  uiOptions MAN {json}        ui configuration
    # @return               {HTMLElement} initialized ui
    initUi: (options) ->
      { uiOptions, parentId } = options
      { id, ui, media: m } = uiOptions

      if !id or !ui
        return logger.error "'ui' and/or 'id' missing: ui: #{ui} / id: #{id}"
      # if $target.id is "ankh" then $ankh = $target

      # already loaded?
      loadedUi = mapLoaded.get id
      if loadedUi
        logger.log(
          "%ccached %c ##{id} (parent: #{parentId})"
          "color: #bfb"
          "color: #fff"
        )
        return

      # not in viewport?
      if m and !media.isInViewport m
        mapNotLoaded.set id, { uiOptions, parentId }
        return logger.log(
          "%cdeferred %c #{id} (parent: #{parentId}"
          "color: #ff0"
          "color: #fff"
        )
        # $uiPlaceholder = $$ "<div/>", id: "#{id}-placeholder", "data-fx": "out"
        # return $uiPlaceholder

      # load it (all ui's init() only once)
      $ui = uis[ui].init uiOptions
      if !$ui
        return logger.error "UI '#{uis[ui]}' didn't return itself", uiOptions

      mapLoaded.set id, { $ui, uiOptions, parentId }
      logger.info(
        "%cloaded %c ##{id} (parent: #{parentId}"
        "color: #0f0"
        "color: #fff"
      )
      return

    load: ->
      logger.groupCollapsed "Loader"

      siteDef = site.getSiteDef()

      if !siteDef?.length
        return logger.error(
          "UI's missing, site.build() should generate the siteDef (UI's) for:"
          location.pathname
        )

      siteDef.forEach (ui) => loader.initUi ui

      logger.log "mapLoaded", mapLoaded
      logger.log "mapNotLoaded", mapNotLoaded
      logger.groupEnd()
      return

    getAllLoaded: -> mapLoaded
  )()
