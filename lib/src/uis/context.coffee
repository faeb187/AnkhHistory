###
  UI CONTEXT
  @AUTHOR faeb187
###
module.exports = (->
  
  # @REQUIRE local modules
  $$    = require '../helpers/dom'

  # @DEFINE variables
  d     = document
  $ui   = null
  elms  = []

  ui    =

    evs:

      # @DESC   contextmenu was triggered
      # @PARAM  e   MAN {event} context event
      # @RETURN {void}
      contextMenu: ( e ) ->
        e.preventDefault()
        $$.css $ui,
          left: e.clientX
          top : e.clientY

        $$.addClass $ui, 'active'
        
        return

  # @DESC     context menu listener
  # @PARAM    opt.id      MAN {string}
  # @PARAM    opt.$elm    MAN {node}
  # @RETURN   {void}
  # @PRIVATE
  addContext = ( opt ) ->
    
    # DEFINE variables
    opt = opt or {}
    id  = opt.id
    $elm= $$ '#' + id

    # LISTEN for right click
    if $elm then $$.listen $elm, 'contextmenu', ui.evs.contextMenu

    return

  return {

    # @desc     build new context menu
    # @param    opt.id                MAN {string}  UI id
    # @param    opt.elms              MAN {array}   elements with context
    # @param    opt.elements.$.id     MAN {string}  element id
    # @param    opt.elements.$.items  MAN {array}   menu for element
    # @param    opt.elements.$.lang   MAN {string}  lang reference
    # @returns  {void}
    init: ( opt ) ->
      
      # DEFINE variables
      opt   = opt or {}
      id    = opt.id
      elms  = opt.elements
      $b    = $$ 'body'

      # MANDATORY id, items & target
      if !id or !elms then return
      
      $ui   = $$ '<div/>', 'class': 'ui-context'
      $nav  = $$ '<nav/>'

      for elm in elms
        
        elmId = elm.id
        itms  = elm.items

        # MANDATORY id & itms
        if !elmId or !itms then continue

        for itm in itms

          # create context menu entry
          $a = $$ '<a/>', 'data-lang', itm.lang
          $nav.appendChild $a

        # collect elms
        elms.push elmId

        # add right click
        addContext id: elmId

      # APPEND UI to DOM target
      $ui.appendChild $nav
      $b.appendChild $ui
  }
)()
