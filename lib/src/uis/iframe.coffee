###
  UI iframe
###
module.exports = (->
  $$ = require '../helpers/dom'
  obs= require '../helpers/obs'

  # @DESC   init iframe
  # @PARAM  opt.id      MAN {string}  ui id
  # @PARAM  opt.src     MAN {string}  iframe source
  # @PARAM  opt.target  MAN {node}    target node
  # @RETURN {node}  ui
  init = (opt) ->
    {id, src, target: $t} = opt

    if !id or !src or !$t then return

    $ui = $$ '<iframe/>', id: id, class: 'ui-iframe', src: src

    $t.appendChild $$ '<p/>'
    obs.f 'ankh-ui-ready', 'ui-iframe'
    return
  
  obs.l 'ui-iframe-init', init
  return
)()
