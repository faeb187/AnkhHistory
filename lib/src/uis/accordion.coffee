###
  UI accordion
###
module.exports = (->
  
  # @REQUIRE local modules
  $$ = require '../helpers/dom'
  uiHtml = require './html'

  return {
    # @DESC   build new accordion (section: ui-details wrapper)
    # @PARAM  opt.target  MAN {HTMLElement} ui target
    init: ( opt ) ->
      $t = opt.target
      if !$t then return

      htmlOpt = {
        ...opt
        name  : 'section'
        ui    : 'accordion'
        target: $t
      }

      $ui = uiHtml.init htmlOpt

      $t.appendChild $ui
      $ui
  }
)()
