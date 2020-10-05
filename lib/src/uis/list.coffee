###
  UI list
  @AUTHOR faeb187
###
module.exports = (->

  # @REQUIRE local modules
  # @PRIVATE
  $$      = require '../helpers/dom'
  obs     = require '../helpers/obs'
  state   = require '../helpers/state'
  hammer  = require 'hammerjs'

  # @DEFINE ui  {json}  UI variables/methods
  # @PRIVATE
  ui  =
    # @DESC   adds list item to list
    # @PARAM  itm                   MAN {json}    list item
    # @PARAM  itm.lang              MAN {string}  lang ref (text or img alt)
    # @PARAM  itm.path              MAN {string}  href
    # @PARAM  itm.type              OPT {string}  adds data-[ type ] = true
    # @PARAM  itm.active            OPT {boolean} default active item
    # @PARAM  itm.src               OPT {string}  image src attribute
    # @PARAM  itm.icon              OPT {string}  icon class name
    # @PARAM  itm.events            OPT {json}    custom events
    # @PARAM  itm.events.click      OPT {[json]}  list of 'click' events
    # @PARAM  itm.events.click.ev   OPT {string}  custom event name
    # @PARAM  itm.events.click.arg  OPT {*}       event handler param
    # @PARAM  itms                  OPT {todo}    sub items
    # @PARAM  $ui                   MAN {node}    list node
    # @TODO   only <a> when click event
    addListItem: ( itm, $ul ) ->
      act = itm.active
      id  = itm.id
      itm = itm or {}
      evs = itm.events
      lang= itm.lang
      act = itm.active
      src = itm.src
      icon= itm.icon
      href= itm.path
      type= itm.type
      subItms= itm.items

      # MANDATORY lang
      if !lang then return

      # MARKUP list item
      $li = $$ '<li/>'

      if src then $itm = $$ '<img/>', src: src
      else        $itm = $$ '<a/>', id: id
      
      if href then $itm.setAttribute "href", href

      $itm.setAttribute 'data-lang', lang
      if act  then $$.addClass $itm, 'active'
      if type then $itm.setAttribute 'data-' + type, true
      if icon then $itm.appendChild $$ '<i/>', 'class': icon


      # BIND custom events
      if evs
        $itm.events = evs

        if evs.click
          $itm.onclick = ui.evs.click

          # hand      = hammer $itm
          # hand.add  new hammer.Tap
          # hand.on   'tap', ui.evs.click

      # HANDLE sub items
      if subItms
        $subUl = $$ '<ul/>'
        ui.addListItem subItm, $subUl for subItm in subItms
        $li.appendChild $subUl

      # APPEND list item to list
      $li.prepend $itm
      $ul.appendChild $li

      return

    # @DEFINE evs {json}  UI events
    evs   :

      # @DESC   fire custom 'click' events
      # @PARAM  e   MAN {event} 'click' event
      # @RETURN {void}
      click : ( e ) ->
        e.preventDefault()

        # GET current & next active item
        $elm = e.target

        if $elm.tagName is 'I' then $elm = $$.parent $elm
        
        # FIND custom 'click' events
        evs = $elm.events  or {}
        evs = evs.click

        # NO custom 'click' events
        if !evs or !evs.length then return

        # SET active list item
        if $elm.getAttribute( 'data-toggle' ) then $$.toggleClass $elm, 'active'
        else state.set id: $$.parent( $elm, '.ui-list').id, state: active: $elm.id
        
        # FIRE custom 'click' events
        obs.f ev.ev, ev.arg or e for ev in evs when ev

        return

  return {

    # @DESC   inits a new list
    # @PARAM  opt.events        OPT {json}      events
    # @PARAM  opt.id            MAN {string}    UI id
    # @PARAM  opt.items         MAN {[json]}    array containing list items
    # @PARAM  opt.target        MAN {node}      target node
    # @RETURN {void}
    # @PUBLIC
    init: ( opt ) ->
      opt     = opt         or {}
      evs     = opt.events  or {}
      id      = opt.id
      itms    = opt.items   or []
      fx      = opt.fx      or {}
      $t      = opt.target


      # MANDATORY (lang ref or icon), id, list items & target
      if !id or !itms.length or !$t then return

      id = "ui-list-" + id

      # HANDLE active state
      st = state.get( id: id) or {}
      act = st.active or itms[0].id

      # CREATE node
      $ui     = $$ '<ul/>', id: id, class: 'ui-list'

      # APPEND list items
      for itm in itms
        if act is itm.id then itm.active = true
        itm.events = itm.events or evs
        ui.addListItem itm, $ui

      # TMP append UI styles from conf
      $$.css $ui, opt.styl

      # APPEND UI to target
      $t.appendChild $ui

      setTimeout ->
        $$.addClass $ui, 'ui-fx-show'
      , fx.delay or 0

      return
  }
)()
