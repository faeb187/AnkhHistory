#
# CORE loader
#
import { $$, logger, media, observer, site } from "core"
import { copy } from "../utils/basic.util"
import * as uis from "../uis"

export loader =
  (->
    $ankh = null
    mapLoaded = new Map()

    getNotLoaded = => new Map [...mapLoaded].filter ([k, v]) => k.startsWith "_"

    updateDeferred = ->
      getNotLoaded().forEach (notLoadedUi, id) =>
        { uiOptions, uiOptions: { media: m, ui } } = notLoadedUi

        # [1] is the UI now in the viewport?
        if !m or !media.isInViewport m then return

        # [2] load it
        $ui = uis[ui].init uiOptions

        # [2][NOK] UI failure
        if !$ui
          return logger.error "UI '#{ui}' didn't return itself"

        # [3] update loaded state
        mapLoaded.set uiOptions.id, { uiOptions, $ui }
        mapLoaded.delete id

        # [4] delegate rendering
        observer.f "core-loader-ui-ready", $ui
        return

    #

    getAllLoaded: -> mapLoaded

    initUi: (options) ->
      { uiOptions, parentId } = options
      { id, ui, media: m } = uiOptions

      # [1] identification & classification
      if !id or !ui
        return logger.error "UI 'id:#{id}' and 'ui:#{ui}' required"

      # [2] already loaded? ...great
      loadedUi = mapLoaded.get id
      if loadedUi
        logger.log(
          "%ccached %c ##{id} (parent: #{parentId})"
          "color: #bfb"
          "color: #fff"
        )
        return

      # [3] do we need to load it?
      hasDeferredParent = !!mapLoaded.get "_#{parentId}"
      isVisible = !m or media.isInViewport m

      if hasDeferredParent or !isVisible
        updatedId = "_#{id}"
        updatedParentId = "#{(hasDeferredParent && "_") || ""}#{parentId}"
        if id is "navToggleX"
          console.log "navToggleX:", updatedId, updatedParentId

        mapLoaded.set updatedId, { uiOptions, updatedParentId }
        logger.log(
          "%cdeferred %c #{id} (parent: #{updatedParentId}"
          "color: #ff0"
          "color: #fff"
        )
        # [3.1] ui or its parent is deferred
        # ...skip loading, set placeholder
        return mapLoaded.set updatedId, {
          $ui: $$ "<div/>", id: updatedId, "data-fx": "out"
          uiOptions
          parentId: updatedParentId
        }

      # [4] load it
      $ui = uis[ui].init uiOptions

      # [4][NOK] loading error
      if !$ui
        return logger.error "UI '#{uis[ui]}' didn't return itself", uiOptions

      # [4][OK] loaded successfully
      mapLoaded.set id, { $ui, uiOptions, parentId }
      logger.info(
        "%cloaded %c ##{id} (parent: #{parentId}"
        "color: #0f0"
        "color: #fff"
      )
      return

    load: ->
      logger.groupCollapsed "Loader"

      # [1] get site definition
      siteDef = site.getSiteDef()

      # [1][NOK]
      if !siteDef?.length
        return logger.error(
          "UI's missing, site.build() should generate the siteDef (UI's) for:"
          location.pathname
        )

      # [2] prepare/load the ui's
      siteDef.forEach (ui) => loader.initUi ui

      logger.log "mapLoaded", mapLoaded
      logger.groupEnd()
      return

    init: ->
      observer.l "ankh-viewport", updateDeferred
      return
  )()
