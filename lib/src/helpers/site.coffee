#
# HELPER site
#
import { $$ } from "./dom"
import { obs } from "./obs"
import { fn } from "./fn"
import state from "./state"
import routes from "../conf/routes"

export site =
  (->
    d = document
    $b = $$ "body"

    Site =
      careOverview: require "../sites/careOverview"
      partnerOverview: require "../sites/partnerOverview"
      partnerProducts: require "../sites/partnerProducts"
      partnerProductsAdditional: require "../sites/partnerProductsAdditional"
      reportsOverview: require "../sites/reportsOverview"

    getUisFlattened = (uis) ->
      f = []
      r = (u) -> u.map (ui) -> f.push(ui) && ui.ids && r ui.ids
      r uis
      f

    getUiCount = (uis) ->
      c = 0
      r = (subUis) ->
        subUis.map (subUi, idx) ->
          if !subUi.media or fn.isInViewport subUi.media then ++c
          if subUi.ids && subUi.ids.length then r subUi.ids
      r uis
      c

    handleReady = (uis, $df) ->
      r = 0
      c = getUiCount uis
      obs.r "ankh-ui-ready"
      obs.l "ankh-ui-ready", (ui) ->
        ++r
        if r is c then obs.f "ankh-ready", $df

    getCurrentSite = (itm) ->
      site =
        id: itm.id
        path: itm.path

      getFirstSubId = (subItms) ->
        subItm = subItms[0]
        if subItm.items
          getFirstSubId subItm.items
        else
          site.id = subItm.id
          site.path = subItm.path

      if itm.items then getFirstSubId itm.items
      site.name = site.id.split("site-")[1]
      site

    #- site name by path
    #<! itms {json[]} items
    #<! path {string} site path
    getSiteName = (itms, path) ->
      site = {}
      handleSubs = (subItms) ->
        subItms.some (subItm) ->
          if subItm.path is path
            site = getCurrentSite subItm
          else if subItm.items
            handleSubs subItm.items
      handleSubs itms
      site

    #-  returns default site on 404
    #<! itms  {json[]} nav items
    getDefaultSite = (itms) ->
      getSiteName itms, itms[0].path

    #- loads site
    #<! path {string} path of site
    load = (path) ->
      # load deepest level of clicked nav item
      site = getSiteName routes, path
      if !site.name then site = getDefaultSite routes
      if site.path isnt path then return load site.path

      $$.history.go site.name, site.path
      $b.setAttribute "data-site", site.name

      uis = (Site[site.name] or {}).ids
      if !uis then return

      obs.l "ankh-ready", ($df) ->
        $$(".ui-progress", $b).setAttribute "data-fx", "out"

        $ankh = $$ "#ankh", $b
        $ankh.innerHTML = ""
        $ankh.appendChild $df

        obs.f "ui-lang-update"
        return

      $df = d.createDocumentFragment()
      handleReady uis, $df

      for ui in uis
        ui.target = $df
        obs.f "_ui-#{ui.name}-init", ui
      return

    obs.l "_helper-site-load", (event) ->
      obs.r()
      load event.target.getAttribute "href"

    load: load
  )()
