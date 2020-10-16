#
# UI FORM
#
import { $$, obs, state } from "../core"

export form =
  (->
    flds = require "../conf/form.fields"

    # @REQ npm modules
    cf = require "currency-formatter"

    fldChange = new Event "fldChange"

    # @DEF variables
    st = null
    id = null
    d = document

    # @DEF  ui  {json}  UI variables/methods
    ui =
      $tpl: $$ "<section/>"

      addFld: (obj, $t) ->
        obj = obj or {}
        dyn = obj.dyn
        step = obj.step
        if !$t then return

        if obj.ids
          $grp = $$ "<div/>", class: "grp"
          if obj.id then $grp.id = obj.id
          if obj.title
            $h2 = $$ "<h2/>", "data-lang": obj.title
            $grp.appendChild $h2

          if step
            $grp.setAttribute "data-step", true
            $grp.setAttribute "data-fx", "in"

          if dyn and obj.id then ui.addFld obj

          ui.addFld obj, $grp for obj in obj.ids
          $t.appendChild $grp

        objId = obj.id
        fld = flds[objId]
        if !fld then return

        type = fld.type
        req = fld.required
        name = fld.name
        lab = fld.label
        val = fld.value
        min = fld.min
        max = fld.max
        ptrn = fld.pattern
        step = fld.step
        ph = fld.placeholder
        evs = fld.evs
        dyn = obj.dyn
        fldSt = st[if type is "radio" then name else objId]
        $fld = $$ "<div/>", class: "fld fld-" + objId

        switch type
          when "select"
            fldO = fld.options or []
            if !fldO then return
            $inp = $$ "<select/>"
            $inp.id = objId
            for o in fldO
              oId = o.id
              oVal = o.value
              if !oId or !oVal then return
              $opt = $$ "<option/>", value: oVal, "data-lang": oVal
              $opt.id = oId
              if req then $inp.setAttribute "required", true
              if name then $inp.setAttribute "name", name
              if val then $inp.value = val
              $inp.appendChild $opt
            $fld.appendChild $inp
            if lab
              $fld.appendChild $$ "<label/>", for: objId, "data-lang": lab
            if fldSt then $inp.value = fldSt

          when "radio"
            fldO = fld.options or []
            $ctrls = $$ "<div/>", class: "ctrls"
            for o in fldO
              oLab = o.label
              oId = o.id
              if !oId or !oLab then continue
              $inp = $$ "<input/>", type: "radio", name: name
              $inp.id = oId
              $oLab = $$ "<label/>", for: oId, "data-lang": oLab
              if req then $inp.setAttribute "required", true
              if fldSt is oId then $inp.setAttribute "checked", true
              $ctrls.appendChild $inp
              $ctrls.appendChild $oLab
            $fld.appendChild $ctrls
            $fld.appendChild $$ "<label/>", "data-lang": lab

          when "range"
            $inp = $$ "<input/>", type: "range"
            $num = $$ "<input/>", type: "text", "data-type": "currency"
            $inp.id = objId
            if max then $inp.setAttribute "max", max
            if min then $inp.setAttribute "min", min
            if step then $inp.setAttribute "step", step
            if req then $inp.setAttribute "required", true
            if name then $inp.setAttribute "name", name
            if lab then $inp.setAttribute "data-lang", ph
            $fld.appendChild $num
            $fld.appendChild $inp
            if lab
              $fld.appendChild $$ "<label/>", for: objId, "data-lang": lab
            $inp.value = fldSt or val or ""
            $num.value = cf.format fldSt or val or "", code: "CHF"

          when "output"
            $inp = $$ "<output/>"
            $inp.id = objId
            if req then $inp.setAttribute "required", true
            if name then $inp.setAttribute "name", name
            if ph then $inp.setAttribute "data-lang", ph
            if val then $inp.value = val
            $fld.appendChild $inp
            if lab
              $fld.appendChild $$ "<label/>", for: objId, "data-lang": lab

          when "textarea"
            $inp = $$ "<textarea/>"
            $inp.id = objId
            if req then $inp.setAttribute "required", true
            if name then $inp.setAttribute "name", name
            if ph then $inp.setAttribute "data-lang", ph
            $fld.appendChild $inp
            if lab
              $fld.appendChild $$ "<label/>", for: objId, "data-lang": lab
            $inp.value = fldSt or val or ""

          when "currency", "number"
            $inp = $$ "<input/>", type: "number"
            $inp.id = objId
            if req then $inp.setAttribute "required", true
            if name then $inp.setAttribute "name", name
            $fld.appendChild $inp
            if lab then $fld.appendChild $$ "<label/>", "data-lang": lab
            val = fldSt or val or 0
            if type is "currency"
              $inp.setAttribute "type", "text"
              $inp.setAttribute "data-type", "currency"
              $inp.value = cf.format val, code: "CHF"
            else
              $inp.value = val

          when "checkbox"
            $inp = $$ "<input/>", type: "checkbox"
            $inp.id = objId
            if req then $inp.setAttribute "required", true
            if name then $inp.setAttribute "name", name
            $fld.appendChild $inp
            if lab then $fld.appendChild $$ "<label/>", "data-lang": lab
            val = fldSt or null
            if val then $inp.setAttribute "checked", true

          else
            $inp = $$ "<input/>", type: type or "text"
            $inp.id = objId
            if req then $inp.setAttribute "required", true
            if name then $inp.setAttribute "name", name
            if ptrn then $inp.setAttribute "pattern", ptrn
            if ph then $inp.setAttribute "data-lang", ph
            $inp.value = fldSt or val or ""
            $fld.appendChild $inp
            if lab
              $fld.appendChild $$ "<label/>", for: objId, "data-lang": lab
        $fld.appendChild $$ "<i/>", class: "ui-icon icon-ok ion-checkmark"
        $fld.appendChild $$ "<i/>", class: "ui-icon icon-nok ion-close"
        $t.appendChild $fld

      listen: ($ui) ->
        #$ui     = $$ '#' + id
        $inps = $$ "input, textarea, select", $ui
        $flds = $$ "[required]", $ui
        $range = $$ "[type=range]", $ui

        if $flds.length
          $$.listen $flds, "change", ui.validate
          $$.listen $flds, "blur", ui.validate
          $$.listen $flds, "fldChange", ui.validate

          # initial validation of nonempty fields
        $fld.dispatchEvent fldChange for $fld in $flds when $fld.value

        if $range.length
          $$.listen $range, "input", (e) ->
            e.target.previousSibling.value = cf.format e.target.value,
              code: "CHF"

          $$.listen $range.previousSibling, "keyup", (e) ->
            e.target.nextSibling.value = e.target.value

        if $inps.length
          $$.listen $inps, "change", (e) ->
            $elm = e.target
            type = $elm.getAttribute("data-type") or $elm.getAttribute "type"
            prop = if type is "radio" then $elm.getAttribute "name" else $elm.id
            val = if type is "radio" then $elm.id else $elm.value
            if type is "currency" then $elm.value = cf.format val, code: "CHF"
            st[prop] = val
            state.set id: id, state: st

        $steps = $$ "[ data-step ]:first-child", $ui
        if $steps.length then $steps.setAttribute "data-fx", "in"

      validate: (e) ->
        e.preventDefault()
        $elm = e.target
        $fld = $$.parent $elm, ".fld"

        # ADD valid/invalid class
        cns = ["valid", "invalid"]
        if $elm.checkValidity() then cns.reverse()
        $$.removeClass($fld, cns[0]).addClass $fld, cns[1]
        return

      evs:
        set: (opt) ->
          opt = opt or {}
          id = id
          step = opt.step
          dyn = opt.dyn
          fld = opt.fld
          $ui = $$ "#" + id

          if step
            $steps = $$ "[data-step]", $ui
            for $step in $steps
              if $step.getAttribute("data-fx") is "in"
                $step.setAttribute "data-fx", "out"
            $$("[data-step]:nth-child(" + step + ")", $ui).setAttribute(
              "data-fx"
              "in"
            )

            # zip fills city
          $zip = $$ "#zip"
          $city = $$ "#city"

          if $zip and $city
            $$.listen $zip, "keyup", (e) ->
              zip = e.target.value
              if zip.length <= 3
                $city.value = ""
                return

              $$.read "service/city/get/" + zip, (city) ->
                $city.value = if city then city else ""

        listen:
          unload: ->
            window.onunload = ->
              # CHECK if user has changed something...
              $fld = $$ "input:focus, textarea:focus, select:focus", $ui
              if !$fld then return

              type = $fld.getAttribute "type"
              prop = if type is "radio"
                $fld.getAttribute "name"
              else
                $fld.id
              val = if type is "radio" then $fld.id else $fld.value

              # ...and update that change
              st[prop] = val
              state.set id: id, state: st

    return (
      # @DESC   init UI form
      # @PARAM  opt.id      MAN {string}    UI id
      # @PARAM  opt.ids     MAN {[string]}  array of fields
      # @PARAM  opt.type    OPT {string}    form type (newsletter)
      # @PARAM  opt.target  MAN {node}      target node


        init: (opt) ->
          opt = opt or {}
          id = opt.id
          ids = opt.ids
          type = opt.type
          $t = opt.target
          st = state.get(id: id) or {}

          # MAN id, ids, target
          if !id or !ids or !$t
            return

            # UI markup
          $ui = ui.$tpl.cloneNode()
          $ui.id = id
          $ui.className = if type
            "ui-" + type
          else
            "ui-form"

            # APPEND fields to form
          ui.addFld obj, $ui for obj in ids

          # APPEND UI to dom target
          $t.appendChild $ui

          # ATTACH events
          ui.listen $ui

          # ATTACH observer events
          obs.l "ui-form-set", ui.evs.set

          return
    )
  )()
