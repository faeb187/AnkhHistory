###
  UI SEARCH
  @author faeb187
###

# EXPORTS
module.exports = (->

  #
  # PRIVATE
  #

  # true on pending ajax search
  pending = false

  # buffer to search after pending completed
  buffer  = ''

  # @desc   fetch results from server
  # @param  opt.query   {string}    search value
  # @param  opt.limit   {integer}   result limit
  # @returns            {object}    containing query & items
  search = ( opt ) ->
    self    = @
    opt     = opt or {}
    query   = opt.query or ''
    limit   = opt.limit

    # at least 2 characters required
    if query.length < 2 then return

    # request data
    data = query: query
    if limit then data.limit = limit
   
    # no search pending...
    # ...so LET'S GO!!
    if !pending
      pending = true
      $.get query, opts, success: ( res ) ->
        pending = false

        # buffer not empty
        if buffer
          opt.query = buffer
          buffer    = ''
          self.search opt
        
        # return results
        else res or []

    # update search buffer
    else buffer = query
  
  #
  # PUBLIC
  #
  return {

    # @desc   build new search box
    # @param  opt.placeholder   {string}  lang reference
    # @param  opt.source        {string}  API path to fetch results
    # @param  opt.target        {string}  id of DOM target
    init: ( opt ) ->
      opt = opt or {}
      t   = document.getElementById opt.target
      source  = opt.source
      limit   = opt.limit

      if !t or !source then return

      # search wrapper for styling
      ui  = document.createElement 'div'
      ui.className = 'ui-search'

      # search button
      a   = document.createElement 'a'

      # search icon
      i   = document.createElement 'i'
      i.className = 'ion-android-search'

      # overlay for active search
      ovl = document.getElementById 'ui-overlay'

      # search input
      qry = document.createElement 'div'
      qry.className = 'ui-search-query'
      
      inp =   document.createElement 'input'
      inp.setAttribute  'type', 'search'
      
      if opt.placeholder then inp.setAttribute 'data-lang', opt.placeholder

      # search results
      results = document.createElement 'div'
      results.className = 'ui-search-results'
      
      # add overlay and active search elements into wrapper
      w = document.createElement 'div'
      qry.appendChild inp
      w.appendChild qry
      w.appendChild results
      
      # active search overlay is appended to body
      body = document.getElementsByTagName( 'body' )[ 0 ]
      body.appendChild w
      
      # append UI (search button) to DOM target
      a.appendChild i
      ui.appendChild a
      t.appendChild ui
      
      #
      # UI EVENTS
      #
      $( ui )

        # show search overlay
        # (on search button click)
        .on 'click', 'a', ->
          qry.style.display = 'block'

        # fetch results from server
        .on 'keyup', 'input', ->
          v = @value

          # at least two characters in input
          if !v or !v.length < 2 then return

          # ajax options
          opts  = query: v
          if limit then opts.limit = limit
          
          # API call to fetch search results
          $.get source, opts, success: ( res ) ->
            res   = res or {}
            items = res.items
            query = res.query
           
            # server must return:
            # items MAN {array}   array of result objects
            # query MAN {string}  search string
            if !items or !query then return
            
            # empty existing results
            results.innerHTML = ''

            # cycle through results
            for item in res.items
              type  = item.type
              title = item.title
              text  = item.text
              path  = item.path

              # result objects from server must contain:
              # @param type   MAN {string}    type of result (e.g. article)
              # @param title  MAN {string}    lang reference
              # @param text   MAN {string}    lang reference
              # @param path   MAN {string}    url path leading to found item
              # @param image  OPT {string}    path to image to show in results
              if !type or !title or !text or !path then continue

              # searched query regular expression
              re = new RegExp query, 'g'

              # set result title
              # ...and set marks for query
              h2  = document.createElement 'h2'
              a   = document.createElement 'a'
              a.setAttribute 'href', path

              # set result text
              # ...and set marks for query
              p   = document.createElement 'p'
              p.innerHTML = text.replace re, '<mark>' + query + '</mark>'

              # build result
              h2.appendChild a
              result.appendChild h2
              result.appendChild p

            # append result to results container
            results.appendChild result
  }
)()
