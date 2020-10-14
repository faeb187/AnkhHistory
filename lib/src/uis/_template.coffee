#
# UI [uiName]
#
import { $$, obs, media } from "../core"

export uiName =
  (->
    # @DESC   inits a new [uiName]
    # @PARAM  id        MAN {string}      ui id
    # @PARAM  media     OPT {json}        viewport config
    # @PARAM  target    MAN {HTMLElement} target node
    init = (options) ->
      { id, media: m, target: $t } = options

      if !id or !$t then return

      if m and !media.isInViewport m
        return obs.f "_ankh-ui-not-loaded", options

      $ui = $$ "<[uiRoot]/>", id: id, class: "ui-[uiName]"

      $t.appendChild $ui

      obs.f "_ankh-ui-loaded", opt
      obs.f "ankh-ui-ready", "ui-[uiName]##{id}"
      return

    obs.l "_ui-[uiName]-init", init
    return
  )()
