"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.site = void 0;

var _dom = require("./dom");

var _obs = require("./obs");

var _media = require("./media");

var _routes = require("../apps/dbp/conf/routes");

var _processOpenProduct = require("../apps/dbp/sites/processOpenProduct");

var _careOverview = require("../apps/dbp/sites/careOverview");

var _partnerOverview = require("../apps/dbp/sites/partnerOverview");

var _partnerProducts = require("../apps/dbp/sites/partnerProducts");

var _partnerProductsAdditional = require("../apps/dbp/sites/partnerProductsAdditional");

var _reportsOverview = require("../apps/dbp/sites/reportsOverview");

// HELPER site
_dom.$$.listen(window, "popstate", function (e) {
  return e.preventDefault();
});

var site = function () {
  var $ankh, $b, Site, d, getCurrentSite, getDefaultSite, getSiteName, getUiCount, getUisFlattened, handleReady, _load, render;

  d = document;
  $b = (0, _dom.$$)("body");
  $ankh = (0, _dom.$$)("#ankh", $b);
  Site = {
    careOverview: _careOverview.careOverview,
    partnerOverview: _partnerOverview.partnerOverview,
    partnerProducts: _partnerProducts.partnerProducts,
    partnerProductsAdditional: _partnerProductsAdditional.partnerProductsAdditional,
    processOpenProduct: _processOpenProduct.processOpenProduct,
    reportsOverview: _reportsOverview.reportsOverview
  };

  getUisFlattened = function getUisFlattened(uis) {
    var f, _r;

    f = [];

    _r = function r(u) {
      return u.map(function (ui) {
        return f.push(ui) && ui.ids && _r(ui.ids);
      });
    };

    _r(uis);

    return f;
  };

  getUiCount = function getUiCount(uis) {
    var c, _r2;

    c = 0;

    _r2 = function r(subUis) {
      return subUis.map(function (subUi, idx) {
        if (subUi.media && !_media.media.isInViewport(subUi.media)) {
          return;
        }

        ++c;

        if (subUi.ids && subUi.ids.length) {
          return _r2(subUi.ids);
        }
      });
    };

    _r2(uis);

    return c;
  };

  render = function render($root) {
    (0, _dom.$$)(".ui-progress", $b).setAttribute("data-fx", "out");
    $ankh.replaceWith($root);
    setTimeout(function () {
      return _obs.obs.f("_ankh-ready");
    });
  };

  handleReady = function handleReady(uis, $root) {
    var c, r;
    r = 0;
    c = getUiCount(uis);

    _obs.obs.r("ankh-ui-ready");

    return _obs.obs.l("ankh-ui-ready", function (ui) {
      ++r;

      if (r === c) {
        return render($root);
      }
    });
  };

  getCurrentSite = function getCurrentSite(itm) {
    var _getFirstSubId;

    exports.site = site = {
      id: itm.id,
      path: itm.path
    };

    _getFirstSubId = function getFirstSubId(subItms) {
      var subItm;
      subItm = subItms[0];

      if (subItm.items) {
        return _getFirstSubId(subItm.items);
      } else {
        site.id = subItm.id;
        return site.path = subItm.path;
      }
    };

    if (itm.items) {
      _getFirstSubId(itm.items);
    }

    site.name = site.id.split("site-")[1];
    return site;
  }; //- site name by path
  //<! itms {json[]} items
  //<! path {string} site path


  getSiteName = function getSiteName(itms, path) {
    var _handleSubs;

    exports.site = site = {};

    _handleSubs = function handleSubs(subItms) {
      return subItms.some(function (subItm) {
        if (subItm.path === path) {
          return exports.site = site = getCurrentSite(subItm);
        } else if (subItm.items) {
          return _handleSubs(subItm.items);
        }
      });
    };

    _handleSubs(itms);

    return site;
  }; //-  returns default site on 404
  //<! itms  {json[]} nav items


  getDefaultSite = function getDefaultSite(itms) {
    return getSiteName(itms, itms[0].path);
  }; //- loads site
  //<! path {string} path of site


  _load = function load(path) {
    var $root, i, len, ui, uis;
    $root = (0, _dom.$$)("<div/>", {
      id: "ankh"
    }); // load deepest level of clicked nav item

    exports.site = site = getSiteName(_routes.routes, path);

    if (!site.name) {
      exports.site = site = getDefaultSite(_routes.routes);
    }

    if (site.path !== path) {
      return _load(site.path);
    }

    _dom.$$.history.go(site.name, site.path);

    $b.setAttribute("data-site", site.name);
    uis = (Site[site.name] || {}).ids;

    if (!uis) {
      return;
    }

    handleReady(uis, $root);

    for (i = 0, len = uis.length; i < len; i++) {
      ui = uis[i];
      ui.target = $root;

      _obs.obs.f("_ui-".concat(ui.ui, "-init"), ui);
    }
  };

  _obs.obs.l("_helper-site-load", function (event) {
    _obs.obs.r();

    _load(event.target.getAttribute("href"));
  });

  return {
    load: _load
  };
}();

exports.site = site;