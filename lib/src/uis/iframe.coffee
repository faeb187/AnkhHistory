###
  UI iframe
###
module.exports = (->

  # @REQUIRE local modules
  # @PRIVATE
  $$ = require '../helpers/dom'

  # @PUBLIC
  return {
    
    # @DESC   init iframe
    # @PARAM  opt.id      MAN {string}  ui id
    # @PARAM  opt.src     MAN {string}  iframe source
    # @PARAM  opt.target  MAN {node}    target node
    # @RETURN {node}  ui
    init: ( opt ) ->

      # DEFINE variables
      opt   = opt or {}
      id    = opt.id
      src   = opt.src
      $t    = opt.target

      # MAN id, src & target
      if !id or !src or !$t then return

      # CREATE node
      $ui = $$ '<iframe/>', id: id, class: 'ui-iframe', src: src

      # APPEND UI to target
      # $t.appendChild $ui
      $t.appendChild $$ '<p/>'

      # RETURN UI
      $ui
  }
)()
