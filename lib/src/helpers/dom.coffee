###
  DOLLARSIGNS
###
module.exports =
  (->
    d = document
    dp = new DOMParser()
    isNode = (elm) ->
      elm instanceof HTMLElement

      # @DESC   find element(s)
    # @PARAM  p1  MAN {string}      CSS selector
    # @PARAM  p2  OPT {string|Node} parent container
    # @RETURN {Node|array}  node or array of nodes or empty array
    #
    # @DESC   create element
    # @PARAM  p1  MAN {string}  <tagName/> (e.g. $$ '<div/>')
    # @PARAM  p2  OPT {object}  attributes of new element
    # @RETURN {Node}
    $$ = (p1, p2) ->
      if !p1 or typeof p1 isnt "string" then return @

      # CREATE element
      if p1.slice(0, 1) is "<" and p1.slice(-2) is "/>"
        $elm = d.createElement p1.slice 1, -2
        for k, v of p2 or {}
          if k is "innerText"
            $elm.innerText = v
          else
            $elm.setAttribute k, v
        return $elm

      # CHECK for parentNode
      if p2 and typeof p2 is "string"
        p2 = d.querySelector p2

      # DEFAULT parent: document
      if !p2 then p2 = d

      # FIND element(s) in parent
      $elms = p2.querySelectorAll p1

      if !$elms.length then return []

      # return found element(s)
      if $elms.length is 1 then $elms[0] else $elms

    # @DESC   (bulk) append element(s) to HTMLNode
    $$.append = (toAppend, $t) ->
      (if isNode toAppend then [toAppend] else toAppend).forEach (elm) ->
        $t.appendChild elm
      @

    $$.measure = (str, fs) ->
      $hlp = @ "<span/>", innerText: str
      @css $hlp,
        position: "absolute"
        left: "-9999px"
        top: "-9999px"

      if fs then @css $hlp, fontSize: "#{fs}px"

      document.body.appendChild $hlp
      measures =
        h: $hlp.clientHeight + 1
        w: $hlp.clientWidth + 1
      document.body.removeChild $hlp
      measures

    # @DESC   parse HTML string to node tree
    # @PARAM  MAN {str}   HTML string to parse
    # @RETURN {node|$$}
    $$.parse = (str) ->
      # MANDATORY html string
      if !str or typeof str isnt "string" then return $$

      # return parsed node
      dp.parse str

    # @DESC   get/set css of element
    # @PARAM  elms    MAN {Node|string} element(s) or selector
    # @PARAM  obj     MAN {json|string} styles to set or property
    # @RETURN {string|$$}
    $$.css = (elms, obj) ->
      # MANDATORY PARAMs
      if !elms or !obj then return @

      # get node by selector
      if typeof elms is "string" then elms = $$ elms

      # set element style
      if typeof obj is "object"
        if !elms.length then elms = [elms]
        for i in [0..(elms.length - 1)]
          (elms[i].style[k] = v) for k, v of obj
        return @

      # get computed style for element
      v = window.getComputedStyle(elms)[obj]

      # return parsed style
      if v.slice(-2) is "px" and v.indexOf " " is -1
        parseFloat v
      else
        v

    # @DESC   get all previous siblings
    # @PARAM  elm   MAN {node|string} element or selector
    # @RETURN {array|$$}
    $$.prevAll = (elm) ->
      # delegate to $$.nextAll
      @nextAll elm,
        prev: true

        # @DESC     get all next siblings
    # @PARAM    elm       MAN {node|string} element or selector
    # @PARAM    opt.prev  OPT {boolean}     $$.prevAll delegation
    # @RETURN  {array}
    $$.nextAll = (elm, opt) ->
      opt = opt or {}

      # MANDATORY element
      if !elm then return

      # find element by selector
      if typeof elm is "string" then elm = $$ elm

      # selector didn't match DOM element
      if !elm then return @

      # only one element
      # (default: first in NodeList)
      if elm.length then elm = elm[0]

      # collect next siblings
      sibs = []
      sib = elm
      dir = if opt.prev then "previous" else "next"

      while true
        sib = sib[dir + "Sibling"]
        if !sib then break
        sibs.push sib

      sibs

    # @DESC   get parent node
    # @PARAM  $elm  MAN {node|string} element or selector
    # @PARAM  sel   OPT {string}      parent selector
    # @RETURN {node}
    $$.parent = ($elm, sel) ->
      if !$elm
        return @

        # just return direct parent node
      if arguments.length is 1 then return $elm.parentNode

      # look for requested parent
      selMatch = ($elm, sel) ->
        if $elm.matches sel then $elm else selMatch $elm.parentNode, sel

      selMatch $elm.parentNode, sel

      # @DESC   checks for existence of a class on a node
    # @PARAM  $elm    MAN {node|string} element or selector
    # @PARAM  cn      MN  {string}      class to check
    # @RETURN {boolean||$$}
    $$.hasClass = ($elm, cn) ->
      if !$elm or !cn or typeof cn isnt "string" then return @
      if typeof $elm is "string" then $elm = $$ $elm
      if !$elm then return @
      if $elm.length then $elm = $elm[0]
      if $elm.className.indexOf(cn) > -1 then true else false

    # @DESC   adds a class to node
    # @PARAM  $elm  MAN {node|string} element or selector
    # @PARAM  cn    MAN {string}      class to add
    # @RETURN {$$}
    $$.addClass = ($elm, cn) ->
      # MANDATORY element & class
      if !$elm or !cn or typeof cn isnt "string"
        return @

        # GET node by selector
      if typeof $elm is "string"
        $elm = $$ $elm

        # NO node matched
      if !$elm then return @

      # MULTIPLE NODES matched
      if $elm.length
        $elm = $elm[0]

        # ALREADY attached class
      if $elm.className.indexOf(cn) > -1
        return @

        # ADD class
      $elm.className += " " + cn

      @

    # @DESC   removes a class from node
    # @PARAM  $elm  MAN {node|string} element or selector
    # @PARAM  cn    MAN {string}      class to remove
    # @RETURN {$$}
    $$.removeClass = ($elm, cn) ->
      # MANDATORY element & class
      if !$elm or !cn or typeof cn isnt "string"
        return @

        # GET node by selector
      if typeof $elm is "string"
        $elm = $$ $elm

        # MATCHED no nodes
      if !$elm
        return @

        # MATCHED multiple nodes
      if $elm.length
        $elm = $elm[0]

        # NO className found
      if !$elm.className
        return @

        # GET index of toRemove class
      cns = $elm.className.split " "
      idx = cns.indexOf cn

      # REMOVE class from node
      if idx > -1
        cns.splice idx, 1
        $elm.className = cns.join " "

      @

    # @DESC   toggles a node class
    # @PARAM  elm       MAN {node|string} element or selector
    # @PARAM  toToggle  MAN {string}  class to toggle
    # @RETURN {$$}
    $$.toggleClass = (elm, toToggle) ->
      if !elm or !toToggle then return @
      if typeof elm is "string" then elm = $$ elm
      if !elm then return $$
      if elm.length then elm = elm[0]
      cns = elm.className.split " "
      idx = cns.indexOf toToggle
      if idx is -1
        elm.className = cns.join(" ") + " " + toToggle
      else
        cns.splice idx, 1
        elm.className = cns.join " "
      @

    # @DESC   toggles style.display
    # @PARAM  elm   MAN {node|string} element or selector
    # @PARAM  dsp   OPT {string}      visible type (@DEF:block|flex)
    # @RETURN {$$}
    $$.toggle = (elm, dsp) ->
      if !elm then return $$
      dsp = dsp or "block"

      if typeof elm is "string" then elm = $$ elm
      if !elm then return $$

      if elm.length then elm = elm[0]
      curDsp = elm.style.display
      elm.style.display = if curDsp is "none" then dsp else "none"

      $$

    # @DESC   uppercase first character of string
    # @PARAM  str   MAN {string}  string
    # @RETURN {string|$$}
    $$.ucFirst = (str) ->
      # MANDATORY string
      if !str or typeof str isnt "string"
        return $$

        # RETURN string
      str.charAt(0).toUpperCase() + str.slice 1

    # @DESC   extend object with additional properties
    # @DESC   (o.x overwrites t.x if t.x exists)
    # @PARAM  t MAN {json}  target object
    # @PARAM  o MAN {json}  object to merge into target
    $$.extend = (t, o) ->
      (t[k] = o[k]) for k of o
      t

    # @DESC   get index of DOM node compared to siblings (0..n)
    # @PARAM  $elm  MAN {node|string} element or selector
    # @RETURN {integer} index or -1
    $$.index = ($elm) ->
      # MANDATORY element
      if !$elm then return $$

      # FIND element by selector
      # ...return  when no match
      if typeof $elm is "string" then $elm = $$ $elm
      if !$elm then return $$

      # ONLY ONE element
      # ...and get its parent node
      if $elm.length then $elm = $elm[0]
      $p = $elm.parentNode

      # RETURN index or -1
      Array.prototype.indexOf.call $p.childNodes, $elm

    # @DESC   listen to an event
    # @PARAM  $elms MAN {Node|string} element(s) or selector
    # @PARAM  event MAN {string}      event name
    # @PARAM  cb    MAN {function}    callback function
    # @RETURN {$$}
    $$.listen = ($elms, event, cb) ->
      # MANDATORY element(s)|selector, event and callback
      if !$elms or !event or !cb then return @

      # get node by selector
      if typeof $elms is "string" then $elms = $$ $elms

      # DOM node given
      if !$elms.length then $elms = [$elms]

      # add event listeners
      for $elm in $elms
        $elm.addEventListener event, cb

      @

    # @DESC   destroy event listener
    # @PARAM  $elms   MAN {Node|string} element(s) or selector
    # @PARAM  event   MAN {string}      event name
    # @PARAM  handler MAN {function}    attached handler
    # @RETURN {$$}
    $$.destroy = ($elms, event, handler) ->
      # MANDATORY element(s)|selector, event & fn
      if !$elms or !event or !handler then return @

      # GET node by selector
      if typeof $elms is "string" then $elms = $$ $elms

      # DOM node given
      if !$elms.length
        $elms.removeEventListener event, handler
      # DESTROY event listeners
      else
        for $elm in $elms
          $elm.removeEventListener event, handler

      @

    # @DESC   API create request
    # @PARAM  path  MAN {string}    request path
    # @PARAM  dta   OPT {object}    request data
    # @PARAM  cb    OPT {function}  callback
    # @RETURN {$$}
    $$.create = (path, dta, cb) ->
      if !path then return
      # TODO
      @

    # @DESC   API read request
    # @PARAM  path  MAN {string}    request path
    # @PARAM  dta   OPT {object}    request data
    # @PARAM  cb    MAN {function}  callback
    # @RETURN {$$}
    $$.read = (path, dta, cb) ->
      arg = arguments

      # MANDATORY path
      if !arg[0] then return @

      # NO DATA to send
      if arg.length is 2
        # SECOND PARAM must be callback
        if typeof arg[1] isnt "function" then return @

        # NO DATA but callback
        cb = arg[1]
        dta = null

      # CHECK if there is a callback when 3 arguments
      if !cb or typeof cb isnt "function"
        return @

        # create AJAX request
      xhr = new XMLHttpRequest()

      # response loaded (execute callback)
      xhr.onreadystatechange = ->
        if @readyState is 4 and @status is 200
          cb @responseText

          # send request
      xhr.open "GET", path
      xhr.send dta

      @

    # @DESC   API update request
    # @PARAM  path  MAN {string}    request path
    # @PARAM  dta   MAN {object}    request data
    # @PARAM  cb    OPT {function}  callback
    # @RETURN {$$}
    $$.update = (path, dta, cb) ->
      # MANDATORY path, data
      if !path or !dta then return @

      # TODO

      @

    # @DESC   API delete request
    # @RETURN {$$}
    $$.delete = (path, dta, cb) ->
      # MANDATORY path, data & callback
      if !path or !dta or !cb then return @

      # TODO

      @

    # @DESC   preload media
    # @RETURN {$$}
    $$.preload = (opt) ->
      opt = opt or {}
      itms = opt.items or []
      cbFile = opt.onFileLoaded
      cb = opt.onFinish
      loaded = 0
      toLoad = itms.length
      supported = ["jpg", "png"]

      # MANDATORY items & onFinish callback
      if !toLoad or !cb or typeof cb isnt "function" then return $$

      for itm in itms
        type = itm.split(".").pop()
        if supported.indexOf(type) is -1 then return $$

        img = new Image()
        img.onload = ->
          if ++loaded is toLoad
            cb toLoad
          else if opt.onFileLoaded
            opt.onFileLoaded @getAttribute "src"
        img.src = itm

    # SPA history handling
    $$.history =
      # @DESC   update current state
      # @PARAM  name  MAN {string}  site name
      # @PARAM  path  MAN {string}  site path (route)
      # @RETURN {$$}
      go: (name, path) ->
        history.pushState { site: name }, null, path

    return $$
  )()
