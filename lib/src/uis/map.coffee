#
# UI map
#
import { $$ } from "../core"

export map =
  (->
    # @REQUIRE local modules
    return (
      # @DESC   build new map
      # @PARAM  opt.id                  MAN {string}  UI id
      # @PARAM  opt.center              MAN {string}  map center location
      # @PARAM  opt.width               OPT {integer} map width in px
      # @PARAM  opt.height              OPT {integer} map height in px
      # @PARAM  opt.zoom                OPT {integer} zoom level (0-22)
      # @PARAM  opt.markers             OPT {array}   map marker
      # @PARAM  opt.markers.$.location  MAN {string}  location of marker
      # @PARAM  opt.markers.$.size      OPT {string}  marker size (tiny|small|mid|large)
      # @PARAM  opt.markers.$.color     OPT {string}  marker color in hex (e.g. 'ff0000')
      # @PARAM  opt.markers.$.icon      OPT {string}  path to custom marker icon
      # @PARAM  opt.markers.$.shadow    OPT {boolean} marker gets a shadow
      # @PARAM  opt.target              MAN {string}  target node
      # @RETURN {void}
      # @PUBLIC


        init: (opt) ->
          initMap = ->
            new google.maps.Map opt.target,
              center: opt.center
              scrollwheel: false
              zoom: 8

          url =
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyCgbKN00AITyqutT6eyYM_Gf0F55r4JDLU&callback=initMap"

          getScript = (source, callback) ->
            script = $$ "<script/>", async: 1
            prior = $$("script")[0]
            prior.parentNode.insertBefore script, prior

            script.onload = script.onreadystatechange = (_, isAbort) ->
              if (
                isAbort or
                !script.readyState or
                /loaded|complete/.test script.readyState
              )
                script.onload = script.onreadystatechange = null
                script = undefined
                if !isAbort and callback then callback()
              return

          getScript url, -> console.log "loaded"
          return

          # DEFINE variables
          opt = opt or {}
          id = opt.id
          center = opt.center.replace ///\ ///g, "%20"
          $t = opt.target

          # MANDATORY id, location & target
          if !id or !center or !$t then return

          # OPTIONAL PARAMs
          w = opt.width or 300
          h = opt.height or 300
          z = opt.zoom or 13
          z = if z < 0 then 0 else if z > 22 then 22 else z
          markers = ""

          # MARKUP UI
          $ui = $$ "<div/>", class: "ui-map"
          $map = $$ "<div/>", class: "map"

          # ADD markers
          if opt.markers
            for mrk in opt.markers
              # MANDATORY marker location
              if !mrk.location then continue

              m = "&markers="

              # SET marker style...
              if mrk.size
                m += "size:" + mrk.size
                if mrk.color then m += "%7Ccolor:0x" + mrk.color
                if mrk.shadow then m += "%7Cshadow:true"
              # ...OR custom marker icon...
              else if mrk.icon
                m += "icon:" + mrk.icon
                if mrk.shadow then m += "%7Cshadow:true"
              # ...OR default marker style
              else
                m += "size:small%7Cshadow:true"

              # ADD marker location
              markers += m + "%7C" + mrk.location.replace ///\ ///g, "%20"

              # CREATE map
          $img = new Image()
          url = "https://maps.googleapis.com/maps/api/staticmap?center="
          src =
            url +
            center +
            "&zoom=" +
            z +
            "&size=" +
            w +
            "x" +
            h +
            markers +
            "&sensor=false"
          $img.src = src

          # APPEND UI to DOM target
          $map.appendChild $img
          $ui.appendChild $map
          $t.appendChild $ui

          # ZOOM by scrolling
          mouseOver = (e) ->
            $$.listen $map, "mousewheel", mouseWheel
            $$.listen $map, "mouseout", mouseOut

          mouseOut = (e) ->
            $$.destroy $map, "mousewheel", mouseWheel
            $$.destroy $map, "mouseout", mouseOut

          mouseWheel = (e) ->
            e.preventDefault()

            # new zoome level
            z = z - e.deltaY / 100

            # farest zoom factor
            if z < 0
              z = 0
              return
            # nearest zoom factor
            else if z > 22
              z = 22
              return

            # REFRESH map with new zoom value
            $img.src =
              url +
              center +
              "&zoom=" +
              z +
              "&size=" +
              w +
              "x" +
              h +
              markers +
              "&sensor=false"

          $$.listen $map, "mouseover", mouseOver

          return
    )
  )()
