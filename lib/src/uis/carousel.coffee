#
# UI carousel
#
import { $$ } from "../helpers/dom"
import { obs } from "../helpers/obs"

module.exports =
  (->
    # @DESC   build new carousel
    # @PARAM  opt.id        MAN {string}  UI id
    # @PARAM  opt.data      MAN {json[]}  carousel contents
    # @PARAM  opt.target    MAN {string}  target node
    init = (opt) ->
      { id, data, target: $t } = opt

      if !id or !data?.length or !$t then return

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
      $t.appendChild $ui

      obs.f "ankh-ui-ready", "ui-carousel##{id}"
      return

    obs.l "_ui-carousel-init", init
    return
  )()
