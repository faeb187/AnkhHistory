"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reportsOverview = void 0;

var _dbp = require("../designs/dbp");

var reportsO;
reportsO = JSON.parse(JSON.stringify(_dbp.dbp));
reportsO.ids[1].ids[0].ids[1].ids = [];
var reportsOverview = reportsO;
exports.reportsOverview = reportsOverview;