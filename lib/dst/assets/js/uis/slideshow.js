/*
  @UI     SLIDESHOW
  @AUTHOR faeb187
*/
module.exports = (function() {
  var $$, $ui, ui;
  
  // @REQUIRE local modules
  $$ = require('../helpers/dom');
  
  // @DEFINE $ui {node}  UI node
  $ui = null;
  // @DEFINE ui  {json}  UI variables/methods
  // @PRIVATE
  ui = {
    // @DEFINE $tpl  {node}  UI template
    $tpl: $$('<section/>', {
      'class': 'ui-slideshow'
    }),
    // @DESC   appends image to slideshow
    // @PARAM  img     MAN {json}  image
    // @PARAM  $ul     MAN {node}  image target
    addImage: function(img, $ul) {
      var $img, $li, alt, src, title, txt;
      // DEFINE variables
      img = img || {};
      src = img.src;
      alt = img.alt;
      title = img.title;
      txt = img.text;
      if (!src || !alt || !$ul) {
        return;
      }
      // APPEND image to slider
      $li = $$('<li/>');
      $img = $$('<img/>', {
        src: src,
        'data-href': alt
      });
      // APPEND title / text
      if (title) {
        $li.append($$('<h1/>', {
          'data-lang': title
        }));
      }
      if (txt) {
        $li.append($$('<p/>', {
          'data-lang': txt
        }));
      }
      $li.appendChild($img);
      $ul.appendChild($li);
    },
    // @DESC   handle nav toggle (open/close slide)
    // @PARAM  int   OPT {number}  interval of slides
    // @PARAM  $ul   MAN {node}    image target node
    slide: function(int, $ul) {
      var itmC, maxL, pos;
      
      // DEFINE variables
      itmC = $$('li', $ul).length;
      maxL = itmC * -100;
      pos = 0;
      
      // START slide interval
      setInterval(function() {
        // GET next position
        pos -= 100;
        // LAST image
        if (pos === maxL) {
          pos = 0;
        }
        // SLIDE to next image
        return $$.css($ul, {
          marginLeft: pos + 'vw'
        });
      }, int);
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
    init: function(opt) {
      var $t, $ul, i, id, int, itm, itms, len;
      opt = opt || {};
      id = opt.id;
      itms = opt.items;
      $t = opt.target;
      int = opt.interval || 8000;
      if (!id || !itms || !$t) {
        return;
      }
      // MARKUP slideshow
      $ui = ui.$tpl.cloneNode();
      $ui.id = id;
      $ul = $$('<ul/>');
      for (i = 0, len = itms.length; i < len; i++) {
        itm = itms[i];
        // APPEND images to slideshow
        ui.addImage(itm, $ul);
      }
      // APPEND UI to target
      $ui.appendChild($ul);
      $t.appendChild($ui);
      // SLIDE images
      ui.slide(int, $ul);
    }
  };
})();
