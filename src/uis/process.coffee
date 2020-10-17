#
# UI process
#
import { $$, obs, media, state } from "../core"

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

      st = state.get(id: id) or {}
      activeStep = st.activeStep

      if !activeStep
        activeStep = 0
        state.set id: id, state: activeStep: activeStep

      # obs.f "_helper-site-load", steps[activeStep].path
      obs.f "_ankh-ui-loaded", options
      obs.f "ankh-ui-ready", "ui-process##{id}"
      return

    obs.l "_ui-process-init", init
    return
  )()
