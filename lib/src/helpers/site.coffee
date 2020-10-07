###
  @-  HELPER site
  @-  AUTHOR faeb187
###
module.exports = (->

  #^  local modules
  $$  = require './dom'
  obs = require './obs'
  state=require './state'

  #>  d,$b
  d         = document
  $b        = $$ 'body'
  medias    = {}
  vp        = {}
  bps       =
    xs: 400
    s : 600
    m : 800
    l : 1050
    xl: 1800

  #> Site
  Site =
    careOverview              : require '../sites/careOverview'
    partnerOverview           : require '../sites/partnerOverview'
    partnerProducts           : require '../sites/partnerProducts'
    partnerProductsAdditional : require '../sites/partnerProductsAdditional'
    reportsOverview           : require '../sites/reportsOverview'

  #> Conf
  Conf  =
    back                      : require '../conf/back'
    cnt                       : require '../conf/cnt'
    copyright                 : require '../conf/copyright'
    footer                    : require '../conf/footer'
    front                     : require '../conf/front'
    header                    : require '../conf/header'
    lang                      : require '../conf/lang'
    main                      : require '../conf/main'
    nav                       : require '../conf/nav'
    navResponsive             : require '../conf/navResponsive'
    slider                    : require '../conf/slider'
    navToggle                 : require '../conf/navToggle'

    careIframePending         : require '../conf/careIframePending'

    partnerProductsAdditionalAccordion: require '../conf/partnerProductsAdditionalAccordion'
    partnerProductsAdditionalDetailsCards: require '../conf/partnerProductsAdditionalDetailsCards'
    partnerProductsAdditionalDetailsSafes: require '../conf/partnerProductsAdditionalDetailsSafes'

    reportsTodo               : require '../conf/reportsTodo'

  #> Ui
  Ui    =
    accordion : require '../uis/accordion'
    details   : require '../uis/details'
    html      : require '../uis/html'
    icon      : require '../uis/icon'
    iframe    : require '../uis/iframe'
    lang      : require '../uis/lang'
    layout    : require '../uis/layout'
    list      : require '../uis/list'
    nav       : require '../uis/nav'
    slider    : require '../uis/slider'

  # resize
  resize = ->
    vp.x = window.innerWidth
    vp.y = window.innerHeight
    
    for k, v of medias
      m = medias[ k ]
      fx = if m.min and vp.x <= m.min or m.max and vp.x > m.max then 'out' else 'in'
      $$( '#' + k, $b ).setAttribute 'data-fx', fx

  #-   append app to browser
  #<!  $app {node}
  startApp = ( $site ) ->
    
    #<!? site
    if !$site then return

    #- show site in browser
    $$( '.ui-progress' ).setAttribute 'data-fx', 'out'
    $ankh = $$ '#ankh', $b
    $ankh.innerHTML = ''
    $ankh.appendChild $site
    resize()
    
    #- load lang 'de'
    #! to fix! no direct UI access allowed
    Ui[ 'lang' ].update id: $$( '.ui-lang' ).id, lang: state.get( id: $$('.ui-lang').id) or 'de'

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
    navItms = Conf.nav.items
    
    # EVALUATE site (deepest level of clicked nav item)
    site = getSiteName navItms, path

    # REWRITE to default site on 404
    if !site.name then site = getDefaultSite navItms

    # LOAD evaluated site (on parent nav item click)
    if site.path isnt path then return load site.path

    # PUSH new history state
    $$.history.go site.name, site.path
    
    #>!?
    obj  = Site[ site.name ] or {}
    ids   = obj.ids
    if !ids then return

    # get viewport measures
    vp.x = window.innerWidth
    vp.y = window.innerHeight
    
    #>
    $df = d.createDocumentFragment()
    
    #..
    loadNext obj, $df for obj in ids

    #- set site name in body
    $b.setAttribute 'data-site', site.name

    # listen to viewport resize
    $$.listen window, 'resize', resize

    startApp $df

    obs.f "ankh-ready"


  #-  load UI
  #<! ui  {string}  UI id
  #<! $t  {node}    UI target node
  loadNext = ( obj, $t ) ->
    
    #<!?
    if !obj or !$t then return

    #>
    conf = JSON.parse JSON.stringify Conf[ obj.id ]
    if !conf then return

    ui  = Ui[ conf.name ] or Ui[ 'html' ]
    
    #..
    conf.target = $t

    # check for matchin viewport min|max
    media = obj.media
    if media
      min = bps[ media.min ]
      max = bps[ media.max ]

      if min isnt undefined or max isnt undefined
        medias[ conf.id ] = {}
        if min isnt undefined then medias[ conf.id ].min = min
        if max isnt undefined then medias[ conf.id ].max = max
    
    $nt = ui.init conf

    if obj.ids and $nt then loadNext obj, $nt for obj in obj.ids

  # LISTEN to events
  obs.l "helper-site-load", (e) ->
    load e.target.getAttribute "href"

  return
    load: load
)()
