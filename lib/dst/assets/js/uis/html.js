/*
  UI HTML
  @AUTHOR faeb187
*/
module.exports = (function() {
  var $$, supported;
  // @REQUIRE local modules
  // @PRIVATE
  $$ = require('../helpers/dom');
  
  // @DEFINE supported {[string]} list of supported tagNames
  // @PRIVATE
  supported = ['header', 'main', 'footer', 'section', 'img', 'small', 'h1', 'h2', 'h3'];
  return {
    
    // @DESC   builds new html node
    // @PARAM  opt.id      MAN {string}  ui id
    // @PARAM  opt.target  MAN {node}    target node
    // @RETURN {node}  ui
    // @PUBLIC
    init: function(opt) {
      var $t, $ui, alt, cn, id, name, src, txt;
      // DEFINE variables
      opt = opt || {};
      id = opt.id;
      cn = opt.className;
      name = opt.name;
      src = opt.src;
      alt = opt.alt;
      txt = opt.text;
      $t = opt.target;
      if (!id || !name || !$t) {
        return;
      }
      // CHECK support of tagName
      // DEF   div
      if (supported.indexOf(name) === -1) {
        name = 'div';
      }
      
      // CREATE node
      $ui = $$('<' + name + '/>');
      $ui.id = id;
      // IMAGE
      if (src && alt) {
        $ui.setAttribute('src', src);
        $ui.setAttribute('data-lang', alt);
      // TEXT
      } else if (txt) {
        $ui.setAttribute('data-lang', txt);
      }
      // CLASSES
      if (cn) {
        $ui.className = cn;
      }
      // APPEND UI to target
      $t.appendChild($ui);
      // RETURN UI
      return $ui;
    }
  };
})();
