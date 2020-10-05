// IMPORTS
module.exports = (function() {
  var $$, $ui, changeLang, def, lib, self, state;
  
  // PRIVATE

  state = require('../helpers/state');
  $$ = require('../helpers/dom');
  self = $ui = null;
  // @DESC   click event to switch lang
  // @PARAM  e {event} click on anchor
  // @RETURN {void}
  changeLang = function(e) {
    var $a;
    e.preventDefault();
    $a = e.target;
    // update lang
    self.update({
      id: $ui.id,
      lang: $a.getAttribute('lang')
    });
    // update 'active' class
    $$('.active', $a.parentNode).className = '';
    return $a.className = 'active';
  };
  // variables
  def = 'de';
  // language library
  lib = {
    // german
    de: {
      care: "Betreuung",
      careTodo: "Betreuung Todo",
      copyright: "&copy; bekb.ch. Alle Rechte vorbehalten.",
      partner: "Partner",
      partnerTodo: "Partner Todo",
      products: "Produkte",
      productsAdditional: "Zusatzprodukte",
      reports: "Berichte",
      reportsTodo: "Berichte Todo"
    },
    // english
    en: {
      care: "Care",
      careTodo: "Care Todo",
      copyright: "&copy; bekb.ch. All rights reserved.",
      partner: "Partner",
      partnerTodo: "PartnerTodo",
      products: "Products",
      productsAdditional: "Zusatzprodukte",
      reports: "Reports",
      reportsTodo: "Reports Todo"
    }
  };
  return {
    
    // @DESC   build new language switcher
    // @PARAM  opt.id      MAN {string}  UI id
    // @PARAM  opt.target  MAN {string}  DOM target id
    // @RETURN {void}

    // PUBLIC

    init: function(opt) {
      var $a, $t, id, idx, k, lang, v;
      self = this;
      opt = opt || {};
      id = opt.id;
      $t = opt.target;
      if (!id || !$t) {
        return;
      }
      // active lang by priority
      // ( localStorage > default )
      lang = state.get({
        id: id
      }) || def;
      
      // UI markup
      $ui = $$('<nav/>', {
        id: id,
        'class': 'ui-lang'
      });
      // iterate through language lib
      idx = 0;
      for (k in lib) {
        v = lib[k];
        $a = $$('<a/>', {
          rel: 'alternate',
          hreflang: k,
          lang: k
        });
        $a.innerText = k;
        // SET active class
        if (k === lang) {
          $a.className = 'active';
        }
        // SWITCH lang on click
        $$.listen($a, 'click', changeLang);
        
        // append UI to DOM target
        $ui.appendChild($a);
      }
      $t.appendChild($ui);
    },
    // @DESC   update language
    // @PARAM  opt.id   MAN {string}  UI id
    // @PARAM  opt.lang  OPT {string}  language code
    // @RETURN {void}
    update: function(opt) {
      var elm, i, id, lang, len, ref, v;
      opt = opt || {};
      id = opt.id;
      if (!id) {
        return;
      }
      // language by priority
      // ( direct change > localStorage > default )
      // !TODO language by geolocation
      lang = opt.lang || state.get({
        id: id
      }) || def;
      ref = $$('[data-lang]');
      // update elements
      for (i = 0, len = ref.length; i < len; i++) {
        elm = ref[i];
        v = lib[lang][elm.getAttribute('data-lang')];
        if (elm.tagName === 'IMG') {
          elm.setAttribute('alt', v);
        } else if (elm.tagName === 'INPUT') {
          elm.setAttribute('placeholder', v);
        } else {
          elm.innerHTML = v;
        }
      }
      
      // set <html> lang attribute
      $$('html').setAttribute('lang', lang);
      // save UI state
      return state.set({
        id: id,
        state: lang
      });
    }
  };
})();
