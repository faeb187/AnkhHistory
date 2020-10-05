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
    care                    : require '../sites/care'
    partner                 : require '../sites/partner'
    reports                 : require '../sites/reports'

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
    slider                    : require '../conf/slider'
    careTodo: require '../conf/careTodo'
    partnerTodo: require '../conf/partnerTodo'
    reportsTodo: require '../conf/reportsTodo'
    navToggle: require '../conf/navToggle'

  #> Ui
  Ui    =
    html      : require '../uis/html'
    icon      : require '../uis/icon'
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
      if medias[ k ].min and vp.x < medias[ k ].min or
        medias[ k ].max and vp.x > medias[ k ].max
          $$( '#' + k, $b ).setAttribute 'data-fx', 'out'
      else $$( '#' + k, $b ).setAttribute 'data-fx', 'in'

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

  #- loads site
  #<! name  {string} name of the site
  load = ( name ) ->
    #>!?
    obj  = Site[ name ] or {}
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
    $b.setAttribute 'data-site', name

    # listen to viewport resize
    $$.listen window, 'resize', resize

    startApp $df

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

  # listen to events
  obs.l "helper-site-load", (e) ->
    path = e.target.getAttribute( "href" ).slice 1
    load path
    $$.history.go path

  return
    load: load
)()
