"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nav = void 0;

var _core = require("../core");

// UI nav
var nav = function () {
  var init; // @PARAM  events  OPT {json}    event configs
  // @PARAM  id      MAN {string}  UI id
  // @PARAM  items   OPT {array}   menu items
  // @PARAM  media   OPT {json}    viewport config
  // @PARAM  target  MAN {node}    target node
  // @PARAM  type    OPT {string}  only 'sitemap' atm

  init = function init(opt) {
    var $t, $ui, events, id, items, m, type;
    id = opt.id;
    var _opt$events = opt.events;
    events = _opt$events === void 0 ? {} : _opt$events;
    m = opt.media;
    var _opt$items = opt.items;
    items = _opt$items === void 0 ? [] : _opt$items;
    $t = opt.target;
    type = opt.type;

    if (!id || !$t) {
      return;
    }

    $ui = (0, _core.$$)("<nav/>", {
      id: id,
      "class": "ui-nav",
      role: "navigation"
    });

    _core.obs.f("_ui-list-init", {
      events: events,
      id: id,
      items: items,
      target: $ui
    });

    $t.appendChild($ui);
  }; // obs.f "_ankh-ui-loaded", opt
  // obs.f 'ankh-ui-ready' is fired in the list


  _core.obs.l("_ui-nav-init", init);

  _core.$$.listen(window, "popstate", function (e) {
    return e.preventDefault();
  });
}();

exports.nav = nav;