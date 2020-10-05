/*
  UI SEARCH
  @author faeb187
*/
  // EXPORTS
module.exports = (function() {
  var buffer, pending, search;
  
  // PRIVATE

  // true on pending ajax search
  pending = false;
  // buffer to search after pending completed
  buffer = '';
  // @desc   fetch results from server
  // @param  opt.query   {string}    search value
  // @param  opt.limit   {integer}   result limit
  // @returns            {object}    containing query & items
  search = function(opt) {
    var data, limit, query, self;
    self = this;
    opt = opt || {};
    query = opt.query || '';
    limit = opt.limit;
    // at least 2 characters required
    if (query.length < 2) {
      return;
    }
    // request data
    data = {
      query: query
    };
    if (limit) {
      data.limit = limit;
    }
    if (!pending) {
      pending = true;
      return $.get(query, opts, {
        success: function(res) {
          pending = false;
          // buffer not empty
          if (buffer) {
            opt.query = buffer;
            buffer = '';
            return self.search(opt);
          } else {
            
            // return results
            return res || [];
          }
        }
      });
    } else {
      // update search buffer
      return buffer = query;
    }
  };
  return {
    // @desc   build new search box
    // @param  opt.placeholder   {string}  lang reference
    // @param  opt.source        {string}  API path to fetch results
    // @param  opt.target        {string}  id of DOM target

    // PUBLIC

    init: function(opt) {
      var a, body, i, inp, limit, ovl, qry, results, source, t, ui, w;
      opt = opt || {};
      t = document.getElementById(opt.target);
      source = opt.source;
      limit = opt.limit;
      if (!t || !source) {
        return;
      }
      // search wrapper for styling
      ui = document.createElement('div');
      ui.className = 'ui-search';
      // search button
      a = document.createElement('a');
      // search icon
      i = document.createElement('i');
      i.className = 'ion-android-search';
      // overlay for active search
      ovl = document.getElementById('ui-overlay');
      // search input
      qry = document.createElement('div');
      qry.className = 'ui-search-query';
      inp = document.createElement('input');
      inp.setAttribute('type', 'search');
      if (opt.placeholder) {
        inp.setAttribute('data-lang', opt.placeholder);
      }
      // search results
      results = document.createElement('div');
      results.className = 'ui-search-results';
      
      // add overlay and active search elements into wrapper
      w = document.createElement('div');
      qry.appendChild(inp);
      w.appendChild(qry);
      w.appendChild(results);
      
      // active search overlay is appended to body
      body = document.getElementsByTagName('body')[0];
      body.appendChild(w);
      
      // append UI (search button) to DOM target
      a.appendChild(i);
      ui.appendChild(a);
      t.appendChild(ui);
      
      // UI EVENTS

      // show search overlay
      // (on search button click)
      return $(ui).on('click', 'a', function() {
        return qry.style.display = 'block';
      // fetch results from server
      }).on('keyup', 'input', function() {
        var opts, v;
        v = this.value;
        if (!v || !v.length < 2) {
          return;
        }
        // ajax options
        opts = {
          query: v
        };
        if (limit) {
          opts.limit = limit;
        }
        
        // API call to fetch search results
        return $.get(source, opts, {
          success: function(res) {
            var h2, item, items, j, len, p, path, query, re, ref, text, title, type;
            res = res || {};
            items = res.items;
            query = res.query;
            if (!items || !query) {
              return;
            }
            
            // empty existing results
            results.innerHTML = '';
            ref = res.items;
            // cycle through results
            for (j = 0, len = ref.length; j < len; j++) {
              item = ref[j];
              type = item.type;
              title = item.title;
              text = item.text;
              path = item.path;
              if (!type || !title || !text || !path) {
                continue;
              }
              // searched query regular expression
              re = new RegExp(query, 'g');
              // set result title
              // ...and set marks for query
              h2 = document.createElement('h2');
              a = document.createElement('a');
              a.setAttribute('href', path);
              // set result text
              // ...and set marks for query
              p = document.createElement('p');
              p.innerHTML = text.replace(re, '<mark>' + query + '</mark>');
              // build result
              h2.appendChild(a);
              result.appendChild(h2);
              result.appendChild(p);
            }
            // append result to results container
            return results.appendChild(result);
          }
        });
      });
    }
  };
})();
