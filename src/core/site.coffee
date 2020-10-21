#
# CORE site
#
import { camelize } from "../utils/string.util"
import { $$ } from "./dom"
import { obs } from "./obs"
import { initUi } from "./loader"
import { warn } from "./logger"

import { routes } from "../app/conf/routes"
import * as sites from "../app/sites"

export site =
  (=>
    mapSites = new Map()

    setRoute = (route) =>
      { path, items: subRoutes = [] } = route

      name = camelize path.slice 1
      conf = sites[name]

      if conf
        mapSites.set path, conf
      else if !subRoutes.length
        return warn "[CORE][site] no config for site:", name, path

      subRoutes.forEach (subRoute) => setRoute subRoute
      return

    # jumps to the item set of  a pathname
    getItemsByPath = (path) =>
      itemsByPath = []

      subSearch = (items) =>
        items.forEach (item) =>
          if item.path is path then return (itemsByPath = item.items or [])
          if item.items then subSearch item.items

      subSearch routes
      itemsByPath

    getAvailablePath = (path) =>
      if mapSites.get path then return path

      foundPath = ""
      items = getItemsByPath path

      # load default site
      if !items.length then return getAvailablePath routes[0].path

      # recursive sub search (only the first item)
      subSearch = (subItem) =>
        if mapSites.get subItem.path then return (foundPath = subItem.path)
        if !foundPath and subItem.items then subSearch subItem.items[0]

      subSearch items[0]
      foundPath

    # @desc   recursively build a site
    # @param  uiOptions   MAN {json}        ui configuration
    # @param  $target     MAN {HTMLElement} ui target (parent)
    build = (uiOptions, $target) =>
      { id, ids, events } = uiOptions

      $ui = initUi { ...uiOptions, $target }
      if !$ui then return

      $target.appendChild $ui

      ids?.forEach (subUiOptions) =>
        build subUiOptions, $ui
      return

    # @desc   load a site by its pathname
    # @param  pathname  OPT {string}  path of the site
    load = (pathname = location.pathname) =>
      $ankh = $$ "#ankh"
      $ankh.innerHTML = ""

      path = if pathname.endsWith "/" then pathname.slice 0, -1 else pathname

      currentPath = getAvailablePath path

      if currentPath isnt path
        load currentPath
        return

      currentName = currentPath.split("/").pop()

      $$.history.go currentName, currentPath

      $$("body").setAttribute "data-site", currentName

      uis = (mapSites.get(currentPath) or {}).ids
      if !uis then throw new Error "[CORE][site] bad config: no site available"

      uis.forEach (uiOptions) => build uiOptions, $ankh

      obs.f "ankh-ready"
      obs.f "ui-list-update", $$ "#nav"
      obs.f "ui-lang-update", $$ ".ui-lang"
      return

    init: =>
      routes.forEach (route) => setRoute route

      load location.pathname

      obs.l "core-site-load", (event) =>
        load event.target.getAttribute "href"
        return
      return

    getAll: -> mapSites
  )()
