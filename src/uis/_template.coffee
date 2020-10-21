#
# UI [uiName]
#
import { $$, obs } from "../core"

export uiName =
  (->
    # @DESC   inits a new [uiName]
    # @PARAM  id        MAN {string}      ui id
    init: (options) ->
      { id } = options

      if !id then return

      $ui = $$ "<[uiRoot]/>", { id, class: "ui-[uiName]" }
      $ui
  )()
