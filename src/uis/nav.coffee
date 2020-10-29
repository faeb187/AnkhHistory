#
# UI nav
#
import { $$, obs } from "core"

export nav =
  (->
    # @DESC   inits a new nav
    # @PARAM  id        MAN {string}      ui id
    init: (options) ->
      { id, items } = options

      if !id or !items?.length then return

      $ui = $$ "<nav/>", { id, class: "ui-nav", role: "navigation" }

      items.forEach (item) =>
        { lang, path: href } = item

        $ui.appendChild $$ "<a/>", { href, "data-lang": lang }

      $ui
  )()
