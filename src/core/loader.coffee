#
# CORE loader
#
import { $$, eventer, logger, media, observer, site } from "core"
import { copy } from "../utils/basic.util"
import { camelize } from "../utils/string.util"
import { routes } from "../app/conf/routes"
import * as sites from "../app/sites"
import * as uis from "../uis"

export loader =
  (->
    mapLoaded = undefined
    siteConfigurations = undefined

    getNotLoaded = -> new Map [...mapLoaded].filter ([k, v]) => k.startsWith "_"
    setRoute = (route) ->
      { path, items: subRoutes = [] } = route

      name = camelize path.slice 1
      conf = sites[name]

      if conf
        siteConfigurations.set path, conf
      else if !subRoutes.length
        return logger.warn "no config for site:", name, path

      subRoutes.forEach (subRoute) => setRoute subRoute
      return
    updateDeferred = ->
      getNotLoaded().forEach (notLoadedUi, id) =>
        { uiOptions } = notLoadedUi
        { events, media: m, ui } = uiOptions

        if m then logger.log "#{id} should show:", media.isInViewport m

        # [1] is the UI now in the viewport?
        if !m or !media.isInViewport m then return

        # [2] load it
        $ui = uis[ui].init uiOptions
        if !$ui then return logger.error "UI##{ui} didn't return itself"

        # [3] attach events
        if events then eventer.attach events, $ui

        # [4] update loaded state
        mapLoaded.set(uiOptions.id, { uiOptions, $ui }).delete id

        # [5] delegate rendering
        observer.f "core-loader-ui-ready", $ui
        return
    getItemsByPath = (path) ->
      itemsByPath = []

      subSearch = (items) ->
        items.forEach (item) =>
          if item.path is path then return (itemsByPath = item.items or [])
          if item.items then subSearch item.items

      subSearch routes
      itemsByPath
    getCurrentPath = (path) ->
      if siteConfigurations.get path then return path

      foundPath = ""
      items = getItemsByPath path

      # default site on 404
      if !items.length then return getCurrentPath routes[0].path

      # recursive sub search (only the first item)
      subSearch = (subItem) ->
        if siteConfigurations.get subItem.path
          return (foundPath = subItem.path)
        if !foundPath and subItem.items then subSearch subItem.items[0]

      subSearch items[0]
      foundPath
    initUi = (uiOptions) ->
      { events, id, ui, media: m, parentId } = uiOptions

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

      # [5] attach events
      if events then eventer.attach events, $ui

      # [6] register loaded ui
      mapLoaded.set id, { $ui, uiOptions, parentId }
      logger.info(
        "%cloaded %c ##{id} (parent: #{parentId}"
        "color: #0f0"
        "color: #fff"
      )
      return

    loadSite = (path) ->
      logger.groupCollapsed "Loader:loadSite"

      # [1] get site configuration
      currentPath = getCurrentPath path
      logger.log "currentPath", currentPath

      siteUis = siteConfigurations.get(currentPath) or {}
      if !siteUis then return logger.error "bad config: no site available"
      logger.log "siteUis", siteUis

      # [2] navigate to current site
      $$.history.go currentPath.split("/").pop()

      # [3] prepare/load the ui's
      siteUis.forEach (ui) => initUi ui

      logger.log "mapLoaded", mapLoaded
      logger.log "siteConfigurations", siteConfigurations
      logger.groupEnd()
      return
    getAllLoaded = -> mapLoaded
    init = ->
      logger.groupCollapsed "Loader:init"

      # [1] initialize maps
      mapLoaded = new Map()
      siteConfigurations = new Map()

      # [2] set app routes
      routes.forEach (route) => setRoute route
      logger.log "siteConfigurations", siteConfigurations

      # [3] update deferred UI's on viewport change
      observer.l "ankh-viewport", updateDeferred

      logger.groupEnd()
      return

    { getAllLoaded, loadSite, init }
  )()
