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
  processesOpenProduct
  reportsOverview
} from "../app/sites"

export site =
  (->
    d = document
    $b = $$ "body"
    $ankh = $$ "#ankh", $b

    Site =
      "/care/overview": careOverview
      "/partner/overview": partnerOverview
      "/partner/products": partnerProducts
      "/partner/additionalProducts": partnerAdditionalProducts
      "/reports/overview": reportsOverview
      "/processes/openProduct": processesOpenProduct

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
        if r is c then render $root

    getCurrentSite = (itm) ->
      site = itm.path
      getFirstSubId = (subItms) ->
        subItm = subItms[0]
        if subItm.items
          getFirstSubId subItm.items
        else
          site = subItm.path

      if itm.items then getFirstSubId itm.items
      site

    #- site name by path
    #<! itms {json[]} items
    #<! path {string} site path
    getSiteName = (itms, path) ->
      site = ""
      handleSubs = (subItms) ->
        subItms.some (subItm) ->
          if subItm.path is path
            site = getCurrentSite subItm
          else if subItm.items
            handleSubs subItm.items
      handleSubs itms
      site

    #- loads site
    #<! path {string} path of site
    load = (path) ->
      $root = $$ "<div/>", id: "ankh"

      # load deepest level of clicked nav item
      site = getSiteName routes, path
      if !site then site = getSiteName routes, routes[0].path
      if site isnt path then return load site
      name = site.split("/").pop()

      $$.history.go name, path
      $b.setAttribute "data-site", site.split("/").pop()

      uis = (Site[site] or {}).ids

      console.log "uis", uis
      if !uis then return

      handleReady uis, $root

      for ui in uis
        ui.target = $root
        obs.f "_ui-#{ui.ui}-init", ui
      return

    obs.l "_helper-site-load", (event) ->
      obs.r()
      load event.target.getAttribute "href"
      return

    load: load
  )()
