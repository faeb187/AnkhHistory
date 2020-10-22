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
        attributes = {}
        id
        element = "div"
        style = {}
        inline = false
      } = options

      if !id then return

      cn = "ui-grid#{(inline && "-inline") || ""}"
      $ui = $$ "<#{element}/>", { id, class: cn }

      $$.style $ui, style
      $$.addAttr $ui, attributes

      $ui
  )()
