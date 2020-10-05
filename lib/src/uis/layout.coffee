###
  UI LAYOUT
  @AUTHOR faeb187
###
module.exports = (->

  # @REQUIRE local modules
  $$ = require '../helpers/dom'

  ui =
    
    # @DESC   adds item to flexbox
    # @PARAM  itm         MAN {json}    item conf
    # @PARAM  itm.id      MAN {string}  item id
    # @PARAM  itm.tagName OPT {string}  default 'div'
    # @PARAM  $ui         MAN {node}    flexbox target
    # @RETURN {void}
    addChild: ( itm, $ui ) ->
      itm = itm or {}
      id  = itm.id

      # MANDATORY item, item id & flexbox
      if !itm or !$ui then return

      # CREATE flexbox item
      elm = itm.tagName or 'div'
      $itm = $$ '<' + elm + '/>', id: id

      # APPEND item to flexbox
      $ui.appendChild $itm

      # RETURN item ref
      $itm

  #
  # PUBLIC
  #
  return {

    # @DESC   creates a flexbox layout
    # @PARAM  build new flexbox layout
    # @PARAM  opt.direction       OPT {string}  CSS flex-direction
    # @PARAM  opt.alignItems      OPT {string}  CSS align-items
    # @PARAM  opt.justifyContent  OPT {string}  CSS justify-content
    # @PARAM  opt.target          OPT {string}  target node
    # @RETURN {[ node ]}  array of child nodes
    init: ( opt ) ->
      opt = opt or {}
      itms= opt.items
      $t  = opt.target

      # @MANDATORY items & target
      if !itms or !$t then return

      # @DEFINE new targets collection
      nt = []

      # @MARKUP flexbox
      $ui = $$ '<div/>', 'class': 'ui-flexbox'

      # @APPEND items to flexbox
      nt.push ui.addChild itm, $ui for itm in itms

      # @APPEND UI to DOM target
      $t.appendChild $ui

      # @RETURN new targets
      nt
  }
)()
