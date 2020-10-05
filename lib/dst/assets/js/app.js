(function() {
  var $$, Modernizr, obs, site;
  // REQUIRE local files
  $$ = require('./helpers/dom');
  obs = require('./helpers/obs');
  site = require('./helpers/site');
  
  // REQUIRE npm modules
  require('browsernizr/test/proximity');
  require('browsernizr/test/battery');
  require('browsernizr/test/ambientlight');
  require('browsernizr/test/notification');
  Modernizr = require('browsernizr');
  document.title = 'BeKB';
  site.load(location.pathname.slice(1) || 'care');
  obs.f('ankh-ready');
})();
