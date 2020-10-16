"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.article = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _core = require("../core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// UI article
var article = function () {
  return {
    // @DESC   build new article
    // @PARAM  opt.title           {string}  title
    // @PARAM  opt.items           {[json]}  paragraph or code block
    // @PARAM  opt.items.$.lang    {json}    id to paragraph text or programming lang
    // @PARAM  opt.items.$.code    {json}    code block with syntax highlighting
    // @PARAM  opt.author          {json}    author object
    // @PARAM  opt.author.username {string}  author username
    // @PARAM  opt.author.email    {string}  author email
    // @PARAM  opt.author.website  {string}  author website
    // @PARAM  opt.createdAt       {date}    date of article creation
    // @RETURN {void}
    // @PUBLIC
    init: function init(opt) {
      var $address, $code, $elm, $footer, $pre, $t, $time, $title, $ui, i, itm, itms, len, title; // DEFINE variables

      opt = opt || {};
      $t = opt.target;
      title = opt.title;
      itms = opt.items;

      if (!$t || !title || !itms) {
        return;
      } // MARKUP UI


      $ui = (0, _core.$$)("<article/>", {
        "class": "ui-article"
      }); // ADD article title

      $title = (0, _core.$$)("<h2/>", {
        "data-lang": title
      });
      $ui.appendChild($title); // ADD article items

      for (i = 0, len = itms.length; i < len; i++) {
        itm = itms[i]; // code block

        if (itm.code) {
          $pre = (0, _core.$$)("<pre/>");
          $code = (0, _core.$$)("<code/>", {
            "class": itm.lang
          });
          $code.innerHTML = itm.code;
          $pre.appendChild($code);
          $elm = (0, _core.$$)("<p/>").appendChild($pre);
        } else {
          // normal paragraph
          $elm = (0, _core.$$)("<p/>", {
            "data-lang": itm.lang
          });
        }

        $ui.appendChild($elm);
      } // article footer required?


      if (opt.author || opt.createdAt) {
        $footer = (0, _core.$$)("<footer/>"); // add article author

        if (opt.author) {
          $address = (0, _core.$$)("<address/>");
          $address.innerText = "by " + opt.author.username;
          $footer.appendChild($address);
        } // add article creation date


        if (opt.createdAt) {
          $time = (0, _core.$$)("<time/>", {
            datetime: opt.createdAt,
            pubdate: "pubdate"
          });
          $time.innerHTML = (0, _moment["default"])(opt.createdAt).fromNow();
          $footer.appendChild($time);
        } // APPEND UI to DOM target


        $ui.appendChild($footer);
      }

      $t.appendChild($ui);
    }
  };
}();

exports.article = article;