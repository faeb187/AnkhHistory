#
# CORE site
#
import { copy } from "../utils/basic.util"
import { camelize } from "../utils/string.util"

import { $$ } from "./dom"
import { obs } from "./obs"
import { loader } from "./loader"
import { logger } from "./logger"

import { routes } from "../app/conf/routes"
import * as sites from "../app/sites"

export site =
  (->
    mapSites = new Map()
    siteDefs = {}

    setRoute = (route) =>
      { path, items: subRoutes = [] } = route

      name = camelize path.slice 1
      conf = sites[name]

      if conf
        mapSites.set path, conf
      else if !subRoutes.length
        return logger.warn "[CORE][site] no config for site:", name, path

      subRoutes.forEach (subRoute) => setRoute subRoute
      return

    # jumps to the item set of  a pathname
    getItemsByPath = (path) ->
      itemsByPath = []

      subSearch = (items) ->
        items.forEach (item) =>
          if item.path is path then return (itemsByPath = item.items or [])
          if item.items then subSearch item.items

      subSearch routes
      itemsByPath

    getAvailablePath = (path) ->
      if mapSites.get path then return path

      foundPath = ""
      items = getItemsByPath path

      # load default site
      if !items.length then return getAvailablePath routes[0].path

      # recursive sub search (only the first item)
      subSearch = (subItem) ->
        if mapSites.get subItem.path then return (foundPath = subItem.path)
        if !foundPath and subItem.items then subSearch subItem.items[0]

      subSearch items[0]
      foundPath

    # @desc   recursively build site definitions
    # @param  uiOptions   MAN {json}    ui configuration
    # @param  path        MAN {string}  current site path
    # @param  parentId    MAN {string}  ui target
    # @return {void}
    build = (options) ->
      { parentId, path, uiOptions } = options
      { id, ids: uis } = uiOptions

      if !id
        logger.error(
          "[REQUIRED]"
          "missing 'id' for type AnkhUiOptions anywhere in #{path}"
        )

      flatUiOptions = copy uiOptions
      if uis then delete flatUiOptions.ids

      # $ui = loader.initUi { ...uiOptions, $target }
      # $target.appendChild $ui
      siteDef = siteDefs[path] or []
      siteDefs[path] = siteDef.concat [
        uiOptions: flatUiOptions, parentId: parentId
      ]

      uis?.forEach (subUiOptions) =>
        build { path, uiOptions: subUiOptions, parentId: id }
      return

    # @desc   load a site by its pathname
    # @param  pathname  OPT {string}  path of the site
    load: (pathname = location.pathname) ->
      $ankh = $$ "#ankh"
      $ankh.innerHTML = ""

      path = if pathname.endsWith "/" then pathname.slice 0, -1 else pathname

      currentPath = getAvailablePath path

      if currentPath isnt path
        site.load currentPath
        return

      currentName = currentPath.split("/").pop()

      $$.history.go currentName, currentPath

      # $$("body").setAttribute "data-site", currentName

      uis = (mapSites.get(currentPath) or {}).ids
      if !uis then throw new Error "[CORE][site] bad config: no site available"

      uis.forEach (uiOptions) =>
        build { uiOptions, path: currentPath, parentId: "ankh" }

      # obs.f "ankh-ready"
      # obs.f "ui-list-update", $$ "#navMobile" # TMP hacky
      # obs.f "ui-lang-update", $$ ".ui-lang" # TMP hacky
      return

    init: ->
      logger.groupCollapsed "Site"
      routes.forEach (route) => setRoute route
      # load location.pathname

      ###
      obs.l "core-site-load", (options) ->
        site.load options.event.target.getAttribute "href"
      ###
      logger.info "siteDefs", siteDefs
      logger.groupEnd()
      return

    getAll: -> mapSites
    getSiteDef: -> siteDefs[location.pathname]
  )()
