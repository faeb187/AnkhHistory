#
# UI process
#
import { $$, obs, media, state } from "../core"

export process =
  (->
    ui =
      continue: ->
        activeStep = state.get(id: "prcCtrl").activeStep
        state.set id: "prcCtrl", state: activeStep: ++activeStep
        location.href = "/processes/openProduct"

      abort: ->
        state.rm id: "prcCtrl"
        location.href = "/"

      back: ->
        activeStep = state.get(id: "prcCtrl").activeStep
        state.set id: "prcCtrl", state: activeStep: --activeStep
        location.href = "/processes/openProduct"

      # @DESC   whether a valid step is set or not
      # @PARAM  step    MAN {any}       step to verify
      # @PARAM  steps   MAN {number[]}  all valid process steps
      isValidStep: (step, steps) ->
        if typeof step isnt "number" then return false
        if step < 0 or step > steps.length - 1 then return false
        return true

    # @DESC   inits a new process
    # @PARAM  gateway   OPT {boolean}     forward to active step if true
    # @PARAM  id        MAN {string}      ui id
    # @PARAM  steps     MAN {json[]}      process steps
    # @PARAM  media     OPT {json}        viewport config
    # @PARAM  target    MAN {HTMLElement} target node
    init = (options) ->
      { gateway, id, steps, media: m, target: $t } = options

      if !id or !steps?.length or !$t then return

      if m and !media.isInViewport m
        return obs.f "_ankh-ui-not-loaded", options

      activeStep = (state.get(id: "prcCtrl") or {}).activeStep

      if !ui.isValidStep activeStep, steps
        activeStep = 0
        state.set id: "prcCtrl", state: activeStep: activeStep

      if gateway then return (location.href = steps[activeStep].path)

      obs.l "ui-process-continue", ui.continue
      obs.l "ui-process-abort", ui.abort
      obs.l "ui-process-back", ui.back

      obs.f "_ankh-ui-loaded", options
      obs.f "ankh-ui-ready", "ui-process##{id}"
      return

    obs.l "_ui-process-init", init
    return
  )()
