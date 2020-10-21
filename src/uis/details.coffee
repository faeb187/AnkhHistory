#
# UI details
#
import { $$, obs } from "../core"

export details =
  (->
    # @DESC   build new details view
    # @PARAM  opt.id            MAN {string}      ui id
    # @PARAM  opt.open          OPT {boolean}     details expanded
    # @PARAM  opt.summary       OPT {json}        summary data
    # @PARAM  opt.summary.lang  MAN {string}      summary lang id
    # @PARAM  $target           MAN {HTMLElement} ui target
    init: (options) ->
      { id, open = false, summary: { lang }, $target } = options

      if !id or !$target or !lang then return

      $ui = $$ "<details/>", class: "ui-details", open: open
      $summary = $$ "<summary/>", "data-lang": lang

      $ui.appendChild $summary
      $ui
  )()
