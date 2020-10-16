"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partnerProductsAdditional = void 0;

var _cards = require("../data/productsAdditional/cards");

var _dbp = require("../designs/dbp");

var partnerPA;
partnerPA = JSON.parse(JSON.stringify(_dbp.dbp));
partnerPA.ids[1].ids[0].ids[1].ids = [{
  id: "toolbar",
  ui: "html",
  tag: "menu",
  type: "toolbar",
  ids: [{
    id: "additionalToolbarSwitch",
    ui: "icon",
    icon: "toggle"
  }, {
    // todo wrap select into <li>
    id: "additionalToolbarActions",
    ui: "select",
    options: [{
      lang: "actions"
    }, {
      lang: "createAdditionalProduct"
    }]
  }]
}, {
  id: "additionalAccordion",
  ui: "accordion",
  ids: [{
    id: "additionalDetailsCards",
    ui: "details",
    open: true,
    summary: {
      lang: "cards"
    },
    ids: [{
      id: "additionalTableCards",
      ui: "table",
      cols: _cards.cols,
      data: _cards.data
    }]
  }, {
    id: "additionalDetailsEbanking",
    ui: "details",
    summary: {
      lang: "ebanking"
    }
  }, {
    id: "additionalDetailsSafes",
    ui: "details",
    summary: {
      lang: "safes"
    }
  }, {
    id: "additionalDetailsPaymentTransactions",
    ui: "details",
    summary: {
      lang: "paymentTransactions"
    }
  }, {
    id: "additionalDetailsContractsAndDocuments",
    ui: "details",
    summary: {
      lang: "contractsAndDocuments"
    }
  }]
}];
var partnerProductsAdditional = partnerPA;
exports.partnerProductsAdditional = partnerProductsAdditional;