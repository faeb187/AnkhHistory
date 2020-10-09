module.exports = (->
  de = require '../i18n/de'
  en = require '../i18n/en'
  
  obs   = require '../helpers/obs'
  state = require '../helpers/state'
  $$    = require '../helpers/dom'

  # @DESC   click event to switch lang # @PARAM  event {Event} click on anchor
  changeLang = ( event ) ->
    event.preventDefault()
    $a = event.target

    # update lang
    obs.f 'ui-lang-update', lang: $a.getAttribute 'lang'

    # update 'active' class
    $$( '.active', $a.parentNode ).className = ''
    $a.className = 'active'

  def = 'de'
  lib = de: de, en: en

  # @DESC   build new language switcher
  # @PARAM  opt.id      MAN {string}  UI id
  # @PARAM  opt.target  MAN {string}  DOM target id
  # @RETURN {void}
  init = ( opt ) ->
    {id, target: $t} = opt
    self  = @
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
      if k is lang then $a.className = 'active'

      # SWITCH lang on click
      $$.listen $a, 'click', changeLang
      
      # append UI to DOM target
      $ui.appendChild $a
    $t.appendChild $ui
    obs.f 'ankh-ui-ready', 'ui-lang'
    return

  # @DESC   update language
  # @PARAM  opt.lang  OPT {string}  language code
  # @RETURN {void}
  update = (opt = {}) ->
    {lang = ''} = opt
    
    # language by priority
    # ( direct change > localStorage > default )
    # !TODO language by geolocation
    lang = lang or state.get(id: 'lang') or def

    # update elements
    for elm in $$ '[data-lang]'
      v = lib[ lang ][ elm.getAttribute 'data-lang' ]

      if      elm.tagName is 'IMG'    then elm.setAttribute 'alt'         , v
      else if elm.tagName is 'INPUT'  then elm.setAttribute 'placeholder' , v
      else    elm.innerHTML = v

    $$( 'html' ).setAttribute 'lang', lang

    state.set id: 'lang', state: lang

    obs.f 'ui-lang-updated'

  obs.l 'ui-lang-init', init
  obs.l 'ui-lang-update', update
)()
