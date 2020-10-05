/*
  UI SITEMAP
  @desc   adds individual sitemap params and inits UI nav
  @author faeb187
*/
module.exports = (function() {
  var $$, Conf, Ui, ui;
  
  // PRIVATE

  Ui = {
    nav: require('./nav')
  };
  Conf = {
    nav: require('../conf/nav')
  };
  $$ = require('../helpers/dom');
  ui = {
    $tpl: $$('<section/>', {
      'class': 'ui-sitemap'
    })
  };
  return {
    // @DESC init sitemap

    // PUBLIC

    init: function(opt) {
      var navC;
      opt = opt || {};
      opt.type = 'sitemap';
      navC = Conf.nav;
      if (!navC) {
        return;
      }
      // INIT UI nav with type sitemap
      // (extend options from UI nav)
      return Ui.nav.init($$.extend(navC, opt));
    }
  };
})();
