"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partnerOverview = void 0;

var _dbp = require("../designs/dbp");

var partnerO;
partnerO = JSON.parse(JSON.stringify(_dbp.dbp));
partnerO.ids[1].ids[0].ids[1].ids = [];
var partnerOverview = partnerO;
exports.partnerOverview = partnerOverview;