#
# UI select
#

module.exports =
  (->
    $$ = require "../helpers/dom"
    obs = require "../helpers/obs"
    state = require "../helpers/state"
    ui =
      get$Option: (option) ->
        { attrs = {}, lang } = option
        $option = $$ "<option/>", "data-lang": lang

        Object.keys(attrs).map (attrKey) ->
          $option.setAttribute attrKey, attrs[attrKey]
        $option

    # @DESC   creates a <select> element
    # @PARAM  id        MAN {string}      ui id
    # @PARAM  options   MAN {json[]}      select options
    # @PARAM  target    MAN {HTMLElement} ui target
    init = (opt) ->
      { id, options, target: $t } = opt
      if !id or !options?.length or !$t then return

      $ui = $$ "<select/>", class: "ui-select", id: id

      $options = options.map (option) ->
        $option = ui.get$Option option

      $$.append $options, $ui
      $t.appendChild $ui

      obs.f "ankh-ui-ready", "ui-select##{id}"
      return

    obs.l "ui-select-init", init
    return
  )()
