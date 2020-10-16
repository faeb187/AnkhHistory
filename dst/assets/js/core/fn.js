"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fn = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var compensate, minItemIsTooSmall, newItems;
newItems = [];

minItemIsTooSmall = function minItemIsTooSmall(threshold) {
  var minItem;
  minItem = Math.min.apply(Math, _toConsumableArray(newItems));
  return threshold - minItem > 0;
};

compensate = function compensate(threshold) {
  var amount, maxIndex, maxItem, minIndex, minItem;
  console.log("---start (threshold:" + threshold + ")");
  minItem = Math.min.apply(Math, _toConsumableArray(newItems));
  maxItem = Math.max.apply(Math, _toConsumableArray(newItems));
  maxIndex = newItems.indexOf(maxItem); // 2 could be same max

  minIndex = newItems.indexOf(minItem);
  amount = threshold - minItem;
  console.log("before:", _toConsumableArray(newItems));
  newItems[maxIndex] = maxItem - amount;
  newItems[minIndex] = minItem + amount;
  console.log("maxIndex: ", maxIndex);
  console.log("minIndex: ", minIndex);
  console.log("amount", amount);
  return console.log("compensated: ", newItems);
};

var fn = {
  fit: function fit(items, opt) {
    var availableTotal, c, delta, deltaTotal, itemCount, itemsTotal, minDelta, offset, offsetTotal, threshold, total;
    threshold = opt.threshold;
    total = opt.total;
    var _opt$offset = opt.offset;
    offset = _opt$offset === void 0 ? 0 : _opt$offset;
    itemsTotal = items.reduce(function (a, b) {
      return a + b;
    });
    itemCount = items.length;
    offsetTotal = offset * itemCount;
    availableTotal = total - offsetTotal;
    console.log("availableTotal:", availableTotal);
    deltaTotal = availableTotal - itemsTotal;

    if (deltaTotal >= 0) {
      return;
    }

    delta = deltaTotal / itemCount;
    console.log("delta per item:", delta);
    newItems = items.map(function (item) {
      return item + delta;
    });
    console.log("newItemsTotal:", newItems.reduce(function (a, b) {
      return a + b;
    }));

    if (!threshold) {
      return newItems;
    }

    minDelta = console.log("before comp:", newItems);
    c = 0; // while minItemIsTooSmall threshold

    while (c < 8) {
      c = c + 1;
      compensate(threshold);
    }

    console.log("newItemsTotal:", newItems.reduce(function (a, b) {
      return a + b;
    }));
    return newItems;
  }
};
exports.fn = fn;