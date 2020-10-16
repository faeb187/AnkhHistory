"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cols = exports.data = void 0;

var _ankh = require("../../ankh");

var data = [{
  cardNumber: "10003354",
  cardProduct: "Maestro-Karte",
  iban: "CH45 43599 34532 23455 33",
  firstEmbossingLine: "Fabio Gartenmann",
  dailyLimit: 2500,
  monthlyLimit: 5000,
  expiration: +new Date(),
  state: "active"
}, {
  cardNumber: "10005554",
  cardProduct: "Maestro-Karte",
  iban: "CH22 4111 34112 22453 18",
  firstEmbossingLine: "Silvan Hollenstein",
  dailyLimit: 2500,
  monthlyLimit: 5000,
  expiration: +new Date(),
  state: "active"
}, {
  cardNumber: "10001377",
  cardProduct: "Maestro-Karte",
  iban: "CH45 11199 32535 13477 01",
  firstEmbossingLine: "Baard Olsen",
  dailyLimit: 5500,
  monthlyLimit: 10000,
  expiration: +new Date(),
  state: "active"
}];
exports.data = data;
var cols = [{
  svg: "mastercard",
  width: 32
}, {
  lang: "cardNumber"
}, {
  lang: "cardProduct"
}, {
  lang: "iban"
}, {
  lang: "firstEmbossingLine"
}, {
  lang: "dailyLimit",
  currency: _ankh.ankh.currency
}, {
  lang: "monthlyLimit",
  currency: _ankh.ankh.currency
}, {
  lang: "expiration",
  date: _ankh.ankh.date
}, {
  lang: "state"
}, {
  lang: "actions",
  svg: "dots",
  right: true
}];
exports.cols = cols;