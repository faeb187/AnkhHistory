# IMPORTS
module.exports = (->

  #
  # PRIVATE
  #
  state = require '../helpers/state'
  $$    = require '../helpers/dom'
  self  = $ui = null

  # @DESC   click event to switch lang
  # @PARAM  e {event} click on anchor
  # @RETURN {void}
  changeLang = ( e ) ->
    e.preventDefault()
    $a = e.target

    # update lang
    self.update
      id  : $ui.id
      lang: $a.getAttribute 'lang'

    # update 'active' class
    $$( '.active', $a.parentNode ).className = ''
    $a.className = 'active'

  # variables
  def = 'de'

  # language library
  lib =

    # german
    de:
      cards: "Karten"
      care: "Betreuung"
      careTodo: "Betreuung Todo"
      copyright: "&copy; bekb.ch. Alle Rechte vorbehalten."
      overview: "Übersicht"
      partner: "Partner"
      products: "Produkte"
      productsAdditional: "Zusatzprodukte"
      reports: "Berichte"
      safes: "Tresorfächer"

    # english
    en:
      cards: "Cards"
      care: "Care",
      careTodo: "Care Todo"
      copyright: "&copy; bekb.ch. All rights reserved."
      overview: "Overview"
      partner: "Partner"
      products: "Products"
      productsAdditional: "Additional Products"
      reports: "Reports"
      safes: "Safes"

  #
  # PUBLIC
  #
  return {
    
    # @DESC   build new language switcher
    # @PARAM  opt.id      MAN {string}  UI id
    # @PARAM  opt.target  MAN {string}  DOM target id
    # @RETURN {void}
    init: ( opt ) ->
      self  = @
      opt   = opt or {}
      id    = opt.id
      $t    = opt.target

      # MANDATORY id & target
      if !id or !$t then return

      # active lang by priority
      # ( localStorage > default )
      lang = state.get( id: id ) or def
      
      # UI markup
      $ui = $$ '<nav/>', id: id, 'class': 'ui-lang'

      # iterate through language lib
      idx = 0
      for k, v of lib
        $a = $$ '<a/>',
          rel     : 'alternate'
          hreflang: k
          lang    : k

        $a.innerText = k

        # SET active class
        if k is lang then $a.className='active'

        # SWITCH lang on click
        $$.listen $a, 'click', changeLang
        
        # append UI to DOM target
        $ui.appendChild $a
      $t.appendChild $ui
      
      return

    # @DESC   update language
    # @PARAM  opt.id   MAN {string}  UI id
    # @PARAM  opt.lang  OPT {string}  language code
    # @RETURN {void}
    update: ( opt ) ->
      opt   = opt or {}
      id    = opt.id
      
      # MANDATORY id
      if !id then return

      # language by priority
      # ( direct change > localStorage > default )
      # !TODO language by geolocation
      lang = opt.lang or state.get( id: id ) or def

      # update elements
      for elm in $$ '[data-lang]'
        v = lib[ lang ][ elm.getAttribute 'data-lang' ]

        if      elm.tagName is 'IMG'    then elm.setAttribute 'alt'         , v
        else if elm.tagName is 'INPUT'  then elm.setAttribute 'placeholder' , v
        else    elm.innerHTML = v
      
      # set <html> lang attribute
      $$( 'html' ).setAttribute 'lang', lang

      # save UI state
      state.set
        id    : id
        state : lang
  }
)()
