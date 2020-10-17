#
# UI iframe
#
import { $$, obs } from "../core"

export iframe =
  (->
    # @DESC   init iframe
    # @PARAM  opt.id      MAN {string}  ui id
    # @PARAM  opt.src     MAN {string}  iframe source
    # @PARAM  opt.target  MAN {node}    target node
    # @RETURN {node}  ui
    init = (opt) ->
      { id, src, target: $t } = opt

      if !id or !src or !$t then return

      $ui = $$ "<iframe/>", id: id, class: "ui-iframe", src: src

      $t.appendChild $$ "<p/>"
      obs.f "ankh-ui-ready", "ui-iframe#{id}"
      return

    obs.l "_ui-iframe-init", init
    return
  )()
