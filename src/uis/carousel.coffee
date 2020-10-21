#
# UI carousel
#
import { $$, obs } from "../core"

export carousel =
  (->
    # @DESC   build new carousel
    # @PARAM  opt.id        MAN {string}      ui id
    # @PARAM  opt.data      MAN {json[]}      carousel contents
    # @PARAM  $target       MAN {HTMLElement} target node
    init: (options) ->
      { id, data, $target } = options

      if !id or !data?.length or !$target then return

      $ui = $$ "<section/>", id: id, class: "ui-carousel"
      $carousel = $$ "<div/>"

      len = data.length
      deg = 0
      ratio = 360 / len
      z = Math.round(210 / 2) / Math.tan Math.PI / len

      data.forEach (dta) ->
        trf = "transform:rotateY(" + deg + "deg) translateZ(" + z + "px)"
        deg += ratio

        $cnt = $$ "<div/>", class: "ui-carousel-item", style: trf

        Object.keys(dta).forEach (key) ->
          $p = $$ "<p/>", innerText: dta[key]
          $cnt.appendChild $$ "<h4/>", "data-lang": key
          $cnt.appendChild $p

        $carousel.appendChild $cnt

      $ui.appendChild $carousel
      $ui
  )()
