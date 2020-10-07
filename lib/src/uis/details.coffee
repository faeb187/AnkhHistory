###
  UI details
###
module.exports = (->
  
  # @REQUIRE local modules
  $$ = require '../helpers/dom'

  ui =
    data:
      summary:
        lang: 'summary'
        open: true
      content: []

  return {
    # @DESC   build new details view
    # @PARAM  opt.open          OPT {boolean}     details expanded
    # @PARAM  opt.summary       MAN {json}        summary data
    # @PARAM  opt.summary.lang  MAN {string}      summary lang id
    # @PARAM  opt.target        MAN {HTMLElement} ui target
    init: ( opt ) ->
      opt   = opt or {}
      $t    = opt.target
      smy   = opt.summary or {}
      lang  = smy.lang

      # MANDATORY target, summary lang id
      if !$t or !lang then return
      
      $ui  = $$ '<details/>', 'class': 'ui-details'
      $smy = $$ '<summary/>', 'data-lang': lang

      $ui.appendChild $smy
      $t.appendChild $ui
      $ui
  }
)()
