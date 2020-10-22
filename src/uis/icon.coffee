#
# UI icon (ion-icon)
#
import { $$, obs } from "../core"

export icon =
  (=>
    ui =
      events:
        toggleIcon: (opt) =>
          { icons, $target } = opt

          $icon = $$ "ion-icon", $target
          [icon] = icons.filter (icon) =>
            $icon.getAttribute("name") isnt icon
          $icon.setAttribute "name", icon
          return

    # @DESC   displays icon
    # @PARAM  id      MAN {string}  ui id
    # @PARAM  icon    MAN {string}  ion icon name
    # @PARAM  style   OPT {json}    style properties
    init: (options) =>
      { id, icon, events, style = {}, $target } = options

      if !id then return

      $ui = $$ "<ion-icon/>", name: icon

      $$.style $ui, style

      $ui.id = id
      $ui.className = "ui-icon"
      $ui.events = events

      $ui
  )()
