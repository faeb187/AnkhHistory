###
  UI search
###
module.exports = (->
  $$ = require '../helpers/dom'
  obs= require '../helpers/obs'

  # @desc   build new search box
  # @param  opt.placeholder   {string}      lang reference
  # @param  opt.target        {HTMLElement} ui target
  init = (opt) ->
    {placeholder, target: $t} = opt
    if !$t then return

    $ui = $$ '<input/>', type: 'search'
    if placeholder then $ui.setAttribute 'data-lang', placeholder

    $t.appendChild $ui
    obs.f 'ankh-ui-ready', 'ui-search'
    return

  obs.l 'ui-search-init', init
)()
