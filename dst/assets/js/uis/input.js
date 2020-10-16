"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.input = void 0;

var _core = require("../core");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var input = function () {
  var init; // @param  disabled      {boolean}
  // @param  id            {string}
  // @param  items         {json[]}      checkbox|radio items
  // @param  media         {json}        viewport config
  // @param  name          {string}
  // @param  type          {string}
  // @param  placeholder   {string}      lang reference
  // @param  required      {boolean}
  // @param  target        {HTMLElement} ui target
  // @param  value         {string}

  init = function init(options) {
    var $t, $ui, disabled, id, items, label, m, name, placeholder, required, st, type;
    disabled = options.disabled;
    id = options.id;
    items = options.items;
    label = options.label;
    m = options.media;
    name = options.name;
    placeholder = options.placeholder;
    required = options.required;
    $t = options.target;
    var _options$type = options.type;
    type = _options$type === void 0 ? "text" : _options$type;

    if (!id || !$t) {
      return;
    }

    if (m && !_core.media.isInViewport) {
      return _core.obs.f("_ankh-ui-not-loaded", options);
    }

    $ui = (0, _core.$$)("<div/>", {
      "class": "ui-input"
    });
    st = _core.state.get({
      id: id
    }) || {};
    (items || [options]).forEach(function (item) {
      var $input, checked;
      id = item.id;
      name = item.name;
      placeholder = item.placeholder;
      disabled = item.disabled;
      required = item.required;
      checked = item.checked;
      label = item.label;
      $input = (0, _core.$$)("<input/>", {
        id: id,
        type: type
      });

      if (name) {
        $input.setAttribute("name", name);
      }

      if (placeholder) {
        $input.setAttribute("data-lang", placeholder);
      }

      if (disabled) {
        $input.setAttribute("disabled", true);
      }

      if (required) {
        $input.setAttribute("required", true);
      }

      if (checked) {
        $input.setAttribute("checked", true);
      }

      if (label) {
        $ui.appendChild((0, _core.$$)("<label/>", {
          "for": id,
          "data-lang": label
        }));
      }

      return $ui.appendChild($input);
    });
    $t.appendChild($ui);
    setTimeout(function () {
      return Object.keys(st).forEach(function (inputId) {
        return (0, _core.$$)("#".concat(inputId)).value = st[inputId];
      });
    });

    _core.$$.listen((0, _core.$$)("input", $t), "keyup", function (event) {
      exports.input = input = event.target;
      return _core.state.set({
        id: id,
        state: _defineProperty({}, input.id, input.value)
      });
    });

    _core.obs.f("_ankh-ui-loaded", options);

    _core.obs.f("ankh-ui-ready", "ui-input#".concat(id));
  };

  return _core.obs.l("_ui-input-init", init);
}();

exports.input = input;