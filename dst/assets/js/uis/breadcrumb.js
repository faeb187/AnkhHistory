"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.breadcrumb = void 0;

var _core = require("../core");

// UI breadcrumb
var breadcrumb = function () {
  var init, ui;
  ui = {
    // @DESC   updates a breadcrumb
    // @PARAM  active    OPT {number}      active item
    // @PARAM  $target   MAN {HTMLElement} breadcrumb reference
    update: function update(options) {
      var $active, $items, $target, active;
      var _options$active = options.active;
      active = _options$active === void 0 ? 0 : _options$active;
      $target = options.$target;
      $items = (0, _core.$$)("a", $target);
      $active = (0, _core.$$)(".active", $target);

      if ($active) {
        _core.$$.removeClass($active, "active");
      }

      _core.$$.addClass($items[active], "active");
    },
    // @DESC   returns a breadcrumb item
    // @PARAM  lang    OPT {string} lang reference of innerText
    getItem: function getItem(item) {
      var $item, lang;
      lang = item.lang;
      $item = (0, _core.$$)("<a/>");

      if (lang) {
        $item.setAttribute("data-lang", lang);
      }

      return $item;
    }
  }; // @DESC   inits a new breadcrumb
  // @PARAM  active    OPT {number}      index of active item (default: 0)
  // @PARAM  id        MAN {string}      ui id
  // @PARAM  items     MAN {json[]}      breadcrumb items
  // @PARAM  numbered  OPT {boolean}     items are numbered
  // @PARAM  readonly  OPT {boolean}     no click events
  // @PARAM  target    MAN {HTMLElement} target node

  init = function init(options) {
    var $t, $ui, active, events, id, items, m, numbered, readonly, updateEvent;
    var _options$active2 = options.active;
    active = _options$active2 === void 0 ? 0 : _options$active2;
    id = options.id;
    items = options.items;
    events = options.events;
    m = options.media;
    numbered = options.numbered;
    readonly = options.readonly;
    $t = options.target;

    if (!id || !(items != null ? items.length : void 0) || !$t) {
      return;
    }

    if (m && !_core.media.isInViewport(m)) {
      return _core.obs.f("_ankh-ui-not-loaded", options);
    }

    $ui = (0, _core.$$)("<nav/>", {
      id: id,
      "class": "ui-breadcrumb"
    });

    if (numbered) {
      _core.$$.addClass($ui, "numbered");
    }

    if (readonly) {
      _core.$$.addClass($ui, "readonly");
    }

    items.forEach(function (item) {
      return $ui.appendChild(ui.getItem(item));
    });
    $t.appendChild($ui);
    updateEvent = {
      name: "ui-breadcrumb-update",
      target: id
    };

    if (!events) {
      options.events = {};
    }

    events.ui = [updateEvent];

    _core.obs.l("_ankh-ready", function () {
      return _core.obs.f("_ankh-ui-fire", updateEvent);
    });

    _core.obs.f("_ankh-ui-loaded", options);

    _core.obs.f("ankh-ui-ready", "ui-breadcrumb#".concat(id));
  };

  _core.obs.l("ui-breadcrumb-update", function (options) {
    return options.events.ui.forEach(function (uiEvent) {
      return ui.update(uiEvent);
    });
  });

  _core.obs.l("_ui-breadcrumb-init", init);
}();

exports.breadcrumb = breadcrumb;