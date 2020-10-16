"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partnerProducts = void 0;

var _dbp = require("../designs/dbp");

var partnerP;
partnerP = JSON.parse(JSON.stringify(_dbp.dbp));
partnerP.ids[1].ids[0].ids[1].ids = [];
var partnerProducts = partnerP;
exports.partnerProducts = partnerProducts;