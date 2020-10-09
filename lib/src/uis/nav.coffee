###
  UI nav
  @desc   list wrapped in <nav> element
###
module.exports = (->
  $$ = require '../helpers/dom'
  obs = require '../helpers/obs'
  uiList = require './list'

  # @DESC   init nav
  # @PARAM  opt.id      MAN {string}  UI id
  # @PARAM  opt.type    OPT {string}  only 'sitemap' atm
  # @PARAM  opt.items   OPT {array}   menu items
  # @PARAM  opt.events  OPT {json}    events fallback from item events
  # @PARAM  opt.target  MAN {node}    target node
  init = ( opt ) ->
    {id, events, items = [], target: $t, type} = opt
    
    if !id or !$t then return

    # PREVENT popstate behaviour
    window.addEventListener 'popstate', (e) -> e.preventDefault()
    
    $ui = $$ '<nav/>', id: id, class: 'ui-nav', role: "navigation"

    # APPEND nav items
    obs.f 'ui-list-init',
      events: events
      id: id
      items: items
      target: $ui

    $t.appendChild $ui
    # obs.f 'ankh-ui-ready' is fired in the list
    return

  obs.l 'ui-nav-init', init
)()
