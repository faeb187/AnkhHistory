"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = void 0;

var _core = require("../core");

// UI list
var list = function () {
  var init, ui; // hammer = require "hammerjs"

  ui = {
    // @DESC   returns nesting level count of the list
    // @PARAM  MAN rootItms {json[]} root list items
    getLevelCount: function getLevelCount(rootItms) {
      var _countLevel, levelCount;

      levelCount = 0;

      _countLevel = function countLevel(itms) {
        return itms.some(function (itm) {
          if (itm.items) {
            _countLevel(itm.items);
          }

          return levelCount++;
        });
      };

      _countLevel(rootItms);

      return levelCount;
    },
    updateRootUlActive: function updateRootUlActive($act) {
      var _climbUp;

      _climbUp = function climbUp($elm) {
        if ($elm.tagName === "UL") {
          _core.$$.addClass($elm, "active");
        }

        if (_core.$$.hasClass(_core.$$.parent($elm), ".ui-list")) {
          return;
        }

        return _climbUp(_core.$$.parent($elm));
      };

      return _climbUp(_core.$$.parent($act));
    },
    // @DESC   updates parent active a elements
    // @PARAM  $act  MAN {HTMLElement} most nested active a
    updateParentActive: function updateParentActive($act) {
      var $parentAct, $parentLi;
      $parentLi = _core.$$.parent(_core.$$.parent($act), "li");

      if (!$parentLi) {
        return;
      }

      $parentAct = (0, _core.$$)("a", $parentLi);
      return _core.$$.addClass($parentAct, "active");
    },
    // @DESC   updates active list items
    // @PARAM  routingMap  {Map}         map (path > id)
    // @PARAM  $ui         {HTMLElement} root list
    updateActive: function updateActive(routingMap, $ui) {
      var $act, actSel, pth;
      pth = location.pathname;
      actSel = "#".concat($ui.id, "_").concat(routingMap.get(pth));
      $act = (0, _core.$$)(actSel, $ui);

      _core.$$.addClass($act, "active");

      if (pth.split("/").length > 1) {
        ui.updateParentActive($act);
      }

      return ui.updateRootUlActive($act);
    },
    // @DESC   creates routing/id map
    // @PARAM  MAN {itms} list items
    createRoutingMap: function createRoutingMap(itms) {
      var _handleSubs, routingMap;

      routingMap = new Map();

      _handleSubs = function handleSubs(subItms) {
        return subItms.map(function (subItm) {
          routingMap.set(subItm.path, subItm.id);

          if (subItm.items) {
            return _handleSubs(subItm.items);
          }
        });
      };

      itms.map(function (itm) {
        routingMap.set(itm.path, itm.id);

        if (itm.items) {
          return _handleSubs(itm.items);
        }
      });
      return routingMap;
    },
    // @DESC   adds list item to list
    // @PARAM  itm                   MAN {json}    list item
    // @PARAM  itm.lang              MAN {string}  lang ref (text or img alt)
    // @PARAM  itm.path              MAN {string}  href
    // @PARAM  itm.type              OPT {string}  adds data-[ type ] = true
    // @PARAM  itm.src               OPT {string}  image src attribute
    // @PARAM  itm.icon              OPT {string}  icon class name
    // @PARAM  itm.events            OPT {json}    custom events
    // @PARAM  itm.events.click      OPT {[json]}  list of 'click' events
    // @PARAM  itm.itms              OPT {todo}    sub items
    // @PARAM  $ul                   MAN {node}    list parent ul (li target)
    // @TODO   only <a> when click event
    addListItem: function addListItem(itm, $ul, uiId) {
      var $itm, $li, $subUl, evs, href, icon, id, lang, src, subItms, type;
      id = itm.id;
      evs = itm.events;
      lang = itm.lang;
      src = itm.src;
      icon = itm.icon;
      href = itm.path;
      type = itm.type;
      subItms = itm.items;

      if (!id || !lang) {
        return;
      }

      $li = (0, _core.$$)("<li/>");

      if (src) {
        $itm = (0, _core.$$)("<img/>", {
          src: src
        });
      } else {
        $itm = (0, _core.$$)("<a/>", {
          id: "".concat($ul.rootId, "_").concat(id)
        });
      }

      if (href) {
        $itm.setAttribute("href", href);
      }

      if (type) {
        $itm.setAttribute("data-" + type, true);
      }

      if (icon) {
        $itm.appendChild((0, _core.$$)("<i/>", {
          "class": icon
        }));
      }

      $itm.setAttribute("data-lang", lang);

      if (evs) {
        $itm.events = evs;

        if (evs.click) {
          $itm.onclick = function () {
            return evs.click.forEach(function (eventName) {
              return _core.obs.f("_ankh-ui-fire", {
                name: eventName,
                target: uiId
              });
            });
          };
        }
      } // hand      = hammer $itm
      // hand.add  new hammer.Tap
      // hand.on   'tap', ui.evs.click


      if (subItms) {
        $subUl = (0, _core.$$)("<ul/>");
        $subUl.rootId = $ul.rootId;
        subItms.forEach(function (subItm) {
          if (evs) {
            subItm.events = evs;
          }

          return ui.addListItem(subItm, $subUl, uiId);
        });
        $li.appendChild($subUl);
      }

      $li.prepend($itm);
      return $ul.appendChild($li);
    },
    evs: {
      // @DESC   fire custom 'click' events
      // @PARAM  e   MAN {Event} 'click' event
      // @RETURN {void}
      click: function click(e) {
        var $elm, ev, evs, i, len, ref;
        e.preventDefault();
        $elm = e.target;

        if ($elm.tagName === "I") {
          $elm = _core.$$.parent($elm);
        }

        evs = (ref = $elm.events) != null ? ref.click : void 0;

        if (!evs || !evs.length) {
          return;
        }

        for (i = 0, len = evs.length; i < len; i++) {
          ev = evs[i];

          _core.obs.f(ev.ev, ev.arg || e);
        }
      }
    }
  }; // @DESC   inits a new list
  // @PARAM  opt.events        OPT {json}      events
  // @PARAM  opt.id            MAN {string}    UI id
  // @PARAM  opt.items         MAN {[json]}    array containing list items
  // @PARAM  opt.target        MAN {node}      target node

  init = function init(opt) {
    var $t, $ui, $ul, events, fx, id, items, levelCount, m, role, routingMap;
    events = opt.events;
    m = opt.media;
    id = opt.id;
    items = opt.items;
    fx = opt.fx;
    role = opt.role;
    $t = opt.target;

    if (!id || !(items != null ? items.length : void 0) || !$t) {
      return;
    }

    if (m && !_core.media.isInViewport(m)) {
      _core.obs.f("_ankh-ui-not-loaded", opt);

      return;
    }

    $ul = (0, _core.$$)("<ul/>");

    if (role === "navigation") {
      $ui = (0, _core.$$)("<nav/>", {
        role: "navigation"
      });
      $ui.appendChild($ul);
    } else {
      $ui = $ul;
    }

    $ui.id = id;
    $ui.className = "ui-list";
    $ul.rootId = id;
    levelCount = ui.getLevelCount(items);
    routingMap = ui.createRoutingMap(items);
    items.map(function (item) {
      item.events = item.events || events;
      return ui.addListItem(item, $ul, id);
    });
    ui.updateActive(routingMap, $ui);
    $t.appendChild($ui);

    _core.obs.f("_ankh-ui-loaded", opt);

    _core.obs.f("ankh-ui-ready", "ui-list#".concat(id));
  };

  _core.obs.l("_helper-site-load", ui.evs.click);

  _core.obs.l("_ui-list-init", init);
}();

exports.list = list;