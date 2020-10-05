/*
  UI FORM
  @AUTHOR faeb187
*/
module.exports = (function() {
  var $$, cf, d, fldChange, flds, id, obs, st, state, ui;
  // @REQ local modules
  $$ = require('../helpers/dom');
  obs = require('../helpers/obs');
  state = require('../helpers/state');
  flds = require('../conf/form.fields');
  
  // @REQ npm modules
  cf = require('currency-formatter');
  fldChange = new Event('fldChange');
  // @DEF variables
  st = null;
  id = null;
  d = document;
  // @DEF  ui  {json}  UI variables/methods
  ui = {
    $tpl: $$('<section/>'),
    addFld: function(obj, $t) {
      var $ctrls, $fld, $grp, $h2, $inp, $num, $oLab, $opt, dyn, evs, fld, fldO, fldSt, i, j, k, lab, len, len1, len2, max, min, name, o, oId, oLab, oVal, objId, ph, ptrn, ref, req, step, type, val;
      obj = obj || {};
      dyn = obj.dyn;
      step = obj.step;
      if (!$t) {
        return;
      }
      if (obj.ids) {
        $grp = $$('<div/>', {
          'class': 'grp'
        });
        if (obj.id) {
          $grp.id = obj.id;
        }
        if (obj.title) {
          $h2 = $$('<h2/>', {
            'data-lang': obj.title
          });
          $grp.appendChild($h2);
        }
        if (step) {
          $grp.setAttribute('data-step', true);
          $grp.setAttribute('data-fx', 'in');
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
      fldSt = st[type === 'radio' ? name : objId];
      $fld = $$('<div/>', {
        'class': 'fld fld-' + objId
      });
      switch (type) {
        case 'select':
          fldO = fld.options || [];
          if (!fldO) {
            return;
          }
          $inp = $$('<select/>');
          $inp.id = objId;
          for (j = 0, len1 = fldO.length; j < len1; j++) {
            o = fldO[j];
            oId = o.id;
            oVal = o.value;
            if (!oId || !oVal) {
              return;
            }
            $opt = $$('<option/>', {
              value: oVal,
              'data-lang': oVal
            });
            $opt.id = oId;
            if (req) {
              $inp.setAttribute('required', true);
            }
            if (name) {
              $inp.setAttribute('name', name);
            }
            if (val) {
              $inp.value = val;
            }
            $inp.appendChild($opt);
          }
          $fld.appendChild($inp);
          if (lab) {
            $fld.appendChild($$('<label/>', {
              for: objId,
              'data-lang': lab
            }));
          }
          if (fldSt) {
            $inp.value = fldSt;
          }
          break;
        case 'radio':
          fldO = fld.options || [];
          $ctrls = $$('<div/>', {
            'class': 'ctrls'
          });
          for (k = 0, len2 = fldO.length; k < len2; k++) {
            o = fldO[k];
            oLab = o.label;
            oId = o.id;
            if (!oId || !oLab) {
              continue;
            }
            $inp = $$('<input/>', {
              type: 'radio',
              name: name
            });
            $inp.id = oId;
            $oLab = $$('<label/>', {
              for: oId,
              'data-lang': oLab
            });
            if (req) {
              $inp.setAttribute('required', true);
            }
            if (fldSt === oId) {
              $inp.setAttribute('checked', true);
            }
            $ctrls.appendChild($inp);
            $ctrls.appendChild($oLab);
          }
          $fld.appendChild($ctrls);
          $fld.appendChild($$('<label/>', {
            'data-lang': lab
          }));
          break;
        case 'range':
          $inp = $$('<input/>', {
            type: 'range'
          });
          $num = $$('<input/>', {
            type: 'text',
            'data-type': 'currency'
          });
          $inp.id = objId;
          if (max) {
            $inp.setAttribute('max', max);
          }
          if (min) {
            $inp.setAttribute('min', min);
          }
          if (step) {
            $inp.setAttribute('step', step);
          }
          if (req) {
            $inp.setAttribute('required', true);
          }
          if (name) {
            $inp.setAttribute('name', name);
          }
          if (lab) {
            $inp.setAttribute('data-lang', ph);
          }
          $fld.appendChild($num);
          $fld.appendChild($inp);
          if (lab) {
            $fld.appendChild($$('<label/>', {
              for: objId,
              'data-lang': lab
            }));
          }
          $inp.value = fldSt || val || '';
          $num.value = cf.format(fldSt || val || '', {
            code: 'CHF'
          });
          break;
        case 'output':
          $inp = $$('<output/>');
          $inp.id = objId;
          if (req) {
            $inp.setAttribute('required', true);
          }
          if (name) {
            $inp.setAttribute('name', name);
          }
          if (ph) {
            $inp.setAttribute('data-lang', ph);
          }
          if (val) {
            $inp.value = val;
          }
          $fld.appendChild($inp);
          if (lab) {
            $fld.appendChild($$('<label/>', {
              for: objId,
              'data-lang': lab
            }));
          }
          break;
        case 'textarea':
          $inp = $$('<textarea/>');
          $inp.id = objId;
          if (req) {
            $inp.setAttribute('required', true);
          }
          if (name) {
            $inp.setAttribute('name', name);
          }
          if (ph) {
            $inp.setAttribute('data-lang', ph);
          }
          $fld.appendChild($inp);
          if (lab) {
            $fld.appendChild($$('<label/>', {
              for: objId,
              'data-lang': lab
            }));
          }
          $inp.value = fldSt || val || '';
          break;
        case 'currency':
        case 'number':
          $inp = $$('<input/>', {
            type: 'number'
          });
          $inp.id = objId;
          if (req) {
            $inp.setAttribute('required', true);
          }
          if (name) {
            $inp.setAttribute('name', name);
          }
          $fld.appendChild($inp);
          if (lab) {
            $fld.appendChild($$('<label/>', {
              'data-lang': lab
            }));
          }
          val = fldSt || val || 0;
          if (type === 'currency') {
            $inp.setAttribute('type', 'text');
            $inp.setAttribute('data-type', 'currency');
            $inp.value = cf.format(val, {
              code: 'CHF'
            });
          } else {
            $inp.value = val;
          }
          break;
        case 'checkbox':
          $inp = $$('<input/>', {
            type: 'checkbox'
          });
          $inp.id = objId;
          if (req) {
            $inp.setAttribute('required', true);
          }
          if (name) {
            $inp.setAttribute('name', name);
          }
          $fld.appendChild($inp);
          if (lab) {
            $fld.appendChild($$('<label/>', {
              'data-lang': lab
            }));
          }
          val = fldSt || null;
          if (val) {
            $inp.setAttribute('checked', true);
          }
          break;
        default:
          $inp = $$('<input/>', {
            type: type || 'text'
          });
          $inp.id = objId;
          if (req) {
            $inp.setAttribute('required', true);
          }
          if (name) {
            $inp.setAttribute('name', name);
          }
          if (ptrn) {
            $inp.setAttribute('pattern', ptrn);
          }
          if (ph) {
            $inp.setAttribute('data-lang', ph);
          }
          $inp.value = fldSt || val || '';
          $fld.appendChild($inp);
          if (lab) {
            $fld.appendChild($$('<label/>', {
              for: objId,
              'data-lang': lab
            }));
          }
      }
      $fld.appendChild($$('<i/>', {
        'class': 'ui-icon icon-ok ion-checkmark'
      }));
      $fld.appendChild($$('<i/>', {
        'class': 'ui-icon icon-nok ion-close'
      }));
      return $t.appendChild($fld);
    },
    listen: function($ui) {
      var $fld, $flds, $inps, $range, $steps, i, len;
      //$ui     = $$ '#' + id
      $inps = $$('input, textarea, select', $ui);
      $flds = $$('[required]', $ui);
      $range = $$('[type=range]', $ui);
      if ($flds.length) {
        $$.listen($flds, 'change', ui.validate);
        $$.listen($flds, 'blur', ui.validate);
        $$.listen($flds, 'fldChange', ui.validate);
      }
      for (i = 0, len = $flds.length; i < len; i++) {
        $fld = $flds[i];
        if ($fld.value) {
          
          // initial validation of nonempty fields
          $fld.dispatchEvent(fldChange);
        }
      }
      if ($range.length) {
        $$.listen($range, 'input', function(e) {
          return e.target.previousSibling.value = cf.format(e.target.value, {
            code: 'CHF'
          });
        });
        $$.listen($range.previousSibling, 'keyup', function(e) {
          return e.target.nextSibling.value = e.target.value;
        });
      }
      if ($inps.length) {
        $$.listen($inps, 'change', function(e) {
          var $elm, prop, type, val;
          $elm = e.target;
          type = $elm.getAttribute('data-type') || $elm.getAttribute('type');
          prop = type === 'radio' ? $elm.getAttribute('name') : $elm.id;
          val = type === 'radio' ? $elm.id : $elm.value;
          if (type === 'currency') {
            $elm.value = cf.format(val, {
              code: 'CHF'
            });
          }
          st[prop] = val;
          return state.set({
            id: id,
            state: st
          });
        });
      }
      $steps = $$('[ data-step ]:first-child', $ui);
      if ($steps.length) {
        return $steps.setAttribute('data-fx', 'in');
      }
    },
    validate: function(e) {
      var $elm, $fld, cns;
      e.preventDefault();
      $elm = e.target;
      $fld = $$.parent($elm, '.fld');
      // ADD valid/invalid class
      cns = ['valid', 'invalid'];
      if ($elm.checkValidity()) {
        cns.reverse();
      }
      $$.removeClass($fld, cns[0]).addClass($fld, cns[1]);
    },
    evs: {
      set: function(opt) {
        var $city, $step, $steps, $ui, $zip, dyn, fld, i, len, step;
        opt = opt || {};
        id = id;
        step = opt.step;
        dyn = opt.dyn;
        fld = opt.fld;
        $ui = $$('#' + id);
        if (step) {
          $steps = $$('[data-step]', $ui);
          for (i = 0, len = $steps.length; i < len; i++) {
            $step = $steps[i];
            if ($step.getAttribute('data-fx') === 'in') {
              $step.setAttribute('data-fx', 'out');
            }
          }
          $$('[data-step]:nth-child(' + step + ')', $ui).setAttribute('data-fx', 'in');
        }
        
        // zip fills city
        $zip = $$('#zip');
        $city = $$('#city');
        if ($zip && $city) {
          return $$.listen($zip, 'keyup', function(e) {
            var zip;
            zip = e.target.value;
            if (zip.length <= 3) {
              $city.value = '';
              return;
            }
            return $$.read('service/city/get/' + zip, function(city) {
              return $city.value = city ? city : '';
            });
          });
        }
      },
      listen: {
        unload: function() {
          return window.onunload = function() {
            var $fld, prop, type, val;
            // CHECK if user has changed something...
            $fld = $$('input:focus, textarea:focus, select:focus', $ui);
            if (!$fld) {
              return;
            }
            type = $fld.getAttribute('type');
            prop = type === 'radio' ? $fld.getAttribute('name') : $fld.id;
            val = type === 'radio' ? $fld.id : $fld.value;
            // ...and update that change
            st[prop] = val;
            return state.set({
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
    init: function(opt) {
      var $t, $ui, i, ids, len, obj, type;
      opt = opt || {};
      id = opt.id;
      ids = opt.ids;
      type = opt.type;
      $t = opt.target;
      st = state.get({
        id: id
      }) || {};
      if (!id || !ids || !$t) {
        return;
      }
      
      // UI markup
      $ui = ui.$tpl.cloneNode();
      $ui.id = id;
      $ui.className = type ? 'ui-' + type : 'ui-form';
      for (i = 0, len = ids.length; i < len; i++) {
        obj = ids[i];
        
        // APPEND fields to form
        ui.addFld(obj, $ui);
      }
      
      // APPEND UI to dom target
      $t.appendChild($ui);
      // ATTACH events
      ui.listen($ui);
      // ATTACH observer events
      obs.l('ui-form-set', ui.evs.set);
    }
  };
})();
