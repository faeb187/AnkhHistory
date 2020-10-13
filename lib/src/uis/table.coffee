#
# UI table
#
import moment from "moment"
import { $$, media, obs, state } from "../core"

export table =
  (->
    d = document

    getPdg = ($ths) ->
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

    getDynamicThs = ($ths) ->
      $ths.filter ($th) -> !!!$th.getAttribute "data-width"

    getFixedThs = ($ths) -> $ths.filter ($th) -> !!$th.getAttribute "data-width"

    getRequiredWidths = ($ths, $ui) ->
      reqTdW = getRequiredTdWidths $ths, $ui
      console.log "////reqTdW", reqTdW
      reqThW = getRequiredThWidths $ths
      console.log "////reqThW", reqThW
      reqTdW.map (w, index) -> Math.max w, reqThW[index]

    getRequiredThWidths = ($ths) ->
      $dynamicThs = getDynamicThs $ths
      fs = parseInt $$.css $dynamicThs[0], "fontSize"
      $dynamicThs.map ($th) -> $$.measure($th.innerText, fs).w

    getRequiredTdWidths = ($ths, $ui) ->
      $firstTd = $$("td[data-col-index]", $ui)[0]
      fs = parseInt $$.css $firstTd, "fontSize"

      getDynamicThs($ths).map ($th) ->
        index = parseInt $th.getAttribute "data-col-index"
        $td = $$("td[data-col-index='#{index}']", $ui)[0]
        currency = $td.getAttribute "data-currency"
        toMeasure = if currency
          "#{currency.toUpperCase()} #{$td.innerText}"
        else
          $td.innerText
        $$.measure(toMeasure, fs).w

    adjustWidths = (adjustedWidths, delta, threshold) ->
      adjW = [...adjustedWidths]
      _adjust = (delta) ->
        minReqW = Math.min ...adjW
        maxReqW = Math.max ...adjW
        newMin = threshold - delta
        minComp = newMin - minReqW
        maxIndex = adjW.indexOf Math.max ...adjW
        minIndex = adjW.indexOf Math.min ...adjW
        adjW[maxIndex] = maxReqW - minComp
        adjW[minIndex] = newMin
        return

      _adjust delta while isTooSmall adjustedWidths, delta, threshold
      adjW

    isTooSmall = (adjustedWidths, delta, threshold) ->
      tooSmall = Math.min(...adjustedWidths) + delta < threshold
      tooSmall > threshold

    adjust = (opt) ->
      { threshold = 80, $target } = opt

      $parent = $$.parent $target
      $thead = $$ "thead", $target
      $ths = Array.from $$ "th", $target
      $dynamicThs = getDynamicThs $ths
      $fixedThs = getFixedThs $ths

      adjustedWidths =
        state.get(id: $target.id)?.adjustedWidths or getRequiredWidths $ths

      # mobile viewport
      if $$.css($thead, "position") is "absolute" then return

      $fixedThs.forEach ($th) ->
        index = parseInt $th.getAttribute "data-col-index"
        $$.css "[data-col-index='#{index}']",
          width: "#{$th.getAttribute "data-width"}px"

      # exclude td's with fixed width
      fixedWSum = $fixedThs
        .map ($th) -> parseInt $th.getAttribute "data-width"
        .reduce (a, b) -> a + b
      maxW = $parent.clientWidth - fixedWSum
      totalAdj = adjustedWidths.reduce (a, b) -> a + b
      reqWSum = totalAdj + getPdg $ths

      console.log "--------------", maxW
      console.log "fixed", $fixedThs, fixedWSum
      console.log "dyn", $dynamicThs, $dynamicThs.length
      console.log "pdg", getPdg $ths
      console.log "req total", reqWSum
      console.log "----"
      delta = (maxW - reqWSum) / $dynamicThs.length

      console.log "delta", delta

      if delta < 0
        adjustedWidths = adjustWidths adjustedWidths, delta, threshold
        state.set id: $target.id, state: adjustedWidths: adjustedWidths
        console.log state.get id: $target.id

      $dynamicThs.forEach ($th, index) ->
        colIndex = parseInt $th.getAttribute "data-col-index"
        $$.css "[data-col-index='#{colIndex}']",
          width: "#{adjustedWidths[index] + delta}px"

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

      if !opt.events then opt.events = {}
      adjustEvent =
        name: "ui-table-adjust"
        target: id
      opt.events.resize = [adjustEvent]
      fireAdjustEvent = -> obs.f "_ankh-ui-fire", adjustEvent

      obs.l "ui-table-adjust", (options) ->
        options.events.resize.forEach (resizeEvent) -> adjust resizeEvent

      obs.l "_ankh-resize", fireAdjustEvent
      obs.l "ui-lang-updated", fireAdjustEvent

      obs.f "_ankh-ui-loaded", opt
      obs.f "ankh-ui-ready", "ui-table##{id}"
      return

    obs.l "_ui-table-init", init
    return
  )()
