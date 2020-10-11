###
  UI accordion
###
import { $$ } from "../helpers/dom"
import { obs } from "../helpers/obs"

module.exports =
  (->
    # @DESC   build new accordion
    # @PARAM  opt.id      MAN {string}      ui id
    # @PARAM  opt.ids     OPT {json}        ui-details configs
    # @PARAM  opt.target  MAN {HTMLElement} ui target
    init = (opt) ->
      { id, ids = [], target: $t } = opt

      if !id or !$t then return

      $ui = $$ "<section/>", class: "ui-accordion"

      for child in ids
        child.target = $ui
        obs.f "_ui-details-init", child

      $t.appendChild $ui
      obs.f "ankh-ui-ready", "ui-accordion"
      return

    obs.l "_ui-accordion-init", init
    return
  )()
