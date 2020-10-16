"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processOpenProduct = void 0;

var _dbp = require("../designs/dbp");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _processOpenProduct, details, steps;

steps = [{
  lang: "productSelection"
}, {
  lang: "accountData"
}, {
  lang: "deliveryAddress"
}, {
  lang: "portfolio"
}, {
  lang: "summary"
}, {
  lang: "confirmationOfCompletion"
}];
details = _processOpenProduct = JSON.parse(JSON.stringify(_dbp.dbp));
_processOpenProduct.ids[1].ids[0].ids[1].ids = [{
  id: "breadcrumb",
  ui: "breadcrumb",
  events: {
    ui: [{
      name: "ui-breadcrumb-update",
      target: "breadcrumb"
    }]
  },
  numbered: true,
  readonly: true,
  items: _toConsumableArray(steps)
}, {
  id: "openProductAccordion",
  ui: "accordion",
  ids: [{
    id: "accordionPay",
    ui: "details",
    summary: {
      lang: "pay"
    }
  }, {
    id: "accordionSaveUp",
    ui: "details",
    summary: {
      lang: "saveUp"
    }
  }, {
    id: "accordionPrecaution",
    ui: "details",
    summary: {
      lang: "precaution"
    }
  }, {
    id: "accordionInvest",
    ui: "details",
    summary: {
      lang: "invest"
    }
  }, {
    id: "accordionFinance",
    ui: "details",
    summary: {
      lang: "finance"
    }
  }, {
    id: "accordionVarious",
    ui: "details",
    summary: {
      lang: "various"
    }
  }]
}, {
  id: "openProductButtons",
  ui: "html",
  classNames: "ui-button-group",
  ids: [{
    id: "btnAbort",
    ui: "button",
    lang: "abort"
  }, {
    id: "btnContinue",
    ui: "button",
    lang: "continue"
  }]
}];
var processOpenProduct = _processOpenProduct;
exports.processOpenProduct = processOpenProduct;