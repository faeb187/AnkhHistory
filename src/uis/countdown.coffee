#
#  UI countdown
#
import { dom } from "../core"

export countdown =
  (->
    $ui = null
    int = 0
    ui =
      $tpl: $$ "<div/>",
        class: "ui-countdown"

        # @DESC   update countdown
      update: ->
        s = parseInt($ui.innerText) - 1000
        if s <= 0 then clearInterval int else $ui.innerText = s
        return

    return (
      # @DESC   init countdown
      # @PARAM  opt.id      MAN {string}  UI id
      # @PARAM  opt.time    MAN {date}    countdown end
      # @PARAM  opt.styl    OPT {json}    styles
      # @PARAM  opt.target  MAN {node}    target node


        init: (opt) ->
          opt = opt or {}
          id = opt.id
          time = opt.time
          styl = opt.styl
          $t = opt.target

          # MANDATORY id, target & items
          if !id or !time or typeof time isnt "date" or !$t then return

          # MARKUP countdown
          $ui = ui.$tpl.cloneNode()
          $ui.id = id
          int = +time - +new Date()
          if styl then twoDollars.css $ui, styl

          # DISPLAY countdown
          setInterval ui.update, 1000

          # APPEND UI to target
          $t.appendChild $ui

          return
    )
  )()
