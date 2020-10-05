/*
  UI MAP
  @AUTHOR faeb187
*/
module.exports = (function() {
  var $$;
  
  // @REQUIRE local modules
  $$ = require('../helpers/dom');
  return {
    // @DESC   build new map
    // @PARAM  opt.id                  MAN {string}  UI id
    // @PARAM  opt.center              MAN {string}  map center location
    // @PARAM  opt.width               OPT {integer} map width in px
    // @PARAM  opt.height              OPT {integer} map height in px
    // @PARAM  opt.zoom                OPT {integer} zoom level (0-22)
    // @PARAM  opt.markers             OPT {array}   map marker
    // @PARAM  opt.markers.$.location  MAN {string}  location of marker
    // @PARAM  opt.markers.$.size      OPT {string}  marker size (tiny|small|mid|large)
    // @PARAM  opt.markers.$.color     OPT {string}  marker color in hex (e.g. 'ff0000')
    // @PARAM  opt.markers.$.icon      OPT {string}  path to custom marker icon
    // @PARAM  opt.markers.$.shadow    OPT {boolean} marker gets a shadow
    // @PARAM  opt.target              MAN {string}  target node
    // @RETURN {void}
    // @PUBLIC
    init: function(opt) {
      var $img, $map, $t, $ui, center, getScript, h, i, id, initMap, len, m, markers, mouseOut, mouseOver, mouseWheel, mrk, ref, src, url, w, z;
      console.log('init');
      initMap = function() {
        console.log('initting');
        return new google.maps.Map(opt.target, {
          center: opt.center,
          scrollwheel: false,
          zoom: 8
        });
      };
      url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCgbKN00AITyqutT6eyYM_Gf0F55r4JDLU&callback=initMap';
      getScript = function(source, callback) {
        var prior, script;
        script = $$('<script/>', {
          async: 1
        });
        prior = $$('script')[0];
        prior.parentNode.insertBefore(script, prior);
        return script.onload = script.onreadystatechange = function(_, isAbort) {
          if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            script = void 0;
            if (!isAbort && callback) {
              callback();
            }
          }
        };
      };
      console.log('loading');
      getScript(url, function() {
        return console.log('loaded');
      });
      return;
      // DEFINE variables
      opt = opt || {};
      id = opt.id;
      center = opt.center.replace(/ /g, '%20');
      $t = opt.target;
      if (!id || !center || !$t) {
        return;
      }
      // OPTIONAL PARAMs
      w = opt.width || 300;
      h = opt.height || 300;
      z = opt.zoom || 13;
      z = z < 0 ? 0 : z > 22 ? 22 : z;
      markers = '';
      // MARKUP UI
      $ui = $$('<div/>', {
        'class': 'ui-map'
      });
      $map = $$('<div/>', {
        'class': 'map'
      });
      // ADD markers
      if (opt.markers) {
        ref = opt.markers;
        for (i = 0, len = ref.length; i < len; i++) {
          mrk = ref[i];
          if (!mrk.location) {
            continue;
          }
          m = '&markers=';
          
          // SET marker style...
          if (mrk.size) {
            m += 'size:' + mrk.size;
            if (mrk.color) {
              m += '%7Ccolor:0x' + mrk.color;
            }
            if (mrk.shadow) {
              m += '%7Cshadow:true';
            }
          // ...OR custom marker icon...
          } else if (mrk.icon) {
            m += 'icon:' + mrk.icon;
            if (mrk.shadow) {
              m += '%7Cshadow:true';
            }
          } else {
            // ...OR default marker style
            m += 'size:small%7Cshadow:true';
          }
          // ADD marker location
          markers += m + '%7C' + mrk.location.replace(/ /g, '%20');
        }
      }
      
      // CREATE map
      $img = new Image();
      url = 'https://maps.googleapis.com/maps/api/staticmap?center=';
      src = url + center + '&zoom=' + z + '&size=' + w + 'x' + h + markers + '&sensor=false';
      $img.src = src;
      // APPEND UI to DOM target
      $map.appendChild($img);
      $ui.appendChild($map);
      $t.appendChild($ui);
      // ZOOM by scrolling
      mouseOver = function(e) {
        $$.listen($map, 'mousewheel', mouseWheel);
        return $$.listen($map, 'mouseout', mouseOut);
      };
      mouseOut = function(e) {
        $$.destroy($map, 'mousewheel', mouseWheel);
        return $$.destroy($map, 'mouseout', mouseOut);
      };
      mouseWheel = function(e) {
        e.preventDefault();
        
        // new zoome level
        z = z - e.deltaY / 100;
        
        // farest zoom factor
        if (z < 0) {
          z = 0;
          return;
        // nearest zoom factor
        } else if (z > 22) {
          z = 22;
          return;
        }
        // REFRESH map with new zoom value
        return $img.src = url + center + '&zoom=' + z + '&size=' + w + 'x' + h + markers + '&sensor=false';
      };
      $$.listen($map, 'mouseover', mouseOver);
    }
  };
})();
