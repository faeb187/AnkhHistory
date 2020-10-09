###
  UI html
###
module.exports = (->

  # @REQUIRE local modules
  # @PRIVATE
  $$ = require '../helpers/dom'
  obs= require '../helpers/obs'
  
  # @DESC   builds new html node
  # @PARAM  opt.id      MAN {string}  ui id
  # @PARAM  opt.target  MAN {node}    target node
  # @RETURN {node}  ui
  init = (opt) ->
    {
      id
      ids = []
      src
      tag = 'div'
      alt
      text
      target: $t
    } = opt

    if !id or !$t then return
    
    $ui = $$ "<#{tag}/>", id: id, 'class': 'ui-html'

    # IMAGE
    if src and alt
      $ui.setAttribute 'src', src
      $ui.setAttribute 'data-lang', alt

    # TEXT
    else if text then $ui.setAttribute 'data-lang', text

    # LOAD children
    for child in ids
      child.target = $ui
      obs.f "ui-#{child.name}-init", child

    $t.appendChild $ui
    obs.f 'ankh-ui-ready', 'ui-html'
    return

  obs.l "ui-html-init", init
)()
