"use strict";

var _browsernizr = require("browsernizr");

var _core = require("./core");

var _ankh = require("./apps/dbp/ankh");

var _uis = require("./uis");

// require "browsernizr/test/proximity"
// require "browsernizr/test/battery"
// require "browsernizr/test/ambientlight"
// require "browsernizr/test/notification"
document.title = _ankh.ankh.title;

_core.site.load(location.pathname);