###
  UI icon (ion-icon)
  @AUTHOR faeb187
###
module.exports = (->

  # @REQUIRE local modules
  # @PRIVATE
  $$ = require '../helpers/dom'
  
  # @PUBLIC
  return {
    
    # @DESC   displays icon
    # @PARAM  opt.id      MAN {string}  ui id
    # @PARAM  opt.icon    MAN {string}  ion icon name
    # @PARAM  opt.target  MAN {node}    target node
    # @RETURN {node}  ui
    init: ( opt ) ->

      # DEFINE variables
      opt   = opt or {}
      id    = opt.id
      name  = opt.name
      icon  = opt.icon
      $t    = opt.target

      # MAN id, name & target
      if !id or !name or !$t then return

      # CREATE node
      $ui = $$ '<ion-icon/>', id: id, name: icon

      # APPEND UI to target
      $t.appendChild $ui

      # RETURN UI
      $ui
  }
)()
