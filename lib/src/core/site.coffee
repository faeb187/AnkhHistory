#
# HELPER site
#
import { $$ } from "./dom"
import { obs } from "./obs"
import { media } from "./media"
import { routes } from "../conf/routes"

import { careOverview } from "../sites/careOverview"
import { partnerOverview } from "../sites/partnerOverview"
import { partnerProducts } from "../sites/partnerProducts"
import { partnerProductsAdditional } from "../sites/partnerProductsAdditional"
import { reportsOverview } from "../sites/reportsOverview"

export site =
  (->
    d = document
    $b = $$ "body"

    Site =
      careOverview: careOverview
      partnerOverview: partnerOverview
      partnerProducts: partnerProducts
      partnerProductsAdditional: partnerProductsAdditional
      reportsOverview: reportsOverview

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

    handleReady = (uis, $root) ->
      r = 0
      c = getUiCount uis
      obs.r "ankh-ui-ready"
      obs.l "ankh-ui-ready", (ui) ->
        ++r
        if r is c then obs.f "ankh-ready", $root

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
      $root = $$ "<div/>",
        id: "ankh"

        # load deepest level of clicked nav item
      site = getSiteName routes, path
      if !site.name then site = getDefaultSite routes
      if site.path isnt path then return load site.path

      $$.history.go site.name, site.path
      $b.setAttribute "data-site", site.name

      uis = (Site[site.name] or {}).ids
      if !uis then return

      obs.l "ankh-ready", ($root) ->
        $$(".ui-progress", $b).setAttribute "data-fx", "out"

        $ankh = $$ "#ankh", $b
        $ankh.replaceWith $root

        obs.f "ui-lang-update"
        return

      handleReady uis, $root

      for ui in uis
        ui.target = $root
        obs.f "_ui-#{ui.name}-init", ui
      return

    obs.l "_helper-site-load", (event) ->
      obs.r()
      load event.target.getAttribute "href"
      return

    load: load
  )()
