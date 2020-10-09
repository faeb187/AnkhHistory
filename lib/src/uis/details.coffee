###
  UI details
###
module.exports = (->
  $$ = require '../helpers/dom'
  obs = require '../helpers/obs'

  # @DESC   build new details view
  # @PARAM  opt.id            MAN {string}      ui id
  # @PARAM  opt.ids           OPT {json[]}      children ui configs
  # @PARAM  opt.open          OPT {boolean}     details expanded
  # @PARAM  opt.summary       OPT {json}        summary data
  # @PARAM  opt.summary.lang  MAN {string}      summary lang id
  # @PARAM  opt.target        MAN {HTMLElement} ui target
  init = ( opt ) ->
    {
      id
      ids = []
      summary = {}
      target: $t
    } = opt
    
    lang = summary.lang

    # MANDATORY target, summary lang id
    if !id or !$t or !lang then return
    
    $ui = $$ '<details/>', 'class': 'ui-details'
    $summary = $$ '<summary/>', 'data-lang': lang
    $ui.appendChild $summary

    for child in ids
      child.target = $ui
      obs.f "ui-#{child.name}-init", child

    $t.appendChild $ui
    obs.f 'ankh-ui-ready', 'ui-details'
    return

  obs.l 'ui-details-init', init
)()
