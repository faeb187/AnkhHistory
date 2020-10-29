#
# UI input
#
import { $$, observer, state } from "core"

# todo dynamic adapter
# import { get } from "../network/adapters/apollo"
import { ankh } from "../app/ankh"

export input =
  (->
    ui =
      rememberState: (options) ->
        { uiId, tag, $target } = options
        eventType = if tag is "input" then "keyup" else "change"

        ### @todo there is no $target anymore
        if tag is "input"
          $$.listen $$(tag, $target), eventType, (event) ->
            $element = event.target
            state.set id: uiId, state: [$element.id]: $element.value
        ###

      search: (options) ->
        { events } = options

        events.keyup?.forEach (searchEvent) ->
          { name: eventName, $target } = searchEvent
          if eventName isnt "_ui-input-search" then return

          query = "{partner {partnerNo lastname firstname birthday }}"
          $datalist = $$("##{$target.id}-list")[0]
          $datalist.innerHTML = ""

          try
            res = await $$.post ankh.networkAdapter, { query }
            res?.data?.partner?.forEach (partner) =>
              text = "#{partner.lastname} #{partner.firstname}"
              $datalist.appendChild $$ "<option/>", innerText: text

          catch error
            console.error "[ui-input] #{ui.search}", error

      setEvents: (options) ->
        { id, events = {}, target: $target } = options

        events.keyup?.forEach (searchEvent) ->
          $$.listen $target, "keyup", ->
            observer.f "_ankh-ui-fire",
              name: searchEvent.name
              target: searchEvent.target
              value: $target.value

        return

    # @param  datalist    OPT {json[]}      list to choose from on input (e.g. search results)
    # @param  disabled    OPT {boolean}     whether the field is disabled or not
    # @param  events      OPT {json}        events to bind to the field
    # @param  icon        OPT {string}      ion-icon name
    # @param  id          MAN {string}      ui id
    # @param  items       OPT {json[]}      checkbox|radio items
    # @param  name        OPT?{string}      input name
    # @param  options     OPT {json[]}      select options
    # @param  type        OPT {string}      default: 'text'
    # @param  placeholder OPT {string}      lang reference
    # @param  required    OPT {boolean}     required input
    # @param  target      MAN {HTMLElement} ui target
    # @param  value       OPT {string}      input value
    init: (options) ->
      {
        datalist
        disabled
        events
        icon
        id
        items
        label
        name
        options: opts
        placeholder
        required
        $target
        type = "text"
      } = options

      if !id or !$target then return
      tag = if type is "select" then "select" else "input"

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

        if datalist
          $datalist = $$ "<datalist/>", id: "#{id}-list"
          $input.setAttribute "list", "#{id}-list"
          $input.setAttribute "autocomplete", "off"
          datalist.forEach (dl) ->
            $datalist.appendChild $$ "<option/>", "data-lang": dl.lang
          $ui.appendChild $datalist

        if opts
          opts.forEach (opt) ->
            $input.appendChild(
              $$ "<option/>", "data-lang": opt.lang, selected: opt.selected
            )

        if icon
          $$.addClass $ui, "ui-input-icon"
          $ui.appendChild $$ "<ion-icon/>", class: "ui-icon", name: icon

        if events then ui.setEvents options

        $ui.appendChild $input

      setTimeout ->
        Object.keys(st).forEach (inputId) ->
          $$("##{inputId}").value = st[inputId]

      ui.rememberState { tag, $target, uiId: id }
      # observer.l "_ui-input-search", ui.search
      $ui
  )()
