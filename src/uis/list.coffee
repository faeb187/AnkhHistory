#
# UI list
#
import { $$, observer, state } from "core"

export list =
  (->
    ui =
      # @desc   updates active list items
      # @param  $target which list ui to update
      update: (event) ->
        { type, $target } = event

        $actBefore = $$ ".active", $target
        if $actBefore.length
          $$.removeClass $$(".active", $target), "active"

        pth = location.pathname
        $actLi = $$("[href='#{pth}']", $target).parentNode
        $$.addClass $actLi, "active"

        $parentUl = $actLi.parentNode
        if $$.hasClass $parentUl, "ui-list" then return
        if $$.hasClass $parentUl.parentNode, "ui-list" then return

        $parentLi = $$.parent $actLi, "li"
        $$.addClass $parentLi, "active"

      toggle: (options) ->
        { event, args } = options

        $toToggle = $$ "##{args.toToggle}"
        $toToggle.setAttribute "data-fx",
          if $toToggle.getAttribute("data-fx") is "in" then "out" else "in"
        return

      # @DESC   adds list item to list
      # @PARAM  itm                   MAN {json}    list item
      # @PARAM  itm.id                OPT {string}  list item id
      # @PARAM  itm.lang              MAN {string}  lang ref (text or img alt)
      # @PARAM  itm.path              MAN {string}  href
      # @PARAM  itm.type              OPT {string}  adds data-[ type ] = true
      # @PARAM  itm.src               OPT {string}  image src attribute
      # @PARAM  itm.icon              OPT {string}  icon class name
      # @PARAM  itm.itms              OPT {todo}    sub items
      # @PARAM  $ul                   MAN {node}    list parent ul (li target)
      # @TODO   only <a> when click event
      addListItem: (itm, $ul) ->
        { id, lang, src, icon, path: href, type, items: subItms } = itm

        if !lang then return

        $li = $$ "<li/>"

        if src then $itm = $$ "<img/>", { src } else $itm = $$ "<a/>"
        if id then $itm.id = id
        if href then $itm.setAttribute "href", href
        if type then $itm.setAttribute "data-" + type, true
        if icon then $itm.appendChild $$ "<i/>", class: icon
        $itm.setAttribute "data-lang", lang

        if subItms
          $subUl = $$ "<ul/>"

          subItms.forEach (subItm) ->
            ui.addListItem subItm, $subUl

          $li.appendChild $subUl

        $li.prepend $itm
        $ul.appendChild $li

    # @DESC   inits a new list
    # @PARAM  id            MAN {string}    UI id
    # @PARAM  items         MAN {[json]}    array containing list items
    init: (options) ->
      { id, items, role, style = {} } = options

      if !id or !items?.length then return

      $ul = $$ "<ul/>"
      if role is "navigation"
        $ui = $$ "<nav/>", role: "navigation"
        $ui.appendChild $ul
      else
        $ui = $ul

      $ui.id = id
      $ui.className = "ui-list"

      $$.style $ui, style

      items.forEach (item) -> ui.addListItem item, $ul

      observer.l "ui-list-update", ui.update
      observer.l "ui-list-toggle", ui.toggle

      $ui
  )()
