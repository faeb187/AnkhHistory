#
# UI grid
#
import { $$, obs } from "../core"

export grid =
  (->
    # @DESC   inits a new (inline-)grid
    # @PARAM  id        MAN {string}      ui id
    init: (options) ->
      {
        id
        element = "div"
        rows
        columns
        gap
        rowGap
        columnGap
        inline = false
      } = options

      if !id or !rows or !columns then return

      cn = "ui-grid#{if inline then "-inline" else ""}"

      $ui = $$ "<#{element}/>", { id, class: "#{cn} ui-grid-rows-#{rows}" }

      $ui
  )()
