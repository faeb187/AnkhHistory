import { twoDollars as $$ } from "twodollars";
import type { AnkhUiMapOptions } from "types/ui.type";

export const map = (() => {
  return {
    init: (options: AnkhUiMapOptions) => {
      const {
        center,
        height = 300,
        id,
        markers,
        width = 300,
        zoom = 13,
      } = options;
      const c = center ? `center=${center.replace(/ /g, "%20")}&` : "?";
      const $ui = $$.create("<section/>", { id, class: "ui-map" });
      const $map = $$.create("<div/>", { class: "map" });

      let z = zoom;
      if (z < 0) z = 0;
      else if (z > 22) z = 22;

      /*
          const initMap = () => {
            new google.maps.Map(options.target, {
              center: options.center,
              scrollwheel: false,
              zoom: 8
            });
            */
      // const url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCgbKN00AITyqutT6eyYM_Gf0F55r4JDLU&callback=initMap"

      /*
          const getScript = (source, callback) => {
            const script = $$.create("<script/>", {async: 1});
            const prior = $$.create("script")[0];
            prior.parentNode.insertBefore(script, prior);

            script.onload = script.onreadystatechange = (_, isAbort) => {
              if (isAbort || !script.readyState ||
                /loaded|complete/.test(script.readyState)
              ){
                script.onload = script.onreadystatechange = null;
                script = undefined

                if(!isAbort && callback) callback();
              }
            };
          };
          getScript(url, ()=> console.log("loaded"));
          */

      let mrks = "";
      markers &&
        markers.forEach((marker) => {
          // MANDATORY marker location
          if (!marker.location) return;

          let m = "&markers=";

          // SET marker style...
          if (marker.size) {
            m += `size:${marker.size}`;
            marker.color && (m += `%7Ccolor:0x${marker.color}`);
            marker.shadow && (m += "%7Cshadow:true");
          }
          //...OR custom marker icon...
          else if (marker.icon) {
            m += `icon:${marker.icon}`;
            marker.shadow && (m += "%7Cshadow:true");
          }
          // ...OR default marker style
          else m += "size:small%7Cshadow:true";

          // ADD marker location
          m += `%7C${marker.location.replace(/ /g, "%20")}`;

          mrks += m;
        });

      const $img = new Image();
      const url = "https://maps.googleapis.com/maps/api/staticmap";
      const src = `${url}${c}zoom=${z}&size=${width}x${height}${mrks}&sensor=false`;
      $img.src = src;

      $map.appendChild($img);
      $ui.appendChild($map);

      // ZOOM by scrolling
      /*
          mouseOver = (e) ->
            $map.addEventListener( "mousewheel", mouseWheel);
            $map.addEventListener("mouseout", mouseOut);

          mouseOut = (e) ->
            twoDollars.destroy $map, "mousewheel", mouseWheel
            twoDollars.destroy $map, "mouseout", mouseOut

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

          */
      // $$.listen($map, "mouseover", mouseOver);
      return $ui;
    },
  };
})();
