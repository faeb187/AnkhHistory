#
# UI breadcrumb
#
import { $$, obs, media } from "../core"

export breadcrumb =
  (->
    ui =
      # @DESC   updates a breadcrumb
      # @PARAM  active    OPT {number}      active item
      # @PARAM  $target   MAN {HTMLElement} breadcrumb reference
      update: (options) ->
        { active = 0, $target } = options

        $items = $$ "a", $target
        $active = $$ ".active", $target

        if $active then $$.removeClass $active, "active"
        $$.addClass $items[active], "active"
        return

      # @DESC   returns a breadcrumb item
      # @PARAM  lang    OPT {string} lang reference of innerText
      getItem: (item) ->
        { lang } = item

        $item = $$ "<a/>"
        if lang then $item.setAttribute "data-lang", lang

        $item

    # @DESC   inits a new breadcrumb
    # @PARAM  active    OPT {number}      index of active item (default: 0)
    # @PARAM  id        MAN {string}      ui id
    # @PARAM  items     MAN {json[]}      breadcrumb items
    # @PARAM  numbered  OPT {boolean}     items are numbered
    # @PARAM  readonly  OPT {boolean}     no click events
    # @PARAM  target    MAN {HTMLElement} target node
    init = (options) ->
      {
        active = 0
        id
        items
        events
        media: m
        numbered
        readonly
        target: $t
      } = options

      if !id or !items?.length or !$t then return

      if m and !media.isInViewport m
        return obs.f "_ankh-ui-not-loaded", options

      $ui = $$ "<nav/>", id: id, class: "ui-breadcrumb"

      if numbered then $$.addClass $ui, "numbered"
      if readonly then $$.addClass $ui, "readonly"

      items.forEach (item) -> $ui.appendChild ui.getItem item

      $t.appendChild $ui

      updateEvent = name: "ui-breadcrumb-update", target: id
      if !events then options.events = {}
      options.events.ui = [updateEvent]

      obs.l "_ankh-ready", ->
        obs.f "_ankh-ui-fire", updateEvent
      obs.f "_ankh-ui-loaded", options
      obs.f "ankh-ui-ready", "ui-breadcrumb##{id}"
      return

    obs.l "ui-breadcrumb-update", (options) ->
      options.events.ui.forEach (uiEvent) ->
        ui.update $target: uiEvent.$target, active: options.active

    obs.l "_ui-breadcrumb-init", init
    return
  )()
