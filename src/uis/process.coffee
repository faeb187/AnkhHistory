#
# UI process
#
import { $$, obs, media } from "../core"

export process =
  (->
    # @DESC   inits a new process
    # @PARAM  id        MAN {string}      ui id
    # @PARAM  steps     MAN {json[]}      process steps
    # @PARAM  media     OPT {json}        viewport config
    # @PARAM  target    MAN {HTMLElement} target node
    init = (options) ->
      { id, steps, media: m, target: $t } = options

      if !id or !steps?.length or !$t then return

      if m and !media.isInViewport m
        return obs.f "_ankh-ui-not-loaded", options

      $ui = $$ "<p/>", id: id, class: "ui-process", innerText: "Process UI"

      steps.forEach (step) ->
        console.log step

      $t.appendChild $ui

      obs.f "_ankh-ui-loaded", options
      obs.f "ankh-ui-ready", "ui-process##{id}"
      return

    obs.l "_ui-process-init", init
    return
  )()
