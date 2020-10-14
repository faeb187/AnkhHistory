#
# UI input
#
import { $$, media, obs, state } from "../core"

export input =
  (->
    # @param  disabled      {boolean}
    # @param  id            {string}
    # @param  items         {json[]}      checkbox|radio items
    # @param  media         {json}        viewport config
    # @param  name          {string}
    # @param  type          {string}
    # @param  placeholder   {string}      lang reference
    # @param  required      {boolean}
    # @param  target        {HTMLElement} ui target
    # @param  value         {string}
    init = (options) ->
      {
        disabled
        id
        items
        label
        media: m
        name
        placeholder
        required
        target: $t
        type = "text"
      } = options

      if !id or !$t then return

      if m and !media.isInViewport
        return obs.f "_ankh-ui-not-loaded", options

      $ui = $$ "<div/>", class: "ui-input"
      st = state.get(id: id) or {}

      (items or [options]).forEach (item) ->
        { id, name, placeholder, disabled, required, checked, label } = item

        $input = $$ "<input/>", id: id, type: type

        if name then $input.setAttribute "name", name
        if placeholder then $input.setAttribute "data-lang", placeholder
        if disabled then $input.setAttribute "disabled", true
        if required then $input.setAttribute "required", true
        if checked then $input.setAttribute "checked", true
        if label then $ui.appendChild $$ "<label/>", for: id, "data-lang": label

        $ui.appendChild $input
      $t.appendChild $ui

      setTimeout ->
        Object.keys(st).forEach (inputId) ->
          $$("##{inputId}").value = st[inputId]

      $$.listen $$("input", $t), "keyup", (event) ->
        input = event.target
        state.set id: id, state: [input.id]: input.value

      obs.f "_ankh-ui-loaded", options
      obs.f "ankh-ui-ready", "ui-input##{id}"
      return

    obs.l "_ui-input-init", init
  )()
