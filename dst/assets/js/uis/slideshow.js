"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slideshow = void 0;

var _core = require("../core");

// UI slideshow
var slideshow = function () {
  var $ui, ui;
  $ui = null;
  ui = {
    $tpl: (0, _core.$$)("<section/>", {
      "class": "ui-slideshow"
    }),
    // @DESC   appends image to slideshow
    // @PARAM  img     MAN {json}  image
    // @PARAM  $ul     MAN {node}  image target
    addImage: function addImage(img, $ul) {
      var $img, $li, alt, src, title, txt; // DEFINE variables

      img = img || {};
      src = img.src;
      alt = img.alt;
      title = img.title;
      txt = img.text;

      if (!src || !alt || !$ul) {
        return;
      } // APPEND image to slider


      $li = (0, _core.$$)("<li/>");
      $img = (0, _core.$$)("<img/>", {
        src: src,
        "data-href": alt
      }); // APPEND title / text

      if (title) {
        $li.append((0, _core.$$)("<h1/>", {
          "data-lang": title
        }));
      }

      if (txt) {
        $li.append((0, _core.$$)("<p/>", {
          "data-lang": txt
        }));
      }

      $li.appendChild($img);
      $ul.appendChild($li);
    },
    // @DESC   handle nav toggle (open/close slide)
    // @PARAM  int   OPT {number}  interval of slides
    // @PARAM  $ul   MAN {node}    image target node
    slide: function slide(_int, $ul) {
      var itmC, maxL, pos; // DEFINE variables

      itmC = (0, _core.$$)("li", $ul).length;
      maxL = itmC * -100;
      pos = 0; // START slide interval

      setInterval(function () {
        // GET next position
        pos -= 100; // LAST image

        if (pos === maxL) {
          pos = 0;
        } // SLIDE to next image


        return _core.$$.css($ul, {
          marginLeft: pos + "vw"
        });
      }, _int);
    }
  };
  return {
    // @DESC   build new slideshow
    // @PARAM  opt.id              MAN {string}  UI id
    // @PARAM  opt.items           MAN {array}   images
    // @PARAM  opt.items.$.src     MAN {string}  image path
    // @PARAM  opt.items.$.active  OPT {boolean} default image
    // @PARAM  opt.items.$.title   OPT {string}  lang ref
    // @PARAM  opt.items.$.text    OPT {string}  lang ref
    // @PARAM  opt.interval        OPT {number}  interval in ms
    // @PARAM  opt.target          MAN {node}    target node
    init: function init(opt) {
      var $t, $ul, i, id, _int2, itm, itms, len;

      opt = opt || {};
      id = opt.id;
      itms = opt.items;
      $t = opt.target;
      _int2 = opt.interval || 8000;

      if (!id || !itms || !$t) {
        return;
      } // MARKUP slideshow


      $ui = ui.$tpl.cloneNode();
      $ui.id = id;
      $ul = (0, _core.$$)("<ul/>");

      for (i = 0, len = itms.length; i < len; i++) {
        itm = itms[i]; // APPEND images to slideshow

        ui.addImage(itm, $ul);
      } // APPEND UI to target


      $ui.appendChild($ul);
      $t.appendChild($ui); // SLIDE images

      ui.slide(_int2, $ul);
    }
  };
}();

exports.slideshow = slideshow;