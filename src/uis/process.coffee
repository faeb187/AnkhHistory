#
# UI process
#
import { $$, observer, state } from "core"

export process =
  (->
    ui =
      continue: ->
        activeStep = state.get(id: "prcCtrl").activeStep
        state.set id: "prcCtrl", state: activeStep: ++activeStep
        ui.redirect "/processes/openProduct"

      abort: ->
        state.rm id: "prcCtrl"
        ui.redirect "/"

      back: ->
        activeStep = state.get(id: "prcCtrl").activeStep
        state.set id: "prcCtrl", state: activeStep: --activeStep
        ui.redirect "/processes/openProduct"

      redirect: (path) => observer.f "core-site-load", path

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
    # @PARAM  target    MAN {HTMLElement} target node
    init: (options) ->
      { gateway, id, steps, $target } = options

      if !id or !steps?.length or !$target
        throw new Error "[UI][process] mandatory params missing"

      activeStep = (state.get(id: "prcCtrl") or {}).activeStep

      if !ui.isValidStep activeStep, steps
        activeStep = 0
        state.set id: "prcCtrl", state: activeStep: activeStep

      if gateway then return ui.redirect steps[activeStep].path

      observer.l "ui-process-continue", ui.continue
      observer.l "ui-process-abort", ui.abort
      observer.l "ui-process-back", ui.back
      return
  )()
