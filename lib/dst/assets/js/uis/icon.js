/*
  UI icon (ion-icon)
  @AUTHOR faeb187
*/
module.exports = (function() {
  var $$;
  // @REQUIRE local modules
  // @PRIVATE
  $$ = require('../helpers/dom');
  return {
    
    // @DESC   displays icon
    // @PARAM  opt.id      MAN {string}  ui id
    // @PARAM  opt.icon    MAN {string}  ion icon name
    // @PARAM  opt.target  MAN {node}    target node
    // @RETURN {node}  ui

    // @PUBLIC
    init: function(opt) {
      var $t, $ui, icon, id, name;
      // DEFINE variables
      opt = opt || {};
      id = opt.id;
      name = opt.name;
      icon = opt.icon;
      $t = opt.target;
      if (!id || !name || !$t) {
        return;
      }
      // CREATE node
      $ui = $$('<ion-icon/>', {
        id: id,
        name: icon
      });
      // APPEND UI to target
      $t.appendChild($ui);
      // RETURN UI
      return $ui;
    }
  };
})();
