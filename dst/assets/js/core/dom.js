"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$$ = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// $$
var $$ = function () {
  var d, dp, isNode;
  d = document;
  dp = new DOMParser();

  isNode = function isNode(elm) {
    return elm instanceof HTMLElement;
  }; // @DESC   find element(s)
  // @PARAM  p1  MAN {string}      CSS selector
  // @PARAM  p2  OPT {string|Node} parent container
  // @RETURN {Node|array}  node or array of nodes or empty array
  // @DESC   create element
  // @PARAM  p1  MAN {string}  <tagName/> (e.g. $$ '<div/>')
  // @PARAM  p2  OPT {object}  attributes of new element
  // @RETURN {Node}


  exports.$$ = $$ = function $$(p1, p2) {
    var $elm, $elms, k, ref, v;

    if (!p1 || typeof p1 !== "string") {
      return this;
    } // CREATE element


    if (p1.slice(0, 1) === "<" && p1.slice(-2) === "/>") {
      $elm = d.createElement(p1.slice(1, -2));
      ref = p2 || {};

      for (k in ref) {
        v = ref[k];

        if (k === "innerText") {
          $elm.innerText = v;
        } else {
          $elm.setAttribute(k, v);
        }
      }

      return $elm;
    } // CHECK for parentNode


    if (p2 && typeof p2 === "string") {
      p2 = d.querySelector(p2);
    }

    if (!p2) {
      p2 = d;
    } // FIND element(s) in parent


    $elms = p2.querySelectorAll(p1);

    if (!$elms.length) {
      return [];
    } // return found element(s)


    if ($elms.length === 1) {
      return $elms[0];
    } else {
      return $elms;
    }
  }; // @DESC   (bulk) append element(s) to HTMLNode


  $$.append = function (toAppend, $t) {
    (isNode(toAppend) ? [toAppend] : toAppend).forEach(function (elm) {
      return $t.appendChild(elm);
    });
    return this;
  };

  $$.measure = function (str, fs) {
    var $hlp, measures;
    $hlp = this("<span/>", {
      innerText: str
    });
    this.css($hlp, {
      position: "absolute",
      left: "-9999px",
      top: "-9999px"
    });

    if (fs) {
      this.css($hlp, {
        fontSize: "".concat(fs, "px")
      });
    }

    document.body.appendChild($hlp);
    measures = {
      h: $hlp.clientHeight,
      w: $hlp.clientWidth
    };
    document.body.removeChild($hlp);
    return measures;
  }; // @DESC   parse HTML string to node tree
  // @PARAM  MAN {str}   HTML string to parse
  // @RETURN {node|$$}


  $$.parse = function (str) {
    if (!str || typeof str !== "string") {
      return $$;
    } // return parsed node


    return dp.parse(str);
  }; // @DESC   get/set css of element
  // @PARAM  elms    MAN {Node|string} element(s) or selector
  // @PARAM  obj     MAN {json|string} styles to set or property
  // @RETURN {string|$$}


  $$.css = function (elms, obj) {
    var i, j, k, ref, v;

    if (!elms || !obj) {
      return this;
    } // get node by selector


    if (typeof elms === "string") {
      elms = $$(elms);
    } // set element style


    if (_typeof(obj) === "object") {
      if (!elms.length) {
        elms = [elms];
      }

      for (i = j = 0, ref = elms.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        for (k in obj) {
          v = obj[k];
          elms[i].style[k] = v;
        }
      }

      return this;
    } // get computed style for element


    v = window.getComputedStyle(elms)[obj]; // return parsed style

    if (v.slice(-2) === "px" && v.indexOf(" " === -1)) {
      return parseFloat(v);
    } else {
      return v;
    }
  }; // @DESC   get all previous siblings
  // @PARAM  elm   MAN {node|string} element or selector
  // @RETURN {array|$$}


  $$.prevAll = function (elm) {
    // delegate to $$.nextAll
    return this.nextAll(elm, {
      prev: true
    });
  }; // @DESC     get all next siblings
  // @PARAM    elm       MAN {node|string} element or selector
  // @PARAM    opt.prev  OPT {boolean}     $$.prevAll delegation
  // @RETURN  {array}


  $$.nextAll = function (elm, opt) {
    var dir, sib, sibs;
    opt = opt || {};

    if (!elm) {
      return;
    } // find element by selector


    if (typeof elm === "string") {
      elm = $$(elm);
    }

    if (!elm) {
      return this;
    } // only one element
    // (default: first in NodeList)


    if (elm.length) {
      elm = elm[0];
    } // collect next siblings


    sibs = [];
    sib = elm;
    dir = opt.prev ? "previous" : "next";

    while (true) {
      sib = sib[dir + "Sibling"];

      if (!sib) {
        break;
      }

      sibs.push(sib);
    }

    return sibs;
  }; // @DESC   get parent node
  // @PARAM  $elm  MAN {node|string} element or selector
  // @PARAM  sel   OPT {string}      parent selector
  // @RETURN {node}


  $$.parent = function ($elm, sel) {
    var _selMatch;

    if (!$elm) {
      return this;
    } // just return direct parent node


    if (arguments.length === 1) {
      return $elm.parentNode;
    } // look for requested parent


    _selMatch = function selMatch($elm, sel) {
      if ($elm.matches(sel)) {
        return $elm;
      } else {
        return _selMatch($elm.parentNode, sel);
      }
    };

    return _selMatch($elm.parentNode, sel);
  }; // @DESC   checks for existence of a class on a node
  // @PARAM  $elm    MAN {node|string} element or selector
  // @PARAM  cn      MN  {string}      class to check
  // @RETURN {boolean||$$}


  $$.hasClass = function ($elm, cn) {
    if (!$elm || !cn || typeof cn !== "string") {
      return this;
    }

    if (typeof $elm === "string") {
      $elm = $$($elm);
    }

    if (!$elm) {
      return this;
    }

    if ($elm.length) {
      $elm = $elm[0];
    }

    if ($elm.className.indexOf(cn) > -1) {
      return true;
    } else {
      return false;
    }
  }; // @DESC   adds a class to node
  // @PARAM  $elm  MAN {node|string} element or selector
  // @PARAM  cn    MAN {string}      class to add
  // @RETURN {$$}


  $$.addClass = function ($elm, cn) {
    if (!$elm || !cn || typeof cn !== "string") {
      return this;
    } // GET node by selector


    if (typeof $elm === "string") {
      $elm = $$($elm);
    }

    if (!$elm) {
      return this;
    } // MULTIPLE NODES matched


    if ($elm.length) {
      $elm = $elm[0];
    } // ALREADY attached class


    if ($elm.className.indexOf(cn) > -1) {
      return this;
    } // ADD class


    $elm.className += " " + cn;
    return this;
  }; // @DESC   removes a class from node
  // @PARAM  $elm  MAN {node|string} element or selector
  // @PARAM  cn    MAN {string}      class to remove
  // @RETURN {$$}


  $$.removeClass = function ($elm, cn) {
    var cns, idx;

    if (!$elm || !cn || typeof cn !== "string") {
      return this;
    } // GET node by selector


    if (typeof $elm === "string") {
      $elm = $$($elm);
    }

    if (!$elm) {
      return this;
    } // MATCHED multiple nodes


    if ($elm.length) {
      $elm = $elm[0];
    }

    if (!$elm.className) {
      return this;
    } // GET index of toRemove class


    cns = $elm.className.split(" ");
    idx = cns.indexOf(cn); // REMOVE class from node

    if (idx > -1) {
      cns.splice(idx, 1);
      $elm.className = cns.join(" ");
    }

    return this;
  }; // @DESC   toggles a node class
  // @PARAM  elm       MAN {node|string} element or selector
  // @PARAM  toToggle  MAN {string}  class to toggle
  // @RETURN {$$}


  $$.toggleClass = function (elm, toToggle) {
    var cns, idx;

    if (!elm || !toToggle) {
      return this;
    }

    if (typeof elm === "string") {
      elm = $$(elm);
    }

    if (!elm) {
      return $$;
    }

    if (elm.length) {
      elm = elm[0];
    }

    cns = elm.className.split(" ");
    idx = cns.indexOf(toToggle);

    if (idx === -1) {
      elm.className = cns.join(" ") + " " + toToggle;
    } else {
      cns.splice(idx, 1);
      elm.className = cns.join(" ");
    }

    return this;
  }; // @DESC   toggles style.display
  // @PARAM  elm   MAN {node|string} element or selector
  // @PARAM  dsp   OPT {string}      visible type (@DEF:block|flex)
  // @RETURN {$$}


  $$.toggle = function (elm, dsp) {
    var curDsp;

    if (!elm) {
      return $$;
    }

    dsp = dsp || "block";

    if (typeof elm === "string") {
      elm = $$(elm);
    }

    if (!elm) {
      return $$;
    }

    if (elm.length) {
      elm = elm[0];
    }

    curDsp = elm.style.display;
    elm.style.display = curDsp === "none" ? dsp : "none";
    return $$;
  }; // @DESC   uppercase first character of string
  // @PARAM  str   MAN {string}  string
  // @RETURN {string|$$}


  $$.ucFirst = function (str) {
    if (!str || typeof str !== "string") {
      return $$;
    } // RETURN string


    return str.charAt(0).toUpperCase() + str.slice(1);
  }; // @DESC   extend object with additional properties
  // @DESC   (o.x overwrites t.x if t.x exists)
  // @PARAM  t MAN {json}  target object
  // @PARAM  o MAN {json}  object to merge into target


  $$.extend = function (t, o) {
    var k;

    for (k in o) {
      t[k] = o[k];
    }

    return t;
  }; // @DESC   get index of DOM node compared to siblings (0..n)
  // @PARAM  $elm  MAN {node|string} element or selector
  // @RETURN {integer} index or -1


  $$.index = function ($elm) {
    var $p;

    if (!$elm) {
      return $$;
    } // FIND element by selector
    // ...return  when no match


    if (typeof $elm === "string") {
      $elm = $$($elm);
    }

    if (!$elm) {
      return $$;
    } // ONLY ONE element
    // ...and get its parent node


    if ($elm.length) {
      $elm = $elm[0];
    }

    $p = $elm.parentNode; // RETURN index or -1

    return Array.prototype.indexOf.call($p.childNodes, $elm);
  }; // @DESC   listen to an event
  // @PARAM  $elms MAN {Node|string} element(s) or selector
  // @PARAM  event MAN {string}      event name
  // @PARAM  cb    MAN {function}    callback function
  // @RETURN {$$}


  $$.listen = function ($elms, event, cb) {
    var $elm, j, len;

    if (!$elms || !event || !cb) {
      return this;
    } // get node by selector


    if (typeof $elms === "string") {
      $elms = $$($elms);
    }

    if (!$elms.length) {
      $elms = [$elms];
    } // add event listeners


    for (j = 0, len = $elms.length; j < len; j++) {
      $elm = $elms[j];
      $elm.addEventListener(event, cb);
    }

    return this;
  }; // @DESC   destroy event listener
  // @PARAM  $elms   MAN {Node|string} element(s) or selector
  // @PARAM  event   MAN {string}      event name
  // @PARAM  handler MAN {function}    attached handler
  // @RETURN {$$}


  $$.destroy = function ($elms, event, handler) {
    var $elm, j, len;

    if (!$elms || !event || !handler) {
      return this;
    } // GET node by selector


    if (typeof $elms === "string") {
      $elms = $$($elms);
    }

    if (!$elms.length) {
      $elms.removeEventListener(event, handler);
    } else {
      // DESTROY event listeners
      for (j = 0, len = $elms.length; j < len; j++) {
        $elm = $elms[j];
        $elm.removeEventListener(event, handler);
      }
    }

    return this;
  }; // @DESC   API create request
  // @PARAM  path  MAN {string}    request path
  // @PARAM  dta   OPT {object}    request data
  // @PARAM  cb    OPT {function}  callback
  // @RETURN {$$}


  $$.create = function (path, dta, cb) {
    if (!path) {
      return;
    }

    return this;
  }; // @DESC   API read request
  // @PARAM  path  MAN {string}    request path
  // @PARAM  dta   OPT {object}    request data
  // @PARAM  cb    MAN {function}  callback
  // @RETURN {$$}


  $$.read = function (path, dta, cb) {
    var arg, xhr;
    arg = arguments;

    if (!arg[0]) {
      return this;
    } // NO DATA to send


    if (arg.length === 2) {
      // SECOND PARAM must be callback
      if (typeof arg[1] !== "function") {
        return this;
      } // NO DATA but callback


      cb = arg[1];
      dta = null;
    }

    if (!cb || typeof cb !== "function") {
      return this;
    } // create AJAX request


    xhr = new XMLHttpRequest(); // response loaded (execute callback)

    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        return cb(this.responseText);
      }
    }; // send request


    xhr.open("GET", path);
    xhr.send(dta);
    return this;
  }; // @DESC   API update request
  // @PARAM  path  MAN {string}    request path
  // @PARAM  dta   MAN {object}    request data
  // @PARAM  cb    OPT {function}  callback
  // @RETURN {$$}


  $$.update = function (path, dta, cb) {
    if (!path || !dta) {
      return this;
    }

    return this;
  }; // @DESC   API delete request
  // @RETURN {$$}


  $$["delete"] = function (path, dta, cb) {
    if (!path || !dta || !cb) {
      return this;
    }

    return this;
  }; // @DESC   preload media
  // @RETURN {$$}


  $$.preload = function (opt) {
    var cb, cbFile, img, itm, itms, j, len, loaded, supported, toLoad, type;
    opt = opt || {};
    itms = opt.items || [];
    cbFile = opt.onFileLoaded;
    cb = opt.onFinish;
    loaded = 0;
    toLoad = itms.length;
    supported = ["jpg", "png"];

    if (!toLoad || !cb || typeof cb !== "function") {
      return $$;
    }

    for (j = 0, len = itms.length; j < len; j++) {
      itm = itms[j];
      type = itm.split(".").pop();

      if (supported.indexOf(type) === -1) {
        return $$;
      }

      img = new Image();

      img.onload = function () {
        if (++loaded === toLoad) {
          return cb(toLoad);
        } else if (opt.onFileLoaded) {
          return opt.onFileLoaded(this.getAttribute("src"));
        }
      };

      img.src = itm;
    }
  }; // SPA history handling


  $$.history = {
    // @DESC   update current state
    // @PARAM  name  MAN {string}  site name
    // @PARAM  path  MAN {string}  site path (route)
    // @RETURN {$$}
    go: function go(name, path) {
      return history.pushState({
        site: name
      }, null, path);
    }
  };
  return $$;
}();

exports.$$ = $$;