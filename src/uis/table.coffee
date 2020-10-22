#
# UI table
#
import { $$, obs, state } from "../core"

export table =
  (->
    # @PARAM    id      MAN {string}      ui id
    # @PARAM    cols    MAN {json}        column config
    # @PARAM    data    MAN {json[]}      array with data objects
    # @PARAM    $target MAN {HTMLElement} target node
    init: (options) ->
      { id, cols, data, $target } = options

      if !id or !cols or !data?.length or !$target then return

      $ui = $$ "<table/>", class: "ui-table", id: id
      $thead = $$ "<thead/>"
      $theadTr = $$ "<tr/>"
      $tbody = $$ "<tbody/>"
      $img = $$ "<img/>"

      # build all <th>'s
      $ths = cols.map (col, index) ->
        $th = $$ "<th/>", "data-col-index": index
        if col.lang then $th.setAttribute "data-lang", col.lang
        if col.svg then $th.setAttribute "data-svg", true
        if col.date then $th.setAttribute "data-date", true
        if col.currency then $th.setAttribute "data-currency", col.currency
        if col.right then $$.addClass $th, "right"
        if col.width then $th.setAttribute "data-width", col.width
        $th

      # build all <tr>'s with data
      $trs = data.map (tr) ->
        $tr = $$ "<tr/>"

        cols.forEach (col, index) ->
          $td = $$ "<td/>"
          $td.setAttribute "data-col-index", index

          # type: svg
          if col.svg
            $svg = $$ "<img/>", src: "/assets/svg/#{col.svg}.svg"
            $td.appendChild $svg
          # type: text
          else if col.lang
            $td.setAttribute "data-lang-rendered", true
            $td.setAttribute "data-lang", col.lang

            v = tr[col.lang]
            if col.date
              # v = v // todo format without moment
              $td.setAttribute "data-date", true
            else if col.currency
              v = v.toLocaleString "de"
              $td.setAttribute "data-currency", col.currency
            $td.innerText = v

          if col.right then $$.addClass $td, "right"
          $tr.appendChild $td
        $tr

      $$.append $ths, $theadTr
      $thead.appendChild $theadTr
      $$.append $trs, $tbody
      $ui.appendChild $thead
      $ui.appendChild $tbody
      $ui
  )()
