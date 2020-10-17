#
# UI list
#
import { $$, obs, media, state } from "../core"

export list =
  (->
    # hammer = require "hammerjs"
    ui =
      # @DESC   returns nesting level count of the list
      # @PARAM  MAN rootItms {json[]} root list items
      getLevelCount: (rootItms) ->
        levelCount = 0
        countLevel = (itms) ->
          itms.some (itm) ->
            if itm.items then countLevel itm.items
            return levelCount++

        countLevel rootItms
        levelCount

      updateRootUlActive: ($act) ->
        climbUp = ($elm) ->
          if $elm.tagName is "UL" then $$.addClass $elm, "active"
          if $$.hasClass $$.parent($elm), "ui-list" then return
          climbUp $$.parent $elm
        climbUp $$.parent $act

      # @DESC   updates parent active a elements
      # @PARAM  $act  MAN {HTMLElement} most nested active a
      updateParentActive: ($act) ->
        $parentLi = $$.parent $$.parent($act), "li"
        if !$parentLi then return

        $parentAct = $$ "a", $parentLi
        $$.addClass $parentAct, "active"

      # @DESC   updates active list items
      # @PARAM  $target MAN {HTMLElement} root list
      update: (options) ->
        { $target } = options
        pth = location.pathname
        $act = $$ "[href='#{pth}']", $target
        $$.addClass $act, "active"
        if pth.split("/").length > 1 then ui.updateParentActive $act
        ui.updateRootUlActive $act

      # @DESC   adds list item to list
      # @PARAM  itm                   MAN {json}    list item
      # @PARAM  itm.id                OPT {string}  list item id
      # @PARAM  itm.lang              MAN {string}  lang ref (text or img alt)
      # @PARAM  itm.path              MAN {string}  href
      # @PARAM  itm.type              OPT {string}  adds data-[ type ] = true
      # @PARAM  itm.src               OPT {string}  image src attribute
      # @PARAM  itm.icon              OPT {string}  icon class name
      # @PARAM  itm.events            OPT {json}    custom events
      # @PARAM  itm.events.click      OPT {[json]}  list of 'click' events
      # @PARAM  itm.itms              OPT {todo}    sub items
      # @PARAM  $ul                   MAN {node}    list parent ul (li target)
      # @TODO   only <a> when click event
      addListItem: (itm, $ul, uiId) ->
        {
          id
          events: evs
          lang
          src
          icon
          path: href
          type
          items: subItms
        } = itm

        if !lang then return

        $li = $$ "<li/>"

        if src
          $itm = $$ "<img/>", src: src
        else
          $itm = $$ "<a/>"

        if id then $itm.id = id
        if href then $itm.setAttribute "href", href
        if type then $itm.setAttribute "data-" + type, true
        if icon then $itm.appendChild $$ "<i/>", class: icon
        $itm.setAttribute "data-lang", lang

        if evs
          $itm.events = evs

          if evs.click
            $itm.onclick = ->
              evs.click.forEach (eventName) ->
                obs.f "_ankh-ui-fire", name: eventName, target: uiId

            # hand      = hammer $itm
            # hand.add  new hammer.Tap
            # hand.on   'tap', ui.evs.click

        if subItms
          $subUl = $$ "<ul/>"

          subItms.forEach (subItm) ->
            if evs then subItm.events = evs
            ui.addListItem subItm, $subUl, uiId

          $li.appendChild $subUl

        $li.prepend $itm
        $ul.appendChild $li

      evs:
        # @DESC   fire custom 'click' events
        # @PARAM  e   MAN {Event} 'click' event
        # @RETURN {void}
        click: (event) ->
          console.log "[NAV]", "clickedi now"
          $elm = event.target

          if $elm.tagName is "I"
            $elm = $$.parent $elm

          evs = $elm.events?.click
          if !evs or !evs.length then return

          obs.f ev.ev, ev.arg or e for ev in evs
          return

    # @DESC   inits a new list
    # @PARAM  opt.events        OPT {json}      events
    # @PARAM  opt.id            MAN {string}    UI id
    # @PARAM  opt.items         MAN {[json]}    array containing list items
    # @PARAM  opt.target        MAN {node}      target node
    init = (opt) ->
      { events, media: m, id, items, fx, role, target: $t } = opt

      if !id or !items?.length or !$t then return

      if m and !media.isInViewport m
        obs.f "_ankh-ui-not-loaded", opt
        return

      $ul = $$ "<ul/>"
      if role is "navigation"
        $ui = $$ "<nav/>", role: "navigation"
        $ui.appendChild $ul
      else
        $ui = $ul

      $ui.id = id
      $ui.className = "ui-list"

      levelCount = ui.getLevelCount items

      items.map (item) ->
        item.events = item.events or events
        ui.addListItem item, $ul, id

      $t.appendChild $ui

      updateEvent =
        name: "ui-nav-update"
        target: id

      if !events then opt.events = {}
      opt.events.ui = [updateEvent]

      obs.l "_ankh-ready", ->
        obs.f "_ankh-ui-fire", name: "ui-nav-update", target: id
      obs.f "_ankh-ui-loaded", opt
      obs.f "ankh-ui-ready", "ui-list##{id}"
      return

    obs.l "ui-nav-update", (options) ->
      options.events.ui.forEach (uiEvent) -> ui.update uiEvent
    obs.l "_helper-site-load", ui.evs.click
    obs.l "_ui-list-init", init
    return
  )()
