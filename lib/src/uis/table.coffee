###
  UI table
###
module.exports = (->
  $$    = require '../helpers/dom'
  obs   = require '../helpers/obs'
  state = require '../helpers/state'
  
  ui =
    # @DESC   creates data row
    # @PARAM  opt.row   MAN {json}      data row
    # @PARAM  opt.cols  MAN {string[]}  columns
    getRow: (opt) ->
      {row, cols} = opt
      
      $tr = $$ '<tr/>'

      # ADD all the row columns
      cols.map ( col ) ->
        $td = $$ '<td/>', 'data-col': col.lang
        v = row[ col.lang ]

        if col.date then v = new Date(v).toLocaleDateString "de",
          day: '2-digit'
          month: 'short'
          year: 'numeric'

        else if col.currency
          $$.addClass $td, 'currency currency-' + col.currency
          v = v.toLocaleString "de"

        $td.innerText = v
        $tr.appendChild $td
      $tr

  # @DESC     build new table
  # @PARAM    cols          MAN {array}       table columns
  # @PARAM    data          OPT {json}        data object
  # @PARAM    opt.data.rows MAN {array}       array of table rows
  # @PARAM    sortBy        OPT {number}      default index of sorted col
  # @PARAM    sort.by       OPT {string}      index of sorted column
  # @PARAM    sort.how      OPT {asc|desc}    sort direction
  # @PARAM    opt.resizable OPT {boolean}     columns are resizable
  # @PARAM    opt.target    MAN {HTMLElement} target node
  init = (opt) ->
    {
      id
      cols
      data
      sortBy
      resizable
      target: $t
    } = opt

    # MANDATORY id, cols & target
    if !id or !cols or !$t then return

    # UI markup
    $ui     = $$ '<table/>', 'class': 'ui-table', id: id
    $thead  = $$ '<thead/>'
    $tr = $$ '<tr/>'

    # BUILD table header
    cols.map ( col ) ->
      $th = $$ '<th/>', 'data-lang': col.lang, 'data-col', col.lang
      if col.currency then $$.addClass $th, 'currency'

      $tr.appendChild $th
    $thead.appendChild $tr

    $tbody = $$ '<tbody/>'

    if data and data.rows
      data.rows.map (row) ->
        rowOpts = row: row, cols: cols
        if resizable then rowOpts.resizable = true
        $tbody.appendChild ui.getRow rowOpts

    $ui.appendChild $thead
    $ui.appendChild $tbody
    $t.appendChild $ui

    obs.f 'ankh-ui-ready', 'ui-table'
    return

  obs.l 'ui-table-init', init
)()
