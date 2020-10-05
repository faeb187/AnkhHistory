###
  UI FAB
  @AUTHOR faeb187
###
module.exports = (->
  
  # @REQUIRE local modules
  $$ = require '../helpers/dom'

  return {

    # @DESC   build new FAB
    # @PARAM  opt.items             MAN {[json]}  buttons
    # @PARAM  opt.items.$.tooltip   OPT {string}  lang reference
    # @PARAM  opt.action            MAN {?}
    # @PARAM  opt.target            MAN {string}  target node
    # @RETURN {void}
    # @PUBLIC
    init: ( opt ) ->

      # DEFINE variables
      opt   = opt or {}
      itms  = opt.items
      actn  = opt.action
      $t    = opt.target
      
      # MANDATORY items & target
      if !itms or !$t then return

      # button wrapper
      $ui = $$ '<nav/>',
        'class'   : 'ui-fab'
        draggable : 'draggable'
      
      # create the main button
      itms.push tooltip: actn

      # test
      icons = [
        'ion-social-facebook',
        'ion-social-twitter',
        'ion-social-googleplus',
        'ion-android-share-alt'
      ]
      
      # ADD buttons
      for itm, i in itms

        $btn = $$ '<a/>',
          href    : '#'
          'class' : 'btn'
          tooltip : item.tooltip

        $btn.appendChild $$ '<i/>', 'class': icons[ i ]
        $ui.appendChild $btn

      # APPEND UI to DOM
      $t.appendChild $ui

      return
  }
)()
