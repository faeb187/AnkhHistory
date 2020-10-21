#
# UI iframe
#
import { $$, obs } from "../core"

export iframe =
  (->
    # @DESC   init iframe
    # @PARAM  id      MAN {string}  ui id
    # @PARAM  src     MAN {string}  iframe source
    init: (options) ->
      { id, src } = options

      if !id or !src then return

      $ui = $$ "<iframe/>", id: id, class: "ui-iframe", src: src
      $ui
  )()
