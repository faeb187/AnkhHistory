#
# UI nav
#
import { $$, media, obs } from "../core"

export nav =
  (->
    # @DESC   init nav
    # @PARAM  opt.events  OPT {json}    events fallback from item events
    # @PARAM  opt.id      MAN {string}  UI id
    # @PARAM  opt.items   OPT {array}   menu items
    # @PARAM  media       OPT {json}    viewport config
    # @PARAM  opt.target  MAN {node}    target node
    # @PARAM  opt.type    OPT {string}  only 'sitemap' atm
    init = (opt) ->
      { id, events, media: m, items = [], target: $t, type } = opt
      if !id or !$t then return

      if m and !media.isInViewport m
        obs.f "_ankh-ui-not-loaded", opt
        return

      $ui = $$ "<nav/>",
        id: id, class: "ui-nav", role: "navigation", "data-fx": "in"

      # APPEND nav items
      obs.f "_ui-list-init",
        events: events
        id: id
        items: items
        target: $ui

      $t.appendChild $ui

      obs.f "_ankh-ui-loaded", opt
      # obs.f 'ankh-ui-ready' is fired in the list
      return

    obs.l "_ui-nav-init", init
    $$.listen window, "popstate", (e) -> e.preventDefault()
    return
  )()
