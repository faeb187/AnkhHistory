#
# CORE site
#
import { $$ } from "./dom"
import { obs } from "./obs"
import { media } from "./media"

# todo dynamic
import { routes } from "../app/conf/routes"
import {
  careOverview
  partnerOverview
  partnerProducts
  partnerAdditionalProducts
  prcOpenProduct
  prcOpenProductProductSelection
  prcOpenProductAccountData
  reportsOverview
} from "../app/sites"

export site =
  (->
    d = document
    $b = $$ "body"
    $ankh = $$ "#ankh", $b

    sites = new Map()
    sites.set "/care/overview", careOverview
    sites.set "/partner/overview", partnerOverview
    sites.set "/partner/products", partnerProducts
    sites.set "/partner/additionalProducts", partnerAdditionalProducts
    sites.set "/reports/overview", reportsOverview
    sites.set "/processes/openProduct", prcOpenProduct
    sites.set(
      "/processes/openProduct/productSelection"
      prcOpenProductProductSelection
    )
    sites.set "/processes/openProduct/accountData", prcOpenProductAccountData

    getItemsByPath = (path) ->
      itemsByPath = []

      subSearch = (items) ->
        items.forEach (item) ->
          if item.path is path then return (itemsByPath = item.items or [])
          if item.items then subSearch item.items

      subSearch routes
      itemsByPath

    getAvailablePath = (path) ->
      # requested path is available
      if sites.get path then return path

      foundPath = ""

      # get the sub items of requested path
      items = getItemsByPath path

      # load default site
      if !items.length then return getAvailablePath routes[0].path

      # recursive sub search (only the first item)
      subSearch = (subItem) ->
        if sites.get subItem.path then return (foundPath = subItem.path)
        if !foundPath and subItem.items then subSearch subItem.items[0]

      subSearch items[0]
      foundPath

    getUisFlattened = (uis) ->
      f = []
      r = (u) -> u.map (ui) -> f.push(ui) && ui.ids && r ui.ids
      r uis
      f

    getUiCount = (uis) ->
      c = 0
      r = (subUis) ->
        subUis.map (subUi, idx) ->
          if subUi.media and !media.isInViewport subUi.media then return
          ++c
          if subUi.ids && subUi.ids.length then r subUi.ids
      r uis
      c

    render = ($root) ->
      $$(".ui-progress", $b).setAttribute "data-fx", "out"
      $ankh.replaceWith $root
      setTimeout -> obs.f "_ankh-ready"
      return

    handleReady = (uis, $root) ->
      r = 0
      c = getUiCount uis
      obs.r "ankh-ui-ready"
      obs.l "ankh-ui-ready", (ui) ->
        ++r
        # console.debug "[#{r}/#{c}]", ui
        if r is c then render $root

    #- loads site
    #<! path {string} path of site
    load = (path) ->
      $root = $$ "<div/>", id: "ankh"

      if path.endsWith "/" then path = path.slice 0, -1

      currentPath = getAvailablePath path

      if currentPath isnt path then return load currentPath
      currentName = currentPath.split("/").pop()

      $$.history.go currentName, currentPath
      $b.setAttribute "data-site", currentName

      uis = (sites.get(currentPath) or {}).ids
      if !uis then throw new Error "[CORE][site] bad config: no site available"

      handleReady uis, $root

      for ui in uis
        ui.target = $root
        obs.f "_ui-#{ui.ui}-init", ui
      return

    obs.l "_helper-site-load", (event) ->
      obs.r()
      load event?.target?.getAttribute "href"
      return

    load: load
  )()
