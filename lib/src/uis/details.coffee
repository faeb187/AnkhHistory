#
# UI details
#
import { $$, obs } from "../core"

export details =
  (->
    # @DESC   build new details view
    # @PARAM  opt.id            MAN {string}      ui id
    # @PARAM  opt.ids           OPT {json[]}      children ui configs
    # @PARAM  opt.open          OPT {boolean}     details expanded
    # @PARAM  opt.summary       OPT {json}        summary data
    # @PARAM  opt.summary.lang  MAN {string}      summary lang id
    # @PARAM  opt.target        MAN {HTMLElement} ui target
    init = (opt) ->
      { id, ids = [], open = false, summary = {}, target: $t } = opt
      lang = summary.lang
      if !id or !$t or !lang then return

      $ui = $$ "<details/>", class: "ui-details", open: open
      $summary = $$ "<summary/>", "data-lang": lang
      $ui.appendChild $summary

      ids.map (ui) ->
        ui.target = $ui
        obs.f "_ui-#{ui.ui}-init", ui

      $t.appendChild $ui
      obs.f "ankh-ui-ready", "ui-details"
      return

    obs.l "_ui-details-init", init
    return
  )()
