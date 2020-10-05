###
  UI TABLE
  @AUTHOR faeb187
###
module.exports = (->

  # @REQUIRE local modules
  $$    = require '../helpers/dom'
  state = require '../helpers/state'
  
  # @DEFINE variables
  d         = document
  colOrder  = []
  $tbody    = $ui = uiWidth = startX = endX = null
  onResize  = {}
  
  # @DESC     adjust columns on resize
  # @PARAM    e {Event} mousemove event
  # @RETURN  {void}
  mouseMove = ( e ) ->
    col     = onResize.elm.getAttribute 'data-col'
    tblL    = $ui.offsetLeft
    elmL    = onResize.elm.offsetLeft - tblL
    elmW    = $$.css onResize.elm, 'width'
    delta   = e.clientX - elmL - onResize.startX
    nextA   = $$.nextAll onResize.elm
    nextLen = nextA.length

    # ADJUST next columns
    for next in nextA
      nextCol = next.getAttribute 'data-col'
      nextW   = $$.css( next, 'width' ) - delta / nextLen
      $$.css '[data-col=' + nextCol + ']', width: nextW + 'px'
    
    # SET new width for resized column
    $$.css '[data-col=' + col + ']', width: ( elmW + delta ) + 'px'

    # UPDATE startX
    onResize.startX += delta

  # @DESC   show resize cursor on column border
  # @PARAM  e {event} mousemove event
  # @RETURN {void}
  cursorMove = ( e ) ->

    # DEFINE variables
    tblL = $ui.offsetLeft
    elmL = e.target.offsetLeft - tblL
    elmW = ui.getWidth e.target
    brdR = $$.css e.target, 'borderRightWidth'

    curs = if e.clientX - elmL < elmW - brdR then 'default'
    $$.css $ui, cursor: curs or 'ew-resize'

  # @DESC   remove event listeners after column resize
  # @RETURN {void}
  mouseUp = ->
    $$.destroy window , 'mouseup'   , mouseUp
    $$.destroy $ui    , 'mousemove' , mouseMove
    $$.destroy $ui    , 'cursormove', cursorMove
    onResize = {}

  # @DESC   add event listeners when column resize initiated
  # @PARAM  e {event} mousedown event
  # @RETURN {void}
  mouseDown = ( e ) ->
    tblL            = $ui.offsetLeft
    onResize.elm    = e.target
    elmL            = onResize.elm.offsetLeft - tblL
    elmW            = ui.getWidth onResize.elm
    onResize.startX = e.clientX - elmL
    brdR            = $$.css onResize.elm, 'borderRightWidth'

    # ONLY handle column resizes on border click
    if onResize.startX < elmW - brdR then return

    # LISTEN to column resize
    $$.listen $ui   , 'mousemove' , mouseMove
    $$.listen window, 'mouseup'   , mouseUp

  # UI object
  ui =

    # @DESC   listen to column resize if opt.resizable
    # @RETURN {void}
    resizable: ->

      # LISTEN for resize column...
      # ...AND show resize cursor
      $$.listen $ui, 'mousedown', mouseDown
      $$.listen $ui, 'mousemove', cursorMove

    # @DESC   get total width
    # @DESC   (including margin, padding & border)
    # @PARAM  opt.elm   MAN {node}  element
    # @RETURN {float}   total width in px
    getWidth: ( elm ) ->

      # MANDATORY elm
      if !elm then return

      $$.css( elm, 'width' ) +
        $$.css( elm, 'borderRightWidth' ) +
        $$.css( elm, 'borderLeftWidth'  ) +
        $$.css( elm, 'marginRight'      ) +
        $$.css( elm, 'marginLeft'       ) +
        $$.css( elm, 'paddingLeft'      ) +
        $$.css  elm, 'paddingRight'

    # @DESC   set column width
    # @RETURN {void}
    setWidth: ->
      colsLen = $$( '.th',      $ui ).length
      elms    = $$  '.th, .td', $ui
      uiWidth =
        $$.css( $ui, 'width'           ) -
        $$.css( $ui, 'borderLeftWidth' ) -
        $$.css( $ui, 'borderRightWidth') -
        $$.css( $ui, 'paddingLeft'     ) -
        $$.css  $ui, 'paddingRight'
      
      # CALC widths
      for elm in elms

        # CALC delta
        # (border, padding, margin)
        delta =
          $$.css( elm, 'borderLeftWidth'  ) +
          $$.css( elm, 'borderRightWidth' ) +
          $$.css( elm, 'paddingLeft'      ) +
          $$.css( elm, 'paddingRight'     ) +
          $$.css( elm, 'marginLeft'       ) +
          $$.css  elm, 'marginRight'

        # CALC column width
        w = uiWidth / colsLen - delta

        # SET column widths
        $$.css elm, width: w + 'px', $ui

    # @DESC   update column width while dragging
    # @PARAM  elm   MAN {node}    dragged column
    # @PARAM  x     MAN {number} current x
    # @RETURN {void}
    updateColumnWidth: ( elm, x ) ->
      
      # GET resized delta
      delta = x - startX

      # GET next siblings
      nextSibs  = $$.nextAll elm
      
      # ADJUST next columns
      for nextSib in nextSibs

        # GET ALL td's of next column
        nextName  = nextSib.getAttribute 'data-col'
        nextCol = $$ '[data-col=' + nextName + ']', $ui

      # GET ALL td's of resized column
      curName = elm.getAttribute 'data-col'
      curCol  = $$ '[data-col=' + curName + ']', $ui

  # @DESC   add data row
  # @PARAM  opt.row   MAN {json}  object with row data
  # @RETURN {void}
  addRow = ( opt ) ->

    # DEFINE variables
    opt = opt or {}
    row = opt.row
   
    # MANDATORY row data
    if !row then return
    
    # MARKUP table row
    $tr = $$ '<div/>', 'class': 'tr'

    # ADD COLS in the right order
    for col in colOrder
      $col            = $$ '<div/>', 'class': 'td', 'data-col': col
      $col.innerText  = row[ col ] or '-'
      $tr.appendChild $col

    $tbody.appendChild $tr
    
    return

  return {

    # @DESC     build new table
    # @PARAM    cols          MAN {array}     table columns
    # @PARAM    cols.$.id     MAN {string}    column id
    # @PARAM    cols.$.title  MAN {string}    lang reference
    # @PARAM    data          OPT {json}      data object
    # @PARAM    opt.data.rows MAN {array}     array of table rows
    # @PARAM    source        OPT {string}    API path to fetch data
    # @PARAM    limit         OPT {number}   how many records to fetch
    # @PARAM    paging        OPT {number}   paging index to fetch data
    # @PARAM    sortedBy      OPT {object}    default sorting
    # @PARAM    sorted.by     MAN {string}    id of sorted column
    # @PARAM    sorted.how    OPT {asc|DESC}  sort direction
    # @PARAM    opt.resizable OPT {boolean}   columns are resizable
    # @PARAM    opt.target    MAN {string}    target node
    # @RETURN  {void}
    init: ( opt ) ->
      opt       = opt or {}
      id        = opt.id
      cols      = opt.cols
      dta       = opt.data
      source    = opt.source
      limit     = opt.limit
      paging    = opt.paging
      sorted    = opt.sorted
      resizable = opt.resizable
      $t        = opt.target

      # MANDATORY id, cols & target
      if !id or !cols or !$t then return

      # UI markup
      $ui     = $$ '<div/>', 'class': 'ui-table', id: id
      $thead  = $$ '<div/>', 'class': 'thead'

      # BUILD table header
      for col in cols
        colId     = col.id
        colTitle  = col.title

        if !colId or !colTitle then return

        # table header row
        $th           = $$ '<div/>',
          id          : colId
          'class'     : 'th'
          'data-lang' : colTitle
          'data-col'  : colId

        # GET col order
        colOrder.push colTitle
        
        # APPEND th to thead
        $thead.appendChild $th

      # table body
      $tbody = $$ '<div/>', 'class': 'tbody'

      # data already included
      if dta and dta.rows
        for row in dta.rows
          rowOpts = row: row
          if resizable then rowOpts.resizable = true
          addRow rowOpts

      # FETCH table data
      else if source

        # REQ data object
        opts = id: id
        if limit  then opts.limit   = limit
        if paging then opts.paging  = paging

        # FETCH data from server
        $.get source, opts, success: ( res ) ->
          res   = res or {}
          rows  = res.rows

          # server response must contain:
          # @PARAM  res.rows  MAN {[json]} array of record rows
          if !rows then return

          for row in rows
            rowOpts = row: row
            if resizable then rowOpts.resizable = true
            addRow rowOpts
        
      # APPEND UI to DOM target
      $ui.appendChild( $thead ) && $ui.appendChild $tbody
      $t.appendChild $ui

      # RESIZE columns
      if resizable then ui.resizable()

      # ADJUST column widths on window resize
      window.onresize = -> ui.setWidth()
      
      # initial trigger in its own scope
      setTimeout ->
        ui.setWidth()
      0

      return
  }
)()
