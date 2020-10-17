#
# UI input
#
import { $$, media, obs, state } from "../core"

export input =
  (->
    ui =
      rememberState: (options) ->
        { tag, $target } = options
        eventType = if tag is "input" then "keyup" else "change"

        if tag is "input"
          $$.listen $$(tag, $target), eventType, (event) ->
            $element = event.target
            state.set id: id, state: [$element.id]: $element.value

    # @param  disabled    OPT {boolean}
    # @param  icon        OPT {string}      ion-icon name
    # @param  id          MAN {string}      ui id
    # @param  items       OPT {json[]}      checkbox|radio items
    # @param  media       OPT {json}        viewport config
    # @param  name        OPT?{string}      input name
    # @param  options     OPT {json[]}      select options
    # @param  type        OPT {string}      default: 'text'
    # @param  placeholder OPT {string}      lang reference
    # @param  required    OPT {boolean}     required input
    # @param  target      MAN {HTMLElement} ui target
    # @param  value       OPT {string}      input value
    init = (options) ->
      {
        disabled
        icon
        id
        items
        label
        media: m
        name
        options: opts
        placeholder
        required
        target: $t
        type = "text"
      } = options

      if !id or !$t then return
      tag = if type is "select" then "select" else "input"

      if m and !media.isInViewport
        return obs.f "_ankh-ui-not-loaded", options

      $ui = $$ "<div/>", class: "ui-input"
      st = state.get(id: id) or {}

      (items or [options]).forEach (item) ->
        { id, name, placeholder, disabled, required, checked, label } = item

        $input = $$ "<#{tag}/>", id: id, type: type

        if name then $input.setAttribute "name", name
        if placeholder then $input.setAttribute "data-lang", placeholder
        if disabled then $input.setAttribute "disabled", true
        if required then $input.setAttribute "required", true
        if checked then $input.setAttribute "checked", true
        if label then $ui.appendChild $$ "<label/>", for: id, "data-lang": label
        if opts
          opts.forEach (opt) ->
            $input.appendChild(
              $$ "<option/>", "data-lang": opt.lang, selected: opt.selected
            )
        if icon
          $$.addClass $ui, "ui-input-icon"
          $ui.appendChild $$ "<ion-icon/>", class: "ui-icon", name: icon

        $ui.appendChild $input
      $t.appendChild $ui

      setTimeout ->
        Object.keys(st).forEach (inputId) ->
          $$("##{inputId}").value = st[inputId]

      ui.rememberState tag: tag, $target: $t

      obs.f "_ankh-ui-loaded", options
      obs.f "ankh-ui-ready", "ui-input##{id}"
      return

    obs.l "_ui-input-init", init
  )()
