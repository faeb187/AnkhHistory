#
# UI table
#
import moment from "moment"

import { $$ } from "../helpers/dom"
import { obs } from "../helpers/obs"
import { media } from "../helpers/media"

export table =
  (->
    d = document
    $ths = $adjustable = null
    adjReqW = []
    threshold = 70

    getPdg = ->
      $ths
        .map ($th) ->
          parseInt($$.css $th, "paddingLeft") +
          parseInt $$.css $th, "paddingRight"
        .reduce (a, b) -> a + b

    get$Td = (innerTexts) ->
      innerTexts.forEach (innerText) ->
        $tr.appendChild(
          $$ "<td/>",
            "data-lang": true
            "data-lang-rendered": true
            innerText: innerText
        )

    getRequiredWidths = ->
      reqTdW = getRequiredTdWidths()
      reqThW = getRequiredThWidths()
      reqTdW.map (w, index) -> Math.max w, reqThW[index]

    getRequiredThWidths = ->
      fs = parseInt $$.css $adjustable[0], "fontSize"
      $adjustable.map ($th) ->
        $$.measure($th.innerText, fs).w

    getRequiredTdWidths = ->
      $adjustable.map ($th) ->
        index = parseInt $th.getAttribute "data-col-index"
        fs = parseInt $$.css $$("td[data-col-index]")[0], "fontSize"
        $td = $$("td[data-col-index='#{index}']")[0]
        currency = $td.getAttribute "data-currency"
        toMeasure = if currency
          "#{currency.toUpperCase()} #{$td.innerText}"
        else
          $td.innerText
        $$.measure(toMeasure, fs).w

    compensateWidths = (delta) ->
      minReqW = Math.min ...adjReqW
      maxReqW = Math.max ...adjReqW
      newMin = threshold - delta
      minComp = newMin - minReqW
      maxIndex = adjReqW.indexOf Math.max ...adjReqW
      minIndex = adjReqW.indexOf Math.min ...adjReqW
      adjReqW[maxIndex] = maxReqW - minComp
      adjReqW[minIndex] = newMin
      return

    isTooSmallTd = (delta) ->
      tooSmall = Math.min(...adjReqW) + delta < threshold
      # max = Math.max(...adjReqW) + delta # avoid endless loop
      tooSmall > threshold

    set$TdWidths = (resizeDelta = 0) ->
      $uiContainer = $$.parent $$.parent $ths[0], ".ui-table"

      # mobile view doesn't require adjustments of td widths
      if $$.css($$.parent($ths[0], "thead"), "position") is "absolute"
        return

      # exclude td's with fixed width
      $adjustable = $ths.filter ($th) -> !!!$th.getAttribute "data-width"
      $fixed = $ths.filter ($th) -> !!$th.getAttribute "data-width"
      fixedWSum = $fixed
        .map ($th) -> parseInt $th.getAttribute "data-width"
        .reduce (a, b) -> a + b

      $fixed.forEach ($th) ->
        index = parseInt $th.getAttribute "data-col-index"
        $$.css "[data-col-index='#{index}']",
          width: "#{$th.getAttribute "data-width"}px"

      reqW = getRequiredWidths()
      reqWSum = getPdg() + reqW.reduce (a, b) -> a + b

      maxW = $uiContainer.clientWidth - fixedWSum
      delta = (maxW - reqWSum) / $adjustable.length

      if delta < 0
        adjReqW = if adjReqW.length then adjReqW else [...reqW]
        compensateWidths delta while isTooSmallTd delta

        $adjustable.forEach ($th, index) ->
          colIndex = parseInt $th.getAttribute "data-col-index"
          $$.css "[data-col-index='#{colIndex}']",
            width: "#{adjReqW[index] + delta}px"
        return

      adjReqW = []
      $adjustable.forEach ($th, index) ->
        colIndex = parseInt $th.getAttribute "data-col-index"
        $$.css "[data-col-index='#{colIndex}']",
          width: "#{reqW[index] + delta}px"

    # @PARAM    id      MAN {string}      ui id
    # @PARAM    cols    MAN {json}        column config
    # @PARAM    data    MAN {json[]}      array with data objects
    # @PARAM    media   OPT {json}        viewport config
    # @PARAM    target  MAN {HTMLElement} target node
    init = (opt) ->
      { id, cols, data, media: m, pagination, target: $t } = opt
      if !id or !cols or !data?.length or !$t then return
      if m and !media.isInViewport m
        return obs.f "_ankh-ui-not-loaded", opt

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
              v = moment(v).format "DD/YY"
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
      $t.appendChild $ui

      obs.f "_ankh-ui-loaded", opt
      obs.f "ankh-ui-ready", "ui-table##{id}"
      return

    obs.l "ui-lang-updated", set$TdWidths
    obs.l "ankh-resize", set$TdWidths
    obs.l "_ui-table-init", init
    return
  )()
