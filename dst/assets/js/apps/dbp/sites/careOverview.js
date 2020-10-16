"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.careOverview = void 0;

var _dbp = require("../designs/dbp");

var careO;
careO = JSON.parse(JSON.stringify(_dbp.dbp));
careO.ids[1].ids[0].ids[1].ids = [{
  id: "careIframePending",
  ui: "iframe",
  src: "localhost:5000"
}];
var careOverview = careO;
exports.careOverview = careOverview;