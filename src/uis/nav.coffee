#
# UI nav
#
import { $$, media, obs } from "../core"

export nav =
  (->
    # @PARAM  events  OPT {json}    event configs
    # @PARAM  id      MAN {string}  UI id
    # @PARAM  items   OPT {array}   menu items
    # @PARAM  media   OPT {json}    viewport config
    # @PARAM  target  MAN {node}    target node
    # @PARAM  type    OPT {string}  only 'sitemap' atm
    init = (opt) ->
      { id, events = {}, media: m, items = [], target: $t, type } = opt
      if !id or !$t then return

      $ui = $$ "<nav/>", id: id, class: "ui-nav", role: "navigation"

      obs.f "_ui-list-init",
        events: events
        id: id
        items: items
        target: $ui

      $t.appendChild $ui

      # obs.f "_ankh-ui-loaded", opt
      # obs.f 'ankh-ui-ready' is fired in the list
      return

    obs.l "_ui-nav-init", init
    $$.listen window, "popstate", (e) -> e.preventDefault()
    return
  )()
