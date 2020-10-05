/*
  UI TABLE
  @AUTHOR faeb187
*/
module.exports = (function() {
  var $$, $tbody, $ui, addRow, colOrder, cursorMove, d, endX, mouseDown, mouseMove, mouseUp, onResize, startX, state, ui, uiWidth;
  // @REQUIRE local modules
  $$ = require('../helpers/dom');
  state = require('../helpers/state');
  
  // @DEFINE variables
  d = document;
  colOrder = [];
  $tbody = $ui = uiWidth = startX = endX = null;
  onResize = {};
  
  // @DESC     adjust columns on resize
  // @PARAM    e {Event} mousemove event
  // @RETURN  {void}
  mouseMove = function(e) {
    var col, delta, elmL, elmW, i, len, next, nextA, nextCol, nextLen, nextW, tblL;
    col = onResize.elm.getAttribute('data-col');
    tblL = $ui.offsetLeft;
    elmL = onResize.elm.offsetLeft - tblL;
    elmW = $$.css(onResize.elm, 'width');
    delta = e.clientX - elmL - onResize.startX;
    nextA = $$.nextAll(onResize.elm);
    nextLen = nextA.length;
// ADJUST next columns
    for (i = 0, len = nextA.length; i < len; i++) {
      next = nextA[i];
      nextCol = next.getAttribute('data-col');
      nextW = $$.css(next, 'width') - delta / nextLen;
      $$.css('[data-col=' + nextCol + ']', {
        width: nextW + 'px'
      });
    }
    
    // SET new width for resized column
    $$.css('[data-col=' + col + ']', {
      width: (elmW + delta) + 'px'
    });
    // UPDATE startX
    return onResize.startX += delta;
  };
  // @DESC   show resize cursor on column border
  // @PARAM  e {event} mousemove event
  // @RETURN {void}
  cursorMove = function(e) {
    var brdR, curs, elmL, elmW, tblL;
    // DEFINE variables
    tblL = $ui.offsetLeft;
    elmL = e.target.offsetLeft - tblL;
    elmW = ui.getWidth(e.target);
    brdR = $$.css(e.target, 'borderRightWidth');
    curs = e.clientX - elmL < elmW - brdR ? 'default' : void 0;
    return $$.css($ui, {
      cursor: curs || 'ew-resize'
    });
  };
  // @DESC   remove event listeners after column resize
  // @RETURN {void}
  mouseUp = function() {
    $$.destroy(window, 'mouseup', mouseUp);
    $$.destroy($ui, 'mousemove', mouseMove);
    $$.destroy($ui, 'cursormove', cursorMove);
    return onResize = {};
  };
  // @DESC   add event listeners when column resize initiated
  // @PARAM  e {event} mousedown event
  // @RETURN {void}
  mouseDown = function(e) {
    var brdR, elmL, elmW, tblL;
    tblL = $ui.offsetLeft;
    onResize.elm = e.target;
    elmL = onResize.elm.offsetLeft - tblL;
    elmW = ui.getWidth(onResize.elm);
    onResize.startX = e.clientX - elmL;
    brdR = $$.css(onResize.elm, 'borderRightWidth');
    // ONLY handle column resizes on border click
    if (onResize.startX < elmW - brdR) {
      return;
    }
    // LISTEN to column resize
    $$.listen($ui, 'mousemove', mouseMove);
    return $$.listen(window, 'mouseup', mouseUp);
  };
  // UI object
  ui = {
    // @DESC   listen to column resize if opt.resizable
    // @RETURN {void}
    resizable: function() {
      // LISTEN for resize column...
      // ...AND show resize cursor
      $$.listen($ui, 'mousedown', mouseDown);
      return $$.listen($ui, 'mousemove', cursorMove);
    },
    // @DESC   get total width
    // @DESC   (including margin, padding & border)
    // @PARAM  opt.elm   MAN {node}  element
    // @RETURN {float}   total width in px
    getWidth: function(elm) {
      if (!elm) {
        return;
      }
      return $$.css(elm, 'width') + $$.css(elm, 'borderRightWidth') + $$.css(elm, 'borderLeftWidth') + $$.css(elm, 'marginRight') + $$.css(elm, 'marginLeft') + $$.css(elm, 'paddingLeft') + $$.css(elm, 'paddingRight');
    },
    // @DESC   set column width
    // @RETURN {void}
    setWidth: function() {
      var colsLen, delta, elm, elms, i, len, results, w;
      colsLen = $$('.th', $ui).length;
      elms = $$('.th, .td', $ui);
      uiWidth = $$.css($ui, 'width') - $$.css($ui, 'borderLeftWidth') - $$.css($ui, 'borderRightWidth') - $$.css($ui, 'paddingLeft') - $$.css($ui, 'paddingRight');

      // CALC widths
      results = [];
      for (i = 0, len = elms.length; i < len; i++) {
        elm = elms[i];
        // CALC delta
        // (border, padding, margin)
        delta = $$.css(elm, 'borderLeftWidth') + $$.css(elm, 'borderRightWidth') + $$.css(elm, 'paddingLeft') + $$.css(elm, 'paddingRight') + $$.css(elm, 'marginLeft') + $$.css(elm, 'marginRight');
        // CALC column width
        w = uiWidth / colsLen - delta;
        // SET column widths
        results.push($$.css(elm, {
          width: w + 'px'
        }, $ui));
      }
      return results;
    },
    // @DESC   update column width while dragging
    // @PARAM  elm   MAN {node}    dragged column
    // @PARAM  x     MAN {number} current x
    // @RETURN {void}
    updateColumnWidth: function(elm, x) {
      var curCol, curName, delta, i, len, nextCol, nextName, nextSib, nextSibs;
      
      // GET resized delta
      delta = x - startX;
      // GET next siblings
      nextSibs = $$.nextAll(elm);

      // ADJUST next columns
      for (i = 0, len = nextSibs.length; i < len; i++) {
        nextSib = nextSibs[i];
        // GET ALL td's of next column
        nextName = nextSib.getAttribute('data-col');
        nextCol = $$('[data-col=' + nextName + ']', $ui);
      }
      // GET ALL td's of resized column
      curName = elm.getAttribute('data-col');
      return curCol = $$('[data-col=' + curName + ']', $ui);
    }
  };
  // @DESC   add data row
  // @PARAM  opt.row   MAN {json}  object with row data
  // @RETURN {void}
  addRow = function(opt) {
    var $col, $tr, col, i, len, row;
    // DEFINE variables
    opt = opt || {};
    row = opt.row;
    if (!row) {
      return;
    }
    
    // MARKUP table row
    $tr = $$('<div/>', {
      'class': 'tr'
    });
// ADD COLS in the right order
    for (i = 0, len = colOrder.length; i < len; i++) {
      col = colOrder[i];
      $col = $$('<div/>', {
        'class': 'td',
        'data-col': col
      });
      $col.innerText = row[col] || '-';
      $tr.appendChild($col);
    }
    $tbody.appendChild($tr);
  };
  return {
    // @DESC     build new table
    // @PARAM    cols          MAN {array}     table columns
    // @PARAM    cols.$.id     MAN {string}    column id
    // @PARAM    cols.$.title  MAN {string}    lang reference
    // @PARAM    data          OPT {json}      data object
    // @PARAM    opt.data.rows MAN {array}     array of table rows
    // @PARAM    source        OPT {string}    API path to fetch data
    // @PARAM    limit         OPT {number}   how many records to fetch
    // @PARAM    paging        OPT {number}   paging index to fetch data
    // @PARAM    sortedBy      OPT {object}    default sorting
    // @PARAM    sorted.by     MAN {string}    id of sorted column
    // @PARAM    sorted.how    OPT {asc|DESC}  sort direction
    // @PARAM    opt.resizable OPT {boolean}   columns are resizable
    // @PARAM    opt.target    MAN {string}    target node
    // @RETURN  {void}
    init: function(opt) {
      var $t, $th, $thead, col, colId, colTitle, cols, dta, i, id, j, len, len1, limit, opts, paging, ref, resizable, row, rowOpts, sorted, source;
      opt = opt || {};
      id = opt.id;
      cols = opt.cols;
      dta = opt.data;
      source = opt.source;
      limit = opt.limit;
      paging = opt.paging;
      sorted = opt.sorted;
      resizable = opt.resizable;
      $t = opt.target;
      if (!id || !cols || !$t) {
        return;
      }
      // UI markup
      $ui = $$('<div/>', {
        'class': 'ui-table',
        id: id
      });
      $thead = $$('<div/>', {
        'class': 'thead'
      });
// BUILD table header
      for (i = 0, len = cols.length; i < len; i++) {
        col = cols[i];
        colId = col.id;
        colTitle = col.title;
        if (!colId || !colTitle) {
          return;
        }
        // table header row
        $th = $$('<div/>', {
          id: colId,
          'class': 'th',
          'data-lang': colTitle,
          'data-col': colId
        });
        // GET col order
        colOrder.push(colTitle);
        
        // APPEND th to thead
        $thead.appendChild($th);
      }
      // table body
      $tbody = $$('<div/>', {
        'class': 'tbody'
      });
      // data already included
      if (dta && dta.rows) {
        ref = dta.rows;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          row = ref[j];
          rowOpts = {
            row: row
          };
          if (resizable) {
            rowOpts.resizable = true;
          }
          addRow(rowOpts);
        }
      // FETCH table data
      } else if (source) {
        // REQ data object
        opts = {
          id: id
        };
        if (limit) {
          opts.limit = limit;
        }
        if (paging) {
          opts.paging = paging;
        }
        // FETCH data from server
        $.get(source, opts, {
          success: function(res) {
            var k, len2, results, rows;
            res = res || {};
            rows = res.rows;
            if (!rows) {
              return;
            }
            results = [];
            for (k = 0, len2 = rows.length; k < len2; k++) {
              row = rows[k];
              rowOpts = {
                row: row
              };
              if (resizable) {
                rowOpts.resizable = true;
              }
              results.push(addRow(rowOpts));
            }
            return results;
          }
        });
      }
      
      // APPEND UI to DOM target
      $ui.appendChild($thead) && $ui.appendChild($tbody);
      $t.appendChild($ui);
      // RESIZE columns
      if (resizable) {
        ui.resizable();
      }
      // ADJUST column widths on window resize
      window.onresize = function() {
        return ui.setWidth();
      };
      
      // initial trigger in its own scope
      setTimeout(function() {
        return ui.setWidth();
      });
      0;
    }
  };
})();
