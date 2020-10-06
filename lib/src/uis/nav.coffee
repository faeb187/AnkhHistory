###
  UI NAV
  @desc   list wrapped in <nav> element
  @author faeb187
###
module.exports = (->

  #
  # PRIVATE
  #
  $$      = require '../helpers/dom'
  uiList  = require './list'

  #
  # PUBLIC
  #
  return {

    # @DESC   init slider
    # @PARAM  opt.id      MAN {string}  UI id
    # @PARAM  opt.type    OPT {string}  only 'sitemap' atm
    # @PARAM  opt.items   MAN {array}   menu items
    # @PARAM  opt.events  OPT {json}    events fallback from item events
    # @PARAM  opt.target  MAN {node}    target node
    init: ( opt ) ->
      opt   = opt or {}
      id    = opt.id
      evs   = opt.events
      itms  = opt.items
      $t    = opt.target
      type  = opt.type

      # MANDATORY id, target & items
      if !id or !$t or !itms or !itms.length then return

      # PREVENT popstate behaviour
      window.addEventListener 'popstate', (e) -> e.preventDefault()
      
      # UI markup
      $ui     = $$ '<nav/>', id: id, class: 'ui-nav', role: "navigation"

      # APPEND nav items
      uiList.init
        events: evs
        id: id
        items: itms
        target: $ui

      # append UI to target
      $t.appendChild $ui
      
      return
  }
)()
