"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.form = void 0;

var _core = require("../core");

// UI FORM
var form = function () {
  var cf, d, fldChange, flds, id, st, ui;
  flds = require("../conf/form.fields"); // @REQ npm modules

  cf = require("currency-formatter");
  fldChange = new Event("fldChange"); // @DEF variables

  st = null;
  id = null;
  d = document; // @DEF  ui  {json}  UI variables/methods

  ui = {
    $tpl: (0, _core.$$)("<section/>"),
    addFld: function addFld(obj, $t) {
      var $ctrls, $fld, $grp, $h2, $inp, $num, $oLab, $opt, dyn, evs, fld, fldO, fldSt, i, j, k, lab, len, len1, len2, max, min, name, o, oId, oLab, oVal, objId, ph, ptrn, ref, req, step, type, val;
      obj = obj || {};
      dyn = obj.dyn;
      step = obj.step;

      if (!$t) {
        return;
      }

      if (obj.ids) {
        $grp = (0, _core.$$)("<div/>", {
          "class": "grp"
        });

        if (obj.id) {
          $grp.id = obj.id;
        }

        if (obj.title) {
          $h2 = (0, _core.$$)("<h2/>", {
            "data-lang": obj.title
          });
          $grp.appendChild($h2);
        }

        if (step) {
          $grp.setAttribute("data-step", true);
          $grp.setAttribute("data-fx", "in");
        }

        if (dyn && obj.id) {
          ui.addFld(obj);
        }

        ref = obj.ids;

        for (i = 0, len = ref.length; i < len; i++) {
          obj = ref[i];
          ui.addFld(obj, $grp);
        }

        $t.appendChild($grp);
      }

      objId = obj.id;
      fld = flds[objId];

      if (!fld) {
        return;
      }

      type = fld.type;
      req = fld.required;
      name = fld.name;
      lab = fld.label;
      val = fld.value;
      min = fld.min;
      max = fld.max;
      ptrn = fld.pattern;
      step = fld.step;
      ph = fld.placeholder;
      evs = fld.evs;
      dyn = obj.dyn;
      fldSt = st[type === "radio" ? name : objId];
      $fld = (0, _core.$$)("<div/>", {
        "class": "fld fld-" + objId
      });

      switch (type) {
        case "select":
          fldO = fld.options || [];

          if (!fldO) {
            return;
          }

          $inp = (0, _core.$$)("<select/>");
          $inp.id = objId;

          for (j = 0, len1 = fldO.length; j < len1; j++) {
            o = fldO[j];
            oId = o.id;
            oVal = o.value;

            if (!oId || !oVal) {
              return;
            }

            $opt = (0, _core.$$)("<option/>", {
              value: oVal,
              "data-lang": oVal
            });
            $opt.id = oId;

            if (req) {
              $inp.setAttribute("required", true);
            }

            if (name) {
              $inp.setAttribute("name", name);
            }

            if (val) {
              $inp.value = val;
            }

            $inp.appendChild($opt);
          }

          $fld.appendChild($inp);

          if (lab) {
            $fld.appendChild((0, _core.$$)("<label/>", {
              "for": objId,
              "data-lang": lab
            }));
          }

          if (fldSt) {
            $inp.value = fldSt;
          }

          break;

        case "radio":
          fldO = fld.options || [];
          $ctrls = (0, _core.$$)("<div/>", {
            "class": "ctrls"
          });

          for (k = 0, len2 = fldO.length; k < len2; k++) {
            o = fldO[k];
            oLab = o.label;
            oId = o.id;

            if (!oId || !oLab) {
              continue;
            }

            $inp = (0, _core.$$)("<input/>", {
              type: "radio",
              name: name
            });
            $inp.id = oId;
            $oLab = (0, _core.$$)("<label/>", {
              "for": oId,
              "data-lang": oLab
            });

            if (req) {
              $inp.setAttribute("required", true);
            }

            if (fldSt === oId) {
              $inp.setAttribute("checked", true);
            }

            $ctrls.appendChild($inp);
            $ctrls.appendChild($oLab);
          }

          $fld.appendChild($ctrls);
          $fld.appendChild((0, _core.$$)("<label/>", {
            "data-lang": lab
          }));
          break;

        case "range":
          $inp = (0, _core.$$)("<input/>", {
            type: "range"
          });
          $num = (0, _core.$$)("<input/>", {
            type: "text",
            "data-type": "currency"
          });
          $inp.id = objId;

          if (max) {
            $inp.setAttribute("max", max);
          }

          if (min) {
            $inp.setAttribute("min", min);
          }

          if (step) {
            $inp.setAttribute("step", step);
          }

          if (req) {
            $inp.setAttribute("required", true);
          }

          if (name) {
            $inp.setAttribute("name", name);
          }

          if (lab) {
            $inp.setAttribute("data-lang", ph);
          }

          $fld.appendChild($num);
          $fld.appendChild($inp);

          if (lab) {
            $fld.appendChild((0, _core.$$)("<label/>", {
              "for": objId,
              "data-lang": lab
            }));
          }

          $inp.value = fldSt || val || "";
          $num.value = cf.format(fldSt || val || "", {
            code: "CHF"
          });
          break;

        case "output":
          $inp = (0, _core.$$)("<output/>");
          $inp.id = objId;

          if (req) {
            $inp.setAttribute("required", true);
          }

          if (name) {
            $inp.setAttribute("name", name);
          }

          if (ph) {
            $inp.setAttribute("data-lang", ph);
          }

          if (val) {
            $inp.value = val;
          }

          $fld.appendChild($inp);

          if (lab) {
            $fld.appendChild((0, _core.$$)("<label/>", {
              "for": objId,
              "data-lang": lab
            }));
          }

          break;

        case "textarea":
          $inp = (0, _core.$$)("<textarea/>");
          $inp.id = objId;

          if (req) {
            $inp.setAttribute("required", true);
          }

          if (name) {
            $inp.setAttribute("name", name);
          }

          if (ph) {
            $inp.setAttribute("data-lang", ph);
          }

          $fld.appendChild($inp);

          if (lab) {
            $fld.appendChild((0, _core.$$)("<label/>", {
              "for": objId,
              "data-lang": lab
            }));
          }

          $inp.value = fldSt || val || "";
          break;

        case "currency":
        case "number":
          $inp = (0, _core.$$)("<input/>", {
            type: "number"
          });
          $inp.id = objId;

          if (req) {
            $inp.setAttribute("required", true);
          }

          if (name) {
            $inp.setAttribute("name", name);
          }

          $fld.appendChild($inp);

          if (lab) {
            $fld.appendChild((0, _core.$$)("<label/>", {
              "data-lang": lab
            }));
          }

          val = fldSt || val || 0;

          if (type === "currency") {
            $inp.setAttribute("type", "text");
            $inp.setAttribute("data-type", "currency");
            $inp.value = cf.format(val, {
              code: "CHF"
            });
          } else {
            $inp.value = val;
          }

          break;

        case "checkbox":
          $inp = (0, _core.$$)("<input/>", {
            type: "checkbox"
          });
          $inp.id = objId;

          if (req) {
            $inp.setAttribute("required", true);
          }

          if (name) {
            $inp.setAttribute("name", name);
          }

          $fld.appendChild($inp);

          if (lab) {
            $fld.appendChild((0, _core.$$)("<label/>", {
              "data-lang": lab
            }));
          }

          val = fldSt || null;

          if (val) {
            $inp.setAttribute("checked", true);
          }

          break;

        default:
          $inp = (0, _core.$$)("<input/>", {
            type: type || "text"
          });
          $inp.id = objId;

          if (req) {
            $inp.setAttribute("required", true);
          }

          if (name) {
            $inp.setAttribute("name", name);
          }

          if (ptrn) {
            $inp.setAttribute("pattern", ptrn);
          }

          if (ph) {
            $inp.setAttribute("data-lang", ph);
          }

          $inp.value = fldSt || val || "";
          $fld.appendChild($inp);

          if (lab) {
            $fld.appendChild((0, _core.$$)("<label/>", {
              "for": objId,
              "data-lang": lab
            }));
          }

      }

      $fld.appendChild((0, _core.$$)("<i/>", {
        "class": "ui-icon icon-ok ion-checkmark"
      }));
      $fld.appendChild((0, _core.$$)("<i/>", {
        "class": "ui-icon icon-nok ion-close"
      }));
      return $t.appendChild($fld);
    },
    listen: function listen($ui) {
      var $fld, $flds, $inps, $range, $steps, i, len; //$ui     = $$ '#' + id

      $inps = (0, _core.$$)("input, textarea, select", $ui);
      $flds = (0, _core.$$)("[required]", $ui);
      $range = (0, _core.$$)("[type=range]", $ui);

      if ($flds.length) {
        _core.$$.listen($flds, "change", ui.validate);

        _core.$$.listen($flds, "blur", ui.validate);

        _core.$$.listen($flds, "fldChange", ui.validate);
      }

      for (i = 0, len = $flds.length; i < len; i++) {
        $fld = $flds[i];

        if ($fld.value) {
          // initial validation of nonempty fields
          $fld.dispatchEvent(fldChange);
        }
      }

      if ($range.length) {
        _core.$$.listen($range, "input", function (e) {
          return e.target.previousSibling.value = cf.format(e.target.value, {
            code: "CHF"
          });
        });

        _core.$$.listen($range.previousSibling, "keyup", function (e) {
          return e.target.nextSibling.value = e.target.value;
        });
      }

      if ($inps.length) {
        _core.$$.listen($inps, "change", function (e) {
          var $elm, prop, type, val;
          $elm = e.target;
          type = $elm.getAttribute("data-type") || $elm.getAttribute("type");
          prop = type === "radio" ? $elm.getAttribute("name") : $elm.id;
          val = type === "radio" ? $elm.id : $elm.value;

          if (type === "currency") {
            $elm.value = cf.format(val, {
              code: "CHF"
            });
          }

          st[prop] = val;
          return _core.state.set({
            id: id,
            state: st
          });
        });
      }

      $steps = (0, _core.$$)("[ data-step ]:first-child", $ui);

      if ($steps.length) {
        return $steps.setAttribute("data-fx", "in");
      }
    },
    validate: function validate(e) {
      var $elm, $fld, cns;
      e.preventDefault();
      $elm = e.target;
      $fld = _core.$$.parent($elm, ".fld"); // ADD valid/invalid class

      cns = ["valid", "invalid"];

      if ($elm.checkValidity()) {
        cns.reverse();
      }

      _core.$$.removeClass($fld, cns[0]).addClass($fld, cns[1]);
    },
    evs: {
      set: function set(opt) {
        var $city, $step, $steps, $ui, $zip, dyn, fld, i, len, step;
        opt = opt || {};
        id = id;
        step = opt.step;
        dyn = opt.dyn;
        fld = opt.fld;
        $ui = (0, _core.$$)("#" + id);

        if (step) {
          $steps = (0, _core.$$)("[data-step]", $ui);

          for (i = 0, len = $steps.length; i < len; i++) {
            $step = $steps[i];

            if ($step.getAttribute("data-fx") === "in") {
              $step.setAttribute("data-fx", "out");
            }
          }

          (0, _core.$$)("[data-step]:nth-child(" + step + ")", $ui).setAttribute("data-fx", "in");
        } // zip fills city


        $zip = (0, _core.$$)("#zip");
        $city = (0, _core.$$)("#city");

        if ($zip && $city) {
          return _core.$$.listen($zip, "keyup", function (e) {
            var zip;
            zip = e.target.value;

            if (zip.length <= 3) {
              $city.value = "";
              return;
            }

            return _core.$$.read("service/city/get/" + zip, function (city) {
              return $city.value = city ? city : "";
            });
          });
        }
      },
      listen: {
        unload: function unload() {
          return window.onunload = function () {
            var $fld, prop, type, val; // CHECK if user has changed something...

            $fld = (0, _core.$$)("input:focus, textarea:focus, select:focus", $ui);

            if (!$fld) {
              return;
            }

            type = $fld.getAttribute("type");
            prop = type === "radio" ? $fld.getAttribute("name") : $fld.id;
            val = type === "radio" ? $fld.id : $fld.value; // ...and update that change

            st[prop] = val;
            return _core.state.set({
              id: id,
              state: st
            });
          };
        }
      }
    }
  };
  return {
    // @DESC   init UI form
    // @PARAM  opt.id      MAN {string}    UI id
    // @PARAM  opt.ids     MAN {[string]}  array of fields
    // @PARAM  opt.type    OPT {string}    form type (newsletter)
    // @PARAM  opt.target  MAN {node}      target node
    init: function init(opt) {
      var $t, $ui, i, ids, len, obj, type;
      opt = opt || {};
      id = opt.id;
      ids = opt.ids;
      type = opt.type;
      $t = opt.target;
      st = _core.state.get({
        id: id
      }) || {};

      if (!id || !ids || !$t) {
        return;
      } // UI markup


      $ui = ui.$tpl.cloneNode();
      $ui.id = id;
      $ui.className = type ? "ui-" + type : "ui-form";

      for (i = 0, len = ids.length; i < len; i++) {
        obj = ids[i]; // APPEND fields to form

        ui.addFld(obj, $ui);
      } // APPEND UI to dom target


      $t.appendChild($ui); // ATTACH events

      ui.listen($ui); // ATTACH observer events

      _core.obs.l("ui-form-set", ui.evs.set);
    }
  };
}();

exports.form = form;