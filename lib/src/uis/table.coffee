#
# UI table
#

module.exports =
  (->
    d = document
    $$ = require "../helpers/dom"
    obs = require "../helpers/obs"

    reqW = $ths = null

    ui =
      getPdg: ->
        $pdgl = $$.css $ths[0], "paddingLeft"
        $pdgr = $$.css $ths[0], "paddingRight"
        $ths.length * ($pdgl + $pdgr)

      get$Td: (innerTexts) ->
        innerTexts.forEach (innerText) ->
          $tr.appendChild(
            $$ "<td/>",
              "data-lang": true
              "data-lang-rendered": true
              innerText: innerText
          )

      getRequiredWidth: ->
        reqTdW = ui.getRequiredTdWidths()
        reqThW = ui.getRequiredThWidths()
        reqW = reqTdW.map (w, index) -> Math.max w, reqThW[index]

        sumW = reqW.reduce (a, b) -> a + b
        sumW + ui.getPdg()

      getRequiredThWidths: ->
        fs = parseInt $$.css $ths[0], "fontSize"
        $ths.map ($th, index) -> $$.measure($th.innerText, fs).w

      getRequiredTdWidths: ->
        $ths.map ($th, index) ->
          fs = parseInt $$.css $$("td[col-index]")[0], "fontSize"
          $$.measure($$("td[col-index='#{index}']")[0].innerText, fs).w

      set$TdWidths: ->
        reqWSum = ui.getRequiredWidth()
        $uiContainer = $$.parent $$.parent $ths[0], ".ui-table"
        maxW = $uiContainer.clientWidth
        delta = Math.floor (maxW - reqWSum) / $ths.length

        if delta <= 0 then return $$.css "[col-index]", width: "auto"

        $ths.forEach ($th, index) ->
          $$.css "[col-index='#{index}']", width: "#{reqW[index] + delta}px"

    # @PARAM    id      MAN {string}      ui id
    # @PARAM    data    MAN {json[]}      array with data objects
    # @PARAM    target  MAN {HTMLElement} target node
    init = (opt) ->
      { id, data, target: $t } = opt
      if !id or !data?.length or !$t then return

      $ui = $$ "<table/>", class: "ui-table", id: id
      $thead = $$ "<thead/>"
      $theadTr = $$ "<tr/>"
      $tbody = $$ "<tbody/>"
      $_td = $$ "<td/>", "data-lang-rendered": true

      ths = Object.keys data[0]
      trs = data.map (tr) -> Object.values tr

      $ths = ths.map (th, index) ->
        $$ "<th/>", "data-lang": th, "col-index": index
      $trs = trs.map (tr) ->
        $tr = $$ "<tr/>"
        tr.map (text, index) ->
          $td = $_td.cloneNode()
          $td.setAttribute "data-lang", ths[index]
          $td.setAttribute "col-index", index
          $td.innerText = text
          $tr.appendChild $td
        $tr

      $$.append $ths, $theadTr
      $thead.appendChild $theadTr
      $$.append $trs, $tbody
      $ui.appendChild $thead
      $ui.appendChild $tbody
      $t.appendChild $ui

      $$.listen window, "resize", ui.set$TdWidths
      obs.l "ui-lang-updated", ui.set$TdWidths

      obs.f "ankh-ui-ready", "ui-table##{id}"
      return

    obs.l "ui-table-init", init
    return
  )()
