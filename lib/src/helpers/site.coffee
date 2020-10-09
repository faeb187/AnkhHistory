###
  @-  HELPER site
  @-  AUTHOR faeb187
###
module.exports = (->
  $$ = require './dom'
  obs = require './obs'
  state =require './state'
  media =require './media'
  routes = require '../conf/routes'

  d = document
  $b = $$ 'body'
  vp = {}

  Site =
    careOverview              : require '../sites/careOverview'
    partnerOverview           : require '../sites/partnerOverview'
    partnerProducts           : require '../sites/partnerProducts'
    partnerProductsAdditional : require '../sites/partnerProductsAdditional'
    reportsOverview           : require '../sites/reportsOverview'

  getUisFlattened = (uis) ->
    f = []
    r = (u) -> u.map (ui) -> (f.push ui) && ui.ids && r ui.ids
    r uis
    f

  getUiCount = (uis) ->
    c = 0
    r = (subUis) ->
      subUis.map (subUi, idx) ->
        ++c
        if subUi.ids && subUi.ids.length then r subUi.ids
    r uis
    c

  handleReady = (uis, $df) ->
    r = 0
    c = getUiCount uis
    obs.r 'ankh-ui-ready'
    obs.l 'ankh-ui-ready', (ui) ->
      ++r
      if r is c then obs.f 'ankh-ready', $df

  handleMedias = ($w) ->
    medias = media.get()
    vp.x = window.innerWidth
    vp.y = window.innerHeight

    Object.keys(medias).map (id) ->
      m = medias[id]
      fx = if m.min and vp.x <= m.min or m.max and vp.x > m.max then 'out' else 'in'
      $$("##{id}", $w).setAttribute 'data-fx', fx

  resize = () => handleMedias $b
  
  getCurrentSite = (itm) ->
    site =
      id: itm.id
      path: itm.path

    getFirstSubId = (subItms) ->
      subItm = subItms[0]
      if subItm.items then getFirstSubId subItm.items
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
        else if subItm.items then handleSubs subItm.items
    handleSubs itms
    site

  #-  returns default site on 404
  #<! itms  {json[]} nav items
  getDefaultSite = (itms) ->
    getSiteName itms, itms[0].path


  #- loads site
  #<! path {string} path of site
  load = ( path ) ->
    obs.r 'ankh-ready'

    # load deepest level of clicked nav item
    site = getSiteName routes, path
    if !site.name then site = getDefaultSite routes
    if site.path isnt path then return load site.path

    $$.history.go site.name, site.path
    $b.setAttribute 'data-site', site.name
    
    uis = (Site[ site.name ] or {}).ids
    if !uis then return
    media.set getUisFlattened uis
    vp.x = window.innerWidth
    vp.y = window.innerHeight

    obs.l 'ankh-ready', ($df) ->
      handleMedias $df

      $$( '.ui-progress', $b ).setAttribute 'data-fx', 'out'

      $ankh = $$ '#ankh', $b
      $ankh.innerHTML = ''
      $ankh.appendChild $df

      obs.f 'ui-lang-update'
      return

    $df = d.createDocumentFragment()
    handleReady uis, $df

    for ui in uis
      ui.target = $df
      obs.f "ui-#{ui.name}-init", ui
    return

  obs.l "helper-site-load", (event) -> load event.target.getAttribute "href"

  $$.listen window, 'resize', resize

  load: load
)()
