#
# UI accordion
#
import { $$, obs } from "../core"

export accordion =
  (->
    # @DESC   build new accordion
    # @PARAM  opt.id      MAN {string}      ui id
    # @PARAM  opt.ids     OPT {json}        ui-details configs
    # @PARAM  $target     MAN {HTMLElement} ui target
    init: (options) ->
      { id, $target } = options

      if !id or !$target then return

      $ui = $$ "<section/>", class: "ui-accordion"
      $ui
  )()
