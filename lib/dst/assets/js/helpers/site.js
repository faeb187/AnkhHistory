/*
  @-  HELPER site
  @-  AUTHOR faeb187
*/
module.exports = (function() {
  var $$, $b, Conf, Site, Ui, bps, d, load, loadNext, medias, obs, resize, startApp, state, vp;
  //^  local modules
  $$ = require('./dom');
  obs = require('./obs');
  state = require('./state');
  //>  d,$b
  d = document;
  $b = $$('body');
  medias = {};
  vp = {};
  bps = {
    xs: 400,
    s: 600,
    m: 800,
    l: 1050,
    xl: 1800
  };
  //> Site
  Site = {
    care: require('../sites/care'),
    partner: require('../sites/partner'),
    reports: require('../sites/reports')
  };
  //> Conf
  Conf = {
    back: require('../conf/back'),
    cnt: require('../conf/cnt'),
    copyright: require('../conf/copyright'),
    footer: require('../conf/footer'),
    front: require('../conf/front'),
    header: require('../conf/header'),
    lang: require('../conf/lang'),
    main: require('../conf/main'),
    nav: require('../conf/nav'),
    slider: require('../conf/slider'),
    careTodo: require('../conf/careTodo'),
    partnerTodo: require('../conf/partnerTodo'),
    reportsTodo: require('../conf/reportsTodo'),
    navToggle: require('../conf/navToggle')
  };
  //> Ui
  Ui = {
    html: require('../uis/html'),
    icon: require('../uis/icon'),
    lang: require('../uis/lang'),
    layout: require('../uis/layout'),
    list: require('../uis/list'),
    nav: require('../uis/nav'),
    slider: require('../uis/slider')
  };
  // resize
  resize = function() {
    var k, results, v;
    vp.x = window.innerWidth;
    vp.y = window.innerHeight;
    results = [];
    for (k in medias) {
      v = medias[k];
      if (medias[k].min && vp.x < medias[k].min || medias[k].max && vp.x > medias[k].max) {
        results.push($$('#' + k, $b).setAttribute('data-fx', 'out'));
      } else {
        results.push($$('#' + k, $b).setAttribute('data-fx', 'in'));
      }
    }
    return results;
  };
  //-   append app to browser
  //<!  $app {node}
  startApp = function($site) {
    var $ankh;
    if (!$site) {
      return;
    }
    //- show site in browser
    $$('.ui-progress').setAttribute('data-fx', 'out');
    $ankh = $$('#ankh', $b);
    $ankh.innerHTML = '';
    $ankh.appendChild($site);
    resize();
    
    //- load lang 'de'
    //! to fix! no direct UI access allowed
    return Ui['lang'].update({
      id: $$('.ui-lang').id,
      lang: state.get({
        id: $$('.ui-lang').id
      }) || 'de'
    });
  };
  //- loads site
  //<! name  {string} name of the site
  load = function(name) {
    var $df, i, ids, len, obj;
    //>!?
    obj = Site[name] || {};
    ids = obj.ids;
    if (!ids) {
      return;
    }
    // get viewport measures
    vp.x = window.innerWidth;
    vp.y = window.innerHeight;
    
    //>
    $df = d.createDocumentFragment();
    for (i = 0, len = ids.length; i < len; i++) {
      obj = ids[i];
      
      //..
      loadNext(obj, $df);
    }
    //- set site name in body
    $b.setAttribute('data-site', name);
    // listen to viewport resize
    $$.listen(window, 'resize', resize);
    return startApp($df);
  };
  //-  load UI
  //<! ui  {string}  UI id
  //<! $t  {node}    UI target node
  loadNext = function(obj, $t) {
    var $nt, conf, i, len, max, media, min, ref, results, ui;
    if (!obj || !$t) {
      return;
    }
    //>
    conf = JSON.parse(JSON.stringify(Conf[obj.id]));
    if (!conf) {
      return;
    }
    ui = Ui[conf.name] || Ui['html'];
    
    //..
    conf.target = $t;
    // check for matchin viewport min|max
    media = obj.media;
    if (media) {
      min = bps[media.min];
      max = bps[media.max];
      if (min !== void 0 || max !== void 0) {
        medias[conf.id] = {};
        if (min !== void 0) {
          medias[conf.id].min = min;
        }
        if (max !== void 0) {
          medias[conf.id].max = max;
        }
      }
    }
    $nt = ui.init(conf);
    if (obj.ids && $nt) {
      ref = obj.ids;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        obj = ref[i];
        results.push(loadNext(obj, $nt));
      }
      return results;
    }
  };
  // listen to events
  obs.l("helper-site-load", function(e) {
    var path;
    path = e.target.getAttribute("href").slice(1);
    load(path);
    return $$.history.go(path);
  });
  return {
    load: load
  };
})();
