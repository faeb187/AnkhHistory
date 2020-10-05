###
  UI HTML
  @AUTHOR faeb187
###
module.exports = (->

  # @REQUIRE local modules
  # @PRIVATE
  $$ = require '../helpers/dom'
  
  # @DEFINE supported {[string]} list of supported tagNames
  # @PRIVATE
  supported = [ 'header', 'main', 'footer', 'section', 'img', 'small', 'h1', 'h2', 'h3' ]

  # @PUBLIC
  return {
    
    # @DESC   builds new html node
    # @PARAM  opt.id      MAN {string}  ui id
    # @PARAM  opt.target  MAN {node}    target node
    # @RETURN {node}  ui
    init: ( opt ) ->

      # DEFINE variables
      opt   = opt or {}
      id    = opt.id
      cn    = opt.className
      name  = opt.name
      src   = opt.src
      alt   = opt.alt
      txt   = opt.text
      $t    = opt.target

      # MAN id, name & target
      if !id or !name or !$t then return

      # CHECK support of tagName
      # DEF   div
      if( supported.indexOf( name ) is -1 ) then name = 'div'
      
      # CREATE node
      $ui = $$ '<' + name + '/>'
      $ui.id = id

      # IMAGE
      if src and alt
        $ui.setAttribute 'src'      , src
        $ui.setAttribute 'data-lang', alt

      # TEXT
      else if txt then $ui.setAttribute 'data-lang', txt

      # CLASSES
      if cn then $ui.className = cn

      # APPEND UI to target
      $t.appendChild $ui

      # RETURN UI
      $ui
  }
)()
