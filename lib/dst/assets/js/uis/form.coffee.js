/*
  UI FORM
  @AUTHOR faeb187
*/
module.exports = (function() {
  var $$, $ui, d, fldChange, id, obs, st, state, ui, validate;
  // @REQUIRE local modules
  // @PRIVATE
  $$ = require('../helpers/dom');
  obs = require('../helpers/obs');
  state = require('../helpers/state');
  // @REQUIRE events
  // @PRIVATE
  fldChange = new Event('fldChange');
  // @DESC   validate required form input
  // @PARAM  e   MAN {event} change/blur/fldChange
  // @RETURN {void}
  validate = function(e) {
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
  };
  // @DEFINE variables
  $ui = null;
  st = null;
  id = null;
  d = document;
  // @DEFINE   ui  {json}  UI variables/methods
  // @PRIVATE
  ui = {
    // @DEFINE evs {json}  custom events
    evs: {
      // @DEFINE evs.step  step events
      step: {
        // @DESC   updates active step
        // @PARAM  opt.id    MAN {string}  form id
        // @PARAM  opt.step  MAN {number}  step to show
        // @RETURN {void}
        set: function(opt) {
          var step;
          opt = opt || {};
          $ui = $$('#' + opt.id);
          step = opt.step;
          if (!$ui || !step) {
            return;
          }
          // UPDATE active step
          $$.removeClass($$('.step.active', $ui), 'active');
          $$.addClass($$('.step:nth-child(' + step + ')', $ui), 'active');
        }
      }
    },
    // bind events
    // @TODO ui.evs.click format
    bind: function(e) {
      var $city, $fld, $flds, $zip, i, len;
      
      // validate form
      if (e === 'validate') {
        $flds = $$('input, textarea, select', $ui);
        $$.listen($flds, 'change', validate);
        $$.listen($flds, 'blur', validate);
        $$.listen($flds, 'fldChange', validate);
        // validate nonempty fields
        $flds = $$('[required]', $ui);
        for (i = 0, len = $flds.length; i < len; i++) {
          $fld = $flds[i];
          if ($fld.value) {
            $fld.dispatchEvent(fldChange);
          }
        }
      }
      // XHR service requets
      if (e === 'services') {
        $$ = require('../helpers/dom');
        
        // zip fills city
        $zip = $$('#zip');
        $city = $$('#city');
        console.log($ui);
        if ($zip && $city) {
          $$.listen($zip, 'keyup', function(e) {
            var zip;
            zip = e.target.value;
            if (zip.length <= 3) {
              $city.value = '';
              return;
            }
            return $$.read('service/city/get/?zip=' + zip, function(city) {
              return $city.value = city ? city : '';
            });
          });
        }
      }
      if (e === 'range') {
        // update range text input/display on range change
        $$.listen($$('[type=range]', $ui), 'input', function(e) {
          return e.target.previousSibling.value = e.target.value;
        });
        // update range thumb on text input change
        $$.listen($$('[type=range]', $ui).previousSibling, 'keyup', function(e) {
          return e.target.nextSibling.value = e.target.value;
        });
      }
      // steps navigation click
      if (e === 'next') {
        $$.listen($$('.steps a:not(.badge)', $ui), 'click', function(e) {
          var $act, $actN, $bdg, $liC, $steps, $stepsN, idx, iv, j, len1;
          $liC = e.currentTarget.parentNode;
          if ($$.hasClass($liC, 'active')) {
            return;
          }
          e.stopPropagation();
          e.preventDefault();
          // DEFINE variables
          $steps = $$('.step', $ui);
          $act = $$('.step.active', $ui);
          $stepsN = $$('.steps', $ui);
          $actN = $$('.steps li.active', $ui);
          $flds = $$('.step.active [required]', $ui);
          $bdg = $$('.steps li.active .badge', $ui);
          // GET current active index
          idx = $$.index($liC);
          // SHOW badges
          iv = 0;
          for (j = 0, len1 = $flds.length; j < len1; j++) {
            $fld = $flds[j];
            $fld.checkValidity() || iv++;
          }
          $bdg.innerText = iv;
          $$.css($bdg, {
            display: iv > 0 ? 'block' : 'none'
          });
          // UPDATE form view
          $act.className = 'step';
          $steps[idx].className += ' active';
          // UPDATE steps nav
          $$.removeClass($$('.active', $stepsN), 'active');
          $$('li', $stepsN)[idx].className += ' active';
          // UPDATE UI state
          st.activeStep = idx;
          return state.set({
            id: id,
            state: st
          });
        });
      }
      // button 'submit' click
      if (e === 'submit') {
        $$.listen($$('.submit', $ui), 'click', function() {
          if (!action) {

          }
        });
      }
      // update UI state on input change
      if (e === 'change') {
        $$.listen($$('input, textarea, select', $ui), 'change', function(e) {
          var $elm, prop, type, val;
          $elm = e.target;
          type = $elm.getAttribute('type');
          prop = type === 'radio' ? $elm.getAttribute('name') : $elm.id;
          val = type === 'radio' ? $elm.id : $elm.value;
          st[prop] = val;
          return state.set({
            id: id,
            state: st
          });
        });
      }
      // UPDATE UI state on window unload
      if (e === 'unload') {
        return window.onunload = function() {
          var prop, type, val;
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
  };
  return {
    // @DESC   build new form
    // @DESC   opt.id                                        MAN {string   UI id
    // @PARAM  opt.steps                                     MAN {array}   form steps
    // @PARAM  opt.steps.$.title                             OPT {string}  lang ref
    // @PARAM  opt.steps.$.fieldsets                         OPT {array}   field groups
    // @PARAM  opt.steps.$.fieldsets.$.legend                OPT {string}  lang reference
    // @PARAM  opt.steps.$.fieldsets.$.fields                OPT {array}   form fields
    // @PARAM  opt.steps.$.fieldsets.$.fields.$.id           MAN {string}  field id
    // @PARAM  opt.steps.$.fieldsets.$.fields.$.type         OPT {string}  field type
    // @PARAM  opt.steps.$.fieldsets.$.fields.$.attrs        OPT {object}  field attributes
    // @PARAM  opt.steps.$.fieldsets.$.fields.$.label        OPT {string}  lang ref
    // @PARAM  opt.steps.$.fieldsets.$.fields.$.placeholder  OPT {string}  lang ref
    // @PARAM  opt.steps.$.fieldsets.$.fields.$.required     OPT {boolean} input validation
    // @PARAM  opt.target                                    MAN {string}  id of DOM target

    // PUBLIC

    init: function(opt) {
      var $checked, $fld, $fs, $grp, $inf, $inp, $input, $lab, $label, $nok, $o, $ok, $row, $step, $steps, $stepsUl, $t, $txt, activeStep, cn, f, fld, flds, fs, fsId, fsIdx, i, j, k, l, len, len1, len2, len3, len4, m, n, name, o, ref, ref1, ref2, step, stepId, stepIdx, stepLen, steps, type, v;
      opt = opt || {};
      id = opt.id;
      $t = opt.target;
      steps = opt.steps;
      if (!id || !steps || !$t) {
        return;
      }
      // MARKUP UI
      $ui = $$('<form/>', {
        'class': 'ui-form'
      });
      $ui.id = id;
      $steps = $$('<nav/>', {
        'class': 'steps'
      });
      $stepsUl = $$('<ul/>');
      $steps.appendChild($stepsUl);
      stepLen = steps.length;
      // GET UI state
      st = state.get({
        id: id
      }) || {};
      activeStep = st.activeStep || 0;
// HANDLE steps
      for (stepIdx = i = 0, len = steps.length; i < len; stepIdx = ++i) {
        step = steps[stepIdx];
        stepId = id + '-step-' + stepIdx;
        fs = step.fieldsets;
        cn = 'step';
        if (!stepId || !fs) {
          continue;
        }
        // STEP navigation
        /*
        if step.icon
          $li = $$ '<li/>'
          $i  = $$ '<i/>', 'class': step.icon
          $a  = $$ '<a/>'
          $bdg= $$ '<a/>', 'class': 'badge'
          $bdg.innerText = '0'

          $a.appendChild  $i
          $li.appendChild $a
          $li.appendChild $bdg
          $stepsUl.appendChild $li
          if stepIdx is activeStep then $li.className = 'active'

        */
        // active step from localStorage
        if (activeStep === stepIdx) {
          cn += ' active';
        }
        // step markup
        $step = $$('<section/>', {
          id: stepId,
          'class': cn
        });
        if (step.title) {
          $step.appendChild($$('<h2/>', {
            'data-lang': step.title
          }));
        }
// handle fieldsets
        for (fsIdx = j = 0, len1 = fs.length; j < len1; fsIdx = ++j) {
          f = fs[fsIdx];
          // DEFINE variables
          fsId = stepId + '-fs-' + fsIdx;
          flds = f.fields;
          $fs = $$('<fieldset/>');
          if (!fsId || !flds) {
            continue;
          }
          // APPEND fieldset legend
          if (f.legend) {
            $fs.appendChild($$('<legend/>', 'data-lang', f.legend));
          }
// HANDLE fields
          for (l = 0, len2 = flds.length; l < len2; l++) {
            fld = flds[l];
            // DEFINE variables
            type = fld.type || 'text';
            name = fld.name;
            $row = $$('<div/>', {
              'class': 'fld fld-' + name
            });
            $ok = $$('<i/>', {
              'class': 'ui-icon icon-ok ion-checkmark'
            });
            $nok = $$('<i/>', {
              'class': 'ui-icon icon-nok ion-close'
            });
            $inf = $$('<i/>', {
              'class': 'ui-icon icon-info ion-info'
            });
            // HANDLE field types
            switch (type) {
              // RADIO group
              case 'radio':
                $grp = $$('<div/>', {
                  'class': 'radio-group'
                });
                // ADD label if available
                if (fld.label) {
                  $lab = $$('<label/>', {
                    'data-lang': fld.label
                  });
                  $row.appendChild($lab);
                }
                // CHECK for UI state
                $checked = st[name] || null;
                ref = fld.options;
                // ADD radio options
                for (m = 0, len3 = ref.length; m < len3; m++) {
                  o = ref[m];
                  $fld = $$('<div/>');
                  $inp = $$('<input/>', {
                    id: o.id,
                    type: 'radio',
                    name: name,
                    value: o.value
                  });
                  $label = $$('<label/>', {
                    for: o.id
                  });
                  if ($checked === o.id) {
                    $inp.setAttribute('checked', true);
                  }
                  if (o.icon) {
                    $label.appendChild($$('<i/>', {
                      'class': o.icon
                    }));
                  } else {
                    $label.setAttribute('data-lang', o.label);
                  }
                  $fld.appendChild($inp);
                  $fld.appendChild($label);
                  $fld.appendChild($ok);
                  $fld.appendChild($nok);
                  $fld.appendChild($inf);
                  $grp.appendChild($fld);
                }
                // SKIP common stuff
                $row.appendChild($grp);
                $fs.appendChild($row);
                continue;
              // SELECT menu
              case 'select':
                // MARKUP select
                $fld = $$('<select/>');
                // HANDLE placeholder
                if (fld.placeholder) {
                  $fld.appendChild($$('<option/>', {
                    'data-lang': fld.placeholder,
                    disabled: 'disabled',
                    selected: 'selected'
                  }));
                }
                ref1 = fld.options;
                // APPEND options
                for (n = 0, len4 = ref1.length; n < len4; n++) {
                  o = ref1[n];
                  $o = $$('<option/>');
                  if (o.icon) {
                    $o.appendChild($$('<i/>', {
                      'class': o.icon
                    }));
                  } else if (o.label) {
                    $o.setAttribute('data-lang', o.label);
                  }
                  if (o.value) {
                    $o.value = o.value;
                  }
                  $fld.appendChild($o);
                }
                // as some elements needs to wrap the :input
                // and we need a reference to all of the real ones...
                $input = $fld;
                break;
              // TEXTAREA
              case 'textarea':
                $fld = $$('<textarea/>');
                $input = $fld;
                break;
              // RANGE
              case 'range':
                $inp = $$('<input/>', {
                  type: 'range',
                  name: name
                });
                $grp = $$('<div/>', {
                  'class': 'range-group'
                });
                $fld = d.createDocumentFragment();
                $txt = $$('<input/>', {
                  id: name + '-dsp',
                  type: 'number',
                  name: name + '-dsp',
                  value: st[name] ? st[name] : fld.value || 0
                });
                if (fld.attrs) {
                  if (fld.attrs.min) {
                    $txt.setAttribute('min', fld.attrs.min);
                  }
                  if (fld.attrs.max) {
                    $txt.setAttribute('max', fld.attrs.max);
                  }
                  if (fld.attrs.step) {
                    $txt.setAttribute('step', fld.attrs.step);
                  }
                }
                $grp.appendChild($txt);
                $grp.appendChild($inp);
                $fld.appendChild($grp);
                $input = $inp;
                break;
              default:
                
                // TEXT, DATE, EMAIL, PASSWORD
                type = fld.type || 'text';
                $inp = $$('<input/>', {
                  type: type,
                  name: name
                });
                $fld = d.createDocumentFragment();
                if (fld.placeholder) {
                  $inp.setAttribute('placeholder', fld.placeholder);
                }
                $fld.appendChild($inp);
                $input = $inp;
            }
            // ADD field attributes and label
            if (fld.attrs) {
              ref2 = fld.attrs;
              for (k in ref2) {
                v = ref2[k];
                $input.setAttribute(k, v);
              }
            }
            if (fld.label) {
              $label = $$('<label/>', {
                'data-lang': fld.label,
                for: name
              });
              $row.appendChild($label);
            }
            // REQUIRED field
            if (fld.required) {
              $input.setAttribute('required', 'required');
              $input.setAttribute('aria-required', 'true');
              $row.className += ' required';
            }
            // SET input id
            $input.id = name;
            // FILL value from UI state
            if (st[name]) {
              $input.value = st[name];
            }
            // APPEND UI to target
            $fld.appendChild($ok);
            $fld.appendChild($nok);
            $fld.appendChild($inf);
            $row.appendChild($fld);
            $fs.appendChild($row);
          }
          $step.appendChild($fs);
        }
        // APPEND UI to target
        $ui.appendChild($step);
      }
      //$ui.appendChild $steps
      $t.appendChild($ui);
      // EVENT binding
      obs.l('ui-form-step-set', ui.evs.step.set);
      //ui.bind 'next'
      // ui.bind 'submit'
      ui.bind('change');
      ui.bind('unload');
      ui.bind('services');
      ui.bind('range');
      return ui.bind('validate');
    }
  };
})();
