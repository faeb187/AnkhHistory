#
# UI nav
#
import { $$, observer } from "core"

export nav =
  (->
    # @DESC   inits a new nav
    # @PARAM  id        MAN {string}      ui id
    init: (options) ->
      { id, items, attributes } = options

      if !id or !items?.length then return

      $ui = $$ "<nav/>", { id, class: "ui-nav" }
      if attributes then $$.addAttr $ui, attributes

      items.forEach (item) =>
        { lang, path: href } = item

        $ui.appendChild $$ "<a/>", { href, "data-lang": lang }
        return

      observer.l "core-renderer-rendered", ->
        console.log $$ ".ui-nav"
        $$(".ui-nav").forEach ($nav) => nav.update $nav
        return

      $ui

    update: ($ui) ->
      level = parseInt $ui.getAttribute("data-level") or 0
      $activeBefore = $$(".active", $ui)[0]
      active = location.pathname.slice(1).split("/")[level]
      $activeNow = $$ "[href*='/#{active}']", $ui

      if $activeBefore then $$.removeClass $activeBefore, "active"
      $$.addClass $activeNow, "active"
      return
  )()
