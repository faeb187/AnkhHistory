"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chart = void 0;

var _core = require("../core");

// UI chart
var chart = function () {
  var $chart, $ui, draw;
  $ui = null;
  $chart = null;
  draw = {
    // @DESC   draw a pie chart
    // @PARAM  opt.data  MAN {array}   înput data
    // @RETURN {void}
    pie: function pie(opt) {
      var dta;
      opt = opt || {};
      dta = opt.data;

      if (!dta) {
        return;
      }

      $chart.className = "pie";
      $chart.setAttribute("style", "animation-delay: -60s");
    }
  };
  return {
    // @DESC     build new diagram
    // @PARAM    opt.id      MAN {string}  UI id
    // @PARAM    opt.type    OPT {string}  chart type
    // @PARAM    opt.target  MAN {string}  target node
    // @RETURN  {void}
    // @PUBLIC
    init: function init(opt) {
      var $t, dta, id, type;
      opt = opt || {};
      id = opt.id;
      $t = opt.target;
      type = opt.type || "row";
      dta = opt.data;

      if (!id || !$t) {
        return;
      } // MARKUP chart


      $ui = $$("<div/>", {
        "class": "ui-chart"
      });
      $chart = $$("<div/>");

      switch (type) {
        case "pie":
          draw.pie({
            data: dta
          });
      } // append UI to DOM target


      $ui.appendChild($chart);
      $t.appendChild($ui);
    }
  };
}();

exports.chart = chart;